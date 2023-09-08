import "./loginform.css";

import React from "react";

const LoginForm = ({ handleOnChange, handleOnSubmit }) => {
  return (
    <form className="container mt-5">
      <h1 className="font-weight-bold text-center">Login</h1>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Username
        </label>
        <input
          onChange={handleOnChange}
          type="text"
          name="email"
          className="form-control custom-input mx-auto"
          placeholder="Enter your username"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          onChange={handleOnChange}
          type="password"
          name="password"
          className="form-control custom-input mx-auto"
          placeholder="Enter your password"
        />
      </div>
      <button onClick={handleOnSubmit} className="btn btn-primary btn-block">
        Sign In
      </button>
    </form>
  );
};

export default LoginForm;
