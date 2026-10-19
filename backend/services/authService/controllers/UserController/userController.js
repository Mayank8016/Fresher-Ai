export const userDetails=async (req, res) => {
  try {
    const user = req.user; // Assuming the user details are stored in req.user by the isAuth middleware
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

