import User from "../models/UserModel.js";
import bcrypt from 'bcryptjs'



export const createAdminAccount=async()=>{
    try {
        const existingAdmin=await User.findOne({email:'Admintest@gmail.com'})
        if(!existingAdmin){
        const hashedPassword = await bcrypt.hash('password', 10);
         const createAdmin= new User({
                username:'Admin',
                email:'Admintest@gmail.com',
                password:hashedPassword,
                role:'admin'
            })
           await createAdmin.save();
            console.log('Admin account created Successfully')
        }
        else{
            console.log('Admin account already exists')
        }
    } catch (error) {
        
        console.log(error)
    }
}