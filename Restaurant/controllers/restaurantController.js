const {Food, Order, OrderDetail, Table} = require("../models/index");
const { v4: uuidv4 } = require('uuid');

class Restaurant{
    static async listMenu(req,res,next){
        try{
        
        const foods = await Food.findAll({
            attributes:{
                exclude: ["createdAt", "updatedAt"]
            },
            where: {
                deletedAt:null
            }
        })
        res.status(200).json({
            statuscode:200,
            data:foods
        })

        }catch(error){
            next(error)
        }
    }

    static async detaillMenu(req,res,next){
        try{
        const {foodId} = req.params;

        const foodDetail = await Food.findByPk(foodId,{
            attributes:{
                exclude: ["createdAt", "updatedAt"]
            },
            where: {
                deletedAt:null
            }
        })

        if(!foodDetail){
            throw { name: "Food not found" };
        }

        res.status(200).json({
            statuscode:200,
            data:foodDetail
        })
            
        }catch(error){
            next(error)
        }
    }

    static async orderFood(req,res,next){
        // const t = await sequelize.transaction();
        try{
            const {
                orderFood,
                tableNumber,
                quantity
            } = req.body
            let dataUUid = uuidv4();

            console.log("hai dibawah foodOrder",orderFood,tableNumber,quantity)

            // console.log(orderFood,tableNumber,quantity)
            // console.log(tableNumber,"ini data nomor Table")
            const checkTable =  await Table.findOne({
                where:{
                    numberTable : tableNumber,
                    deletedAt : null
                }
            })

            if(!checkTable){
                throw { name : "Table not found"}
            }
            // console.log("hai dibawah checktable")

            const foodOrder = orderFood.map((el) =>{
                // const checkFood = await Food.findByPk(foodOrder.food,{
                //     attributes:{
                //     exclude: ["createdAt", "updatedAt"]
                //     }
                // })

                return {food: el}
            })

            const checkFood = await Food.findAll({
                where:{
                    id:foodOrder.food
                }
            })
            console.log(checkFood)


            // const checkFoodInmap = 

            // const checkFood = await Food.findByPk(foodOrder.food,{
            //     attributes:{
            //         exclude: ["createdAt", "updatedAt"]
            //     }
            // })

            console.log(checkFood)

            // // if(!checkFood){
            // //     throw {name : "Food not found"}
            // // }
            // console.log(dataUUid)

            // const makeoRDER = await Order.create({
            //     tableId: tableNumber,
            //     inVoiceNumber :dataUUid,
            // })

            // console.log("Selamat behrasul")

            // const makeOrderDetail = await OrderDetail.create({
            //     foodId:foodOrder.food

            // })







        }catch(error){
            next(error)

        }
    }
}

module.exports = {Restaurant}