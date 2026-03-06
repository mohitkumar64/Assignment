import './registerpage.css';
import { useState } from 'react';
import axios from 'axios';

export function RegisterPage() {

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student'
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.name || !form.email || !form.password || !form.role) {
      setError('All fields are required');
      return;
    }

    try {
      setLoading(true);

      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/register`,
        form,
        { withCredentials: true }
      );

      window.location.href = '/';
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
      console.log(err);
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="body-r">
      <div className="main-section-r">

        <div className="Heading-r">
          <h1>Create Account</h1>
          <p>Register to book or manage appointments</p>
        </div>

        <div className="form-r">
          <form onSubmit={handleSubmit}>

            <div className="fix-mr">
              <label>Full Name</label>
              <div className="input-r">
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="fix-mr">
              <label>Email</label>
              <div className="input-r">
                <input
                  type="email"
                  autoComplete='username'
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="fix-mr">
              <label>Password</label>
              <div className="input-r">
                <input
                  type="password"
                  name="password"
                  autoComplete='current-password'
                  value={form.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            

            {error && <p className="text-red-600 mt-2">{error}</p>}

            <button className="register-btn" disabled={loading}>
              {loading ? 'Creating account...' : 'Register'}
            </button>

            <p className="already">
              Already have an account? <a href="/login">Login</a>
            </p>

          </form>
        </div>

      </div>
    </div>
  );
}
