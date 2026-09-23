// pages/migrated-repo/Login.tsx
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { RegistrationForm } from './RegistrationForm';

const Login = () => {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const response = fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          history.push('/welcome');
        } else {
          setError(data.error);
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        </label>
        <button type="submit">Login</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
      <p>
        Don't have an account? <Link to="/registration">Register</Link>
      </p>
    </div>
  );
};

export default Login;
// pages/migrated-repo/Registration.tsx
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { RegistrationForm } from './RegistrationForm';

const Registration = () => {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const response = fetch('/registration', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, passwordConfirm }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          history.push('/welcome');
        } else {
          setError(data.error);
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div>
      <h1>Registration</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        </label>
        <label>
          Confirm Password:
          <input type="password" value={passwordConfirm} onChange={(event) => setPasswordConfirm(event.target.value)} />
        </label>
        <button type="submit">Register</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Registration;
// pages/migrated-repo/Welcome.tsx
import React from 'react';

const Welcome = () => {
  return (
    <div>
      <h1>Welcome!</h1>
      <p>
        You have successfully logged in. <Link to="/welcome">View your documents</Link>
      </p>
    </div>
  );
};

export default Welcome;
// services/auth.service.ts
import { fetch } from 'isomorphic-unfetch';

const authService = {
  login: async (username, password) => {
    const response = await fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    return data.success;
  },
  register: async (username, password, passwordConfirm) => {
    const response = await fetch('/registration', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, passwordConfirm }),
    });
    const data = await response.json();
    return data.success;
  },
};

export default authService;
// src/types/document.ts
export interface Document {
  id: number;
  title: string;
  link: string;
  description: string;
  userId: number;
}

// src/types/role.ts
export interface Role {
  id: number;
  name: string;
  users: User[];
}

// src/types/user.ts
export interface User {
  id: number;
  username: string;
  password: string;
  passwordConfirm: string;
  roles: Role[];
}
// src/components/RegistrationForm.tsx
import React, { useState } from 'react';

const RegistrationForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const response = fetch('/registration', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, passwordConfirm }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setError(null);
        } else {
          setError(data.error);
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
      </label>
      <label>
        Confirm Password:
        <input type="password" value={passwordConfirm} onChange={(event) => setPasswordConfirm(event.target.value)} />
      </label>
      <button type="submit">Register</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default RegistrationForm;
// src/components/LoginForm.tsx
import React, { useState } from 'react';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const response = fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setError(null);
        } else {
          setError(data.error);
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
      </label>
      <button type="submit">Login</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default LoginForm;