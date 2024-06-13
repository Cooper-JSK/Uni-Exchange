import jwt from 'jsonwebtoken';
import { errorHandler } from './errorHandler.js';

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return next(errorHandler(401, 'Access denied! No token provided.'));

    const token = authHeader.split(' ')[1];
    if (!token) return next(errorHandler(401, 'Access denied! No token provided.'));

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return next(errorHandler(403, 'Token is not valid!'));

        req.user = user;
        next();
    });
};
