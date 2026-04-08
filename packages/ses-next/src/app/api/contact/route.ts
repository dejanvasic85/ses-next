import { send } from '@/lib/mailService';
import { ContactFormDataSchema } from '@/types';
import { config } from '@/lib/config';

async function verifyRecaptcha(token: string): Promise<boolean> {
  if (config.recaptchaBypass) {
    console.log('reCAPTCHA bypass enabled — skipping verification');
    return true;
  }

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
      body: new URLSearchParams({ secret: secretKey, response: token }).toString(),
    });

    const data = await response.json();
    return data.success && data.score >= 0.5;
  } catch (error) {
    console.error('reCAPTCHA verification failed:', error);
    return false;
  }
}

export async function POST(request: Request) {
  let rawBody: unknown;
  try {
    rawBody = JSON.parse(await request.text());
  } catch {
    return Response.json({ message: 'Invalid request body' }, { status: 400 });
  }

  const parseResult = ContactFormDataSchema.safeParse(rawBody);
  if (!parseResult.success) {
    return Response.json({ message: 'Invalid request data' }, { status: 400 });
  }

  const contact = parseResult.data;

  if (!contact.recaptchaToken) {
    return Response.json({ message: 'reCAPTCHA token is required' }, { status: 400 });
  }

  const isValidRecaptcha = await verifyRecaptcha(contact.recaptchaToken);

  if (!isValidRecaptcha) {
    return Response.json({ message: 'reCAPTCHA verification failed' }, { status: 400 });
  }

  try {
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

    return Response.json({ message: 'Message received' });
  } catch (err) {
    console.error('Failed to send contact email:', err);
    return Response.json({ message: 'Something went wrong' }, { status: 500 });
  }
}
