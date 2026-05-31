import api from './axios';

// GET /api/department-info
export const getDepartmentInfo = async () => {
  const response = await api.get('/department-info');
  return response.data.data;
};
