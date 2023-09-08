import { useState } from "react";
import { useNavigate } from "react-router-dom";

import LoginForm from "../../componentes/loginform/loginform";

const Login = ({ onLogin }) => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (event) => {
    const { value, name } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    const session = {
      email: form.email,
      password: form.password,
      token: 12345,
    };
    // localStorage.setItem('token', JSON.stringify(session))
    onLogin(session);
    navigate("/my-account");
  };

  return (
    <LoginForm
      handleOnChange={handleOnChange}
      handleOnSubmit={handleOnSubmit}
    />
  );
};

export default Login;
