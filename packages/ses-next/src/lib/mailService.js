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
    <p><strong>Full name:</strong> {{fullName}}</p>
    <p><strong>Email:</strong> {{email}}</p>
    <p><strong>Phone:</strong> {{phone}}</p>
    <p><strong>Message:</strong> {{message}}</p>
    `,
    subjectTemplate: `New SES message from {{fullName}}`,
  },
  thankYouForContactingTemplate: {
    bodyTemplate: `
    <p>Dear {{fullName}},</p>
    <p>Thank you for getting in touch with us on our website. We appreciate you taking the time to reach out to us.</p>
    <p>We want you to know that your message has been received and we'll get back to you as soon as possible. Our team is currently reviewing your inquiry and will respond within one business day.</p>
    <p>Thank you again for considering <strong>Storm Electrical Solutions</strong>. We look forward to speaking with you soon.</p>
    `,
    subjectTemplate: `Thank you for contacting SES`,
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
