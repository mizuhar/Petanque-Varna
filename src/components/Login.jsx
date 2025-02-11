import React from 'react';
import { useContext } from 'react';
import Login, { Render } from 'react-login-page';
import Logo from 'react-login-page/logo';
import useForm from '../hooks/useForm';
import  {AuthContext}  from './context/AuthContext';



export default function LoginDemo(){

const { loginSubmitHandler } = useContext(AuthContext)

const { values,onChange,onSubmit,onReset} = useForm(loginSubmitHandler,{
    'email':"",
    'password':"",
})
console.log(values);
    return (
        <>
        <br />
        <br />
        <br />
        <form onSubmit={onSubmit}>
   <Login >
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
                {buttons.submit}
                {buttons.reset}
              </div>
            </div>
          );
        }}
      </Render>
      <Login.Block name="logo" tagName="span">
        <Logo />
      </Login.Block>
      <Login.Block name="title" tagName="span">
        Login
      </Login.Block>

      <Login.Input 
           name="email" 
           placeholder="please input email" 
           value={values['email']}
           onChange={onChange}
      />
      <Login.Input 
           name="password"
           placeholder="please enter password" 
           value={values['password']}
           onChange={onChange}
       />
      <Login.Button name="submit" type="submit" style={{marginRight:'5px',padding:"5px",cursor:'pointer'}}>
        Submit
      </Login.Button>
      <Login.Button name="reset" type="reset" onClick={onReset} style={{marginRight:'5px',padding:"5px",cursor:'pointer'}}>
        Reset
      </Login.Button>
    </Login>

    </form>
        </>
    )
}