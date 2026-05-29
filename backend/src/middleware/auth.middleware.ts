import {
  Request,
  Response,
  NextFunction
} from "express";

import jwt from "jsonwebtoken";

interface JwtPayload {
  id: string;
  role: string;
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {

  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith("Bearer ")
    ? authHeader.slice("Bearer ".length)
    : authHeader;

  if (!token) {
    res.status(401).json({
      message: "Unauthorized"
    });

    return;
  }

  try {
    const decoded =
      jwt.verify(
        token,
        process.env.JWT_SECRET!
      ) as JwtPayload;

    req.user = decoded;

    next();

  } catch {
    res.status(401).json({
      message: "Invalid Token"
    });
  }
};