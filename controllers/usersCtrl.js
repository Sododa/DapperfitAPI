import status from "statuses";
import User from "../model/User.js";
import asynchandler from "express-async-handler";
import bcrypt from  "bcryptjs";
import generateToken from "../utils/generateToken.js";
import { getTokenFromHeader } from "../utils/getTokenFromHeader.js";
import { verifyToken } from "../utils/verifyToken.js";

// registration users description
// registartion POST /api/v1/users/register
// access private and admin

export const registerUserCtrl =asynchandler( async (req, res) => {
    const {fullname, email, password} = req.body
    // check if the user exists
    const UserExists = await User.findOne({ email });
    if(UserExists) {
       
        throw new Error("User already exists");
    }
    // hash password
    // the gensalt is number of digits for password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    //if not create a user
    const user = await User.create({
        fullname,
        email,
        password: hashedPassword,
    });
    return res.status(201).json({
        status:"success",
        message: "User registered Successfully",
        data: user
    });
});

// user login description
// post api /api/v1/users/login
// access login will be public
export const loginUserCtrl = asynchandler(async (req, res) => {
    const{email, password} = req.body;
    //find the user in db email only
       //first find user in the db by the email and
       const UserFound = await User.findOne({email,
       });
       if(UserFound && (await bcrypt.compare(password, UserFound?.password))) {
        res.json({
            status: "success",
            msg: "Login succesfull",
            UserFound,
            token: generateToken(UserFound?._id),
        });
       } else {
        throw new Error("Invalid login credentials");
        
       }
    });
    // description get users profile
    // route GET /api/v1/users/profile
    // access  private
      // find the user
    export const getUserProfileCtrl = asynchandler(async (req, res) => {
     
      // populate id into real objects of the order
      const user = await User.findById(req.userAuthId).populate("orders");
      res.json({
        status: 'Success',
        Message: "User Profile",
        user,
      });
        });
    //update shipping Adress
    // Put /api/v1/users/update/shipping
    // acess private
    export const updateShippingAddressCtrl = asynchandler(async(req, res)=>{
            const{FirstName, LastName, Address,PostalCode, Province, Country, City, PhoneNumber} = req.body;
            const user = await User.findByIdAndUpdate(req.userAuthId, {
                ShippingAddress:{
                    FirstName,
                    LastName,
                    Address,
                    PostalCode,
                    Province,
                    Country,
                    City,
                    PhoneNumber,
                },
                hasShippingAddress: true,
            },
            {
                new : true,
            },

        );
        res.json({
            status: "success",
            message: "User shipping address added ",
            user,
        });
    }); 