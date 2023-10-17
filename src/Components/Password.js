import React,{useState} from 'react'
import './Password.css';
import {useLocation, useNavigate } from 'react-router-dom';

const Password = () => {
    const fetchUrl="http://localhost:3500/api/v1/app/user";
    const[pass1,setPass1]=useState("");
    const[pass2,setPass2]=useState("");
    let[passerror1,setPasserror1]=useState("");
    let[passerror2,setPasserror2]=useState("");
    const navigate=useNavigate();
    const location = useLocation();
    const fname=location?.state?.fname;
    const lname=location?.state?.lname;
    const mail=location?.state?.mail;
    const postdata={
      firstName:fname,
      lastName:lname,
      email:mail,
      password:pass2
    }
    function validationpassword(){
        if(!pass1.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/)){
            setPasserror1('Please Enter a Valid Password');
         return false;
       }
       
       else{
        setPasserror1("");
       return true;
       }
       }
       function validationpassword1(){
        if(!pass2.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/)){
        setPasserror2('Please Enter a Valid Passowrd');
         return false;
       }
       else{
        setPasserror2("");
       return true;
       }
       }
       function validation(event){
        event.preventDefault();
        if (pass1 != pass2) {
            setPasserror2('Password Doesnt Match');
            return false;
        }
        else if(pass1.length<=0 && pass2.length<=0){
            setPasserror1('Fields Should not be Empty');
            setPasserror2('Fields Should not be Empty');
            return false;
        }
        // window.open('welcome.html');
        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postdata),
        };
  
        fetch(fetchUrl, requestOptions)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            {
              console.log("done!");

            }
            console.log(data)
          })
          .catch((error) => {
            console.error("POST request error:", error);
          });
        document.querySelector(".popup").classList.add("active");
        document.querySelector(".popup .close-btn").addEventListener("click",function(){
        document.querySelector(".popup").classList.remove("active");
       
        // location.reload();
        // window.location.reload()
        navigate('/');
        });
        return true;
    }
  return (
    <div class="container">
      <div class="login" id="login">
        <div class="title"><span>Create Password</span></div>
        <form action="#" onSubmit={validation}>
          <div class="row" id="row2">
            <i class="fas fa-lock"></i>
            <input type="password" placeholder="Enter Password" id="pass-field" onInput={validationpassword} value={pass1} onChange={(e)=>setPass1(e.target.value)}/>
            <span id="errormsg5">{passerror1}</span>
            <ul id="requirements">
              <p>Password Should contain</p>
              <li>Atleast one or two numbers</li>
              <li>Atleast one or two Special Symbols</li>
              <li>Atleast 6 characters</li>
            </ul>
          </div>
          <div class="row">
            <i class="fas fa-lock"></i>
            <input type="password" placeholder="Confirm Password" id="pass-field1" onInput={validationpassword1} value={pass2} onChange={(e)=>setPass2(e.target.value)}/>
            <span id="errormsg6">{passerror2}</span>
          </div>
          <div class="row button">
            <input type="submit" id="open-popup" value="SIGN UP" />
          </div>
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
          <p>Successfully created Account</p>
        </div>
      </div>
    </div>
  )
}

export default Password