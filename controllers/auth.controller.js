import pool from "../config/db.js";
import bcrypt from "bcrypt";
export const registerUser = async (req, res, next) => {
  try {
    const {
      email,
      password,
      companyNameAr,
      companyName,
      companyAddress,
      region,
      industry,
      phoneNumber,
      role,
    } = req.body;

    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Email already exists.",
      });
    }
    const passwordHashed = await bcrypt.hash(password, 10);
    const query = `INSERT INTO users(
      email,
      password_hash,
      company_name,
      company_name_ar,
      company_address,
      region,
      industry,
      phone_number,
      role) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING id, email`;
    const result = await pool.query(query, [
      email,
      passwordHashed,
      companyName,
      companyNameAr,
      companyAddress,
      region,
      industry,
      phoneNumber,
      role,
    ]);

    res.status(201).json({
      success: true,
      message:
        "Registration successful. Verification codes sent to email and phone.",
      data: {
        userId: result.rows[0].id,
        email: result.rows[0].email,
        verificationRequired: true,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
