import { send } from '../../lib/mailService';

export default function contactRoute(req, res) {
  const contact = JSON.parse(req.body);
  console.log('/api/contact', contact);

  Promise.all([
    send({
      data: contact,
      template: 'contactEmailTemplate',
    }),
    send({
      data: contact,
      template: 'thankYouForContactingTemplate',
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
