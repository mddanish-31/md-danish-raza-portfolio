// In-memory sliding-window rate limiter (5 requests per 10 minutes per IP)
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;

interface RateLimitRecord {
  count: number;
  resetAt: number;
}

const rateLimitMap = new Map<string, RateLimitRecord>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  // Clean up expired entries periodically
  if (record && now > record.resetAt) {
    rateLimitMap.delete(ip);
  }

  const current = rateLimitMap.get(ip);
  if (!current) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (current.count >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  current.count += 1;
  return false;
}

// Basic HTML escaping helper to prevent script injection in received emails
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export async function POST(req: Request) {
  try {
    // 1. Rate limiting check
    const clientIp =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      req.headers.get('x-real-ip') ||
      'unknown-ip';

    if (isRateLimited(clientIp)) {
      return Response.json(
        {
          success: false,
          error: 'Too many messages sent. Please wait a few minutes before trying again.',
        },
        { status: 429 }
      );
    }

    // 2. Parse request body
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== 'object') {
      return Response.json(
        { success: false, error: 'Invalid request body.' },
        { status: 400 }
      );
    }

    const { name, email, subject, message, honeypot } = body;

    // 3. Honeypot check (silent drop for automated bots)
    if (honeypot && String(honeypot).trim() !== '') {
      // Return synthetic success so bots do not learn or adapt
      return Response.json(
        { success: true, message: 'Message sent successfully.' },
        { status: 200 }
      );
    }

    // 4. Server-side validation
    const trimmedName = typeof name === 'string' ? name.trim() : '';
    const trimmedEmail = typeof email === 'string' ? email.trim() : '';
    const trimmedSubject = typeof subject === 'string' ? subject.trim() : '';
    const trimmedMessage = typeof message === 'string' ? message.trim() : '';

    if (!trimmedName || trimmedName.length < 2 || trimmedName.length > 100) {
      return Response.json(
        { success: false, error: 'Please enter a valid name (2–100 characters).' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmedEmail || !emailRegex.test(trimmedEmail) || trimmedEmail.length > 254) {
      return Response.json(
        { success: false, error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    if (!trimmedMessage || trimmedMessage.length < 10 || trimmedMessage.length > 5000) {
      return Response.json(
        { success: false, error: 'Please enter a message between 10 and 5,000 characters.' },
        { status: 400 }
      );
    }

    // 5. Environment configuration verification
    const apiKey = process.env.RESEND_API_KEY?.trim();
    const contactEmail = process.env.CONTACT_EMAIL?.trim();
    const fromEmail = process.env.RESEND_FROM_EMAIL?.trim() || 'onboarding@resend.dev';

    if (!apiKey || !contactEmail) {
      // Configuration is pending user setup
      return Response.json(
        {
          success: false,
          error:
            'Contact service is currently pending configuration. Please email directly or try again later.',
        },
        { status: 503 }
      );
    }

    // 6. Build email content
    const sanitizedName = escapeHtml(trimmedName);
    const sanitizedEmail = escapeHtml(trimmedEmail);
    const sanitizedSubject = trimmedSubject ? escapeHtml(trimmedSubject) : 'Portfolio Inquiry';
    const sanitizedMessage = escapeHtml(trimmedMessage).replace(/\n/g, '<br />');

    const emailSubject = `[Portfolio 2.0] ${sanitizedSubject} - from ${trimmedName}`;

    const htmlBody = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background-color: #072124; color: #F0FDF4; border-radius: 12px; border: 1px solid rgba(45, 212, 191, 0.25);">
        <div style="border-bottom: 1px solid rgba(45, 212, 191, 0.2); padding-bottom: 16px; margin-bottom: 20px;">
          <h2 style="margin: 0; color: #2DD4BF; font-size: 20px; font-weight: 600;">New Contact Submission — Portfolio 2.0</h2>
          <p style="margin: 4px 0 0; color: #94A3B8; font-size: 13px;">Received via website contact form</p>
        </div>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
          <tr>
            <td style="padding: 6px 0; color: #94A3B8; width: 90px; vertical-align: top;"><strong>Sender:</strong></td>
            <td style="padding: 6px 0; color: #F0FDF4;">${sanitizedName}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #94A3B8; vertical-align: top;"><strong>Email:</strong></td>
            <td style="padding: 6px 0; color: #2DD4BF;"><a href="mailto:${sanitizedEmail}" style="color: #2DD4BF; text-decoration: none;">${sanitizedEmail}</a></td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #94A3B8; vertical-align: top;"><strong>Subject:</strong></td>
            <td style="padding: 6px 0; color: #F0FDF4;">${sanitizedSubject}</td>
          </tr>
        </table>

        <div style="background-color: #041316; border: 1px solid rgba(45, 212, 191, 0.15); border-radius: 8px; padding: 16px; margin-top: 16px;">
          <p style="margin: 0 0 8px; color: #94A3B8; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 600;">Message Content:</p>
          <div style="font-size: 14px; line-height: 1.6; color: #F0FDF4;">${sanitizedMessage}</div>
        </div>

        <div style="margin-top: 24px; padding-top: 12px; border-top: 1px solid rgba(45, 212, 191, 0.15); font-size: 12px; color: #64748B; text-align: center;">
          Sent from MD Danish Raza's Portfolio 2.0 • Reply to this email to respond directly to ${sanitizedName}.
        </div>
      </div>
    `;

    const textBody = `
New Contact Submission — Portfolio 2.0
=======================================
Sender:  ${trimmedName}
Email:   ${trimmedEmail}
Subject: ${trimmedSubject || 'Portfolio Inquiry'}

Message:
--------
${trimmedMessage}

(Reply to this email to respond directly to ${trimmedName})
    `.trim();

    // 7. Dispatch via Resend REST API (Native Fetch, Zero extra dependencies)
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [contactEmail],
        reply_to: trimmedEmail,
        subject: emailSubject,
        html: htmlBody,
        text: textBody,
      }),
    });

    if (!resendResponse.ok) {
      const errorData = (await resendResponse.json().catch(() => ({}))) as {
        name?: string;
        message?: string;
        statusCode?: number;
      };

      const errorStatus = resendResponse.status;
      const errorName = errorData.name || 'ResendDeliveryError';
      const errorMessage = errorData.message || `Resend API error (${errorStatus})`;

      // Safely log diagnostic details without leaking secrets or API keys
      console.error('[Resend Error Diagnostics]:', {
        status: errorStatus,
        name: errorName,
        message: errorMessage,
      });

      return Response.json(
        {
          success: false,
          error:
            'Unable to deliver message at this time. Please try again later or reach out via LinkedIn/GitHub.',
          details:
            process.env.NODE_ENV !== 'production'
              ? { status: errorStatus, name: errorName, message: errorMessage }
              : undefined,
        },
        { status: 502 }
      );
    }

    const data = await resendResponse.json().catch(() => ({}));

    return Response.json(
      {
        success: true,
        message: 'Your message has been sent successfully. Thank you for reaching out!',
        id: (data as { id?: string }).id,
      },
      { status: 200 }
    );
  } catch (err: unknown) {
    console.error('[Contact API Unexpected Error]:', err instanceof Error ? err.message : err);
    return Response.json(
      {
        success: false,
        error: 'An unexpected error occurred while sending your message. Please try again.',
      },
      { status: 500 }
    );
  }
}
