import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class FacultyMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Put validation, or authentication here.
    // ...

    next();
  }
}
