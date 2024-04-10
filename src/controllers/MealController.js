const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const AuthController = require('../controllers/AuthController')



class MealController{

   async create(request, response){

    const authController = new AuthController()
    var a = await authController.canRunRequest(request, response);

        try{
           const { name, date, respectingRestriction } = request.body
           
           const meal = await prisma.meal.create({
               data: {
                name,
                date,
                respectingRestriction,
                userId: a.user.id
               },
           })
      
           response.json(meal)
       }catch (err) {
            console.log(err)
           return response.status(409).send()
       }
   }

    async show(request, response){
    const authController = new AuthController()
    var a = await authController.canRunRequest(request, response);

     try{
         const users = await prisma.meal.findMany({where:{userId: a.user.id}});

         response.json(users)
        
     }catch (err) { 
         return response.status(409).send()
     }
 }

 async showUnique(request, response){
    const authController = new AuthController()
    var a = await authController.canRunRequest(request, response);

     try{
         const users = await prisma.meal.findUnique({where:{userId: a.user.id,id: request.body.id}});

         response.json(users)
        
     }catch (err) { 
         return response.status(409).send()
     }
 }

async update(request, response){
    const authController = new AuthController()
    var a = await authController.canRunRequest(request, response);

    try{
        const { id,name, date, respectingRestriction } = request.body
        console.log(id,name, date, respectingRestriction);
        const mealtoupdate = prisma.meal.findUnique({
            where: {
                id: id,
                userId: a.user.id
            }
        })

        prisma.meal.update({
            where: {
                id: id,
                userId: a.user.id
            },
            data: {
                name : name != undefined ? name: mealtoupdate.name,
                date,
                respectingRestriction,
            },
        });

        return response.status(200).send()

    }catch (err) { 
        return response.status(409).send()
    }

}

async delete(request, response){
    const authController = new AuthController()
    var a = await authController.canRunRequest(request, response);

    try{
        const { id } = request.body

        await prisma.meal.delete({
            where: {
                id: id,
                userId: a.user.id
            },
        })

        return response.status(200).send()

    }catch (err) { 
        return response.status(409).send()
    }

}
}



module.exports = MealController