
import jwt from "jsonwebtoken";

export interface JwtPayload { 
  id : string;       
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

// ─── Verify Tokens ─────────────────────────────────────────────────────────────
export function verifyAccessToken(token: string): JwtPayload | null {
  try {
    const secret = process.env.JWT_ACCESS_SECRET || "your-secret-key";
    const decoded = jwt.verify(token, secret) as JwtPayload;
    return decoded;
  } catch {
    return null;
  }
}