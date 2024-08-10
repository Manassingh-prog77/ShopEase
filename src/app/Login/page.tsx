"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');
  const router = useRouter();

  const handleToggle = () => {
    setIsSignUp(!isSignUp);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSignUp && password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }
    
    setPasswordError('');
    
    const endpoint = isSignUp ? 'http://localhost:5000/api/auth/createuser' : 'http://localhost:5000/api/auth/login';
    const body = isSignUp
      ? JSON.stringify({ name, email, password })
      : JSON.stringify({ email, password });

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      if (data.message === 'Please try to Login with correct credentials') {
        setAlertMsg('Please enter valid credentials');
        setShowAlert(true);
        return;
      }

      await Cookies.set('authToken', data.authtoken, {
        expires: 7, // Cookie expires in 7 days
        path: '/',
        secure: process.env.NODE_ENV === 'production', // Only set secure flag in production
        sameSite: 'strict',
      });
      
      // Show success alert and then redirect
      setAlertMsg(isSignUp ? 'Account created successfully' : 'Logged in successfully');
      setShowAlert(true);
      
      setTimeout(() => {
        router.push('/');
      }, 3000);
      
    } catch (error) {
      console.error('Error:', error);
      setAlertMsg('Please try to login with valid credentials.');
      setShowAlert(true);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card w-100" style={{ maxWidth: '900px', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)' }}>
        <div className="row no-gutters">
          <div className={`col-md-6 d-flex align-items-center justify-content-center ${isSignUp ? 'order-md-2' : ''}`} style={{ backgroundColor: '#6c63ff', color: '#fff', transition: 'order 0.5s ease-in-out' }}>
            <div className="text-center p-5">
              <h2>{isSignUp ? 'Welcome Back!' : 'Hello, Friend!'}</h2>
              <p>{isSignUp ? 'Enter your personal details to use all of site features' : 'Register with your personal details to use all of site features'}</p>
              <button className="btn btn-outline-light" onClick={handleToggle}>{isSignUp ? 'Sign In' : 'Sign Up'}</button>
            </div>
          </div>
          <div className={`col-md-6 d-flex align-items-center justify-content-center ${isSignUp ? '' : 'order-md-2'}`} style={{ transition: 'order 0.5s ease-in-out' }}>
            <div className="p-5 w-100" style={{ maxWidth: '380px' }}>
              <h3 className="text-center">{isSignUp ? 'Create Account' : 'Sign In'}</h3>
              <p className="text-center mb-4">or use your email {isSignUp ? 'for registration' : 'to sign in'}</p>
              {showAlert && (
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                  {alertMsg}
                  <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
              )}
              <form onSubmit={handleSubmit}>
                {isSignUp && (
                  <div className="form-group mb-4">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                )}
                <div className="form-group mb-4">
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group mb-4">
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {isSignUp && (
                  <>
                    <div className="form-group mb-4">
                      <input
                        type="password"
                        className="form-control form-control-lg"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                    {passwordError && <div className="alert alert-danger">{passwordError}</div>}
                  </>
                )}
                <button type="submit" className="btn btn-primary btn-block btn-lg mb-3">{isSignUp ? 'Sign Up' : 'Sign In'}</button>
                {!isSignUp && <p className="text-center mt-3"><a href="#">Forgot your password?</a></p>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
