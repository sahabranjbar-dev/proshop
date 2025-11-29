import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  const { token } = await req.json();

  const xmlBody = `
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                   xmlns:xsd="http://www.w3.org/2001/XMLSchema"
                   xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <ConfirmPayment xmlns="http://tempuri.org/">
          <LoginAccount>${process.env.PEC_LOGIN_ACCOUNT}</LoginAccount>
          <Token>${token}</Token>
        </ConfirmPayment>
      </soap:Body>
    </soap:Envelope>
  `;

  try {
    const { data } = await axios.post(
      "https://pec.shaparak.ir/NewIPGServices/Confirm/ConfirmService.asmx",
      xmlBody,
      {
        headers: {
          "Content-Type": "text/xml; charset=utf-8",
          SOAPAction: "http://tempuri.org/ConfirmPayment",
        },
      }
    );

    // برگشت پاسخ کامل به فرانت
    return NextResponse.json({ data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
