const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


class UsersController{


   async create(request, response){
       try{
           const { name, email  } = request.body


           const user = await prisma.user.create({
               data: {
                   name,
                   email,
               },
           })


           response.json(user)
       }catch (err) {
           return response.status(409).send()
       }
   }

   async show(request, response){
        try{
            const users = await prisma.user.findMany();

            response.json(users)
            
        }catch (err) { 
            return response.status(409).send()
        }
    }
}


module.exports = UsersController