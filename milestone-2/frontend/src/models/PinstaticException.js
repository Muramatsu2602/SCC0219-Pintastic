class PintasticException extends Error {
  businessMessage;
  constructor(message, businessMessage) {
    super(message);
    this.businessMessage = businessMessage;

    Object.setPrototypeOf(this, PintasticException.prototype);
  }

  getBusinessMessage() {
    return this.businessMessage;
  }
}

export default PintasticException;
