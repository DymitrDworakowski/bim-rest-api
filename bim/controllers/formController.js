const dbService = require("../services/dbService");
const resendService = require("../services/resendService");

async function handleSignup(req, res) {
  try {
    const { courseName, firstName, lastName, email, phone } = req.body;
    if (!courseName || !firstName || !lastName || !email) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const client = await dbService.saveClient({
      courseName,
      firstName,
      lastName,
      email,
      phone,
    });

    await resendService.sendThankYouEmail({
      to: email,
      name: `${firstName} ${lastName}`,
      courseName,
    });
     // Надсилаємо сповіщення адміністратору окремо
    await resendService.sendAdminNotification({ name: `${firstName} ${lastName}`, courseName, userEmail: email, phone });

    return res.status(201).json({ ok: true, clientId: client._id });
  } catch (err) {
    console.error("Signup error", err);
    return res.status(500).json({ error: "Server error" });
  }
}

module.exports = { handleSignup };
