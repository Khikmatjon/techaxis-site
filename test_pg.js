const { Pool } = require('pg'); 
try { 
  const pool = new Pool({ connectionString: 'postgresql://test:test@localhost:5432/test?pgbouncer=true' }); 
  console.log('success instantiating'); 
} catch (e) { 
  console.error(e); 
}
