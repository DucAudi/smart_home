// passwordTest.js

const bcrypt = require('bcryptjs');

const hashedPassword = "$2a$10$7WqrcthAeNiOLoPq2v18.ei7vNIBGz07hhngGZpAELypv9tLvfF1u";
const passwordToCheck = "Hahaha";

bcrypt.compare(passwordToCheck, hashedPassword, (err, isMatch) => {
  if (err) {
    console.error('Error while comparing password:', err);
  } else {
    console.log('Password match:', isMatch);
  }
});
