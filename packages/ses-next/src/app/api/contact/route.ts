import { ContactFormDataSchema } from '@/types';

type ApiResponse = {
  message: string;
};

export const runtime = 'nodejs';

const recaptchaVerifyUrlValue = 'https://www.google.com/recaptcha/api/siteverify';

async function verifyRecaptcha(token: string): Promise<boolean> {
  const { config } = await import('@/lib/config');
  const secretKey = config.googleRecaptchaSecretKey;

  if (!secretKey) {
    console.error('RECAPTCHA_SECRET_KEY is not configured');
    return false;
  }

  try {
    const response = await fetch(recaptchaVerifyUrlValue, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({ secret: secretKey, response: token }).toString(),
    });

    const data = (await response.json()) as { success?: boolean; score?: number };
    return Boolean(data.success) && (data.score ?? 0) >= 0.5;
  } catch (error) {
    console.error('reCAPTCHA verification failed:', error);
    return false;
  }
}

export async function GET(): Promise<Response> {
  return Response.json({ message: 'Method not allowed' } satisfies ApiResponse, {
    status: 405,
    headers: { Allow: 'POST' },
  });
}

export async function POST(request: Request): Promise<Response> {
  const requestBody = await request.json().catch(() => null);
  if (requestBody === null) {
    return Response.json({ message: 'Invalid JSON body' } satisfies ApiResponse, { status: 400 });
  }

  const parsedBody = ContactFormDataSchema.safeParse(requestBody);
  if (!parsedBody.success) {
    return Response.json({ message: 'Invalid request body' } satisfies ApiResponse, { status: 400 });
  }

  const contact = parsedBody.data;

  if (!contact.recaptchaToken) {
    return Response.json({ message: 'reCAPTCHA token is required' } satisfies ApiResponse, { status: 400 });
  }

  const isValidRecaptcha = await verifyRecaptcha(contact.recaptchaToken);
  if (!isValidRecaptcha) {
    return Response.json({ message: 'reCAPTCHA verification failed' } satisfies ApiResponse, { status: 400 });
  }

  try {
    const { send } = await import('@/lib/mailService');

    await send({
      data: contact,
      template: 'contactEmailTemplate',
    });

    try {
      await send({
        data: contact,
        template: 'thankYouForContactingTemplate',
        to: contact.email,
      });
    } catch (err) {
      console.error('Failed to send thank-you email:', err);
    }

    return Response.json({ message: 'Message received' } satisfies ApiResponse, { status: 200 });
  } catch (err) {
    console.error('Failed to send contact emails:', err);
    return Response.json({ message: 'Something went wrong' } satisfies ApiResponse, { status: 500 });
  }
}
