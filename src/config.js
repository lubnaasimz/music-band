// Environment configuration for deployment
const config = {
  development: {
    API_BASE_URL: 'http://127.0.0.1:5000'
  },
  production: {
    API_BASE_URL: 'http://127.0.0.1:5000'
  }
};

const environment = process.env.NODE_ENV || 'development';
export const API_BASE_URL = config[environment].API_BASE_URL;

console.log('Environment:', environment);
console.log('API Base URL:', API_BASE_URL);