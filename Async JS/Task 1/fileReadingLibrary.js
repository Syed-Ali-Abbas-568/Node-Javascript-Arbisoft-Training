import fs from 'fs/promises';


// Function to read user data from a file
export const readUserData = async (filename) => {
  try {
    const data = await fs.readFile(filename, 'utf8');
    return JSON.parse(data);
  } catch (error) {

    //ENOENT Means no such directory or file foudn
    if (error.code === 'ENOENT') { 
      throw new Error(`File ${filename} not found.`);
    }
    throw error;
  }
};

// Function to write user data to a file
export const writeUserData = async (filename, data) => {
  try {
    await fs.writeFile(filename, JSON.stringify(data, null, 2));
    console.log(`Data successfully written to ${filename}`);
  } catch (error) {
    throw new Error(`Error writing to file: ${error.message}`);
  }
};


// Updated editUserProfile function

export const editUserProfile = async (filename, userId, updates) => {
    try {
      const data = await readUserData(filename);
      const userIndex = data.users.findIndex(user => user.id === userId);
      if (userIndex === -1) {
        throw new Error(`User with ID ${userId} not found.`);
      }
      data.users[userIndex] = { ...data.users[userIndex], ...updates };
      await writeUserData(filename, data);
      console.log(`User ${userId} updated successfully.`);
    } catch (error) {
      console.error(`Error updating user: ${error.message}`);
    }
  };