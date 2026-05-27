import mongoose from "mongoose";
import { IForm } from "../interface/schemas/form.interface";
declare const FormModel: mongoose.Model<IForm, {}, {}, {}, mongoose.Document<unknown, {}, IForm, {}, {}> & IForm & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>;
export default FormModel;
//# sourceMappingURL=form.model.d.ts.map