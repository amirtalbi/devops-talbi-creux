import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class NotificationsService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.example.com', // Remplacez par votre hôte SMTP
      port: 587,
      secure: false,
      auth: {
        user: 'votre_email@example.com',
        pass: 'votre_mot_de_passe',
      },
    });
  }

  async sendEmail(to: string, subject: string, text: string) {
    await this.transporter.sendMail({
      from: '"Votre Application" <votre_email@example.com>',
      to,
      subject,
      text,
    });
  }
}
