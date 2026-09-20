import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axiosInstance from '../utils/axiosInstance';
import { setCredentials } from '../redux/authSlice';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data } = await axiosInstance.post('/api/auth/login', { email, password });
      dispatch(setCredentials(data));
      navigate('/'); // Redirect to home on success
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 border border-gray-200 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Sign In</h2>
      
      {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm font-medium">{error}</div>}

      <form onSubmit={submitHandler} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
          <input 
            type="email" 
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
          <input 
            type="password" 
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded transition-colors disabled:opacity-50"
        >
          {loading ? 'Signing In...' : 'Sign In'}
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-gray-600">
        New Customer?{' '}
        <Link to="/register" className="text-blue-600 hover:underline font-medium">Register Here</Link>
      </div>
    </div>
  );
};

export default Login;