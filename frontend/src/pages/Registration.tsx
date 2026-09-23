// Registration component migrated from registration.jsp
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../resources/css/common.css'; // adjust path if necessary

const Registration: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [genericError, setGenericError] = useState('');

  useEffect(() => {
    document.title = 'Create an account';
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setGenericError('');
    const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('password', password);
    formData.append('passwordConfirm', passwordConfirm);
    try {
      const response = await fetch('/registration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData.toString(),
        credentials: 'include',
      });
      if (response.ok) {
        navigate('/welcome');
      } else if (response.status === 400) {
        const data = await response.json().catch(() => null);
        if (data && typeof data === 'object') {
          setErrors(data);
        } else {
          setGenericError('Validation failed. Please check your input.');
        }
      } else {
        setGenericError('An unexpected error occurred.');
      }
    } catch {
      setGenericError('Network error. Please try again.');
    }
  };

  return (
    <div>
      <header>
        <nav className="navbar navbar-expand-lg navbar-dark default-color-dark fixed-top">
          <a className="navbar-brand" href="/">App Name</a>
        </nav>
      </header>
      <div className="container" style={{ marginTop: '80px' }}>
        <form className="form-signin" onSubmit={handleSubmit}>
          <h2 className="form-signin-heading">Create your account</h2>
          <div className={`form-group ${errors.username ? 'has-error' : ''}`}>
            <input
              type="text"
              name="username"
              className="form-control"
              placeholder="Username"
              autoFocus
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
            {errors.username && <div className="text-danger">{errors.username}</div>}
          </div>
          <div className={`form-group ${errors.password ? 'has-error' : ''}`}>
            <input