import { send } from '../../lib/mailService';

export default function contactRoute(req, res) {
  const { email, phone, message } = JSON.parse(req.body);
  const contact = { email, phone, message };

  console.log('/api/contact', contact);

  send({
    data: contact,
    template: 'contactEmailTemplate',
  })
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
