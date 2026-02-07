import api from '../../../api/client';

export const labApi = {
  getLabTests: labId => {
    return api.get(`/labs/${labId}/tests`);
  },


  getLabTestDetails: labTestId => {
    return api.get(`/labs/tests/${labTestId}`);
  },
};