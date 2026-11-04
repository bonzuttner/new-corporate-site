import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

// Load existing .env
const envPath = path.resolve(process.cwd(), ".env");
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
}

const CLIENT_ID = process.env.CLIENT_ID || "144250206382-nkbg67php77ok8t3q31vbsd6mcvkhobe.apps.googleusercontent.com";
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const EMAIL_USER = process.env.EMAIL_USER || "info@bonzuttner.jp";
const PORT = 8080;
const REDIRECT_URI = `http://localhost:${PORT}/callback`;

if (!CLIENT_SECRET) {
  console.error("❌ CLIENT_SECRET is not set in .env. Please set CLIENT_SECRET before running this script.");
  process.exit(1);
}

// Check if user passed token directly via argument: --token <REFRESH_TOKEN>
const tokenArgIndex = process.argv.indexOf("--token");
if (tokenArgIndex !== -1 && process.argv[tokenArgIndex + 1]) {
  const manualToken = process.argv[tokenArgIndex + 1].trim();
  saveTokenAndTest(manualToken);
} else {
  startOAuthServer();
}

function updateEnvFile(refreshToken) {
  let content = fs.existsSync(envPath) ? fs.readFileSync(envPath, "utf-8") : "";
  if (content.includes("REFRESH_TOKEN=")) {
    content = content.replace(/REFRESH_TOKEN=.*/, `REFRESH_TOKEN=${refreshToken}`);
  } else {
    content += `\nREFRESH_TOKEN=${refreshToken}\n`;
  }
  fs.writeFileSync(envPath, content, "utf-8");
  console.log("✅ Saved REFRESH_TOKEN to .env");
}

async function verifyAndSendTestEmail(refreshToken) {
  console.log("\n📧 Testing email transmission with Google Workspace OAuth 2.0...");
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: EMAIL_USER,
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      refreshToken: refreshToken,
    },
  });

  try {
    await transporter.verify();
    console.log("✅ OAuth 2.0 connection verified successfully!");

    const testInfo = await transporter.sendMail({
      from: EMAIL_USER,
      to: [EMAIL_USER, "maher91syr@gmail.com"],
      subject: "【Test】Google Workspace OAuth 2.0 Configuration Test",
      text: "Congratulations! Google Workspace OAuth 2.0 sending has been successfully configured and tested.",
    });

    console.log("🎉 Test email successfully sent! Message ID:", testInfo.messageId);
    return true;
  } catch (err) {
    console.error("❌ Failed to send test email:", err.message);
    return false;
  }
}

async function saveTokenAndTest(refreshToken) {
  updateEnvFile(refreshToken);
  await verifyAndSendTestEmail(refreshToken);
  process.exit(0);
}

function startOAuthServer() {
  const authUrl =
    "https://accounts.google.com/o/oauth2/v2/auth?" +
    new URLSearchParams({
      client_id: CLIENT_ID,
      redirect_uri: REDIRECT_URI,
      response_type: "code",
      scope: "https://mail.google.com/",
      access_type: "offline",
      prompt: "consent",
    }).toString();

  const server = http.createServer(async (req, res) => {
    const reqUrl = new URL(req.url, `http://localhost:${PORT}`);

    if (reqUrl.pathname === "/callback") {
      const code = reqUrl.searchParams.get("code");
      const error = reqUrl.searchParams.get("error");

      if (error) {
        res.writeHead(400, { "Content-Type": "text/html; charset=utf-8" });
        res.end(`<h2>Authorization Error</h2><p>${error}</p>`);
        console.error("❌ Authorization error from Google:", error);
        return;
      }

      if (!code) {
        res.writeHead(400, { "Content-Type": "text/html; charset=utf-8" });
        res.end(`<h2>No Code Received</h2>`);
        return;
      }

      try {
        console.log("🔄 Exchanging authorization code for tokens...");
        const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            code: code,
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            redirect_uri: REDIRECT_URI,
            grant_type: "authorization_code",
          }),
        });

        const tokenData = await tokenResponse.json();

        if (tokenData.error) {
          throw new Error(`${tokenData.error}: ${tokenData.error_description || ""}`);
        }

        const refreshToken = tokenData.refresh_token;

        if (!refreshToken) {
          res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
          res.end(`
            <h2>Warning: No refresh token returned.</h2>
            <p>Google only returns a refresh token on the first authorization or when prompt=consent is used.</p>
            <p>Please revoke application access or try again with prompt=consent.</p>
          `);
          console.warn("⚠️ No refresh token in response:", tokenData);
          return;
        }

        updateEnvFile(refreshToken);

        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.end(`
          <div style="font-family: sans-serif; text-align: center; padding: 50px;">
            <h1 style="color: #10b981;">🎉 OAuth 2.0 Setup Successful!</h1>
            <p>The refresh token has been received and saved to your <code>.env</code> file.</p>
            <p>Check your terminal for test email verification.</p>
          </div>
        `);

        console.log("\n🔑 Obtained REFRESH_TOKEN:", refreshToken);
        await verifyAndSendTestEmail(refreshToken);
        server.close();
        process.exit(0);
      } catch (err) {
        res.writeHead(500, { "Content-Type": "text/html; charset=utf-8" });
        res.end(`<h2>Token Exchange Failed</h2><p>${err.message}</p>`);
        console.error("❌ Token exchange error:", err.message);
      }
    } else {
      res.writeHead(404);
      res.end("Not Found");
    }
  });

  server.listen(PORT, () => {
    console.log("===============================================================");
    console.log("  Google Workspace OAuth 2.0 Token Setup");
    console.log("===============================================================");
    console.log(`\n1. IMPORTANT: In Google Cloud Console (Project: email-service-sender-513607):`);
    console.log(`   Ensure you have added this Authorized Redirect URI:`);
    console.log(`   👉 ${REDIRECT_URI}`);
    console.log(`\n2. Open this URL in your browser to authorize sending as ${EMAIL_USER}:`);
    console.log(`   👉 ${authUrl}`);
    console.log(`\n3. After authorization, the script will automatically:`);
    console.log(`   - Capture the code`);
    console.log(`   - Save REFRESH_TOKEN to .env`);
    console.log(`   - Send a verification test email`);
    console.log("===============================================================\n");
  });
}
