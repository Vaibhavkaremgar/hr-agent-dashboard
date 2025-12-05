const bcrypt = require('bcryptjs');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('../data/hirehero.db');

async function checkPasswords() {
  const users = [
    { email: 'kvreddy1809@gmail.com', tests: ['kmg123', 'Kmg@123', 'KMG@123', 'kvreddy123', 'kvreddy1809', 'password', '123456'] },
    { email: 'jobanputra@gmail.com', tests: ['joban123', 'Joban@123', 'JOBAN@123', 'jobanputra123', 'password', '123456'] }
  ];

  for (const user of users) {
    await new Promise((resolve) => {
      db.get('SELECT password_hash FROM users WHERE email = ?', [user.email], async (err, row) => {
        if (err || !row) {
          console.log(`${user.email}: NOT FOUND`);
          resolve();
          return;
        }

        let found = false;
        for (const pwd of user.tests) {
          const match = await bcrypt.compare(pwd, row.password_hash);
          if (match) {
            console.log(`✅ ${user.email}: ${pwd}`);
            found = true;
            break;
          }
        }
        
        if (!found) {
          console.log(`❌ ${user.email}: Password not in test list`);
        }
        resolve();
      });
    });
  }

  db.close();
}

checkPasswords();
