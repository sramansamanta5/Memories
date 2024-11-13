import crypto from 'crypto'
import dotenv from 'dotenv'

dotenv.config();

if (!process.env.Secretkey) {
    throw new Error('Secretkey is not defined in environment variables');
  }

export const secretkey= process.env.Secretkey;