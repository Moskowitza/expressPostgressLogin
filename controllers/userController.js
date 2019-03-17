const sequelize = require('sequelize');

// Get the Login Form
exports.loginForm = (req, res) => {
  res.render('signin', { title: 'Login' });
};
// GET Signup FORM
exports.signupForm = (req, res) => {
  res.render('signup', { title: 'Register' });
};
// we need to validate the submission strings
exports.validateRegister = (req, res, next) => {
  //  we're using express-validator, it's been attached in the app.js
  req.sanitizeBody('email');
  req
    .checkBody('email', 'You must supply an email')
    .notEmpty()
    .isEmail();
  req.sanitizeBody('email').normalizeEmail({
    remove_dots: false,
    remove_extension: false,
    gmail_remove_subaddress: false,
  });
  req.checkBody('password', 'Password cannot be blank!').notEmpty();
  req.checkBody('password-confirm', 'Confirm Password cannot be blank');
  req
    .checkBody('password-confirm', 'Passwords do not match')
    .equals(req.body.password);
  const errors = req.validationErrors();
  if (errors) {
    req.flash('error', errors.map(err => err.msg));
    // re-render form with fields still in there
    res.render('signup', {
      title: 'Register',
      body: req.body,
      flashes: req.flash(),
    });
    return; // stop! we have errors
  }
  next();
};
exports.welcomeBack = (req, res) => {
  User.find({
    where: {
      username: req.body.username,
    },
  })
    .then(user => {
      if (!user) {
        return res.status(401).send({
          message: 'Authentication failed. User not found.',
        });
      }
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (isMatch && !err) {
          const token = jwt.sign(
            JSON.parse(JSON.stringify(user)),
            'nodeauthsecret',
            { expiresIn: 86400 * 30 }
          );
          jwt.verify(token, 'nodeauthsecret', (err, data) => {
            console.log(err, data);
          });
          res.json({ success: true, token: 'JWT ' + token });
        } else {
          res.status(401).send({
            success: false,
            msg: 'Authentication failed. Wrong password.',
          });
        }
      });
    })
    .catch(error => res.status(400).send(error));
};

exports.signupNew = (req, res) => {
  console.log(req.body);
  if (!req.body.username || !req.body.password) {
    res.status(400).send({ msg: 'Please pass username and password.' });
  } else {
    User.create({
      username: req.body.username,
      password: req.body.password,
    })
      .then(user => res.status(201).send(user))
      .catch(error => {
        console.log(error);
        res.status(400).send(error);
      });
  }
};
exports.productForm = (req, res) => {
  res.render('productform');
};
