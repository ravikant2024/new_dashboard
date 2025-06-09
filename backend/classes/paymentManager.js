// paymentManager.js
const ICICI = require("icici-dev");

const Credentails=require('../constants/config')
class PaymentManager {
  // Single static ICICI instance for all methods
  static icici = new ICICI();

  // Initiate a payment request
  static  initiatePayment({
    txnRefNo, merchantId, terminalId, currency, amount, orderInfo, email,
    firstName, lastName, city, state, street, zip, phone,returnUrl, udf = {}
  }) {
    return  PaymentManager.icici.initiate({
      encKey: Credentails.payemntCredentials.ENC_KEY,
      saltKey: Credentails.payemntCredentials.SECURE_SECRET,
      returnURL:returnUrl,
      bankId: Credentails.payemntCredentials.BANKID,
      passCode: Credentails.payemntCredentials.PASSCODE,
      mcc: Credentails.payemntCredentials.MCC,
      txnRefNo,
      merchantId,
      terminalId,
      currency,
      amount,
      orderInfo,
      email,
      firstName,
      lastName,
      city,
      state,
      street,
      zip,
      phone,
    //   UDF01: udf.udf1,
    //   UDF02: udf.udf2,
    });
  }

  // Check the payment response
  static async checkPaymentResponse(paymentResponse) {
    console.log("payment response is ",paymentResponse);
    return  PaymentManager.icici.checkResponse({
      encKey: Credentails.payemntCredentials.ENC_KEY,
      saltKey:  Credentails.payemntCredentials.SECURE_SECRET,
      paymentResponse:JSON.stringify(paymentResponse),
    });
  }

  // Get payment status
  static async getPaymentStatus({ txnRefNo, merchantId, terminalId }) {
    return await PaymentManager.icici.getPaymentStatus({
      encKey: ENC_KEY,
      saltKey: SECURE_SECRET,
      bankId: BANKID,
      passCode: PASSCODE,
      txnRefNo,
      merchantId,
      terminalId,
    });
  }

  // Initiate a refund request
  static async initiateRefund({ txnRefNo, merchantId, terminalId, refundAmount, retRefNo }) {
    return await PaymentManager.icici.initiateRefund({
      encKey: ENC_KEY,
      saltKey: SECURE_SECRET,
      bankId: BANKID,
      passCode: PASSCODE,
      txnRefNo,
      merchantId,
      terminalId,
      refundAmount,
      retRefNo,
    });
  }

  // Get refund status
  static async getRefundStatus({ txnRefNo, merchantId, terminalId, refCancelId }) {
    return await PaymentManager.icici.getRefundStatus({
      encKey: ENC_KEY,
      saltKey: SECURE_SECRET,
      bankId: BANKID,
      passCode: PASSCODE,
      txnRefNo,
      merchantId,
      terminalId,
      refCancelId,
    });
  }
}

module.exports = PaymentManager;
