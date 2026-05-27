import mongoose  from "mongoose";
import { IForm } from "../interface/schemas/form.interface";
const formSchema = new mongoose.Schema<IForm>({
    title: {type: String, required: true},
    email: {type: String, required: true},
    message: {type: String, required: true},
}, {timestamps: true})

const FormModel = mongoose.model<IForm>("Form", formSchema);
export default FormModel;