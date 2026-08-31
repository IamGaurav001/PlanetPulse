const { neon } = require("@neondatabase/serverless");

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set. Copy .env.example to .env and fill in your Neon connection string.");
}

const sql = neon(process.env.DATABASE_URL);

let schemaReady;
function ensureSchema() {
  if (!schemaReady) {
    schemaReady = sql`
      CREATE TABLE IF NOT EXISTS activities (
        id UUID PRIMARY KEY,
        type TEXT NOT NULL,
        label TEXT NOT NULL,
        category TEXT NOT NULL,
        unit TEXT NOT NULL,
        quantity NUMERIC NOT NULL,
        co2_kg NUMERIC NOT NULL,
        suspicious BOOLEAN NOT NULL,
        date DATE NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now()
      )
    `;
  }
  return schemaReady;
}

module.exports = { sql, ensureSchema };
