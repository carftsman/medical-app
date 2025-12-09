
export const isValidPhone = (raw) => {
  const digits = raw.replace(/\D/g, "");
  return digits.length === 10;
};

export const normalizePhone = (raw) => {
  const digits = raw.replace(/\D/g, "");
  return `+91${digits}`;
};

export const isValidOtp = (otp, length = 6) => {
  return typeof otp === "string" && otp.replace(/\D/g, "").length === length;
};
