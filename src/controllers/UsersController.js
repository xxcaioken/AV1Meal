const { PrismaClient } = require('@prisma/client');
const { hash,compare } = require('bcryptjs');
const { sign } = require("jsonwebtoken");
const prisma = new PrismaClient();

class UsersController{


   async create(request, response){
       try{
           const { name, email, password  } = request.body
            console.log(name, email, password);
            const hashedPassword = await hash(password, 8)

           const user = await prisma.user.create({
               data: {
                   name,
                   email,
                   password: hashedPassword
               },
           })

           response.json(user)
       }
        catch (err)
         {
            return response.status(409).send()
        }
   }
   
   async login(request, response) {
    try {
      const { email, password } = request.body;

      const user = await prisma.user.findUnique({
        where: { email },
      });
      if (!user) {
        return response
          .status(403)
          .json({ message: "senha ou email incorreto" });
      }

      const passwordMatched = await compare(password, user.password);
      if (!passwordMatched) {
        return response
          .status(403)
          .json({ message: "senha ou email incorreto" });
      }

      const token = sign({ user }, process.env.AUTH_SECRET, {
        expiresIn: 86400, // expira em 24 horas
      });

      response.json({ token });
    } catch (err) {
      return response.status(409).json();
    }
  }

//    async show(request, response){
//         try{
//             const users = await prisma.user.findMany();

//             response.json(users)
            
//         }catch (err) { 
//             return response.status(409).send()
//         }
//     }

//     async update(request, response){
//         try{
            
//             const { name, email } = request.body
//             const { id } = request.params
            
//             const result = await prisma.user.update({
//                 where: {
//                     id: id,
//                 },
//                 data: {
//                     name: name,
//                     email: email,
//                 },
//             });

//             return response.status(200).send()

//         }catch (err) { 
//             return response.status(409).send()
//         }

//     }

//     async delete(request, response){
        
//         try{
//             const { id } = request.params
//             //const { id } = request.body
//             console.log(`id: ${id}`)

        
//             const deleteUser = await prisma.user.delete({
//                 where: {
//                     id: id,
//                 },
//             })

//             return response.status(200).send()

//         }catch (err) { 
//             return response.status(409).send()
//         }
//     }
}


module.exports = UsersController