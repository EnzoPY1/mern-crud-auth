import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';

export const authRequired = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  
  if (!authHeader) {
    console.log('No auth header present');
    return res.status(401).json({ message: "No authorization header" });
  }
  
  const token = authHeader.split(' ')[1];
  
  if (!token) {
    console.log('No token in auth header');
    return res.status(401).json({ message: "No token, authorization denied" });
  }
  
  try {
    const decoded = jwt.verify(token, TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: "Token is not valid" });
  }
};