import api from './axios';

// POST /employees/:employeeId/comments
// data: { authorName, text }
export const createComment = async (employeeId, data) => {
  const response = await api.post(`/employees/${employeeId}/comments`, data);
  return response.data.data;
};

// GET /employees/:employeeId/comments
export const getComments = async (employeeId) => {
  const response = await api.get(`/employees/${employeeId}/comments`);
  return response.data.data;
};
