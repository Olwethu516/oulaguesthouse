import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface BookingPayload {
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  roomName: string;
  roomNumber: number;
  checkIn: string;
  checkOut: string;
  guests: number;
  breakfast: boolean;
  specialRequests: string;
  totalPrice: number;
  nights: number;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const booking: BookingPayload = await req.json();

    const breakfastText = booking.breakfast
      ? `<tr><td style="padding:6px 0;color:#6b7280;">Breakfast included:</td><td style="padding:6px 0;font-weight:600;color:#111827;">Yes (+R95/person/day)</td></tr>`
      : `<tr><td style="padding:6px 0;color:#6b7280;">Breakfast included:</td><td style="padding:6px 0;font-weight:600;color:#111827;">No</td></tr>`;

    const specialRequestsText = booking.specialRequests
      ? `<tr><td style="padding:6px 0;color:#6b7280;vertical-align:top;">Special requests:</td><td style="padding:6px 0;font-weight:600;color:#111827;">${booking.specialRequests}</td></tr>`
      : "";

    const emailHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><title>Booking Confirmation</title></head>
<body style="margin:0;padding:0;background:#f9fafb;font-family:Georgia,serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
        <tr>
          <td style="background:#1a3a2a;padding:40px;text-align:center;">
            <h1 style="color:#d4af70;font-size:28px;margin:0;letter-spacing:2px;">OULA GUESTHOUSE</h1>
            <p style="color:#a3c4a8;margin:8px 0 0;font-size:14px;letter-spacing:1px;">BOOKING REQUEST RECEIVED</p>
          </td>
        </tr>
        <tr>
          <td style="padding:40px;">
            <p style="color:#374151;font-size:16px;line-height:1.6;">Dear ${booking.guestName},</p>
            <p style="color:#374151;font-size:15px;line-height:1.7;">Thank you for choosing Oula Guesthouse. We have received your booking request and our team will confirm your reservation within 24 hours.</p>

            <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f7f2;border-radius:8px;padding:24px;margin:24px 0;">
              <tr><td colspan="2" style="padding-bottom:16px;"><strong style="color:#1a3a2a;font-size:16px;letter-spacing:0.5px;">BOOKING DETAILS</strong></td></tr>
              <tr>
                <td style="padding:6px 0;color:#6b7280;">Room:</td>
                <td style="padding:6px 0;font-weight:600;color:#111827;">Room ${booking.roomNumber} — ${booking.roomName}</td>
              </tr>
              <tr>
                <td style="padding:6px 0;color:#6b7280;">Check-in:</td>
                <td style="padding:6px 0;font-weight:600;color:#111827;">${new Date(booking.checkIn).toLocaleDateString("en-ZA", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</td>
              </tr>
              <tr>
                <td style="padding:6px 0;color:#6b7280;">Check-out:</td>
                <td style="padding:6px 0;font-weight:600;color:#111827;">${new Date(booking.checkOut).toLocaleDateString("en-ZA", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</td>
              </tr>
              <tr>
                <td style="padding:6px 0;color:#6b7280;">Duration:</td>
                <td style="padding:6px 0;font-weight:600;color:#111827;">${booking.nights} night${booking.nights !== 1 ? "s" : ""}</td>
              </tr>
              <tr>
                <td style="padding:6px 0;color:#6b7280;">Guests:</td>
                <td style="padding:6px 0;font-weight:600;color:#111827;">${booking.guests} guest${booking.guests !== 1 ? "s" : ""}</td>
              </tr>
              ${breakfastText}
              ${specialRequestsText}
              <tr><td colspan="2" style="border-top:1px solid #d1fae5;padding-top:12px;margin-top:12px;"></td></tr>
              <tr>
                <td style="padding:8px 0;color:#1a3a2a;font-size:18px;font-weight:700;">Total:</td>
                <td style="padding:8px 0;color:#1a3a2a;font-size:18px;font-weight:700;">R${booking.totalPrice.toLocaleString()}</td>
              </tr>
            </table>

            <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f7f2;border-radius:8px;padding:24px;margin:24px 0;">
              <tr><td colspan="2" style="padding-bottom:16px;"><strong style="color:#1a3a2a;font-size:16px;letter-spacing:0.5px;">GUEST DETAILS</strong></td></tr>
              <tr>
                <td style="padding:6px 0;color:#6b7280;">Name:</td>
                <td style="padding:6px 0;font-weight:600;color:#111827;">${booking.guestName}</td>
              </tr>
              <tr>
                <td style="padding:6px 0;color:#6b7280;">Email:</td>
                <td style="padding:6px 0;font-weight:600;color:#111827;">${booking.guestEmail}</td>
              </tr>
              <tr>
                <td style="padding:6px 0;color:#6b7280;">Phone:</td>
                <td style="padding:6px 0;font-weight:600;color:#111827;">${booking.guestPhone}</td>
              </tr>
            </table>

            <p style="color:#374151;font-size:14px;line-height:1.7;">If you have any questions, please contact us at <a href="mailto:info@oula.co.za" style="color:#1a3a2a;">info@oula.co.za</a>.</p>
            <p style="color:#374151;font-size:14px;line-height:1.7;">We look forward to welcoming you.</p>
            <p style="color:#374151;font-size:14px;">Warm regards,<br><strong style="color:#1a3a2a;">The Oula Guesthouse Team</strong></p>
          </td>
        </tr>
        <tr>
          <td style="background:#1a3a2a;padding:24px;text-align:center;">
            <p style="color:#a3c4a8;font-size:12px;margin:0;">Oula Guesthouse &bull; info@oula.co.za</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

    if (RESEND_API_KEY) {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Oula Guesthouse <bookings@oula.co.za>",
          to: [booking.guestEmail],
          bcc: ["info@oula.co.za"],
          subject: `Booking Request — Room ${booking.roomNumber}: ${booking.roomName}`,
          html: emailHtml,
        }),
      });
    }

    return new Response(
      JSON.stringify({ success: true, message: "Booking received" }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: String(error) }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
