/**
 * @class ResponseFormater
 * @description Helper class to format response
 * @author Imron Reviady
 * @version 1.0.0
 * @since 17 Oktober 2021
 */

class ResponseFormater {
  constructor(status, message, data) {
    this.status = status;
    this.message = message;
    this.data = data;
  }

  getResponse() {
    return {
      status: this.status,
      message: this.message,
      data: this.data,
    };
  }

  sendResponse(res) {
    res.status(this.status);
    res.json(this.getResponse());
  }
}

module.exports = ResponseFormater;
