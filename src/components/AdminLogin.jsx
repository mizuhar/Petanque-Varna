import { useContext } from "react";
import Login, { Render } from "react-login-page";

import useForm from "../hooks/useForm";
import { AuthContext } from "./context/AuthContext";

import styles from "./AdminLogin.module.css";
import { useState } from "react";

export default function AdminLogin() {
  const { login } = useContext(AuthContext);
  const [error, setError] = useState("");

  const submitHandler = async (values) => {
    try {
      await login(values.email, values.password);
      setError('')
    } catch (err) {
      setError('Invalid email or password!')
    }
  };

  const { values, onChange, onSubmit, onReset } = useForm(submitHandler, {
    email: "",
    password: "",
  });

  return (
    <>
      <div className={styles.loginPage}>
        <div className={styles.loginCard}>
          {error && (
  <div className={styles.errorBox}>
    {error}
  </div>
)}
          <form onSubmit={onSubmit}>
            <Login>
              <Render>
                {({ fields, buttons, blocks }) => (
                  <div className={styles.loginInner}>
                    <div className={styles.loginHeader}>
                      {blocks.logo}
                      {blocks.title}
                    </div>

                    <div className={styles.field}>{fields.email}</div>

                    <div className={styles.field}>{fields.password}</div>

                    <div className={styles.actions}>
                      {buttons.submit}
                      {buttons.reset}
                    </div>
                  </div>
                )}
              </Render>

              <Login.Block name="title" tagName="h1">
                Admin Login
              </Login.Block>

              <Login.Input
                name="email"
                placeholder="Enter email"
                value={values.email}
                onChange={onChange}
              />

              <Login.Input
                name="password"
                type="password"
                placeholder="Enter password"
                value={values.password}
                onChange={onChange}
              />

              <Login.Button name="submit" type="submit">
                Login
              </Login.Button>

              <Login.Button name="reset" type="reset" onClick={onReset}>
                Reset
              </Login.Button>
            </Login>
          </form>
        </div>
      </div>
    </>
  );
}
