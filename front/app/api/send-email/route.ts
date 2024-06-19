import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
    const { to, subject, html } = await request.json();

    const transporter = nodemailer.createTransport({
        host: 'sandbox.smtp.mailtrap.io',
        port: 2525,
        auth: {
            user: process.env.MAILTRAP_USER,
            pass: process.env.MAILTRAP_PASS,
        },
    });

    try {
        await transporter.sendMail({
            from: '"Votre Nom" <your-email@example.com>', // Remplacez par votre adresse email vérifiée
            to,
            subject,
            html,
        });

        return NextResponse.json({ message: 'Email envoyé avec succès !' }, { status: 200 });
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json({ error: 'Erreur lors de l\'envoi de l\'email.' }, { status: 500 });
    }
}
