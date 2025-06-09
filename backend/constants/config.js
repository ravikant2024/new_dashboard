class Credentails {
  static vpnserverIp = '192.168.1.4';
  static vpnserverPort = 3000;
  static vpnserverprivatekey = '';
  static vpnserverpublickey = '';
  static natsIp = 'oillp_nats'
  static natsPort = '6969'
  static natstoken = 'oillp-nats';
  static payemntCredentials1 = {

    ENC_KEY: "1FF49170C8CCECFF1345B38F971CABBD",
    SECURE_SECRET: "5FF1003BD85EC13EDDE106AC235F58AD",
    VERSION: "1",
    PASSCODE: "ABCD1234",
    MERCHANTID: "100000000005859",
    TERMINALID: "EG000488",
    BANKID: "24520",
    MCC: "8641",
    GATEWAYURL:
      "https://payuatrbac.icicibank.com/accesspoint/angularBackEnd/requestproxypass",
    REFUNDURL:
      "https://payuatrbac.icicibank.com/accesspoint/v1/24520/createRefundFromMerchantKit",
    STATUSURL:
      "https://payuatrbac.icicibank.com/accesspoint/v1/24520/checkStatusMerchantKit",
    RETURNURL: "http://localhost:3000/check_response",

  };
  static payemntCredentials2 = {

    ENC_KEY: "1FF49170C8CCECFF1345B38F971CABBD",
    SECURE_SECRET: "5FF1003BD85EC13EDDE106AC235F58AD",
    VERSION: "1",
    PASSCODE: "ABCD1234",
    MERCHANTID: "100000000003925",
    TERMINALID: "12545910",
    BANKID: "24520",
    MCC: "8641",
    GATEWAYURL:
      "https://payuatrbac.icicibank.com/accesspoint/angularBackEnd/requestproxypass",
    REFUNDURL:
      "https://payuatrbac.icicibank.com/accesspoint/v1/24520/createRefundFromMerchantKit",
    STATUSURL:
      "https://payuatrbac.icicibank.com/accesspoint/v1/24520/checkStatusMerchantKit",
    RETURNURL: "http://localhost:3000/check_response",

  };
  static payemntCredentials = {
    ENC_KEY: "F30455FFA7B4056BA5F4A0198978A055",
    SECURE_SECRET: "F41D882FB7E91A9768F5E4C71F51D275",
    VERSION: "1",
    PASSCODE: "ZEPB9300",
    MERCHANTID: "100000000096407",
    TERMINALID: "EG002421",
    BANKID: "24520",
    MCC: "5065",
    GATEWAYURL:
      "https://paypg.icicibank.com/accesspoint/angularBackEnd/requestproxypass",
    REFUNDURL:
      "https://paypg.icicibank.com/accesspoint/v1/24520/createRefundFromMerchantKit",
    STATUSURL:
      "https://paypg.icicibank.com/accesspoint/v1/24520/checkStatusMerchantKit",
    RETURNURL: "http://localhost:3000/check_response",
  };
}
module.exports = Credentails;