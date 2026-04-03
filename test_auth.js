const { Client } = require('pg');
async function testDb() {
  const client = new Client({
    connectionString: "postgresql://postgres.aovaqntrhpxbwmtohyiy:Techaxis_2026_Secure_Db@aws-1-ap-south-1.pooler.supabase.com:6543/postgres"
  });
  try {
    await client.connect();
    const res = await client.query('SELECT NOW()');
    console.log("DB SUCCESSFULLY CONNECTED:", res.rows[0]);
    await client.end();
  } catch(e) {
    console.error("DB CONNECTION FAILED:", e.message);
  }
}
testDb();
