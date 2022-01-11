import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import TextField from "../../components/Inputs/TextField";
import { useLoginMutation } from "../../services/api";
import { login } from "../../store/authSlice";
import "./EmployeeLogin.scss";

export default function EmployeeLogin() {
  const [signIn, { error: fetchError, status, data }] = useLoginMutation();
  const [credentials, setCredentials] = useState({ code: "", password: "" });
  const [error, setErrorState] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setErrorState(false);

    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleClick = () => {
    signIn(credentials)
      .unwrap()
      .then((res) => {
        dispatch(login());
        navigate("/auth")
      })
      .catch(() => {
        setErrorState(true);
      });
  };

  const loginFormClasses = () => {
    let classList = "login-form two-columns__left";
    if (error) classList += " error";
    return classList;
  };

  return (
    <div className="employee-login page two-columns d-sidepadding d-toppadding">
      <section className={loginFormClasses()}>
        <div>
          <h1>employee login</h1>
          <TextField
            label="code"
            onChange={(e) => handleChange(e)}
            value={credentials.code}
          />
          <TextField
            label="password"
            type="password"
            onChange={(e) => handleChange(e)}
            value={credentials.password}
          />
        </div>

        <Button text="Login" onClick={() => handleClick()} />
      </section>
      {status}
    </div>
  );
}
