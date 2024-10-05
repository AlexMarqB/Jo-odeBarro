import React, { useState } from "react";

import { useAuth } from "../../contexts/loginContext";

const LoginForm = () => {

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const {login, user, navigate} = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    login({email, password});

    if(user) {
      console.log('Logado com sucesso')
      navigate('/dashboard')
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" onClick={handleSubmit} className="btn btn-primary w-100">
       Login
      </button>
    </form>
  );
};

export default LoginForm;
