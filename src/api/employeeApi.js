import api from './axios';

// GET /employees
export const getEmployees = async () => {
  const response = await api.get('/employees');
  return response.data.data;
};

// GET /employees/:id
export const getEmployeeById = async (id) => {
  const response = await api.get(`/employees/${id}`);
  return response.data.data;
};
