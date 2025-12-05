const axios = require('axios');

const BACKEND_URL = 'https://automationdash.up.railway.app';

async function testBackend() {
  console.log('Testing backend at:', BACKEND_URL);
  
  // Test 1: Health check
  try {
    const health = await axios.get(BACKEND_URL);
    console.log('✅ Health check:', health.data);
  } catch (err) {
    console.log('❌ Health check failed:', err.message);
  }
  
  // Test 2: Login attempt
  try {
    const login = await axios.post(`${BACKEND_URL}/api/auth/login`, {
      email: 'admin@example.com',
      password: 'admin123'
    });
    console.log('✅ Login successful:', login.data);
  } catch (err) {
    console.log('❌ Login failed:', err.response?.status, err.response?.data || err.message);
  }
}

testBackend();
