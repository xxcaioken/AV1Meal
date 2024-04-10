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


    async getLongestStreak(request, response) {
    try {
        const authController = new AuthController();
        var a = await authController.canRunRequest(request, response);
        
        const meals = await prisma.meal.findMany({
            where: {
                userId: a.user.id,
                respectingRestriction: true
            },
            orderBy: {
                date: 'asc'
            }
        });

        let maxStreak = 0, currentStreak = 0, currentDate = null;

        for (let meal of meals) {
            if (currentDate === null) {
                currentDate = meal.date;
                currentStreak = 1;
            } else {
                let nextDate = new Date(currentDate);
                nextDate.setDate(nextDate.getDate() + 1);

                if (meal.date.getTime() === nextDate.getTime()) {
                    currentStreak++;
                } else if (meal.date.getTime() > nextDate.getTime()) {
                    currentStreak = 1;
                }

                currentDate = meal.date;
            }

            if (currentStreak > maxStreak) {
                maxStreak = currentStreak;
            }
        }

        response.json(maxStreak);
    } catch (err) {
        return response.status(409).send();
    }
}

}


module.exports = UsersController