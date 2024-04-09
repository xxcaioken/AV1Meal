const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


class MealController{

   async create(request, response){
       try{
           const { name, date, respectingRestriction } = request.body
           console.log(name, date, respectingRestriction)
           const user = await prisma.meal.create({
               data: {
                name,
                date,
                respectingRestriction
               },
           })

           response.json(user)
       }catch (err) {
           return response.status(409).send()
       }
   }

//    async show(request, response){
//     try{
//         const users = await prisma.meal.findMany();

//         response.json(users)
        
//     }catch (err) { 
//         return response.status(409).send()
//     }
// }

async update(request, response){
    try{
        
        const { name, email } = request.body
        const { id } = request.params
        
        prisma.meal.update({
            where: {
                id: id,
            },
            data: {
                name: name,
                email: email,
            },
        });

        return response.status(200).send()

    }catch (err) { 
        return response.status(409).send()
    }

}

async delete(request, response){
    
    try{
        const { id } = request.params
        //const { id } = request.body
        console.log(`id: ${id}`)

    
        await prisma.meal.delete({
            where: {
                id: id,
            },
        })

        return response.status(200).send()

    }catch (err) { 
        return response.status(409).send()
    }

}
}



module.exports = MealController