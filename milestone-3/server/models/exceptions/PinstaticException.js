class PintasticException extends Error {
  httpStatusCode;
  businessError;
  constructor(message, httpStatusCode, businessError) {
    super(message);
    this.httpStatusCode = httpStatusCode;
    this.businessError = businessError;

    Object.setPrototypeOf(this, PintasticException.prototype);
  }

  getBusinessError() {
    return this.businessError;
  }

  getHttpStatusCode() {
    return this.httpStatusCode;
  }
}

module.exports = PintasticException;
