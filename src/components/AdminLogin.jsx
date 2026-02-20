
import {useContext}  from "react";
import Login, { Render } from "react-login-page";
import Logo from "react-login-page/logo";

import useForm from "../hooks/useForm";
import { AuthContext } from "./context/AuthContext";


export default function AdminLogin() {

  const { login } = useContext(AuthContext);

  const submitHandler = async (values) => {
    try {
      await login(values.email, values.password);
    } catch (err) {
      alert("Login failed");
    }
  };

  const { values, onChange, onSubmit, onReset } = useForm(submitHandler, {
    email: "",
    password: "",
  });

  return (
    <div style={{ marginLeft: "15em", marginTop: "7em" }}>
      <form onSubmit={onSubmit}>
        <Login>
          <Render>
            {({ fields, buttons, blocks }) => (
              <div>
                {blocks.logo} {blocks.title}

                <div>
                  <label>{fields.email}</label>
                </div>

                <div>
                  <label>{fields.password}</label>
                </div>

                <div>
                  {buttons.submit}
                  {buttons.reset}
                </div>
              </div>
            )}
          </Render>

          <Login.Block name="logo" tagName="span">
            <Logo />
          </Login.Block>

          <Login.Block name="title" tagName="span">
            Login
          </Login.Block>

          <Login.Input
            name="email"
            placeholder="please enter email"
            value={values.email}
            onChange={onChange}
          />

          <Login.Input
            name="password"
            type="password"
            placeholder="please enter password"
            value={values.password}
            onChange={onChange}
          />

          <Login.Button name="submit" type="submit">
            Submit
          </Login.Button>

          <Login.Button name="reset" type="reset" onClick={onReset}>
            Reset
          </Login.Button>
        </Login>
      </form>
    </div>
  );
}
