//handles http requests

const authService = require("./auth.service");

const login = async (req, res) => {
  try {
    const user = await authService.loginUser(req.body);
    res.cookie("auth_token", user.accessToken, {
      httpOnly: true,
      secure: false, // set to true in production with HTTPS
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      path: "/",
    });

    return res.status(200).json({ message: "Login successful" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
const logout = async (req, res) => {
  res.clearCookie("auth_token", {
    httpOnly: true,
    secure: false, // set to true in production with HTTPS
    sameSite: "strict",
  });
  return res.status(200).json({ message: "Logout successful" });
};

module.exports = {
  login,
  logout,
};
