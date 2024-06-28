const nodemailer = require('nodemailer');
const readCsv = require('./data');
const smtpHost = 'email-smtp.ap-south-1.amazonaws.com'; // Example for US East (N. Virginia) region
const smtpPort = 587; // or 465 for secure SMTP
const smtpUser = 'AKIAQ3EGTY4MKRXHGP5Z';
const smtpPass = 'BFqabz43qdg8Hdcquw0tADVzKBPq8pBY5/iSXvoOkhTJ';

const transporter = nodemailer.createTransport({
  host: smtpHost,
  port: smtpPort,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: smtpUser,
    pass: smtpPass
  }
});

const subjectLines = [
  'Your Brand, Our Hackathon: Sponsor HackOdisha 4.0',
  'Join the Tech Revolution: Sponsor HackOdisha 4.0',
  'Unlock New Opportunities: Sponsor HackOdisha 4.0',
  'Be a Part of Something Big: Sponsor HackOdisha 4.0',
  'Reach your Audience: Sponsor HackOdisha 4.0',
  'Experience the Future of Tech: Sponsor HackOdisha 4.0',
  'Make a Lasting Impact: Sponsor HackOdisha 4.0'
];

const emailTemplate = (recipient, subjectIndex) => {
  return {
    from: 'ankita@hackodisha.com',
    to: recipient.email,
    subject: subjectLines[subjectIndex % subjectLines.length],
    text: `Hello Team ${recipient.name},

We are thrilled to share with you the news about our upcoming event, HackOdisha 4.0! We, Webwiz; the technical club at NIT Rourkela are gearing up for a spectacular hackathon experience and we think it might be something ${recipient.name} would be into.

HackOdisha is a celebration of the boundless possibilities of technology where we witness groundbreaking projects spanning various fields, with 3,300+ enthusiastic participants from across India and 18+ other countries coming together, the energy is simply infectious! Now, imagine taking that energy and multiplying it tenfold for HackOdisha 4.0! Scheduled for September 7th- 8th, 2024, this 36- hour extravaganza promises to be a gamechanger in every sense of the word.

We invite you to be a part of this extraordinary journey by becoming a sponsor for HackOdisha 4.0 and aligning your brand with ours. We've attached our sponsorship prospectus for your perusal, which outlines the myriad benefits and opportunities available to our sponsors.

Here's what we have in store for you:

  * Enhanced Brand Visibility: Gain unparalleled exposure through our extensive promotional channels, reaching a diverse audience.
  * Access to Top Talent: Connect with some of the brightest minds from India and around the world, opening opportunities for future hires or collaborations.
  * Customized Engagement: Tailor your sponsorship package to fit your unique objectives and budget, maximizing your investment in HackOdisha 4.0.

We’re itching to chat about how we can make this partnership awesome. Let's turn this tech extravaganza into an unforgettable experience! 
Check out our brochure attached for more details. 

Here's to a Hack-tastic Collaboration!


Sponsorship Team
HackOdisha 4.0`,
html: `
<style>
    body {
      font-family: Arial, sans-serif;
      font-size: 25px;
    }
    h3 {
      font-size: 18px;
      font-weight: bold;
    }
  </style>

<b>Hello Team ${recipient.name},</b> 
        <br>
        <br>
        We are thrilled to share with you the news about our upcoming event, <b>HackOdisha 4.0</b>! We, <b>Webwiz</b>; the technical club at <b>NIT Rourkela</b> are gearing
up for a spectacular hackathon experience and we think it might be something <b>${recipient.name}</b> would be into.
        <br><br>
        <b>HackOdisha</b> is a celebration of the boundless possibilities of technology where we witness groundbreaking projects spanning various fields, with
<b>3,300+</b> enthusiastic participants from across India and <b>18+ other countries</b> coming together, the energy is simply infectious! Now, imagine taking that
energy and multiplying it tenfold for HackOdisha 4.0! Scheduled for <b>September 7th- 8th, 2024</b>, this <b>36- hour</b> extravaganza promises to be a gamechanger in every sense of the word.
<br><br>
We invite you to be a part of this extraordinary journey by becoming a <b>sponsor for HackOdisha 4.0<b> and aligning your brand with ours. We've attached
our sponsorship prospectus for your perusal, which outlines the myriad benefits and opportunities available to our sponsors.
<br><br>
<h3>Here's what we have in store for you:</h3>

<li><b>Enhanced Brand Visibility:</b> Gain unparalleled exposure through our extensive promotional channels, reaching a diverse audience.</li>

<li><b>Access to Top Talent:</b> Connect with some of the brightest minds from India and around the world, opening opportunities for future hires or
collaborations.</li>

<li><b>Customized Engagement:</b> Tailor your sponsorship package to fit your unique objectives and budget, maximizing your investment in HackOdisha
4.0.</li>
<br>

We’re itching to chat about how we can make this partnership awesome. Let's turn this tech extravaganza into an unforgettable experience! <br>
Check out our brochure attached for more details. 
<br><br>
<b>Here's to a Hack-tastic Collaboration! </b>
<br><br>
<b>Sponsorship Team</b>
<br>
<b>HackOdisha 4.0</b>
<br>
`,
attachments: [
  {
    filename: 'brochure.pdf',
    path: './brochure.pdf'
  }
]
};
};

async function sendMail() {
  const data = await readCsv();
  let subjectIndex = 0;

  for (let i = 0; i < data.length; i++) {
    const recipient = data[i];
    const email = emailTemplate(recipient, subjectIndex);
    console.log(`Email to be sent to ${recipient.email} with subject: ${email.subject}`);
    console.log(`From: ${email.from}`);
    console.log(`To: ${email.to}`);
    // console.log(`HTML: ${email.html}`);
    console.log(`Attachments: ${email.attachments.map(a => a.filename).join(', ')}`);
    const delay = Math.floor(Math.random() * 16000) + 1000; // random delay between 1-15 seconds
    console.log(`Waiting for ${delay / 1000} seconds before sending...`);
    await new Promise(resolve => setTimeout(resolve, delay));
    transporter.sendMail(email, (err, info) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`Email sent successfully to ${recipient.email}!`);
      }
    });
    subjectIndex = (subjectIndex + 1) % subjectLines.length;
  }
}

sendMail();