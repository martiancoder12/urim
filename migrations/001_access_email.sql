-- Required before deploying the rebuilt briefing form.
-- The earlier form did not collect an address, so access_requests may not yet
-- have an email column.

ALTER TABLE access_requests
  ADD COLUMN IF NOT EXISTS email TEXT;

-- Existing rows may remain null. New requests are validated by the API.
CREATE INDEX IF NOT EXISTS access_requests_email_idx
  ON access_requests (lower(email));
