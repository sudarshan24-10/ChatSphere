import React from 'react'
import "./signin.css";
import EmailIcon from '@mui/icons-material/Email';
import VisibilityIcon from '@mui/icons-material/Visibility';


const SignIn = () => {



  return (
    <div className="auth-container">
        <div className='input-container'>
        <div className='signin-container'>
            <h1>Signin</h1>
            <form className='signin-form'>
                <div className="form-control">
                    <span className="icon"><EmailIcon></EmailIcon></span>
                    <input placeholder=''  type='text' required></input>
                    <label>Email</label>
                </div>
                <div className="form-control">
                    <span className="icon"><VisibilityIcon></VisibilityIcon></span>
                    <input placeholder='' type='passsword' required></input>
                    <label>Password</label>
                </div>
                <button className="form-submit" type="submit">Login</button>
            </form>
        </div>
        </div>
        <div className='view-container'></div>
    </div>
  )
}

export default SignIn