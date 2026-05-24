import nodemailer from "nodemailer";

export const dynamic = "force-dynamic";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT ?? 587),
  secure: process.env.EMAIL_SECURE === "true",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function POST(request: Request) {
  try {
    const { name, email, message } = (await request.json()) as {
      name: string;
      email: string;
      message: string;
    };

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: "Please fill in all fields." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    await transporter.sendMail({
      from: process.env.EMAIL_FROM ?? process.env.EMAIL_USER,
      to: process.env.EMAIL_TO ?? process.env.EMAIL_USER,
      subject: `Portfolio contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong></p><p>${message.replace(/\n/g, "<br />")}</p>`,
    });

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Unable to send message." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
