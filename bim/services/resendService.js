const { Resend } = require("resend");
const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = process.env.FROM_EMAIL || "onboarding@resend.dev";

// ТВОЯ ПОШТА ДЛЯ КОПІЇ
const ADMIN_EMAIL = "kontakt@bimup.pl";

async function sendThankYouEmail({ to, name, courseName }) {
  // Постійний Cloudinary URL
  const imgSrc = "https://res.cloudinary.com/dye5nmzhn/image/upload/v1763389162/Stopka_wiwup1.png";

  const subject = `Dziękujemy za zapis na kurs "${courseName}"`;

  const html = `
    <p>Dzień dobry, ${name}!</p>
    
    <p>Dziękujemy za zapisanie się na kurs "<strong>${courseName}</strong>". 
    W najbliższych <strong>48 godzinach</strong> otrzymasz od nas szczegółowe informacje dotyczące zajęć.</p>

    <p>To jest wiadomość automatyczna — <strong>prosimy na nią nie odpowiadać.</strong></p>

    <p>Do zobaczenia na szkoleniu!<br/><strong>Zespół BIMup Academy</strong></p>

    <p>
      <img 
        src="${imgSrc}" 
        alt="BIMup Academy" 
        style="max-width:600px;width:100%;height:auto;"
      >
    </p>
  `;

  await resend.emails.send({
    from: FROM_EMAIL,
    to: [to, ADMIN_EMAIL],   // <-- ТУТ НАДСИЛАЄМО ДВОМ ОДРАЗУ
    subject,
    html,
  });
}

module.exports = { sendThankYouEmail };
