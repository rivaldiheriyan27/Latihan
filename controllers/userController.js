const {User, Book,Bookmark} = require("../models/index");
const {compareHash} = require("../helpers/hashPassword")


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
            
            res.status(201).json({
            message: `new user with email ${dataInputRegister.email} has been successfully registered`,
            });
        }catch(err){
            console.log(err, "dataKalah")
        }
    }

    static async login(req,res,next){
        try{
            const {email, password} = req.body;
            const user = await User.findOne({
                where:{email}
            });

            if(!user) {
                throw {name :"Unauthorized"};
            }





        }catch(err){

        }
    }
}

module.exports = {userController,}