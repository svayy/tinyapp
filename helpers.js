

//generates a string of 6 character
const generateRandomString = function(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomString = '';
  for (let i = 0; i < 6; i++) {
    randomString += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return randomString;
}

//search for user email in database
const getUserByEmail = function (email, users) {
  for (const userId in users) {
    if (users[userId].email === email) {
      return userId;
    }
  }
  return undefined;
};

const urlsForUsers = function (userId, urlDatabase) {
  let userUrl = {};
  for (let url in urlDatabase) {
    if (urlDatabase[url].userID === userId) {
      userUrl[url] = database[url];
      }
    }
    return userUrl;
  };

module.exports = {
  generateRandomString,
  getUserByEmail,
  urlsForUser
};