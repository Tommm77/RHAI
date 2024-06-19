import nodemailer from 'nodemailer'

export default async (req: { body: { to: any; subject: any; html: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message?: string; error?: string; }): void; new(): any; }; }; }) => {
    const { to, subject, html } = req.body;

    const transporter = nodemailer.createTransport({
        host: 'smtp.mailtrap.io',
        port: 2525,
        auth: {
            user: process.env.MAILTRAP_USER,
            pass: process.env.MAILTRAP_PASS,
        },
    });

    try {
        await transporter.sendMail({
            from: '"Votre Nom" <your-email@example.com>',
            to,
            subject,
            html,
        });
        res.status(200).json({ message: 'Email envoyé avec succès !' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de l\'envoi de l\'email.' });
    }
};
