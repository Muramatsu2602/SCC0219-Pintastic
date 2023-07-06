const jwt = require('jsonwebtoken');

const PintasticException = require("../models/exceptions/PinstaticException");

class AuthMiddleware {
  static async isAdmin(request, response, next) {
    try {
      const bearerToken = request.headers.authorization;

      const { clientType, clientId } = AuthMiddleware.#getBearerTokenData(bearerToken);

      if(clientType != 'Admin') {
        throw new PintasticException('Invalid access token', 401, 'Permission denied');
      }

      request.headers.clientId = clientId;

      next();
    } catch (error) {
      next(error);
    }
  }

  static #getBearerTokenData(bearerToken) {
    try {
      const accessToken = bearerToken.substring(7, bearerToken.length);
      
      return jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    } catch (error) {
      throw new PintasticException('Invalid access token', 401, 'Permission denied');
    }
  }
}

module.exports = AuthMiddleware;
