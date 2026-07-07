import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

const str = (v, max) => (typeof v === 'string' && v.trim() && v.trim().length <= max ? v.trim() : null);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'method not allowed' });

  const b = req.body || {};
  const name = str(b.name, 200);
  const firm = str(b.firm, 300);
  const role = str(b.role, 100);
  const jurisdiction = str(b.jurisdiction, 100);
  const matters = typeof b.matters === 'string' ? b.matters.trim().slice(0, 500) : '';

  if (!name || !firm || !role || !jurisdiction) return res.status(400).json({ error: 'missing required fields' });
  if (b.consent !== true) return res.status(400).json({ error: 'consent required' });

  try {
    await sql`
      INSERT INTO access_requests (name, firm, role, jurisdiction, matter_types, consent)
      VALUES (${name}, ${firm}, ${role}, ${jurisdiction}, ${matters}, TRUE)`;
    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error('access insert failed:', e);
    return res.status(500).json({ error: 'storage failed' });
  }
}
