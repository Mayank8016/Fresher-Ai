const logoutHandler = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false, // Localhost HTTP
    sameSite: "lax",
    path: "/",
  });

  return res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};

export default logoutHandler;