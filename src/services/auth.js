

// src/services/auth.js

const BASE_URL = "https://hospital-backend-1-9jq0.onrender.com";

const ENDPOINTS = {
  FORGOT_REQUEST: "/api/hospital/user/auth/forgot/request",
  FORGOT_VERIFY: "/api/hospital/user/auth/forgot/verify",
  RESET_PASSWORD: "/api/hospital/user/auth/forgot/reset",
};

// Helper: normalize phone (digits only)
function normalizePhone(raw = "") {
  return String(raw).replace(/\D/g, "");
}

// Helper: always send +91 prefix
function preparePhone(raw = "") {
  const digits = normalizePhone(raw);
  return digits ? `+91${digits}` : null;
}

// Generic POST request wrapper
async function callApi(path, body = {}) {
  const url = BASE_URL + path;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    let json = null;
    try {
      json = await response.json();
    } catch {
      json = null;
    }

    if (response.ok) {
      return {
        ok: true,
        status: response.status,
        data: json,
        message: json?.message || "Success",
      };
    }

    return {
      ok: false,
      status: response.status,
      data: json,
      message: json?.message || "Request failed",
    };
  } catch (err) {
    return {
      ok: false,
      status: 0,
      data: null,
      message: err?.message || "Network error",
    };
  }
}



// STEP 1 — Request OTP (forgot/request)
async function forgotRequest(rawPhone) {
  const phone = preparePhone(rawPhone);
  if (!phone) return { ok: false, status: 0, data: null, message: "Invalid phone" };
  return callApi(ENDPOINTS.FORGOT_REQUEST, { phone });
}

// Public API: request OTP (for forgot flow)
async function requestOtpWithFallback(rawPhone) {
  // For your flow we call forgot/request directly 
  return await forgotRequest(rawPhone);
}

// STEP 2 — Verify OTP (forgot/verify)
async function forgotVerify({ rawPhone, otp, txnId }) {
  const phone = preparePhone(rawPhone);
  if (!phone) return { ok: false, status: 0, data: null, message: "Invalid phone" };
  return callApi(ENDPOINTS.FORGOT_VERIFY, { phone, otp, txnId });
}

// Public API: verify OTP for forgot flow
async function verifyOtpWithFallback({ rawPhone, otp, txnId }) {
  return await forgotVerify({ rawPhone, otp, txnId });
}



async function resetPassword({ resetToken, newPassword, confirmPassword }) {
  if (!resetToken) return { ok: false, status: 0, data: null, message: "Missing reset token" };

  return callApi(ENDPOINTS.RESET_PASSWORD, {
    resetToken,
    newPassword,
    confirmPassword,
  });
}



export default {
  requestOtpWithFallback,
  verifyOtpWithFallback,
  resetPassword,

  // raw helpers for debugging if needed
  _normalizePhone: normalizePhone,
  _preparePhone: preparePhone,
};
