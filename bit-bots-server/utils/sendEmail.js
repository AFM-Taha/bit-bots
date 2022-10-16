import nodeoutlook from "nodejs-nodemailer-outlook";
import { config } from "dotenv";
config();

const sendEmail = (email, message) => {
  nodeoutlook.sendEmail({
    auth: {
      user: process.env.EMAIL_SENDER,
      pass: process.env.EMAIL_SENDER_PASSWORD,
    },
    from: process.env.EMAIL_SENDER,
    to: email || "munna.aziz.hridoy@gmail.com",
    subject: subject || "No Subject",

    text: message,
    html: message,
    replyTo: process.env.EMAIL_SENDER,

    onError: (e) => console.log(e),
    onSuccess: (i) => console.log(i),
  });
};

export default sendEmail;
