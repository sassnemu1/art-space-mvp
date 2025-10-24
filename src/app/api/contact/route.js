// import { NextResponse } from 'next/server';
// import nodemailer from 'nodemailer';

// export async function POST(request) {
//   try {
//     const body = await request.json();
//     const { name, email, phone, message } = body;

//     // Настройка транспорта для отправки email
//     const transporter = nodemailer.createTransport({
//         host: 'smtp.yandex.ru', // Например: mail.art-space.world
//         port: 465, // Или 587
//         secure: true, // true для 465, false для 587
//         auth: {
//             user: 'info@art-space.world',
//             pass: 'YIfi708131', // Пароль от почтового ящика
//         },
//     });

//     // Содержимое письма
//     const mailOptions = {
//       from: email,
//       to: 'info@art-space.world', // ✅ Изменено на info@art-space.world
//       subject: `Новое сообщение с сайта ART-Space от ${name}`,
//       html: `
//         <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
//           <h2 style="color: #667eea;">Новое сообщение с формы контактов</h2>
          
//           <div style="background: #f5f5f5; padding: 20px; border-radius: 10px; margin: 20px 0;">
//             <p><strong>Имя:</strong> ${name}</p>
//             <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
//             <p><strong>Телефон:</strong> ${phone || 'Не указан'}</p>
//           </div>

//           <div style="background: #fff; padding: 20px; border-left: 4px solid #667eea; margin: 20px 0;">
//             <p><strong>Сообщение:</strong></p>
//             <p style="line-height: 1.6;">${message}</p>
//           </div>

//           <p style="color: #888; font-size: 12px; margin-top: 30px;">
//             Это письмо отправлено с формы контактов сайта art-space.world
//           </p>
//         </div>
//       `,
//       // ✅ Дополнительно отправляем копию на email отправителя
//       replyTo: email,
//     };

//     // Отправка письма
//     await transporter.sendMail(mailOptions);

//     return NextResponse.json(
//       { message: 'Email sent successfully' },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error('Error sending email:', error);
//     return NextResponse.json(
//       { error: 'Failed to send email' },
//       { status: 500 }
//     );
//   }
// }
