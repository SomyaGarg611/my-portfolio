import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { name, email, subject, message, projectType } = body

        // Validate required fields
        if (!name || !email || !subject || !message) {
            return NextResponse.json(
                { error: 'All fields are required' },
                { status: 400 }
            )
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: 'Invalid email format' },
                { status: 400 }
            )
        }

        // Check if Gmail is configured
        if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
            console.log('Contact form submission (Gmail not configured):', {
                name,
                email,
                subject,
                message,
                projectType,
                timestamp: new Date().toISOString(),
            })

            return NextResponse.json(
                { message: 'Message logged successfully (email service not configured)' },
                { status: 200 }
            )
        }

        // Create Gmail transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_APP_PASSWORD,
            },
        })

        // Send email to you
        await transporter.sendMail({
            from: process.env.GMAIL_USER,
            to: process.env.GMAIL_USER, // Send to your own Gmail
            subject: `New Contact Form: ${subject}`,
            html: `
        <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0b; color: #ffffff; border-radius: 16px; overflow: hidden;">
          <!-- Header -->
          
          <!-- Content --> 

            <!-- Message Card -->
            <div style="background: #1a1a1d; border: 1px solid #2a2a2f; border-radius: 12px; padding: 24px; margin-bottom: 24px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
              <h3 style="margin: 0 0 16px 0; font-size: 18px; font-weight: 600; color: #22d3ee; border-bottom: 2px solid #22d3ee; padding-bottom: 8px; display: inline-block;">
                Message
              </h3>
              <div style="background: #0f0f10; padding: 20px; border-radius: 8px; border-left: 4px solid #22d3ee; line-height: 1.6; color: #e5e5e5;">
                ${message.replace(/\n/g, '<br>')}
              </div>
            </div>
            
            <!-- Action Button -->
            <div style="text-align: center; margin: 32px 0;">
              <a href="mailto:${email}" style="display: inline-block; background: linear-gradient(135deg, #22d3ee 0%, #8b5cf6 100%); color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; box-shadow: 0 4px 12px rgba(34, 211, 238, 0.3); transition: all 0.3s ease;">
                Reply to ${name}
              </a>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="background: #0f0f10; padding: 20px 24px; border-top: 1px solid #2a2a2f; text-align: center;">
            <p style="margin: 0; color: #9ca3af; font-size: 14px; line-height: 1.5;">
              Sent from your portfolio contact form<br>
              <span style="color: #6b7280; font-size: 12px;">${new Date().toLocaleString()}</span>
            </p>
          </div>
        </div>
      `,
            replyTo: email, // Set reply-to as the sender's email
        })

        // Send confirmation email to the user
        await transporter.sendMail({
            from: process.env.GMAIL_USER,
            to: email,
            subject: 'Thank you for contacting me!',
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Thank you for reaching out!</h2>
          
          <p>Hi ${name},</p>
          
          <p>I've received your message about "${subject}" and I'll get back to you within 24 hours.</p>
          
          <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Your message:</strong></p>
            <p style="font-style: italic;">"${message}"</p>
          </div>
          
          <p>Best regards,<br>Somya Garg</p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 12px;">
            <p>This is an automated confirmation email.</p>
          </div>
        </div>
      `,
        })

        return NextResponse.json(
            { message: 'Message sent successfully' },
            { status: 200 }
        )
    } catch (error) {
        console.error('Error processing contact form:', error)
        return NextResponse.json(
            { error: 'Failed to send message. Please try again.' },
            { status: 500 }
        )
    }
}