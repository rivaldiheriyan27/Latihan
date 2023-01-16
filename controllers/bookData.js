const {User, Book,Bookmark} = require("../models/index");
const _ = require('lodash'); 


class bookLibrary{
    static async bookData(req,res,next){
        try{

            const dataBook = await Book.findAll({
                attributes:{
                    exclude: ["createdAt", "updatedAt"]
                }
            })

            console.log(dataBook)

            res.status(200).json({
                statuscode:200,
                data:dataBook
            })
        }catch(err){
            next(err)
        }
    }

    static async history(req,res,next){
        try{
            const {id} = req.user

            console.log(id," ini data id user")
            const dataHistory = await Bookmark.findAll({
               include:[{model:Book}, {model:User}],
               where:{UserId:id}
            })
            console.log(dataHistory, "Ini data History")

            res.status(200).json({
                statuscode:200,
                data:dataHistory
            })
        }catch(err){
            next(err)
        }
    }

    static async addBook(req,res,next){
        try{

            const {title, author} = req.body;
            let input = {
                title,
                author
            }

            // console.log(input ,"ini data input buat buku")
            
            const dataBuku = await Book.create(input)

            res.status(201).json({
                message:`Ini buku baru berjudul ${input.title}`
            })
        }catch(err){
            next(err)
        }
    }

    static async borrowBook(req,res,next) {
        try{
            const{ id } = req.params;
            const{id:userId} = req.user;
            const {rentSeveralDay} = req.body; 

            console.log(id,userId,"ini data yang dipakai")

            // const dataBookmark = await Bookmark.findAll({
            //     include :
            //     [
            //         {
            //             model:Book,
            //             attributes:{
            //                 exclude:["createdAt", "updatedAt"]
            //             }
            //         },
            //         {
            //             model:User,
            //             attributes:{

            //                 exclude:["createdAt", "updatedAt"]
            //             },
            //         }
            //     ]
            // })
            // console.log( dataBookmark,  "ini dataBook")

            let dateNow = new Date()
            console.log(dateNow)
            let dataBaru = _.split(dateNow,"T")
            console.l
            
            let input = {
                UserId:userId,
                BookId:id,
                dateTime:dataBaru[0],
                status:"Borrowed",
            }
            // var data = "2023-01-16T04:23:50.947Z"
            // console.log(_.split(input.dateTime,"T"))

            console.log(input, "ini data input")

         
            
            
            
            // res.status(201).json({
            //     message:"berhasil meminjam"
            // })
        }catch(err){
            next(err)
        }
    }
}

module.exports = {bookLibrary}