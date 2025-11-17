const { Resend } = require("resend");
const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = process.env.FROM_EMAIL || "onboarding@resend.dev";

// ТВОЯ ПОШТА ДЛЯ КОПІЇ (використовується тільки для окремого листа)
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

  // Надсилаємо лише користувачу
  await resend.emails.send({
    from: FROM_EMAIL,
    to: to,   // <-- ТЕПЕР ЛИШЕ ОДНА АДРЕСА
    subject,
    html,
  });
}

// ОКРЕМА ФУНКЦІЯ ДЛЯ АДМІНІСТРАТОРА
async function sendAdminNotification({ name, courseName, userEmail, phone }) {
  const adminSubject = `Nowy zapis na kurs: ${courseName}`;
  
  const adminHtml = `
    <p>Nowy użytkownik zapisał się na kurs:</p>
    <ul>
      <li><strong>Kurs:</strong> ${courseName}</li>
      <li><strong>Imię:</strong> ${name}</li>
      <li><strong>Email:</strong> ${userEmail}</li>
      <li><strong>Telefon:</strong> ${phone}</li>
      <li><strong>Data:</strong> ${new Date().toLocaleString('pl-PL')}</li>
    </ul>
  `;

  await resend.emails.send({
    from: FROM_EMAIL,
    to: ADMIN_EMAIL,
    subject: adminSubject,
    html: adminHtml,
  });
}

module.exports = { sendThankYouEmail, sendAdminNotification };