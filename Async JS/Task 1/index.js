import { readUserData, editUserProfile } from "./fileReadingLibrary.js";
import readline from 'readline';


 const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });



const askQuestion = (question) => new Promise((resolve) => rl.question(question, resolve));



const main = async () => {
  try {
    const filename = await askQuestion('Enter the filename for user data (Default: "userdata.json"): ') || 'userdata.json';

    console.log('Reading user data...');
    const userData = await readUserData(filename);
    console.log('Initial user data:', userData);

    // Get user ID to modify
    const userId = parseInt(await askQuestion('Enter the ID of the user you want to modify: '));

    // Get property to update
    const propertyToUpdate = await askQuestion('Enter the property you want to update (e.g., name, email, age, city): ');

    // Get new value for the property
    const newValue = await askQuestion(`Enter the new value for ${propertyToUpdate}: `);

    // Create update object
    const update = { [propertyToUpdate]: newValue };

    // Edit user profile
    await editUserProfile(filename, userId, update);

    // Read and display updated user data
    const updatedUserData = await readUserData(filename);
    console.log('Updated user data:', updatedUserData);

  } catch (error) {
    console.error('An error occurred:', error.message);
  } finally {
    rl.close();
  }
};

main();