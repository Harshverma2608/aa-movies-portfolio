import nodemailer from 'nodemailer'

// Create transporter — works with Gmail App Password
function createTransporter() {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })
}

/* ─── ADMIN NOTIFICATION EMAIL ─── */
export async function sendContactEmail({ name, email, phone, subject, message }) {
  const transporter = createTransporter()

  await transporter.sendMail({
    from: `"A&A Movies Website" <${process.env.EMAIL_USER}>`,
    to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
    replyTo: email,
    subject: `📸 New Enquiry: ${subject} — ${name}`,
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8"/>
  <style>
    body { font-family: 'Georgia', serif; background: #fbf9f4; color: #1b1c19; margin: 0; padding: 0; }
    .wrapper { max-width: 600px; margin: 0 auto; background: #fff; }
    .header { background: #1b1c19; padding: 32px 40px; text-align: center; }
    .header h1 { color: #e9c176; font-size: 22px; letter-spacing: 0.3em; text-transform: uppercase; margin: 0; font-weight: 300; }
    .header p { color: rgba(251,249,244,0.5); font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; margin: 8px 0 0; }
    .body { padding: 40px; }
    .label { font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: #7f7667; margin-bottom: 4px; font-family: sans-serif; }
    .value { font-size: 15px; color: #1b1c19; margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid #f0eee9; }
    .message-box { background: #f5f3ee; padding: 20px; border-left: 3px solid #e9c176; margin-top: 8px; font-size: 14px; line-height: 1.7; }
    .footer { background: #f5f3ee; padding: 20px 40px; text-align: center; font-size: 11px; color: #7f7667; letter-spacing: 0.1em; }
    .reply-btn { display: inline-block; margin-top: 24px; padding: 12px 28px; background: linear-gradient(135deg,#ffdea5,#e9c176); color: #261900; text-decoration: none; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; font-family: sans-serif; font-weight: 600; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>A&amp;A Movies</h1>
      <p>New Enquiry Received</p>
    </div>
    <div class="body">
      <div class="label">Name</div>
      <div class="value">${name}</div>
      <div class="label">Email</div>
      <div class="value"><a href="mailto:${email}" style="color:#775a19">${email}</a></div>
      <div class="label">Phone</div>
      <div class="value">${phone || '—'}</div>
      <div class="label">Subject</div>
      <div class="value">${subject}</div>
      <div class="label">Message</div>
      <div class="message-box">${message.replace(/\n/g, '<br/>')}</div>
      <div style="text-align:center">
        <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject)}" class="reply-btn">Reply to ${name}</a>
      </div>
    </div>
    <div class="footer">
      Received via aa-movies.com &nbsp;·&nbsp; ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST
    </div>
  </div>
</body>
</html>`,
  })
}

/* ─── AUTO-REPLY TO USER ─── */
export async function sendAutoReply({ name, email, subject }) {
  const transporter = createTransporter()

  await transporter.sendMail({
    from: `"A&A Movies" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `We received your enquiry — A&A Movies`,
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8"/>
  <style>
    body { font-family: 'Georgia', serif; background: #fbf9f4; color: #1b1c19; margin: 0; padding: 0; }
    .wrapper { max-width: 600px; margin: 0 auto; background: #fff; }
    .header { background: #1b1c19; padding: 32px 40px; text-align: center; }
    .header h1 { color: #e9c176; font-size: 22px; letter-spacing: 0.3em; text-transform: uppercase; margin: 0; font-weight: 300; }
    .body { padding: 40px; line-height: 1.8; }
    .body p { margin-bottom: 16px; font-size: 15px; color: #4e4639; }
    .highlight { color: #775a19; font-style: italic; }
    .divider { height: 1px; background: linear-gradient(90deg, transparent, #e9c176, transparent); margin: 28px 0; }
    .contact-row { display: flex; align-items: center; gap: 12px; margin-bottom: 10px; font-size: 13px; color: #4e4639; }
    .footer { background: #f5f3ee; padding: 20px 40px; text-align: center; font-size: 11px; color: #7f7667; letter-spacing: 0.1em; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>A&amp;A Movies</h1>
    </div>
    <div class="body">
      <p>Dear <strong>${name}</strong>,</p>
      <p>Thank you for reaching out to us. We have received your enquiry regarding <span class="highlight">${subject.toLowerCase()}</span> and will get back to you within <strong>24 hours</strong>.</p>
      <p>In the meantime, feel free to explore our work on our website or reach out directly:</p>
      <div class="divider"></div>
      <div class="contact-row">📞 <a href="tel:+919837739595" style="color:#775a19;text-decoration:none">+91 98377 39595</a></div>
      <div class="contact-row">✉️ <a href="mailto:aa.movies@gmail.com" style="color:#775a19;text-decoration:none">aa.movies@gmail.com</a></div>
      <div class="contact-row">📍 Mathura, Uttar Pradesh, India</div>
      <div class="divider"></div>
      <p style="font-size:13px;color:#7f7667">Warm regards,<br/><strong style="color:#1b1c19">A&amp;A Movies Team</strong><br/>Event Photography Studio</p>
    </div>
    <div class="footer">
      © ${new Date().getFullYear()} A&amp;A Movies. All rights reserved.
    </div>
  </div>
</body>
</html>`,
  })
}

/* ─── BOOKING EMAIL ─── */
export async function sendBookingEmail({ name, email, phone, eventType, eventDate, venue, message }) {
  const transporter = createTransporter()

  await transporter.sendMail({
    from: `"A&A Movies Website" <${process.env.EMAIL_USER}>`,
    to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
    replyTo: email,
    subject: `📅 New Booking: ${eventType} — ${name}`,
    html: `
      <h2 style="color:#775a19">New Booking Request</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Event Type:</strong> ${eventType}</p>
      <p><strong>Event Date:</strong> ${new Date(eventDate).toDateString()}</p>
      <p><strong>Venue:</strong> ${venue || 'N/A'}</p>
      <p><strong>Message:</strong><br/>${message || 'N/A'}</p>
    `,
  })
}
