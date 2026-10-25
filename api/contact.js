import { siteConfig } from '../src/config/siteConfig.js';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return response.status(405).json({ error: 'Method not allowed.' });
  }

  const { name, email, subject, message } = request.body ?? {};
  const normalized = {
    name: typeof name === 'string' ? name.trim() : '',
    email: typeof email === 'string' ? email.trim() : '',
    subject: typeof subject === 'string' ? subject.trim() : '',
    message: typeof message === 'string' ? message.trim() : '',
  };

  if (
    !normalized.name ||
    normalized.name.length > 120 ||
    !emailPattern.test(normalized.email) ||
    normalized.email.length > 254 ||
    !normalized.subject ||
    normalized.subject.length > 200 ||
    normalized.message.length < 10 ||
    normalized.message.length > 10000
  ) {
    return response.status(400).json({ error: 'Please provide valid contact details and a message.' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM;

  if (!apiKey || !from) {
    return response.status(503).json({
      error: 'Contact form is not configured. Please try again later.',
    });
  }

  try {
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [siteConfig.socialLinks.email],
        reply_to: normalized.email,
        subject: `[Portfolio Contact] ${normalized.subject.replace(/[\r\n]/g, ' ')}`,
        text: `Name: ${normalized.name}\nEmail: ${normalized.email}\n\nMessage:\n${normalized.message}`,
      }),
    });

    if (!resendResponse.ok) {
      console.error('Email provider rejected contact message:', await resendResponse.text());
      return response.status(502).json({ error: 'Email delivery failed. Please try again later.' });
    }

    return response.status(200).json({ message: 'Message sent.' });
  } catch (error) {
    console.error('Email provider request failed:', error);
    return response.status(502).json({ error: 'Email delivery failed. Please try again later.' });
  }
}
