const { PrismaClient } = require('@prisma/client');
const { hash,compare } = require('bcryptjs');
const { sign } = require("jsonwebtoken");
const prisma = new PrismaClient();
const AuthController = require('../controllers/AuthController')

class UsersController{


   async getMealCount(request, response){
       try{
        const authController = new AuthController()
        var a = await authController.canRunRequest(request, response);
           
           const user = await prisma.meal.count({where:{userId:a.user.id}})

           response.json(user)
       }
        catch (err)
         {
            return response.status(409).send()
        }
   }
   
   async getCorrectMealCount(request, response){
    try{
     const authController = new AuthController()
     var a = await authController.canRunRequest(request, response);
        
        const user = await prisma.meal.count({where:{userId:a.user.id,respectingRestriction:true}})

        response.json(user)
    }
     catch (err)
      {
         return response.status(409).send()
     }
}

async getoutMealCount(request, response){
    try{
     const authController = new AuthController()
     var a = await authController.canRunRequest(request, response);
        
        const user = await prisma.meal.count({where:{userId:a.user.id,respectingRestriction:false}})

        response.json(user)
    }
     catch (err)
      {
         return response.status(409).send()
     }
}
}


module.exports = UsersController