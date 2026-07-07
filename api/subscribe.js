import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'method not allowed' });

  const email = typeof req.body?.email === 'string' ? req.body.email.trim().toLowerCase() : '';
  if (!EMAIL.test(email) || email.length > 320) return res.status(400).json({ error: 'invalid email' });

  try {
    // idempotent: resubscribing an existing address is a success
    await sql`INSERT INTO subscribers (email) VALUES (${email}) ON CONFLICT (email) DO NOTHING`;
    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error('subscribe insert failed:', e);
    return res.status(500).json({ error: 'storage failed' });
  }
}
