const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const supabaseUrl = 'https://nsknfxnqumdulljtmyod.supabase.co';
const supabaseKey = 'sb_publishable_mo9esIOM4Y6RnLfRFJfifw_OyLVNjrb';
const supabase = createClient(supabaseUrl, supabaseKey);

async function testUpload() {
  try {
    const fileBuffer = Buffer.from('Testing upload content', 'utf8');
    const { data, error } = await supabase.storage
      .from('receipts')
      .upload('test-upload-' + Date.now() + '.txt', fileBuffer, {
        contentType: 'text/plain',
        upsert: false
      });

    if (error) {
      console.error("UPLOAD ERROR:", error.message);
      return;
    }
    console.log("UPLOAD SUCCESS:", data);
  } catch (err) {
    console.error("SYS ERROR:", err);
  }
}

testUpload();
