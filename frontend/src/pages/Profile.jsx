import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../redux/authSlice';
import axiosInstance from '../utils/axiosInstance';

const Profile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [message, setMessage] = useState(null); // For success/validation messages
  const [error, setError] = useState(null); // For API errors
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth.userInfo);

  // Pre-fill the form with the user's current data when the page loads
  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    // 1. Validate that the passwords match before sending to the server
    if (password !== confirmPassword) {
      setMessage({ text: 'Passwords do not match', type: 'error' });
      return;
    }

    setLoading(true);

    try {
      // 2. Send the PUT request to your new controller
      // (Ensure this URL matches where you mounted your auth routes in server.js)
      const { data } = await axiosInstance.put('/api/auth/profile', {
        name,
        email,
        password
      });

      // 3. Update Redux and LocalStorage with the fresh data and new token
      dispatch(setCredentials(data));
      
      setMessage({ text: 'Profile successfully updated!', type: 'success' });
      setPassword(''); // Clear the password fields for security
      setConfirmPassword('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 border border-gray-200 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">User Profile</h2>
      
      {/* Status Messages */}
      {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm font-medium">{error}</div>}
      {message && (
        <div className={`p-3 rounded mb-4 text-sm font-medium ${message.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={submitHandler} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
          <input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="border-t pt-6 mt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Change Password</h3>
          <p className="text-xs text-gray-500 mb-4">Leave blank to keep your current password.</p>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
              <input 
                type="password" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-gray-900 hover:bg-black text-white font-bold py-3 px-4 rounded transition-colors disabled:opacity-50 mt-6"
        >
          {loading ? 'Updating...' : 'Update Profile'}
        </button>
      </form>
    </div>
  );
};

export default Profile;