export const setToken = (accessToken: string) => localStorage.setItem('token', accessToken);
export const getToken = () => localStorage.getItem('token');
export const removeToken = () => localStorage.removeItem('token');
