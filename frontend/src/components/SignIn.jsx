import React, { useState } from 'react'
import "./signin.css";
import EmailIcon from '@mui/icons-material/Email';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PersonIcon from '@mui/icons-material/Person';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';



const SignIn = () => {
    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
      });

    const [signInView,setSignInView]=useState(true);

    const handleToggleAuth=()=>{
        console.log(signInView);
        setSignInView(!signInView);
    }


  return (
    <div className="auth-container">
        <div className="input-container">
        {signInView? (<div className='signin-container'>
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
                <button className="form-submit" type="submit">Signin</button>
            </form>
        </div> ):(
            <div className='signup-container'>
            <h1>Signup</h1>
            <form className='signup-form'>
                <div className="form-control">
                    <span className="icon"><PersonIcon></PersonIcon></span>
                    <input placeholder=''  type='text' required></input>
                    <label>Firstname</label>
                </div>
                <div className="form-control">
                    <span className="icon"><PersonIcon></PersonIcon></span>
                    <input placeholder=''  type='text' required></input>
                    <label>Lastname</label>
                </div>
                <div className="form-control">
                    <span className="icon"><EmailIcon></EmailIcon></span>
                    <input placeholder=''  type='email' required></input>
                    <label>Email</label>
                </div>
                <div className="form-control">
                    <span className="icon"><VisibilityIcon></VisibilityIcon></span>
                    <input placeholder=''  type='password' required></input>
                    <label>Password</label>
                </div>
                <div className="form-control">
                    <span className="icon"><VisibilityIcon></VisibilityIcon></span>
                    <input placeholder=''  type='password' required></input>
                    <label>Confirm password</label>
                </div>
                <div className="image-form-control">
                    <label htmlFor="profile-image" className="image-upload">
                        Upload Profile Image
                    </label>
                    <Button
                        component="label"
                        variant="contained"
                        tabIndex={-1}
                        startIcon={<CloudUploadIcon />}
                        className='uploadImage-button'
                    >
                        Upload file
                        <VisuallyHiddenInput type="file" accept="image/*" />
                    </Button>
                </div>
                <button className="form-submit" type="submit">Signup</button>
            </form>
        </div>
        )} 
        
        </div>
        <div className='view-container'>
        <button onClick={handleToggleAuth}>change</button>
        </div>
    </div>
  )
}

export default SignIn

