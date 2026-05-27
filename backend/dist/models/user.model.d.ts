import mongoose from "mongoose";
import { IUser } from "../interface/schemas/user.interface";
declare const UserModel: mongoose.Model<IUser, {}, {}, {}, mongoose.Document<unknown, {}, IUser, {}, {}> & IUser & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>;
export default UserModel;
//# sourceMappingURL=user.model.d.ts.map