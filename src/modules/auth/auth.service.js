// for business logic related

const bcrypt = require("bcryptjs");
const authRepository = require("./auth.repository");
const jwt = require("jsonwebtoken");

const loginUser = async ({ email, password }) => {
  const user = await authRepository.findUserByEmail(email);
  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  const accessToken = jwt.sign(
    {
      userId: user.id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "1d",
    },
  );
  return {
    id: user.id,
    full_name: user.full_name,
    email: user.email,
    refresh_token: user.refresh_token,
    accessToken: accessToken,
  };
};

const loginAdmin = async ({ email, password }) => {
  const admin = await authRepository.findAdminByEmail(email);
  if (!admin) {
    throw new Error("Invalid email or password");
  }

  const isPasswordValid = await bcrypt.compare(password, admin.password);
  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  const accessToken = jwt.sign(
    {
      userId: admin.id,
      email: admin.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "1d",
    },
  );
  return {
    id: admin.id,
    full_name: admin.full_name,
    email: admin.email,
    refresh_token: admin.refresh_token,
    accessToken: accessToken,
  };

}

module.exports = {
  loginUser,
  loginAdmin,
};
