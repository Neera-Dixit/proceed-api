import NodeMailer from 'nodemailer';
import registartionTemplate from '../emailTemplates/registrationEmail';
import keys from '../config/keys';

const { emailServiceKey } = keys;

var transporter = NodeMailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.emailID || emailServiceKey.emailID,
    pass: process.env.password || emailServiceKey.password
  }
});

const mailOptions = {
  from: 'neerajdixit27@gmail.com', // sender address
  to: '', // list of receivers
  subject: '', // Subject line
  html: ''// plain text body
};

const getTemplate = (name) => {
  const _templateMapping = {
    registration: registartionTemplate
  };
  return name && _templateMapping[name];
};

const getTemplateData = (templateName, templateData) => {
  if (templateName) {
    return templateName(templateData);
  }

  return null;
}

const emailService = {
  sendEmail: (mailOption) => {
    const { toEmailID, template } = mailOption;

    mailOptions.to = toEmailID;
    mailOptions.subject = template.name;
    mailOptions.html = getTemplateData(getTemplate(template.name), template.data);
    return transporter.sendMail(mailOptions);
  }
};

export default emailService;
