import { send } from '../../lib/mailService';

export default function feedbackRoute(req, res) {
  const { fullName, comment, rating } = JSON.parse(req.body);
  const feedback = { fullName, comment, rating };

  send({
    data: feedback,
    template: 'feedbackEmailTemplate',
  })
    .then(() => {
      res.status(200).json({ message: 'Feedback received', feedback });
    })
    .catch((err) => {
      res.status(500).json({
        message: 'Something went wrong',
        err,
      });
    });
}
