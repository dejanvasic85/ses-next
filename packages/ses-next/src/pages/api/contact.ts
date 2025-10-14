import { NextApiRequest, NextApiResponse } from 'next';
import { send } from '@/lib/mailService';
import { ContactFormData } from '@/types';

type ApiResponse = {
  message: string;
  contact?: ContactFormData;
  err?: any;
};

async function verifyRecaptcha(token: string): Promise<boolean> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

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

export default async function contactRoute(req: NextApiRequest, res: NextApiResponse<ApiResponse>) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const contact = JSON.parse(req.body) as ContactFormData;

  if (!contact.recaptchaToken) {
    return res.status(400).json({ message: 'reCAPTCHA token is required' });
  }

  const isValidRecaptcha = await verifyRecaptcha(contact.recaptchaToken);

  if (!isValidRecaptcha) {
    return res.status(400).json({ message: 'reCAPTCHA verification failed' });
  }

  Promise.all([
    send({
      data: contact,
      template: 'contactEmailTemplate',
    }),
    send({
      data: contact,
      template: 'thankYouForContactingTemplate',
      to: contact.email,
    }),
  ])
    .then(() => {
      res.status(200).json({ message: 'Message received', contact });
    })
    .catch((err) => {
      res.status(500).json({
        message: 'Something went wrong',
        err,
      });
    });
}
