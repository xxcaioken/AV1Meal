const { verify } = require("jsonwebtoken");

function ensureAuthenticated(request, response, next) {
  const auth = request.headers.authorization;

  if (!auth) {
    return response.status(403).json({
      message: "jwt token não informado",
    });
  }

  const [, token] = auth.split(" ");

  try {
    
    request.user = verify(token, process.env.AUTH_SECRET);

    return next();
  
}
 catch (error)
  {
    return response.status(403).json({
      message: "jwt token invalido",
    });
  }
}

module.exports = ensureAuthenticated;