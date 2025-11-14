const { Resend } = require("resend");
const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_EMAIL = process.env.FROM_EMAIL || "noreply@example.com";

async function sendThankYouEmail({ to, name, courseName }) {
  const subject = `Dziękujemy za zapis na kurs "${courseName}"`;
  const html = `
    <p>Dzień dobry, ${name}!</p>
    <p>Dziękujemy za zapisanie się na kurs "<strong>${courseName}</strong>". Skontaktujemy się z Tobą wkrótce.</p>
  `;
  await resend.emails.send({
    from: FROM_EMAIL,
    to,
    subject,
    html,
  });
}

module.exports = { sendThankYouEmail };
