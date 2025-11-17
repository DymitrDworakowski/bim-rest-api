const { Resend } = require("resend");
const path = require("path");
const fs = require("fs");

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_EMAIL = process.env.FROM_EMAIL || "onboarding@resend.dev";

async function sendThankYouEmail({ to, name, courseName }) {
  // абсолютний шлях до файлу
  const imagePath = path.join(__dirname, "../public/images/Stopka.png");
  const imageBuffer = fs.readFileSync(imagePath);

  const subject = `Dziękujemy za zapis na kurs "${courseName}"`;

  const html = `
    <p>Dzień dobry, ${name}!</p>
    <p>Dziękujemy za zapisanie się na kurs "<strong>${courseName}</strong>". W najbliższych 48 godzinach dostaniesz szczegóły organizacyjne.</p>
    <p>To jest wiadomość automatyczna — prosimy na nią nie odpowiadać.</p>

    <p>Do zobaczenia!<br/><strong>Zespół BIMup Academy</strong></p>

    <p>
      <img src="cid:footerImage" 
           alt="BIMup Academy"
           style="max-width:600px;width:100%;height:auto;">
    </p>
  `;

  await resend.emails.send({
    from: FROM_EMAIL,
    to,
    subject,
    html,
    attachments: [
      {
        filename: "Stopka.png",
        content: imageBuffer,
        cid: "footerImage", // 👈 це ID, яким ти вставляєш картинку у <img>
      },
    ],
  });
}

module.exports = { sendThankYouEmail };
