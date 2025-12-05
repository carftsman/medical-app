
import axios from "axios";
import { saveToken } from "../utils/storage";

const API = axios.create({
  baseURL: "https://hospital-backend-1-9jq0.onrender.com",
});

export const sendOtp = async (phone) => {
  try {
    const res = await API.post("/api/hospital/user/auth/send-otp", {
      phone,
    });

    return {
      success: true,
      message: res.data.message,
    };

  } catch (err) {
    return {
      success: false,
      message: err?.response?.data?.message || "Failed to send OTP",
    };
  }
};

export const verifyOtp = async ({ phone, otp }) => {
  try {
    const res = await API.post("/api/hospital/user/auth/verify-otp", {
      phone,
      otp,
    });

    if (res.data?.token) await saveToken(res.data.token);

    return { success: true, verified: true };

  } catch (err) {
    return {
      success: false,
      message: err?.response?.data?.message || "Invalid OTP",
    };
  }
};
