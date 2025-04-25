//const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true,
});

// Add a request interceptor to add the auth token to requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    console.log('Token status:', token ? 'Token exists' : 'No token found in localStorage');
    console.log('Request Config:', {
      url: config.url,
      method: config.method,
      headers: config.headers,
      data: config.data,
    });
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors
apiClient.interceptors.response.use(
  (response) => {
    console.log('Response:', {
      status: response.status,
      data: response.data,
    });
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // تحسين تسجيل الأخطاء
    console.error('API Error Details:', {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      config: {
        url: error.config?.url,
        method: error.config?.method,
        headers: error.config?.headers,
        data: error.config?.data,
      }
    });

    if (error.response?.status === 401) {
      // إذا كنا في صفحة تسجيل الدخول، لا نحاول تحديث الرمز
      if (window.location.pathname === '/login') {
        return Promise.reject(error);
      }
      // إذا لم نكن قد حاولنا تحديث الرمز من قبل
      if (!originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const response = await apiClient.post('/auth/refresh');
          const { token } = response.data;
          
          if (token) {
            localStorage.setItem('token', token);
            apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            return apiClient(originalRequest);
          }
        } catch (refreshError) {
          console.error('Token Refresh Error:', refreshError);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.href = '/login';
          return Promise.reject(refreshError);
        }
      }
    }

    // معالجة خطأ 500
    if (error.response?.status === 500) {
      console.error('Server Error (500):', {
        message: error.response?.data?.message || 'Internal Server Error',
        details: error.response?.data
      });
      
      // يمكننا إضافة رسالة خطأ للمستخدم هنا
      if (window.location.pathname !== '/login') {
        // يمكنك إضافة إشعار للمستخدم هنا
        alert('حدث خطأ في الخادم. يرجى المحاولة مرة أخرى لاحقاً.');
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient; 