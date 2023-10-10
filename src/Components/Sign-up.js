import React,{useState} from 'react'
import './Signup.css';
import { NavLink,useNavigate } from 'react-router-dom';


const Signup = () => {
  const[fname,setFname]=useState("");
  const[lname,setLname]=useState("");
  const[mail,setMail]=useState("");
  let[ferror,setFerror]=useState("");
  let[lerror,setLerror]=useState("");
  let[mailerror,setMailerror]=useState("");
  const navigate=useNavigate();

  var validfnamedata;
  var validlnamedata;
  var validmaildata;
  
  const checkmail=()=>{
      
      if(mail.trim()===""){
          setMailerror("");
          validmaildata=false;
      }else if(!mail.match(/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)){
          setMailerror("Please Enter a Valid Email ");
          validmaildata=false;
      }else{
          setMailerror("");
          validmaildata=true;
      }
  }

  const checkfname=()=>{
     
      if(fname.trim()===""){
          setFerror("");
          validfnamedata=false;
         }
         else{
          setFerror("");
          validfnamedata=true;
     }
  }
  const checklname=()=>{
     
    if(lname.trim()===""){
        setLerror("");
        validlnamedata=false;
       }
       else{
        setLerror("");
        validlnamedata=true;
   }
}
   function validation(event){
    event.preventDefault();
     checkfname();
     checklname();
     checkmail();
     
     if (

      validmaildata &&
  
      validfnamedata &&
  
      validlnamedata
  
    ) {
  
      event.preventDefault();
      // window.open('password','_self');
      navigate('/password');
    }else if (validmaildata && validfnamedata) {
      event.preventDefault();
  
     setLerror("This field is required");
     
     }else if (validmaildata && validlnamedata) {
      event.preventDefault();
  
     setFerror("This field is required");
     
     } else if (validfnamedata && validlnamedata) {
      event.preventDefault();
  
      setMailerror("This field is required");
     
     } else if (validmaildata) {
      event.preventDefault();
  
      setFerror("This field is required");
  
      setLerror("This field is required");
  
      event.preventDefault();
  
    } else if (validfnamedata) {
      event.preventDefault();
  
      setMailerror("Please Enter a Valid Email");
  
      setLerror("This field is required");
  
      event.preventDefault();
  
    } else if (validlnamedata) {
      event.preventDefault();
  
      setMailerror("Please Enter a Valid Email");
  
      setFerror("This field is required");
  
      event.preventDefault();
  
    }
  
    else {
      // alert("Please fill all the details")
        event.preventDefault();
        setFerror("This field is required");
  
        setLerror("This field is required");
        setMailerror("This field is required");
  
    }
  
   }
  return (
    <div class="container3">
      <div class="login1">
        <div class="title"><span>SIGN UP</span></div>
        <form action="#"  onSubmit={validation} >
          <div class="main">
            <div class="row">
                <i class="fas fa-user"></i>
                <input type="text" placeholder="FirstName" id="f-name" value={fname} onChange={(e)=>setFname(e.target.value)} onInput={checkfname}/>
                <span id="error-msg">{ferror}</span>
              </div>
              <div class="row">
                <i class="fas fa-user"></i>
                <input type="text" placeholder="LastName" id="l-name" value={lname} onChange={(e)=>setLname(e.target.value)} onInput={checklname}/>
                <span id="error1-msg">{lerror}</span>
              </div>
          <div class="row">
            <i class="fas fa-at"></i>
            <input type="text" placeholder="Email" id="email-field" value={mail} onChange={(e)=>setMail(e.target.value)} onInput={checkmail}/>
            <span id="error2-msg">{mailerror}</span>
          </div>
          <div class="row button">
            <input type="submit" value="Create Password"  />
          </div>
          <div class="signup-link">Already have an account? <NavLink to={"/"}>Login</NavLink></div>
          </div>
       
        <div class="bottom1">
             
          <p class="bttext">Sign up with Social Media</p>
         
          <div class="icons1">
              <div class="fab fa-twitter-square"></div>
              <div class="fab fa-instagram"></div>
              <div class="fab fa-facebook-square"></div>
      </div>
      </div>
    </form>
      </div>
    </div>
  )
}

export default Signup