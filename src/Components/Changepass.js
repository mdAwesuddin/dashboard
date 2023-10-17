import React,{useState} from 'react'
import './Changepass.css';

const Changepass = () => {
  const[pass1,setPass1]=useState("");
  const[pass2,setPass2]=useState("");
  const[cpass,setCpass]=useState("");
  let[perror1,setPerror1]=useState("");
  let[perror2,setPerror2]=useState("");
  let[perror3,setPerror3]=useState("");
  const userData = JSON.parse(localStorage.getItem('data'));
  const fetchurl =`http://localhost:3500/api/v1/app/user/${userData._id}`
  const validpass=userData.password;
  const validfname=userData.firstName;
  const validlname=userData.lastName;
  const validmail=userData.email;
  const valid_id=userData._id;
  var cpass1;
  var cpass2;
  var ppass1;
  var validpasslocal;
    function validationpassword(){
    if(pass1===""){
    setPerror1('');
    cpass1=false;
     return false;
   }
   
   else{
    setPerror1("");
    cpass1=true;
   return true;
   }
   }
   function validationpassword1(){
    if(!pass2.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/)){
    setPerror2('Please Enter a Valid Passowrd');
    cpass2=false;
     return false;
   }
   else{
    setPerror2("");
    cpass2=true;
   return true;
   }
   }
   function passwordhandler(){
    if(pass1===validpass){
      setPerror1("")
      validpasslocal=true;
    }else{
      setPerror1("Password Incorrect")
      validpasslocal=false;
    }
   }
   function validationpassword2(){
    if(!cpass.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/)){
    setPerror3('Please Enter a Valid Passowrd');
    ppass1=false;
     return false;
   }
   else{
    setPerror3("");
    ppass1=true;
    return true;
   }
   }
   const postData={
    _id:valid_id,
    firstName:validfname,
    lastName:validlname,
    email:validmail,
    password:cpass

   }
  function validation(event){
    event.preventDefault()
    passwordhandler();
    
    if ( pass2 != cpass) {
        setPerror3('Password Doesnt Match');
        return false;
    }
   
   else if(pass1.length<=0&&pass2.length<=0 && cpass.length<=0){
        setPerror1('Field Should not be Empty');
        setPerror2('Field Should not be Empty');
        setPerror3('Field Should not be Empty');
        return false;
    }
    else if(pass2.length<=0 && cpass.length<=0){
      setPerror2('Field Should not be Empty');
      setPerror3('Field Should not be Empty');
      return false;
  } 
    else if(!pass1 ){
      setPerror1('Field Should not be Empty');   
      
  } 
    // window.open('welcome.html');
    else{
    if(validpasslocal){
      const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      };

      fetch(fetchurl, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        {
          localStorage.setItem('data', JSON.stringify(postData));
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
    setCpass("");
    setPass1("");
    setPass2("");
    
    });
    return true;
  }
  }
  //else if( pass2 != cpass){
  //   setPerror3('Password Doesnt Match');
  //       return false;
  // } else if(!pass1 ){
  //         setPerror1('Field Should not be Empty');   
  // }
  //  else if(pass2.length<=0 && cpass.length<=0){
  //         setPerror2('Field Should not be Empty');
  //         setPerror3('Field Should not be Empty');
  //         return false;
  //     }  
    }
  
  return (
    <div>
    {/* <nav class="navbar">
    <h3 class="logo">LOGO</h3>
    <div class="Home-main">
    <a class="Home-link" href="ds.html">Home</a>
    <div class="dropdown">
        <button class="dropbtn"><i class="fa-solid fa-user"></i>Awesuddin<i class="fa fa-caret-down"></i></button>
        <div class="dropdown-content">
            <a href="profile.html"><i class="fa-solid fa-user" style={{paddingright: "5px"}}></i>Profile</a>
            <a href="change-password.html"><i class="fa-solid fa-lock" style={{paddingright: "5px"}}></i>Change Password</a>
            <a href="index.html"><i class="fa-solid fa-right-from-bracket" style={{paddingright: "5px"}}></i>Logout</a>
        </div>
    </div>
    </div>
</nav> */}
    <div class="container2">
        <div class="login" id="login">
          <div class="title"><span>Change Password</span></div>
          <form action="#" onSubmit={validation}>
            <div class="row" id="row">
                <i class="fas fa-lock"></i>
                <input type="password" placeholder="Current Password" id="pass-field" value={pass1} onChange={(e)=>setPass1(e.target.value)} onInput={validationpassword} />
                <span id="errormsg5">{perror1}</span>
              </div>
            <div class="row" id="row2">
              <i class="fas fa-lock"></i>
              <input type="password" placeholder="New Password" id="pass-field1" value={pass2} onChange={(e)=>setPass2(e.target.value)} onInput={validationpassword1} />
              <span id="errormsg7">{perror2}</span>
              <ul id="requirements">
                <p>Password Should contain</p>
                <li>Atleast one or two numbers</li>
                <li>Atleast one or two Special Symbols</li>
                <li>Atleast 6 characters</li>
              </ul>
            </div>
            <div class="row">
              <i class="fas fa-lock"></i>
              <input type="password" placeholder="Confirm Password" id="pass-field2" value={cpass} onChange={(e)=>setCpass(e.target.value)} onInput={validationpassword2} />
              <span id="errormsg6">{perror3}</span>
            </div>
            <div class="row button">
              <input type="submit" id="open-popup" value="Submit" />
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
            <p>Password Changed Successfully</p>
          </div>
        </div>
      </div>
      </div>
  )
}

export default Changepass