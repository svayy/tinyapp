const express = require("express");
const app = express();
const PORT = 8080; // default port 8080
const morgan = require('morgan');
const bodyParser = require('body-parser'); 
const cookieSession = require("cookie-session");
const bcrypt = require('bcryptjs');
const { generateRandomString, getUserByEmail, urlsForUser } = require('./helpers');
app.set("view engine", "ejs");


//cookieSession 
const salt = bccrypt.genSaltSync(10);

app.use(cookieSession({
  name: "session",
  keys: [
    "Pine", "Apple"
  ],
})
);

app.use(bodyParser.urlencoded({extended: true}));

app.use(morgan('dev'));
app.set("view engine", "ejs");

//database
const urlDatabase = {
  b6UTxQ: {
        longURL: "https://www.tsn.ca",
        userID: "aJ48lW"
    },
    i3BoGr: {
        longURL: "https://www.google.ca",
        userID: "aJ48lW"
    }
};
  const users = {
    "userRandomID": {
      id: "userRandomID", 
      email: "user@example.com", 
      password: "purple-monkey-dinosaur"
    },
    "user2RandomID": {
      id: "user2RandomID", 
      email: "user2@example.com", 
      password: "dishwasher-funk"
    }
  };




//main root
app.get("/", (req, res) => {
  if (!req.session['user_id']) {
    return res.redirect('/login');
  } else {
    res.redirect('/urls');
  }

});



// short url
app.get("/urls/new", (req, res) => {
  if (!req.session['user_id']) {
    res.redirect('/login')
  } else {
    const templateVars = {
      user: users[req.session["user_id"]]};
  }
  res.render("urls_new", templateVars);
});



// url
app.get('/urls/:shortURL', (req, res) => {
  const shortURL = req.params.shortURL;
  const userID = req.session["user_id"];
  if (!userID) {
    return res.send(403);
  }
  const templateVars = {shortURL: req.params.shortURL, 
    longURL: urlDatabase[req.params.shortURL].longURL, user: users[userID]};
  

      res.render('urls_show', templateVars);
});



//user register
app.get('/register', (req, res) => {
  const templateVars = {user: req.session['user_id'], };
  res.render("urls_register", templateVars);
});


//login
app.get('/login', (req, res) => {
  if (req.session["user_id"]) {
    res.redirect('/urls');
  }
  const templateVars = {user: users[req.session["user_id"]]};
  res.render("user_login", templateVars);
});



//login 
app.post("/login", (req, res) => {
  const email = req.body.useremail;
  const password = req.body.userpassword;
  const user = getUserByEmail(email, users);
  if (!email) {
    res.status(403).send("Re-enter Email");
  } 
  if (bcrypt.compareSync(password, user.password)) {
     req.session['user_id'] = user.id
     res.redirect('/url');
  } else {
    res.status(403).send("Incorrect Password of Email");
  }
});




//Register User
app.post('/register', (req, res) => {
  const {email, password} = req.body;
  if (email === '') {
    res
    .status(400)
    .send('Please Enter Valid Email/Password');
  } else if (password === '') {
    res.status(400).send('Password is required');
  } else if (getUserByEmail(email, userDatabase)) {
    res.status(400)
    .send('Email Has Already Been Registered');
    res.redirect('/urls');
  }
});



//logout
app.post("/logout", (req, res) => {
  req.session = null;
  res.redirect("/urls");
});

app.listen(PORT, () => {
  console.log(`tinyapp listening on port ${PORT}!`);
});