import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  const { orderId, amount } = await req.json();

  const xmlBody = `
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                   xmlns:xsd="http://www.w3.org/2001/XMLSchema"
                   xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <SalePaymentRequest xmlns="http://tempuri.org/">
          <LoginAccount>${process.env.PEC_LOGIN_ACCOUNT}</LoginAccount>
          <Amount>${amount}</Amount>
          <OrderId>${orderId}</OrderId>
          <CallBackUrl>${process.env.NEXT_PUBLIC_CALLBACK_URL}</CallBackUrl>
          <AdditionalData></AdditionalData>
        </SalePaymentRequest>
      </soap:Body>
    </soap:Envelope>
  `;

  try {
    const { data } = await axios.post(
      "https://pec.shaparak.ir/NewIPGServices/Sale/SaleService.asmx",
      xmlBody,
      {
        headers: {
          "Content-Type": "text/xml; charset=utf-8",
          SOAPAction: "http://tempuri.org/SalePaymentRequest",
        },
      }
    );

    return NextResponse.json({ data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
