const nodemailer = require("nodemailer");

module.exports = main = (link, email) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });
  const html = `
    <div>
        <h1 style="text-align: center">Activate your email</h1>
        <p>
            Your account was succesfully created, click the link below to activate
            your account : <br>
        </p>
        <h2>
            <a href="${link}">
                Activate
            </a>
        </h2>
        <p>
            Link expires in 24 hours
        </p>
    </div>
`;
  const mailOptions = {
    from: "megz.bookstore@gmail.com",
    to: email,
    subject: "Confirmation Email",
    html,
  };

  transporter.sendMail(mailOptions, (error) => error && console.log(error));
};
