const { User, Book, Bookmark } = require('../models/index')
const _ = require('lodash')
const dayjs = require('dayjs')
const dateNow = dayjs()

class bookLibrary {
  static async bookData(req, res, next) {
    try {
      const dataBook = await Book.findAll({
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        },
      })

      console.log(dataBook)

      res.status(200).json({
        statuscode: 200,
        data: dataBook,
      })
    } catch (err) {
      next(err)
    }
  }

  static async history(req, res, next) {
    try {
      const { id } = req.user

      console.log(id, ' ini data id user')
      const dataHistory = await Bookmark.findAll({
        include: [{ model: Book }, { model: User }],
        where: { UserId: id },
      })
      console.log(dataHistory, 'Ini data History')

      res.status(200).json({
        statuscode: 200,
        data: dataHistory,
      })
    } catch (err) {
      next(err)
    }
  }

  static async addBook(req, res, next) {
    try {
      const { title, author } = req.body
      let input = {
        title,
        author,
      }

      // console.log(input ,"ini data input buat buku")

      const dataBuku = await Book.create(input)

      res.status(201).json({
        message: `Ini buku baru berjudul ${input.title}`,
      })
    } catch (err) {
      next(err)
    }
  }

  static async borrowBook(req, res, next) {
    try {
      const { id } = req.params
      const { id: userId } = req.user
      const { rentSeveralDay } = req.body

      const numberRent = _.toNumber(rentSeveralDay)

      console.log(id, userId, 'ini data yang dipakai', typeof numberRent)

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

      let hariIni = dateNow.format('YYYY-MM-DD')
      let baruBsk = dateNow.add(numberRent, 'd').format('YYYY-MM-DD')
      console.log(baruBsk, hariIni)
      // console.log(dateNow,b,"tanggal hari ini dan 7 hari")

      let input = {
        UserId: userId,
        BookId: id,
        dateTime: hariIni,
        status: 'Borrowed',
      }

      console.log(input, 'ini data input')

      await Bookmark.create(input)
      const dataUpdateUser = await User.update(
        {
          deadLine: baruBsk,
        },
        {
          where: {
            id: userId,
          },
        },
      )
      // console.log(dataUpdateUser,"ini data Update")

      res.status(201).json({
        message: 'Berhasil Meminjam Buku di perpustakaan',
      })
    } catch (err) {
      next(err)
    }
  }

  static async returnBook(req, res, next) {
    try {
      const { id } = req.params
      const { id: userId } = req.user
      // const {rentSeveralDay} = req.body;

      console.log(id, 'ini databuku', userId, 'ini data di Return')

      let hariIni = dateNow.format('YYYY-MM-DD')

      let findUserBook = await Book.findOne({
        where: {
          id: id,
        },
      })

      // console.log(findUserBook,"Ini dataUserBook")

      if (!findUserBook) {
        throw { name: 'Not Found The Book' }
      }

      await Bookmark.update(
        {
          dateTime: hariIni,
          status: 'Return',
        },
        {
          where: {
            UserId: userId,
            BookId: id,
          },
        },
      )
      res.status(200).json({ message: `Terimakasih Buku sudah dikembalikan` })
    } catch (err) {
      next(err)
    }
  }

  static async listDataReturn(req, res, next) {
    try {
      const { id: userId } = req.user

      const dataReturn = await Bookmark.findAll({
        where: {
          UserId: userId,
        },
      })

      res.status(200).json({
        statuscode: 200,
        data: dataReturn,
      })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = { bookLibrary }
