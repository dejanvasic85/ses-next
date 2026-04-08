import { send } from '@/lib/mailService';
import { ContactFormData } from '@/types';
import { config } from '@/lib/config';

const isDevelopment = process.env.NODE_ENV === 'development';

async function verifyRecaptcha(token: string): Promise<boolean> {
  if (isDevelopment) {
    console.log('Skipping reCAPTCHA verification in development');
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
      body: `secret=${secretKey}&response=${token}`,
    });

    const data = await response.json();
    return data.success && data.score >= 0.5;
  } catch (error) {
    console.error('reCAPTCHA verification failed:', error);
    return false;
  }
}

export async function POST(request: Request) {
  const body = await request.text();
  const contact = JSON.parse(body) as ContactFormData;

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

    return Response.json({ message: 'Message received', contact });
  } catch (err) {
    console.error('Failed to send contact email:', err);
    return Response.json({ message: 'Something went wrong' }, { status: 500 });
  }
}
