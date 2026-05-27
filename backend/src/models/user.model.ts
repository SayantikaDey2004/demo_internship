import mongoose from "mongoose";
import {IUser} from "../interface/schemas/user.interface";
import { rolesType } from "../@types/types/roles.type";

const roles: rolesType[] = ["admin", "user"];
const userSchema = new mongoose.Schema<IUser>({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, required: true}
}, {timestamps: true});

const UserModel = mongoose.model<IUser>("User", userSchema);
export default UserModel;