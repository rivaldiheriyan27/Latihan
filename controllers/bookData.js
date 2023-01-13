const {User, Book,Bookmark} = require("../models/index");


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
            

            const dataHistory = await Bookmark.findAll({
                where
            })

        }catch(err){

        }
    }

    static async addBook(req,res,next){
        try{

            const {title, author} = req.body;
            let input = {
                title,
                author
            }

            console.log(input ,"ini data input buat buku")
            
            const dataBuku = await Book.create(input)

            res.status(201).json({
                message:`Ini buku baru berjudul ${input.title}`
            })
        }catch(err){
            next(err)
        }
    }
}

module.exports = {bookLibrary}