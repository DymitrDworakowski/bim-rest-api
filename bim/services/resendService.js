const { Resend } = require("resend");
const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_EMAIL = process.env.FROM_EMAIL || "onboarding@resend.dev";

async function sendThankYouEmail({ to, name, courseName, imageName, imageUrl }) {
  const baseUrl = process.env.BASE_URL || `http://localhost:${process.env.PORT || 3000}`;
  const imgSrc = imageUrl || (imageName ? `${baseUrl}/images/${imageName}` : `${baseUrl}/images/Stopka.png`);

  const subject = `Dziękujemy za zapis na kurs "${courseName}"`;
  const html = `
    <p>Dzień dobry, ${name}!</p>
    
    <p>Dziękujemy za zapisanie się na kurs "<strong>${courseName}</strong>". W najbliższych <strong>48 godzinach</strong> otrzymasz od nas szczegółowe informacje dotyczące harmonogramu, materiałów oraz organizacji zajęć.</p>
    <p>To jest wiadomość automatyczna — <strong>prosimy na nią nie odpowiadać.</strong>
    W razie dodatkowych pytań zapraszamy do kontaktu przez formularz na stronie lub e-mail kontakt@bimup.pl</p>
    <p>Do zobaczenia na szkoleniu!<br/><strong>Zespół BIMup Academy</strong></p>
    <p><img src="${imgSrc}" alt="${courseName} banner" style="max-width:600px;width:100%;height:auto;"></p>
  `;

  await resend.emails.send({
    from: FROM_EMAIL,
    to,
    subject,
    html,
  });
}

module.exports = { sendThankYouEmail };
