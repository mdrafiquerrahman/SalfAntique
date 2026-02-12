import { NextResponse } from "next/server";
import crypto from "crypto";
import { Resend } from "resend";

export async function POST(request: Request) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      customerDetails,
      items,
      totalAmount,
    } = await request.json();

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      // Send confirmation email
      if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== "re_your_api_key_here") {
        try {
          console.log("Attempting to send confirmation email to customer:", customerDetails.email);
          
          const { data, error } = await resend.emails.send({
            from: "SALF Antqe <onboarding@resend.dev>",
            to: "rafiquerrahman66@gmail.com", // Reverting to verified email to avoid 403 Sandbox error
            replyTo: customerDetails.email, // Customer's email for your reference
            subject: "Acquisition Confirmed - SALF Antqe",
            html: `
              <div style="font-family: serif; background-color: #0a0a0a; color: #f5f5f5; padding: 40px; border: 1px solid #c5a059;">
                <h1 style="color: #c5a059; font-style: italic; border-bottom: 1px solid #c5a059; padding-bottom: 20px;">Acquisition Confirmed</h1>
                <p>Dear ${customerDetails.name},</p>
                <p>Your selection has been secured. Our curators are preparing your treasures for private delivery.</p>
                
                <div style="margin: 30px 0; padding: 20px; background-color: rgba(197, 160, 89, 0.05); border: 1px solid rgba(197, 160, 89, 0.2);">
                  <h3 style="color: #c5a059; margin-top: 0;">Order Summary</h3>
                  <table style="width: 100%; border-collapse: collapse;">
                    <thead>
                      <tr style="border-bottom: 1px solid rgba(197, 160, 89, 0.1);">
                        <th style="text-align: left; padding: 10px 0; font-size: 12px; text-transform: uppercase;">Item</th>
                        <th style="text-align: right; padding: 10px 0; font-size: 12px; text-transform: uppercase;">Qty</th>
                        <th style="text-align: right; padding: 10px 0; font-size: 12px; text-transform: uppercase;">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${items.map((item: any) => `
                        <tr style="border-bottom: 1px solid rgba(197, 160, 89, 0.05);">
                          <td style="padding: 10px 0; font-size: 14px;">${item.name}</td>
                          <td style="text-align: right; padding: 10px 0; font-size: 14px;">${item.quantity}</td>
                          <td style="text-align: right; padding: 10px 0; font-size: 14px;">₹${item.price.toLocaleString()}</td>
                        </tr>
                      `).join('')}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colspan="2" style="padding-top: 20px; font-weight: bold; text-transform: uppercase; font-size: 12px; color: #c5a059;">Total Acquisition Value</td>
                        <td style="padding-top: 20px; text-align: right; font-weight: bold; font-size: 18px; color: #c5a059;">₹${totalAmount.toLocaleString()}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>

                <p style="font-size: 12px; color: #888; margin-top: 40px; border-top: 1px solid rgba(197, 160, 89, 0.1); padding-top: 20px;">
                  Order ID: ${razorpay_order_id}<br>
                  Payment ID: ${razorpay_payment_id}
                </p>
                <p style="font-style: italic; color: #c5a059;">Thank you for preserving history with SALF Antqe.</p>
              </div>
            `,
          });

          if (error) {
            console.error("Resend API Error:", error);
          } else {
            console.log("Email sent successfully:", data);
          }
        } catch (emailError) {
          console.error("Failed to send confirmation email:", emailError);
          // We don't fail the transaction if email fails, but we log it
        }
      } else {
        console.warn("Resend API key missing or placeholder. Email not sent.");
      }

      return NextResponse.json({ status: "ok" });
    } else {
      return NextResponse.json(
        { status: "error", message: "Invalid signature" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Razorpay verification failed:", error);
    return NextResponse.json(
      { error: "Verification failed" },
      { status: 500 }
    );
  }
}
