import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtService {
  private readonly secret = process.env.JWT_SECRET;

  sign(payload: object): string {
    return jwt.sign(payload, this.secret, { expiresIn: '1h' });
  }

  verify(token: string): any {
    try {
      return jwt.verify(token, this.secret);
    } catch (err) {
      new Error('Token is not valid: ' + err.message);
    }
  }
}
