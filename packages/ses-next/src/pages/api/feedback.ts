import { NextApiRequest, NextApiResponse } from 'next';
import { send } from '@/lib/mailService';

interface FeedbackData {
  fullName: string;
  comment: string;
  rating: number;
}

export default function feedbackRoute(req: NextApiRequest, res: NextApiResponse) {
  const { fullName, comment, rating }: FeedbackData = JSON.parse(req.body);
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
