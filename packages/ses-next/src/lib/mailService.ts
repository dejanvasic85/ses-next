import SES from 'aws-sdk/clients/ses';

import { config } from '@/lib/config';
import type { ContactFormData, FeedbackFormData } from '@/types';

const ses = new SES({
  region: 'ap-southeast-2',
  credentials: {
    accessKeyId: config.awsAccessKeyId || '',
    secretAccessKey: config.awsSecretAccessKey || '',
  },
});

type TemplateData = {
  bodyTemplate: string;
  subjectTemplate: string;
};

type EmailTemplates = {
  [key: string]: TemplateData;
};

type EmailData = ContactFormData | FeedbackFormData;

type SendEmailParams = {
  data: EmailData;
  template: string;
  to?: string;
  companyName?: string;
};

const emailTemplates: EmailTemplates = {
  contactEmailTemplate: {
    bodyTemplate: `
    <strong>SES incoming message</strong>
    <p>A customer has completed a contact us form on your website at sesmelbourne.com.au. Please review the following:</p>
    <p><strong>Full name:</strong> {{fullName}}</p>
    <p><strong>Email:</strong> {{email}}</p>
    <p><strong>Phone:</strong> {{phone}}</p>
    <p><strong>Address:</strong> {{address}}</p>
    <p><strong>Message:</strong> {{message}}</p>
    `,
    subjectTemplate: `New SES message from {{fullName}}`,
  },
  thankYouForContactingTemplate: {
    bodyTemplate: `
    <p>Dear {{fullName}},</p>
    <p>Thank you for getting in touch with us on our website.</p>
    <p>We want you to know that your message has been received and we'll get back to you as soon as possible. Our team is currently reviewing your inquiry and will respond within one business day.</p>
    <p>Thank you again for considering <strong>{{companyName}}</strong>. We look forward to speaking with you soon.</p>
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

export function send({
  data,
  template,
  to = config.emailTo,
  companyName,
}: SendEmailParams): Promise<SES.Types.SendEmailResponse | void> {
  const { bodyTemplate, subjectTemplate } = emailTemplates[template];

  const interpolate = (tmpl: string) => {
    const withData = (Object.keys(data) as (keyof EmailData)[]).reduce((prev, curr) => {
      const value = data[curr];
      return prev.replace(`{{${curr}}}`, String(value));
    }, tmpl);
    return companyName ? withData.replace('{{companyName}}', companyName) : withData;
  };

  const emailBody = interpolate(bodyTemplate);
  const subject = interpolate(subjectTemplate);

  if (!config.emailEnabled) {
    console.log('Email disabled, not sending email');
    return Promise.resolve();
  }

  if (!to || !config.emailFrom) {
    console.log('Missing email configuration, not sending email');
    return Promise.resolve();
  }

  console.log('Sending email', { to, subject });

  return ses
    .sendEmail({
      Destination: {
        ToAddresses: [to],
        BccAddresses: config.emailBcc ? [config.emailBcc] : [],
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
      Source: config.emailFrom,
    })
    .promise();
}
