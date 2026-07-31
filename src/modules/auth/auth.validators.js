//validation for login

const isEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

const validateLogin =(req, res, next) => {
    const {email ,password} = req.body || {};
    const errors = [];

    if(!email || !isEmail(email)){
        errors.push('Email must be a valid email address');
    }

    if(!password || password.length < 6){
        errors.push('Password must be at least 6 characters long');
    }

    if(errors.length > 0){
        return res.status(400).json({ errors });
    }

    next();
};

module.exports = {
    validateLogin
}