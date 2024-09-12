import bcrypt from 'bcrypt';


//Try to keep salting round less because more salting == more secure pasword but more resource intensive
const saltRounds = 10;
const myPlaintextPassword = 'mySecurePassword123';

// Hash the password
bcrypt.hash(myPlaintextPassword, saltRounds, (err, hash) => {
  if (err) {
    console.error('Error hashing password:', err);
  } else {
    console.log('\nPassword hashing:');
    console.log('Original password:', myPlaintextPassword);
    console.log('Hashed password:', hash);

    // Verify the password
    bcrypt.compare(myPlaintextPassword, hash, (err, result) => {
      if (err) {
        console.error('Error verifying password:', err);
      } else {
        console.log('Password verification result:', result);
      }
    });
  }
});