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
  contactEmailTemplate: {
    bodyTemplate: `
    <strong>SES incoming message</strong>
    <p>A customer has completed a contact us form on your website at sesmelbourne.com.au. Please review the following:</p>
    <p><strong>Email:</strong> {{email}}</p>
    <p><strong>Phone:</strong> {{phone}} stars</p>
    <p><strong>Message:</strong> {{message}}</p>
    `,
    subjectTemplate: `New SES message from {{email}}`,
  },
  feedbackEmailTemplate: {
    bodyTemplate: `
    <strong>SES feedback available</strong>
    <p>A customer has left feedback on your website. Please review the following:</p>
    <p><strong>From:</strong> {{fullName}}</p>
    <p><strong>Rating:</strong> {{rating}} stars</p>
    <p><strong>Comment:</strong> {{comment}}</p>
    `,
    subjectTemplate: `New SES feedback from {{fullName}}`,
  },
};

export function send({ data, template }) {
  const { bodyTemplate, subjectTemplate } = emailTemplates[template];

  const emailBody = Object.keys(data).reduce((prev, curr) => {
    return prev.replace(`{{${curr}}}`, data[curr]);
  }, bodyTemplate);

  const subject = Object.keys(data).reduce((prev, curr) => {
    return prev.replace(`{{${curr}}}`, data[curr]);
  }, subjectTemplate);

  if (!serverRuntimeConfig.emailEnabled) {
    console.log('Email disabled, not sending email');
    return Promise.resolve();
  }

  const ToAddresses = [serverRuntimeConfig.emailTo, 'dejanvasic24@gmail.com'];
  console.log('Sending email', { ToAddresses, subject });

  return ses
    .sendEmail({
      Destination: {
        ToAddresses,
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
          Data: subject,
        },
      },
      Source: serverRuntimeConfig.emailFrom,
    })
    .promise();
}
