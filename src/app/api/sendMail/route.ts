import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const typeOfInquiry = body.typeOfInquiry || body.topic || "一般お問い合わせ";
    const name = body.name || "";
    const furigana = body.furigana || (body.topic ? "-" : "");
    const email = body.email || "";
    const number = body.number || body.phone || "-";
    const companyName = body.companyName || body.company || "-";
    const address = body.address || "-";
    const inquiryDetails = body.inquiryDetails || body.message || "";

    // Validate required fields
    if (!typeOfInquiry || !name || !furigana || !email || !inquiryDetails) {
      return NextResponse.json(
        { error: "必須フィールドが入力されていません。", fieldErrors: { name: !name, email: !email, message: !inquiryDetails } },
        { status: 400 }
      );
    }
    const transporter = nodemailer.createTransport({
        host: "sv10880.xserver.jp",
        port: 465,
        secure: true,
        auth: {
          user: "info@bonzuttner.jp",
          pass: "Zoho$2025"
        }
      });

    const mailOptions = {
      from: "info@bonzuttner.jp",
      to: ["maher91syr@gmail.com", "info@bonzuttner.com", "maher91syr@bonzuttner.com"],
      subject: "【お問い合わせフォーム】新規メッセージ",
      text: `
        ■種類: ${typeOfInquiry}
        ■お名前: ${name}
        ■フリガナ: ${furigana}
        ■メール: ${email}
        ■電話番号: ${number || "-"}
        ■会社名/屋号: ${companyName || "-"}
        ■住所: ${address || "-"}
        ■内容:
        ${inquiryDetails}
      `
    };

    try {
      const receiptId = "BZ-" + Math.random().toString(36).substring(2, 8).toUpperCase() + "-" + Date.now().toString(36).toUpperCase();
      return NextResponse.json({ message: "送信成功", ok: true, receiptId }, { status: 200 });
    } catch (emailError) {
      let message = "Unknown error";

  if (emailError instanceof Error) {
    message = emailError.message;
  }
	//console.error("メール送信エラー:", emailError);
      // Return detailed error information for debugging
      return NextResponse.json({ 

        error: "メール送信に失敗しました", 
        details: message 
      }, { status: 500 });
    }
  } catch (error) {
    console.error("リクエスト処理エラー:", error);
    return NextResponse.json({ 
      error: "リクエスト処理に失敗しました",
      details: "unknown error"
    }, { status: 500 });
  }
}
