import { send } from '@/lib/mailService';
import { ContactFormDataSchema } from '@/types';
import { config } from '@/lib/config';

const recaptchaTimeoutMs = 5000;

async function verifyRecaptcha(token: string): Promise<boolean> {
  const secretKey = config.googleRecaptchaSecretKey;

  if (!secretKey) {
    console.error('RECAPTCHA_SECRET_KEY is not configured');
    return false;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), recaptchaTimeoutMs);

  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({ secret: secretKey, response: token }).toString(),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    const data = await response.json();
    console.log('[contact] reCAPTCHA response:', {
      success: data.success,
      score: data.score,
      errorCodes: data['error-codes'],
    });
    return data.success && data.score >= 0.5;
  } catch (error) {
    clearTimeout(timeoutId);
    console.error('reCAPTCHA verification failed:', error);
    return false;
  }
}

export async function POST(request: Request) {
  let rawBody: unknown;
  try {
    rawBody = JSON.parse(await request.text());
  } catch (err) {
    console.error('[contact] Failed to parse request body:', err);
    return Response.json({ message: 'Invalid request body' }, { status: 400 });
  }

  const parseResult = ContactFormDataSchema.safeParse(rawBody);
  if (!parseResult.success) {
    console.error('[contact] Schema validation failed:', parseResult.error.flatten());
    return Response.json({ message: 'Invalid request data' }, { status: 400 });
  }

  const contact = parseResult.data;

  if (!config.recaptchaBypass) {
    if (!contact.recaptchaToken) {
      console.error('[contact] Missing reCAPTCHA token');
      return Response.json({ message: 'reCAPTCHA token is required' }, { status: 400 });
    }

    const isValidRecaptcha = await verifyRecaptcha(contact.recaptchaToken);

    if (!isValidRecaptcha) {
      console.error('[contact] reCAPTCHA verification failed for token:', contact.recaptchaToken?.slice(0, 20));
      return Response.json({ message: 'reCAPTCHA verification failed' }, { status: 400 });
    }
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
