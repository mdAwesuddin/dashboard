import React,{useState} from 'react'
import './Forgotpass.css';
import { NavLink } from 'react-router-dom';
import {useNavigate } from 'react-router-dom';

const Forgotpass = () => {
    const[mail,setMail]=useState("");
    let[error,setError]=useState("");
    const navigate=useNavigate();


       function validation(event){
        event.preventDefault();
        validateemail();
        if(mail.length<=0){
        setError('Field Should not be Empty');
          return false;
        }
        else if(!mail.match(/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)){
        setError('');
          return false;
        }
       else {
        setError("");
        document.querySelector(".popup").classList.add("active");
        document.querySelector(".popup .close-btn").addEventListener("click",function(){
        document.querySelector(".popup").classList.remove("active");
        // window.location.reload();
        navigate('/')
        // window.open('login','_self');
        });
        return true;
      }
      }
      function validateemail(){
        
        if(!mail.match(/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)){
        setError('Please Enter a Valid Email');
          return false;
        }
        else{
        setError("");
        return true;
        }
       }
  return (
    <div class="container " >
        <div class="login">
          <div class="title"><span>Reset Password!</span></div>
          <form action="#" onSubmit={validation}>
            <div class="row">
                <i class="fas fa-envelope"></i>
                <input type="text" placeholder="Enter your Email" id="email-field" value={mail} onChange={(e)=>setMail(e.target.value)} onKeyUp={validateemail}/>
                <span id="error-msg">{error}</span>
              </div>
            <div class="row button">
              <input type="submit" value="Reset" onclick="validation(event)"/>
            </div>
            <div class="signup-link">Don't have an account? <NavLink to={"/signup"}>Sign up now</NavLink></div>

          </form>
        </div>
        <div class="popup">
          <div class="head">
            <div class="icon">
              <div class="btn">
                <button class="close-btn">&times;</button>
                 </div>
              <div class="box">
                <i class="fa fa-check"></i>
              </div>
            </div>
          </div>
          <div class="body">
            <h1>Success</h1>
            <p>Password Reset link has been sent to your email</p>
          </div>
        </div>
      </div>
  )
}

export default Forgotpass