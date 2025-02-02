import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 587,
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

export async function sendVerificationEmailNodeMailer(email, name, verifyCode) {
  try {
    const emailHtml = `
      <html lang="en">
      <head>
        <title>Verification Code</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.5;
            color: #333;
          }
          .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 5px;
            background-color: #f9f9f9;
          }
          .code {
            font-size: 24px;
            font-weight: bold;
            color: #007bff;
            margin: 10px 0;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>Hello ${name},</h2>
          <p>Thank you for registering. Please use the following verification code:</p>
          <p class="code">${verifyCode}</p>
          <p>If you did not request this code, please ignore this email.</p>
        </div>
      </body>
      </html>
    `;

    const response = await transporter.sendMail({
      from: `"Dukan" <no-reply@example.com>`, // Replace with your actual email
      to: email,
      subject: "Dukan Verification Code",
      html: emailHtml,
    });

    console.log("Email sent:", response);
    return { success: true, message: "Verification email sent successfully." };
  } catch (error) {
    console.error("Error sending verification email:", error);
    return { success: false, message: "Failed to send verification email." };
  }
}
