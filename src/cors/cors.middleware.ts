import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction } from "express";

@Injectable()
export class CorsMiddleware implements NestMiddleware {
  use(req: Request, res, next: NextFunction) {
    const allowedOrigins = ["https://alt-synap-front.vercel.app", "https://tipsy-search.net"]
    const  requestOrigin = req.headers['origin'] as string; 

    if (allowedOrigins.includes(requestOrigin)) {
      res.header('Access-Control-Allow-Origin', requestOrigin);
    }
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization, Referer')
    if (req.method === 'OPTIONS') {
      res.status(204).end();
    } else {
      next();
    }
  }
}