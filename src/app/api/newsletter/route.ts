import { Resend } from 'resend';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    
    const apiKey = process.env.RESEND_API_KEY;
    
    if (!apiKey || apiKey === 're_your_api_key_here' || !apiKey) {
      console.error("Newsletter: Missing or invalid RESEND_API_KEY");
      return NextResponse.json(
        { error: "Email service not configured. Please add a valid RESEND_API_KEY to your .env.local file." }, 
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);
    
    // 1. Send confirmation (Re-routed to admin for Sandbox mode)
    const { data: userData, error: userError } = await resend.emails.send({
      from: 'Salf Antqe <onboarding@resend.dev>',
      to: ['rafiquerrahman66@gmail.com'], // Re-routed to your email to avoid 403 Sandbox error
      replyTo: email, // Subscriber's email for your reference
      subject: 'Welcome to the Salf Antqe Archive',
      html: `
        <div style="font-family: serif; padding: 40px; color: #1a1a15; background-color: #fdfdfc; border: 1px solid #c5a059;">
          <h1 style="text-align: center; text-transform: uppercase; letter-spacing: 3px;">Welcome to the Archive</h1>
          <p style="font-style: italic; font-size: 16px;">Subscriber: ${email}</p>
          <p style="font-style: italic; font-size: 16px;">Thank you for joining the Salf Antqe inner circle.</p>
          <p>You now have early access to our newest antique acquisitions and private collections.</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://salf-antique.vercel.app/" style="padding: 12px 24px; background: #0f2d1f; color: #fff; text-decoration: none; text-transform: uppercase; font-size: 12px;">Explore the Collection</a>
          </div>
        </div>
      `,
    });

    if (userError) {
      console.error("Resend Subscriber Email Error:", userError);
      return NextResponse.json({ error: userError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Newsletter API Error:", error);
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
