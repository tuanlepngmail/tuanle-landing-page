import OpenAI from "openai";
import { NextResponse } from "next/server";
import { google } from "googleapis";

// Removing edge runtime to confidently support ‘googleapis’ (Node.js library)

const openai = new OpenAI({
  baseURL: "https://9router.vuhai.io.vn/v1",
  apiKey: "sk-4bd27113b7dc78d1-lh6jld-f4f9c69f",
});

// Setup auth for Google Sheets
const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  },
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});
const sheets = google.sheets({ version: "v4", auth });
const SPREADSHEET_ID = "15FFrBeHye-Jz6J_ASPsDtrleIs_rUqDVbEIf182ZHbQ";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid messages array." }, { status: 400 });
    }

    const response = await openai.chat.completions.create({
      model: "ces-chatbot-gpt-5.4",
      messages: messages,
      temperature: 0.7,
      max_tokens: 1500,
    });

    let reply = response.choices[0]?.message?.content || "Xin lỗi, tôi đang bận. Vui lòng thử lại sau.";

    // ----------- XỬ LÝ TRÍCH XUẤT LEAD_DATA -----------
    let leadData: any = null;
    const match = reply.match(/\|\|LEAD_DATA:\s*({[\s\S]*?})\s*\|\|/i);
    
    if (match) {
      try {
        leadData = JSON.parse(match[1]);
        // Bỏ đoạn gài dữ liệu ra khỏi UI
        reply = reply.replace(/\|\|LEAD_DATA:[\s\S]*?\|\|/i, "").trim();
      } catch (e) {
        console.error("Lỗi khi parse LEAD_DATA JSON:", e);
      }
    }

    // ----------- GHI VÀO GOOGLE SHEETS -----------
    if (leadData) {
      // Nối toàn bộ lịch sử tin nhắn để lưu vào cột Conversation
      const conversationHistory = messages.map(m => `${m.role === 'user' ? 'Khách' : 'Bot'}: ${m.content}`).join("\n");
      const endTime = new Date().toISOString(); 
      // Do không có session fix sẵn từ client truyền lên, tạm dùng thời gian hiện tại
      const sessionId = "Web_" + Date.now(); 
      
      try {
        await sheets.spreadsheets.values.append({
          spreadsheetId: SPREADSHEET_ID,
          range: "Conversations!A:J", // Thay đổi sheet range thành Conversations
          valueInputOption: "USER_ENTERED",
          requestBody: {
            values: [
               [
                 "landing-page-chatbot",     // Source
                 sessionId,                  // SessionID
                 endTime,                    // StartTime (Tạm gán bằng EndTime trừ khi bạn gửi StartTime từ Client lên)
                 endTime,                    // EndTime
                 leadData.name || "",        // Name
                 leadData.phone || "",       // Phone
                 leadData.email || "",       // Email
                 leadData.interest || "",    // Interest
                 leadData.intent_level || "",// Intent_Level
                 conversationHistory         // Conversation
               ]
            ]
          }
        });
        console.log("Đã ghi thông tin Lead vào Google Sheets!");
      } catch (e) {
         console.error("Lỗi khi ghi Google Sheets:", e);
      }
    }

    return NextResponse.json({ reply });
  } catch (error: any) {
    console.error("Chat API Error:", error);
    return NextResponse.json({ error: error.message || "Lỗi kết nối AI Bot." }, { status: 500 });
  }
}
