import React, { useState } from 'react'
import "./signin.css";
import EmailIcon from '@mui/icons-material/Email';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import PersonIcon from '@mui/icons-material/Person';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';


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
    const [firstName,setFirstName]=useState("");
    const [lastName,setLastName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [confrimPassword,setConfirmPassword]=useState("");
    const [profileImage,setProfileImage]=useState();
    const [checkbox,setCheckbox]=useState(false);
    const [passwordVisible,setPasswordVisible]=useState(false);

    const handlePasswordVisibility=()=>{
        setPasswordVisible(!passwordVisible);
    }

    const handleToggleAuth=()=>{
        setSignInView(!signInView);
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setFirstName("");
        setLastName("");
    }

    const handleSiginSubmit= async (e)=>{
        e.preventDefault()
        try{
            const profileData= await axios.post('/api/auth/signin',{
                email:email,
                password:password
            })
            console.log(profileData.data);
        }catch(err){
            console.log(err);
        }
    }

    const handleSignupSubmit=async(e)=>{
        e.preventDefault();
        if(password!==confrimPassword){
            toast.error("Passwords do not match");
            return;
        }
        try{
            const response= await axios.post('/api/auth/signup',{
                firstName:firstName,
                lastName:lastName,
                email:email,
                password:password
            });
            console.log(response.data);
        }catch(err){
            console.log(err);
        }
    }


  return (
    <div className="auth-container">
        <div className="input-container">
        {signInView? (<div className='signin-container'>
            <h1>Signin</h1>
            <form onSubmit={handleSiginSubmit} className='signin-form'>
                <div className="form-control">
                    <span className="icon"><EmailIcon></EmailIcon></span>
                    <input value={email} onChange={(e)=> setEmail(e.target.value)} placeholder=''  type='email' required></input>
                    <label>Email</label>
                </div>
                <div className="form-control">
                    <span style={{cursor:"pointer"}} onClick={handlePasswordVisibility} className="icon">{passwordVisible?<VisibilityIcon></VisibilityIcon>:<VisibilityOffIcon></VisibilityOffIcon>}</span>
                    <input value={password} onChange={(e)=> setPassword(e.target.value)} placeholder='' type={passwordVisible?"text":"password"} required></input>
                    <label>Password</label>
                </div>
                <div className='forgot-password'>
                    <div>
                        <input type="checkbox"></input>
                        <span>remember me</span>
                    </div>
                    <span><Link to="forgot-password">Forgot password?</Link></span>
                </div>
                <button className="form-submit" type="submit">Signin</button>
            </form>
        </div> ):(
            <div className='signup-container'>
            <h1>Signup</h1>
            <form onSubmit={handleSignupSubmit} className='signup-form'>
                <div className="form-control">
                    <span className="icon"><PersonIcon></PersonIcon></span>
                    <input value={firstName} onChange={(e)=> setFirstName(e.target.value)} placeholder=''  type='text' required></input>
                    <label>Firstname</label>
                </div>
                <div className="form-control">
                    <span className="icon"><PersonIcon></PersonIcon></span>
                    <input value={lastName} onChange={(e)=> setLastName(e.target.value)} placeholder=''  type='text' required></input>
                    <label>Lastname</label>
                </div>
                <div className="form-control">
                    <span className="icon"><EmailIcon></EmailIcon></span>
                    <input value={email} onChange={(e)=> setEmail(e.target.value)} placeholder=''  type='email' required></input>
                    <label>Email</label>
                </div>
                <div className="form-control">
                    <span onClick={handlePasswordVisibility} style={{cursor:"pointer"}} className="icon">{passwordVisible?<VisibilityIcon></VisibilityIcon>:<VisibilityOffIcon></VisibilityOffIcon>}</span>
                    <input value={password} onChange={(e)=> setPassword(e.target.value)} placeholder=''  type={passwordVisible?"text":"password"} required></input>
                    <label>Password</label>
                </div>
                <div className="form-control">
                    <span onClick={handlePasswordVisibility} style={{cursor:"pointer"}} className="icon">{passwordVisible?<VisibilityIcon></VisibilityIcon>:<VisibilityOffIcon></VisibilityOffIcon>}</span>
                    <input value={confrimPassword} onChange={(e)=> setConfirmPassword(e.target.value)} placeholder=''  type={passwordVisible?"text":"password"} required></input>
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

