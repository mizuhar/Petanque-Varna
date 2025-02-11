import React from 'react';
import { useContext } from 'react';
import Register, { Render } from 'react-login-page';
import Logo from 'react-login-page/logo';
import useForm from '../hooks/useForm';
import * as authService from '../services/authService'
import AuthContext from './context/AuthContext';


export default function RegisterPage(){


 const { registerSubmitHandler } = useContext(AuthContext)

const { values, onChange, onSubmit,onReset } = useForm(registerSubmitHandler,{
  'email': '',
  'password':'',
  'confirmpassword':'',
})

    return (
        <>
        <br />
        <br />
        <br />
        <form onSubmit={onSubmit}>
   <Register >
      <Render>
        {({ fields, buttons, blocks}) => {
          return (
            <div>
              <header>
                {blocks.logo} {blocks.title}
              </header>
              <div>
                <label>{fields.email}</label>
              </div>
              <div>
                <label>{fields.password}</label>
              </div>
              <div>
                <label>{fields.confirmpassword}</label>
              </div>
              <div>
                {buttons.submit}
                {buttons.reset}
              </div>
            </div>
          );
        }}
      </Render>
      <Register.Block name="logo" tagName="span">
        <Logo />
      </Register.Block>
      <Register.Block name="title" tagName="span">
        Register
      </Register.Block>

      <Register.Input 
           name="email" 
           placeholder="please input email" 
           value={values['email']}
           onChange={onChange}
      />
      <br />
      <br />
      <br />
      <br />
      <Register.Input 
           name="password"
           placeholder="please enter password" 
           value={values['password']}
           onChange={onChange}
       />
       <br />
       <br />
       <br />
       <br />
      <Register.Input 
           name="confirmpassword"
           placeholder="please confirm password" 
           value={values['confirmpassword']}
           onChange={onChange}
       />
       <br />
       <br />
       <br />
       <br />
      <Register.Button name="submit" type="submit" style={{marginRight:'5px',padding:"5px",cursor:'pointer'}}>
        Submit
      </Register.Button>
      <Register.Button name="reset" type="reset" onClick={onReset} style={{marginRight:'5px',padding:"5px",cursor:'pointer'}}>
        Reset
      </Register.Button>
    </Register>

    </form>
        </>
    )
}