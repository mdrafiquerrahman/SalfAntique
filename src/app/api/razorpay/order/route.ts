import { NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(request: Request) {
  try {
    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      console.error("Razorpay credentials missing in environment variables");
      return NextResponse.json(
        { error: "Payment gateway not configured. Please add Razorpay keys to your Vercel Environment Variables." },
        { status: 500 }
      );
    }

    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    const { amount, currency = "INR" } = await request.json();

    const options = {
      amount: Math.round(amount * 100), // Razorpay expects amount in paise
      currency,
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    console.log("Razorpay order created successfully:", order.id);

    return NextResponse.json(order);
  } catch (error: any) {
    console.error("Razorpay order creation failed detailed:", {
      message: error.message,
      description: error.description,
      code: error.code,
      metadata: error.metadata
    });
    return NextResponse.json(
      { error: "Failed to create order", details: error.message },
      { status: 500 }
    );
  }
}
