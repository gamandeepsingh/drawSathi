import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { NextFunction, Request, Response } from "express";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export const middleware = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err || !decoded || typeof decoded === "string") {
      res.status(403).json({ message: "Forbidden" });
      return;
    }

    req.userId = (decoded as jwt.JwtPayload).userId;
    next();
  });
};
