const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");


class AuthController{
    
    async me(request, response){
            const auth  = request.headers.authorization;
          
            const [, token] = auth.split(" ");
            if (!token) {
                return response
                .status(403)
                .json({ auth: false, message: "Nenhum token informado." });
            }
            
            try {
                const JWTTokenVerified = jwt.verify(token, process.env.AUTH_SECRET);
                return response.status(200).json(JWTTokenVerified);
            } 
            catch (error) 
            {
              return response.status(401).json({
                message: "Falha ao autenticar o token.",
              });
            }
    }

    async canRunRequest(request, response){
      const auth  = request.headers.authorization;
    
      const [, token] = auth.split(" ");
      if (!token) {
          return response
          .status(403)
          .json({ auth: false, message: "Nenhum token informado." });
      }
      
      try {
          const JWTTokenVerified = jwt.verify(token, process.env.AUTH_SECRET);
          return JWTTokenVerified;
      } 
      catch (error) 
      {
        return response.status(401).json({
          message: "Falha ao autenticar o token.",
        });
      }
}
}

module.exports  = AuthController
