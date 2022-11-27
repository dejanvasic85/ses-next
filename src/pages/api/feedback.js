import SES from 'aws-sdk/clients/ses';

import getConfig from 'next/config';

const { serverRuntimeConfig } = getConfig();

const ses = new SES({
  region: 'ap-southeast-2',
  credentials: {
    accessKeyId: serverRuntimeConfig.awsAccessKeyId,
    secretAccessKey: serverRuntimeConfig.awsSecretAccessKey,
  },
});

const emailTemplates = {
  feedbackEmailTemplate: `
    <strong>SES feedback available</strong>
    <p>A customer has left feedback on your website. Please review the following:</p>
    <p><strong>From:</strong> {{fullName}}</p>
    <p><strong>Rating:</strong> {{rating}} stars</p>
    <p><strong>Comment:</strong> {{comment}}</p>
  `,
};

export default function feedbackRoute(req, res) {
  const { fullName, comment, rating } = JSON.parse(req.body);
  const feedback = {
    fullName,
    comment,
    rating,
  };

  const emailBody = emailTemplates.feedbackEmailTemplate
    .replace('{{fullName}}', feedback.fullName)
    .replace('{{rating}}', feedback.rating)
    .replace('{{comment}}', feedback.comment);

  ses
    .sendEmail({
      Destination: {
        ToAddresses: [serverRuntimeConfig.emailTo],
      },
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: emailBody,
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: `New SES feedback from ${fullName}`,
        },
      },
      Source: serverRuntimeConfig.emailFrom,
    })
    .promise()
    .then(() => {
      res.status(200).json({ message: 'Feedback received', feedback });
    })
    .catch((err) => {
      res.status(500).json({ message: 'Something went wrong', err });
    });
}
