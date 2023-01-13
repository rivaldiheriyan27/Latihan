const {User, Book,Bookmark} = require("../models/index");
const {compareHash,hashPassword} = require("../helpers/hashPassword")
const {signatureJwt,verifyJwt, secretKey} = require("../helpers/jwt")


class userController{
    static async register(req,res,next){
        try{
            const {email, password,phoneNumber} = req.body
            let dataInputRegister = await User.create({
                email, 
                password,
                phoneNumber: `0${phoneNumber}` ,
                deadLine : new Date()
            })

            const idToken = {
                id: dataInputRegister.id
            }

            let token = signatureJwt(idToken,secretKey)
            
            res.status(201).json({
            statusCode:201,
            data:{
                message: `new user with email ${dataInputRegister.email} has been successfully registered`,
                accesToken:token
            }
            });
        }catch(err){
            console.log(err)
            next(err)
        }
    }

    static async login(req,res,next){
        try{
            const {email, password} = req.body;
            const user = await User.findOne({
                where:{
                    email:email,
                }
            });

            console.log(user)

            if (!user) {
                throw new Error("Email or Password is invalid");
            }

            const validatePassword = compareHash(
                password,
                user.password
            )

            if (!validatePassword) {
                throw new Error(`Email or Password is invalid`);
            }

            const payload = {
                id: user.id,
            };

            const token = signatureJwt(payload,secretKey);

            res.status(200).json({
                statusCode:200,
                data:{
                    accesToken:token,
                    email:user.email
                }
            })
        }catch(err){
            next(err)
        }
    }
}

module.exports = {userController,}