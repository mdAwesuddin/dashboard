import React,{useState} from 'react'
import './Profile.css';

const Profile = () => {
  const userData = JSON.parse(localStorage.getItem('data'));
  console.log(userData);
  const[fname,setFname]=useState(userData.firstName);
  const[lname,setLname]=useState(userData.lastName);
  const[mail,setMail]=useState(userData.email);

  let[ferror,setFerror]=useState("");
  let[lerror,setLerror]=useState("");
  let[mailerror,setMailerror]=useState("");
  var validfnamedata;
  var validlnamedata;
  var validmaildata;
  const _id = userData._id;
  const password=userData.password;
  let url=`http://localhost:3500/api/v1/app/user/${userData._id}`;
  let updateddata={
    _id:_id,
    firstName:fname,
    lastName:lname,
    email:mail,
    password:password
  }
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
      const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateddata),
      };

      fetch(url, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        {
          localStorage.setItem('data', JSON.stringify(updateddata));
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
      // setFname("");
      // setLname("");
      // setMail("");
    });
      
    
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
    <div>
    {/* <nav className="navbar">
    <h3 className="logo">LOGO</h3>
    <div className="Home-main">
        <a className="Home-link" href="ds.html">Home</a>
    <div className="dropdown">
        <button className="dropbtn"><i className="fa-solid fa-user"></i>Awesuddin<i className="fa fa-caret-down"></i></button>
        <div className="dropdown-content">
            <a href="profile.html"><i className="fa-solid fa-user" style={{paddingright: "5px"}}></i>Profile</a>
            <a href="change-password.html"><i className="fa-solid fa-lock" style={{paddingright: "5px"}}></i>Change Password</a>
            <a href="index.html"><i className="fa-solid fa-right-from-bracket" style={{paddingright: "5px"}}></i>Logout</a>
        </div>
    </div>
    </div>
</nav> */}

    <div className="container1">
        <div className="login">
          <div className="title"><span>Profile</span></div>
          <form action="#" onSubmit={validation}>
            <div className="main">
              <div className="row">
                  <i className="fas fa-user"></i>
                  <input type="text" placeholder="FirstName" id="f-name" value={fname} onChange={(e)=>setFname(e.target.value)} onInput={checkfname} />
                  <span id="error-msg">{ferror}</span>
                </div>
                <div className="row">
                  <i className="fas fa-user"></i>
                  <input type="text" placeholder="LastName" id="l-name" value={lname} onChange={(e)=>setLname(e.target.value)} onInput={checklname}/>
                  <span id="error1-msg">{lerror}</span>
                </div>
            <div className="row">
              <i className="fas fa-at"></i>
              <input type="text" placeholder="Email" id="email-field" value={mail} onChange={(e)=>setMail(e.target.value)} onInput={checkmail} />
              <span id="error2-msg">{mailerror}</span>
            </div>
            
            <div className="row button">
              <input type="submit" value="Update" />
            </div>
            </div>
      </form>
        </div>
      </div>
      <div className="popup">
        <div className="head">
          <div className="icon">
            <div className="btn">
              <button className="close-btn">&times;</button>
               </div>
            <div className="box">
              <i className="fa fa-check"></i>
            </div>
          </div>
        </div>
        <div className="body">
          <h1>Success</h1>
          <p>Changes made Successfully</p>
        </div>
      </div>
    </div>
    
  )
}

export default Profile