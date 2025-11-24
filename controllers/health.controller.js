export const health = (req, res) => {
  try {
    res.status(200).json({ success: true, message: "Health is Good" });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Sever error",
      error: err.message,
    });
  }
};
