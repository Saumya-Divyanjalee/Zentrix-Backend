import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

export const sendWelcomeEmail = async (toEmail: string, name: string): Promise<void> => {
  try {
    await transporter.sendMail({
      from: `"StudyFlow AI" <${process.env.EMAIL_USER}>`,
      to: toEmail,
      subject: 'Welcome to StudyFlow AI! 🎓',
      html: `
        <div style="font-family:sans-serif;max-width:480px;margin:0 auto;">
          <h2>Welcome, ${name}!</h2>
          <p>Your StudyFlow AI account is ready. Start managing tasks, taking notes, and using AI to study smarter.</p>
          <p>Happy studying!</p>
        </div>
      `,
    });
    console.log(`✅ Welcome email sent to ${toEmail}`);
  } catch (error) {
    console.error('❌ Email send error:', error);
    // intentionally not re-thrown — email failure shouldn't block registration
  }
};