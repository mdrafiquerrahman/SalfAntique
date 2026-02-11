import { Resend } from 'resend';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { name, email, phone, jewelryType, message } = await request.json();
    console.log(`Received appointment request from ${name} (${email})`);
    
    const apiKey = process.env.RESEND_API_KEY;
    
    if (!apiKey || apiKey === 're_your_api_key_here') {
      console.error("Missing RESEND_API_KEY in environment variables");
      return NextResponse.json(
        { error: "Email service not configured. Please add RESEND_API_KEY to your .env.local file." }, 
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from: 'Salf Antqe <onboarding@resend.dev>',
      to: ['rafiquerrahman66@gmail.com'],
      subject: `New Virtual Appointment Request - ${name}`,
      html: `
        <div style="font-family: serif; padding: 20px; color: #1a1a15;">
          <h1 style="border-bottom: 1px solid #0f2d1f; padding-bottom: 10px; text-transform: uppercase;">New Appointment Request</h1>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Jewelry Type:</strong> ${jewelryType}</p>
          <p><strong>Message:</strong> ${message || 'No additional message'}</p>
        </div>
      `,
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
