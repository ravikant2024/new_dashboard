import React, { useEffect } from "react";

 
const FormSubmitter = ({ gatewayURL, EncData, data }) => {
 
  useEffect(() => {
    document.getElementById("sales-api-form").submit();
  }, []);

  return (
<form
      action={gatewayURL}
      method="post"
      name="server_request"
      id="sales-api-form"
      target="_top"
>
<input type="hidden" name="EncData" id="EncData" value={EncData} />
<input type="hidden" name="MerchantId" id="MerchantId" value={data.MerchantId} />
<input type="hidden" name="BankId" id="BankId" value={data.BankId} />
<input type="hidden" name="TerminalId" id="TerminalId" value={data.TerminalId} />
<input type="hidden" name="Version" id="Version" value={data.Version} />
</form>
  );
};
 
export default FormSubmitter;