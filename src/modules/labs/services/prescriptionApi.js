import api from "../../../api/client";

/* UPLOAD PRESCRIPTION */

export const uploadPrescription = async (formData) => {
  return await api.post(
    "/lab-prescriptions/upload",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

/* GET USER PRESCRIPTIONS  */

export const getUserPrescriptions = async () => {
  return await api.get("/lab-prescriptions/user");
};

/* ATTACH BOOKING  */

export const attachBooking = async (data) => {
  return await api.patch(
    "/lab-prescriptions/attach-booking",
    data
  );
};