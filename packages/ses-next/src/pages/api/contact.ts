import { NextApiRequest, NextApiResponse } from 'next';
import { send } from '@/lib/mailService';
import { ContactFormData } from '@/types';

type ApiResponse = {
  message: string;
  contact?: ContactFormData;
  err?: any;
};

export default function contactRoute(req: NextApiRequest, res: NextApiResponse<ApiResponse>) {
  const contact = JSON.parse(req.body) as ContactFormData;

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
