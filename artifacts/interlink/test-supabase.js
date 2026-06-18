async function test() {
  const url = 'https://qcpephmmqfxctuewjeyr.supabase.co/rest/v1/';
  const key = 'sb_publishable_pP4mbKkNMEtdW-EQGr-t_g_bPTs0J5y';
  
  try {
    const res = await fetch(url + '?apikey=' + key, {
      headers: {
        'apikey': key,
        'Authorization': 'Bearer ' + key,
      }
    });
    console.log('Status:', res.status);
    console.log('Body:', await res.text());
  } catch(e) {
    console.log(e);
  }
}
test();
