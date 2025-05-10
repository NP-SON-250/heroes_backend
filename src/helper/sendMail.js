import nodemailer from "nodemailer";

export const sendMail = (emailTemplate) => {
  const { emailTo, subject, message } = emailTemplate;
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.UserMailer,
      pass: process.env.PasswordMailer,
    },
  });
  let mailOptions = {
    from: process.env.UserMailer,
    to: emailTo,
    subject,
    html: message,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + mailOptions.to, info.response);
    }
  });
};

export default sendMail;
