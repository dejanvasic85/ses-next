import type { ContactFormData } from '@/types';

type ApiResponse = {
  message: string;
  contact?: ContactFormData;
  err?: unknown;
};

export const runtime = 'nodejs';

async function verifyRecaptcha(token: string): Promise<boolean> {
  const { config } = await import('@/lib/config');
  const secretKey = config.googleRecaptchaSecretKey;

  if (!secretKey) {
    console.error('RECAPTCHA_SECRET_KEY is not configured');
    return false;
  }

  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${secretKey}&response=${token}`,
    });

    const data = (await response.json()) as { success?: boolean; score?: number };
    return Boolean(data.success) && (data.score ?? 0) >= 0.5;
  } catch (error) {
    console.error('reCAPTCHA verification failed:', error);
    return false;
  }
}

export async function GET(): Promise<Response> {
  return Response.json({ message: 'Method not allowed' } satisfies ApiResponse, { status: 405 });
}

export async function POST(request: Request): Promise<Response> {
  let contact: ContactFormData;

  try {
    contact = (await request.json()) as ContactFormData;
  } catch {
    return Response.json({ message: 'Invalid JSON body' } satisfies ApiResponse, { status: 400 });
  }

  if (!contact.recaptchaToken) {
    return Response.json({ message: 'reCAPTCHA token is required' } satisfies ApiResponse, { status: 400 });
  }

  const isValidRecaptcha = await verifyRecaptcha(contact.recaptchaToken);
  if (!isValidRecaptcha) {
    return Response.json({ message: 'reCAPTCHA verification failed' } satisfies ApiResponse, { status: 400 });
  }

  try {
    const { send } = await import('@/lib/mailService');

    await Promise.all([
      send({
        data: contact,
        template: 'contactEmailTemplate',
      }),
      send({
        data: contact,
        template: 'thankYouForContactingTemplate',
        to: contact.email,
      }),
    ]);

    return Response.json({ message: 'Message received', contact } satisfies ApiResponse, { status: 200 });
  } catch (err) {
    return Response.json({ message: 'Something went wrong', err } satisfies ApiResponse, { status: 500 });
  }
}
