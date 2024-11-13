import jwt from 'jsonwebtoken'
import { secretkey } from '../config/jwtConfig.js'


export const generateToken=(user)=>{
    
    const payload={
        id:user._id,
        email:user.email,
        role:user.role
    }

    return jwt.sign(payload,secretkey,{expiresIn:'1h'})
}


export const generateRefreshToken=(user)=>{
    
    const payload={
        id:user._id,
        email:user.email,
        role:user.role
    }

    return jwt.sign(payload,secretkey,{expiresIn:'7h'})
}

export const verifyToken = (token) => {
    try {
      return jwt.verify(token, secretkey); // Will throw if token is invalid or expired
    } catch (err) {
      throw new Error('Token verification failed');
    }
  };
  