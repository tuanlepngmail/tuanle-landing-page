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
    const { messages, sessionId } = await req.json();

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

    // ----------- GHI VÀO MỘT DÒNG DUY NHẤT (UPSERT) TRÊN GOOGLE SHEETS -----------
    const conversationHistory = messages.map((m: any) => `${m.role === 'user' ? 'Khách' : 'Bot'}: ${m.content}`).join("\n");
    const endTime = new Date().toISOString(); 
    const currentSessionId = sessionId || "Web_" + Date.now(); 
    
    try {
      // 1. TỐI ƯU: Chỉ kéo về duy nhất cột B (SessionID) thay vì kéo cả bảng. Data vài chục KB dù có hàng vạn dòng!
      const sessionIdColumn = await sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: "Conversations!B:B"
      });
      
      const rows = sessionIdColumn.data.values || [];
      const existingRowIndex = rows.findIndex(row => row[0] === currentSessionId);
      
      if (existingRowIndex !== -1) {
        // --- NẾU ĐÃ CÓ: GHI ĐÈ / CẬP NHẬT ---
        const updateRowNumber = existingRowIndex + 1; // Google Sheet index từ 1
        
        // Cực kì nhẹ: Chỉ kéo mỗi data của cái dòng cần ghi đè về (Ví dụ: kéo dòng 15)
        const rowDataRaw = await sheets.spreadsheets.values.get({
          spreadsheetId: SPREADSHEET_ID,
          range: `Conversations!A${updateRowNumber}:J${updateRowNumber}`
        });
        const existingRow = rowDataRaw.data.values?.[0] || [];

        await sheets.spreadsheets.values.update({
          spreadsheetId: SPREADSHEET_ID,
          range: `Conversations!A${updateRowNumber}:J${updateRowNumber}`,
          valueInputOption: "USER_ENTERED",
          requestBody: {
            values: [
                [
                  existingRow[0] || "landing-page-chatbot", // Source
                  currentSessionId,                         // SessionID
                  existingRow[2] || endTime,                // StartTime (Giữ cấu trúc cũ)
                  endTime,                                  // EndTime (Update lại mỗi khi chat)
                  leadData?.name || existingRow[4] || "",   // Xài dữ liệu mới nếu có, không có thì giữ cũ
                  leadData?.phone || existingRow[5] || "",
                  leadData?.email || existingRow[6] || "",
                  leadData?.interest || existingRow[7] || "",
                  leadData?.intent_level || existingRow[8] || "",
                  conversationHistory                       // Cập nhật cục lịch sử mới dài hơn
                ]
            ]
          }
        });
      } else {
        // --- NẾU CHƯA CÓ DÒNG TƯƠNG ỨNG: THÊM DÒNG MỚI ---
        await sheets.spreadsheets.values.append({
          spreadsheetId: SPREADSHEET_ID,
          range: "Conversations!A:J",
          valueInputOption: "USER_ENTERED",
          requestBody: {
            values: [
                [
                  "landing-page-chatbot",     // Source
                  currentSessionId,           // SessionID
                  endTime,                    // StartTime
                  endTime,                    // EndTime
                  leadData?.name || "",       // Name
                  leadData?.phone || "",      // Phone
                  leadData?.email || "",      // Email
                  leadData?.interest || "",   // Interest
                  leadData?.intent_level || "",// Intent_Level
                  conversationHistory         // Lịch sử Conversation ngay lúc này
                ]
            ]
          }
        });
      }
    } catch (e) {
        console.error("Lỗi khi ghi Google Sheets:", e);
    }

    return NextResponse.json({ reply });
  } catch (error: any) {
    console.error("Chat API Error:", error);
    return NextResponse.json({ error: error.message || "Lỗi kết nối AI Bot." }, { status: 500 });
  }
}
