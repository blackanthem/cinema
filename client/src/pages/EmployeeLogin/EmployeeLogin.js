import Button from "../../components/Button/Button";
import TextField from "../../components/Inputs/TextField";
import "./EmployeeLogin.scss";

export default function EmployeeLogin() {
  return (
    <div className="employee-login page two-columns d-sidepadding d-toppadding">
      <section className="login-form two-columns__left">
       <div>
       <h1>employee login</h1>
        <TextField label="Code" />
        <TextField label="Password" type="password" />
       </div>

       <Button text="Login" />
      </section>
    </div>
  );
}
