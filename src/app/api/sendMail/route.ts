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
    const emailUser = process.env.EMAIL_USER || "info@bonzuttner.jp";
    const clientId = process.env.CLIENT_ID || "144250206382-nkbg67php77ok8t3q31vbsd6mcvkhobe.apps.googleusercontent.com";
    const clientSecret = process.env.CLIENT_SECRET || "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";
    const refreshToken = process.env.REFRESH_TOKEN;

    let transporter;

    if (clientSecret && refreshToken) {
      // Google Workspace OAuth 2.0
      transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          type: "OAuth2",
          user: emailUser,
          clientId: clientId,
          clientSecret: clientSecret,
          refreshToken: refreshToken,
        },
      });
    } else {
      // Fallback to standard SMTP
      transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST || "sv10880.xserver.jp",
        port: Number(process.env.EMAIL_PORT) || 465,
        secure: process.env.EMAIL_SECURE ? process.env.EMAIL_SECURE === "true" : true,
        auth: {
          user: emailUser,
          pass: process.env.EMAIL_PASSWORD || "Zoho$2025"
        }
      });
    }

    const recipients = (process.env.EMAIL_TO || "maher91syr@gmail.com,info@bonzuttner.com,maher91syr@bonzuttner.com")
      .split(",")
      .map(s => s.trim())
      .filter(Boolean);

    const mailOptions = {
      from: process.env.EMAIL_FROM || emailUser,
      to: recipients,
      replyTo: email,
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
      await transporter.sendMail(mailOptions);
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
