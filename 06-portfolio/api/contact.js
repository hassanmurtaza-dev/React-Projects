import nodemailer from "nodemailer";

const LIMITS = { name: 120, email: 200, message: 5000 };
const WINDOW = 60000;
const MAX_PER_WINDOW = 3;
const hits = new Map();

function tooManyFrom(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((at) => now - at < WINDOW);

  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 500) hits.clear();

  return recent.length > MAX_PER_WINDOW;
}

function readBody(req) {
  if (req.body && typeof req.body === "object") return Promise.resolve(req.body);

  return new Promise((resolve) => {
    let raw = "";
    req.on("data", (chunk) => {
      raw += chunk;
      if (raw.length > 20000) req.destroy();
    });
    req.on("end", () => {
      try {
        resolve(JSON.parse(raw || "{}"));
      } catch {
        resolve({});
      }
    });
    req.on("error", () => resolve({}));
  });
}

const looksLikeEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const escape = (value) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const ip = String(req.headers["x-forwarded-for"] ?? "local").split(",")[0].trim();

  if (tooManyFrom(ip)) {
    return res.status(429).json({ error: "Too many messages. Please try again in a minute." });
  }

  const body = await readBody(req);
  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const message = String(body.message ?? "").trim();

  if (String(body.website ?? "")) {
    return res.status(200).json({ ok: true });
  }

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Please fill in every field." });
  }

  if (!looksLikeEmail(email)) {
    return res.status(400).json({ error: "That email address doesn't look right." });
  }

  if (
    name.length > LIMITS.name ||
    email.length > LIMITS.email ||
    message.length > LIMITS.message
  ) {
    return res.status(400).json({ error: "That message is too long." });
  }

  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) {
    console.error("SMTP_USER or SMTP_PASS is not set");
    return res.status(500).json({ error: "The contact form is not configured yet." });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT || 465),
    secure: Number(process.env.SMTP_PORT || 465) === 465,
    auth: { user, pass },
  });

  try {
    await transporter.sendMail({
      from: `"Portfolio contact" <${user}>`,
      to: process.env.CONTACT_TO || user,
      replyTo: `"${name.replace(/"/g, "")}" <${email}>`,
      subject: `Portfolio enquiry from ${name}`,
      text: `${message}\n\n---\nFrom: ${name}\nEmail: ${email}`,
      html: `
        <div style="font-family:system-ui,sans-serif;line-height:1.6;color:#16182a">
          <p style="white-space:pre-wrap">${escape(message)}</p>
          <hr style="border:none;border-top:1px solid #e3e3ea;margin:20px 0" />
          <p style="font-size:14px;color:#5a5f7a">
            <strong>${escape(name)}</strong><br />
            <a href="mailto:${escape(email)}">${escape(email)}</a>
          </p>
        </div>
      `,
    });

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("sendMail failed:", error.message);
    return res.status(502).json({ error: "Could not send the message. Please email me directly." });
  }
}
