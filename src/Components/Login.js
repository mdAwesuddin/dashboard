import React,{useState,useEffect} from 'react'
import { NavLink,useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const[mail,setMail]=useState("");
    const[pass,setPass]=useState("");
    let[emailerror,setemailerror]=useState("");
    let[passerror,setpasserror]=useState("");
    let[dataerror,setdataerror]=useState("");
    let[maindata,setMainData]=useState("");
    const navigate=useNavigate();
    var validmaildata;
    var validpassdata;
    let localdata;
    let matchFound;
    let fetchUrl="http://localhost:3500/api/v1/app/user";
    const requestOptions={
      method:"GET",
    }
    useEffect(() => {

      fetch(fetchUrl, requestOptions)
  
        .then((response) => {
  
          if (!response.ok) {
  
            throw new Error("Network response was not ok");
  
          }
          return response.json();
  
        })
        .then((data) => {
  
          setMainData(data);
        })
        .catch((error) => {
          console.error("GET request error:", error);
        });
  
    },[]);
    var idtake;
    function datacheck() {
        maindata.map((eachuser) => {
          const {email,password}=eachuser;
        if(email === mail && password === pass){
          matchFound = true
          localdata = eachuser;
          idtake=eachuser._id
        }
  
    });
  
    }
    const checkmail=()=>{
        
        if(mail.trim()===""){
            setemailerror("");
            setdataerror("");
            validmaildata=false;
        }else if(!mail.match(/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)){
            setemailerror("Please Enter a Valid Email ");
            validmaildata=false;
        }else{
            setemailerror("");
            setdataerror("");
            validmaildata=true;
        }
    }

    const checkpass=()=>{
       
        if(pass.trim()===""){
            setpasserror("");
            setdataerror("");
            validpassdata=false;
           }
           else{
            setpasserror("");
            setdataerror("");
            validpassdata=true;
       }
    }

    const fetchUserData = async () => {
      const response = await fetch('http://localhost:3500/api/v1/app/get'); // Replace with your API endpoint
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      return response.json();
    };

    const validation = async (event) => {
      event.preventDefault();
        checkmail();
        checkpass();
        datacheck();
        if(validmaildata&&validpassdata&&matchFound){
          localStorage.setItem('data', JSON.stringify(localdata));
              
              navigate(`/dashboard/${idtake}`);
            } else if(validmaildata&&validpassdata&&!matchFound){
              setdataerror("Invalid credentials")
            }
          // window.open('dashboard');
          // window.location.reload()
        else if(validmaildata){
          event.preventDefault();
          setpasserror("Field is required");
        }else if(validpassdata){
          event.preventDefault();
          setemailerror("Field is required");
        }else{
          event.preventDefault();
          setpasserror("Field is required");
          setemailerror("Field is required");
        }
     }
  return (
    <div className="container " >
    <div className="login1">
      <div className="title"><span>LOG IN</span></div>
      <form id="form" onSubmit={validation}>
        <div className="main">
        <div className="row">
          <i className="fas fa-user"></i>
          <input type="text" placeholder="Email" id="email-field" value={mail} onChange={(e)=>setMail(e.target.value)} onInput={checkmail} />
          <span id="error-msg">{emailerror}</span>
        </div>
        <div className="row">
          <i className="fas fa-lock"></i>
          <input type="password" placeholder="Password" id="pass-field" value={pass} onChange={(e)=>setPass(e.target.value)} onInput={checkpass}/>
          <span id="error1-msg">{passerror}</span>
          <span id="error1-msg">{dataerror}</span>
        </div>
        <div className="row1">
          <NavLink to={"/forgotpassword"}>Forgot Password?</NavLink>
        </div>
        <div className="row button">
          <input type="submit" value="LOGIN" />
        </div>
        <div className="signup-link">Don't have an account? <NavLink to={"/signup"}>Sign up now</NavLink></div>
      </div>
        <div className="bottom">
           
          <p className="bttext">Login with Social Media</p>
          <div className="icons">
            <div className="fab fa-twitter-square"></div>
            <div className="fab fa-instagram"></div>
            <div className="fab fa-facebook-square"></div>
      </div>
      </div>
      </form>
    </div>
  </div>

  )
}

export default Login