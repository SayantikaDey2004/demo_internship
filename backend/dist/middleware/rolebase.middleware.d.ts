import { Request, Response, NextFunction } from "express";
export declare const roleMiddleware: (role: string) => (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=rolebase.middleware.d.ts.map