import mongoose,{Schema,model} from 'mongoose';
import bcrypt from 'bcrypt';
import { unique } from 'next/dist/build/utils';
export interface IUser {
    _id?: mongoose.Types.ObjectId;
    name: string;
    email: string;
    password: string; 
    createdAt?: Date;
    updatedAt?: Date;  
}   
const userSchema = new Schema<IUser>({
    name:{
        type: String,
        required: true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})
userSchema.pre('save', async function(next) {
    if(this.isModified("password")) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
}); 
const User =mongoose.models.User || model<IUser>("User", userSchema);
export default User;