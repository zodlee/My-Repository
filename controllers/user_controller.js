import asyncHandler from "express-async-handler"
import bcrypt from "bcryptjs"
import { generateToken } from "../utilities/generate_token.js"
import User from "../models/user.js"

export const user_signup = asyncHandler(async(req, res) => {
    const { firstName , 
         middleName , 
         lastName , 
         age , 
          gender , 
          phoneNumber , 
          email , 
          address , 
          password } = req.body
    const userExist = await User.find({$or: [{email: email}, {phoneNumber: phoneNumber}]})

    if(userExist.length > 0){
        throw new Error("user already exists")
    }else {
        const hashedPass = await bcrypt.hash(password, 10)

        const user = await User.create({
            firstName, lastName, phoneNumber, age, password: hashedPass, email, gender, address
        })
        if(user){
            res.status(201).json({
                status: "ok" ,
                message: "user created successfully" ,
                data: {
                    _id:user._id,
                    firstName: user.firstName ,
                    lastName: user.lastName ,
                    middleName: user.middleName ,
                    gender: user.gender ,
                    password: user.password ,
                    email: user.email ,
                    age: user.age , 
                    phoneNumber: user.phoneNumber ,
                    address: user.address ,
                    token : generateToken(user._id)
                }
            })
        }else {
            res.status(400).json({
                message:"user not found"
            })
        }
    }
})

export const user_signin = asyncHandler(async(req, res) => {
    const{email, password} = req.body
    const user = await User.findOne({email})
    if (!user || !bcrypt.compareSync(password, user.password)){
       res.json({error: "Email or password is incorrect"})
     
    }else{
       res.json({
          status: "ok",
          message: "login successful",
          data: {
                _id:user._id,
                firstName: user.firstName ,
                lastName: user.lastName ,
                middleName: user.middleName ,
                gender: user.gender ,
                password: user.password ,
                email: user.email ,
                age: user.age , 
                phoneNumber: user.phoneNumber ,
                address: user.address ,
                token : generateToken(user._id)
            }
        })
    }

})

export const get_all_users = asyncHandler(async(req, res) => {
    const users = await User.find({})
    res.json({
        status: "ok",
        message: "All users retrieved",
        data: users 
    })
})

export const get_single_user = asyncHandler(async(req, res) => {
    const user = await User.findOne({_id: req.params.id})
    if(user){
       res.json({
        status: "ok",
        message: "User gotten",
        data: user
       })
    }
})

export const update_single_user = asyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id)
    const { firstName , 
        middleName , 
        lastName , 
        age , 
         gender , 
         phoneNumber , 
         email , 
         address , 
         password } = req.body
         if(user){
            user.firstName = firstName || user.firstName
            user.middleName = middleName || user.middleName
            user.lastName = lastName || user.lastName
            user.age = age || user.age
            user.gender = gender || user.gender
            user.phoneNumber = phoneNumber || user.phoneNumber
            user.email = email || user.email
            user.address = address || user.address

            const updatedUser = await user.save()

         if(updatedUser){
            res.status(201).json({
                status: "ok",
                message: "User updated successfully",
                data: updatedUser
            })
        }else{
            res.json({message: "something went wrong"})
        }
    }else{
        res.json({error:"User does not exist"})        
         
        }
})

export const delete_single_userr = asyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id)
    if(user){
        res.json({
            status: "ok",
            message: "User deleted successfully"
        })
    }else{
        res.json({message: "User not found"})
    }
})