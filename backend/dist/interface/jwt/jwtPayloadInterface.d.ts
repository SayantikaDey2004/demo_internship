import mongoose from "mongoose";
import { rolesType } from "../../@types/types/roles.type";
export interface IJWTPayload {
    _id: mongoose.Types.ObjectId;
    faculty_id: string;
    role: rolesType;
}
//# sourceMappingURL=jwtPayloadInterface.d.ts.map