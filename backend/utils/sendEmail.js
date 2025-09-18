// import nodemailer from "nodemailer";

// const sendEmail = async (to, subject, text) => {
//   try {
//     // Transporter (use your Gmail / SMTP credentials)
//     const transporter = nodemailer.createTransport({
//       service: "gmail", // or use "smtp.mailtrap.io" for testing
//       auth: {
//         user: process.env.EMAIL_USER, // your gmail
//         pass: process.env.EMAIL_PASS, // app password
//       },
//     });

//     // Send mail
//     await transporter.sendMail({
//       from: `"LinkWarp 🚀" <${process.env.EMAIL_USER}>`,
//       to,
//       subject,
//       text,
//     });

//     console.log("✅ Email sent successfully");
//   } catch (err) {
//     console.error("❌ Email not sent:", err);
//     throw err;
//   }
// };

// export default sendEmail;
import nodemailer from "nodemailer";

const sendEmail = async (to, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"LinkWarp 🚀" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
    });

    console.log("✅ Email sent successfully");
  } catch (err) {
    console.error("❌ Email not sent:", err);
    throw err;
  }
};

export default sendEmail;
