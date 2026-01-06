import api from '../../../api/client';

export const doctorsApi = {
  getDoctorsByHospitals: ({
    hospitalId,
    mode,
    distance = 10,
    page = 1,
    limit = 50,
  }) => {
    return api.get(`/hospital/user/hospital/${hospitalId}/doctors`, {
      params: {
        mode,
        distance,
        limit,
        page,
      },
    });
  },
};
