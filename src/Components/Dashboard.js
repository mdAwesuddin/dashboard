import React,{useRef,useState,useEffect} from 'react'
import './Ds.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faRightFromBracket  } from '@fortawesome/free-solid-svg-icons'
import { NavLink,Outlet,useNavigate } from 'react-router-dom';
const Dashboard = () => {
const navigate=useNavigate();
const fetchUrl="http://localhost:3500/api/v1/app/Dashboard";

const userData = JSON.parse(localStorage.getItem('data'));

const [formData, setFormData] = useState({
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  image: '',
});
 
const [users, setUsers] = useState([]);
const [showPopup, setShowPopup] = useState(false);
const [editMode, setEditMode] = useState(false);
const [selectedUserIndex, setSelectedUserIndex] = useState(null);
const [searchQuery, setSearchQuery] = useState('');
let[fname,setFname]=useState("");
let[lname,setLname]=useState("");
let[mail,setMail]=useState("");
let[num,setNum]=useState("");

const[toggle,setToggle]=useState(false);

let[ferror,setFerror]=useState("");
let[lerror,setLerror]=useState("");
let[mailerror,setMailerror]=useState("");
let[numerror,setNumerror]=useState("");
let[photoerror,setPhotoerror]=useState("");
// let updateddata={
//   firstName:fname,
//   lastName:lname,
//   email:mail,
//   phoneNumber:num,
//   image:image
// }
var validfnamedata;
var validlnamedata;
var validmaildata;
var validnumdata;
var validPhotoData;
var imageurl;


const checkfname=()=>{
     
    if(fname.trim()===""){
        setFerror("Field should not be empty");
        validfnamedata=false;
       }
       else{
        setFerror("");
        validfnamedata=true;
   }
}
const checklname=()=>{
     
    if(lname.trim()===""){
        setLerror("Field should not be empty");
        validlnamedata=false;
       }
       else{
        setLerror("");
        validlnamedata=true;
   }
}
const checkmail=()=>{
     
    if(mail.trim()===""){
        setMailerror("Field should not be empty");
        validmaildata=false;
       }
       else if(!mail.match(/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)){
        setMailerror("Please Enter a valid Email");
        validmaildata=false;
       }
       else{
        setMailerror("");
        validmaildata=true;
   }
}
const checknum=()=>{
     
    if (num.trim() === '') {
        setNumerror('Field should not be empty');
        validnumdata=false;
      } else {
        setNumerror('');
        validnumdata=true;
      }
}
console.log(users)
const requestOptions = {

  method: "GET",

};


useEffect(() => {
  fetch(fetchUrl, requestOptions)

    .then((response) => {

      if (!response.ok) {

        throw new Error("Network response was not ok");
      } 

      return response.json();

    })

    .then((data) => {

      setUsers(data);

    })

    .catch((error) => {

      console.error("GET request error:", error);

    });

}, []);
  const handleSubmit = (event) => {
    event.preventDefault();
    if (editMode) {
      // Update user data
      const updatedUsers = [...users];
      updatedUsers[selectedUserIndex] = { ...formData };
      setUsers(updatedUsers);
    } else {
      // Add new user
      setUsers([...users, { ...formData }]);
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
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
    }
    clearForm();
  
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData({ ...formData, image: imageUrl });
    }
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const clearForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      image: '',
    });
    setEditMode(false);
    setSelectedUserIndex(null);
    setShowPopup(false);
  };

  const renderTableHeaders = () => {
    if (filteredUsers.length > 0) {
      return (
        <tr>
          <th>Profile</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Phone Number</th>
          <th>Actions</th>
        </tr>
      );
    }
    return null; // No table headers when no data is found
  };
  
   const filteredUsers = searchQuery
    ? users.filter(
        (user) =>
          user.firstName.toLowerCase().includes(searchQuery) ||
          user.lastName.toLowerCase().includes(searchQuery) ||
          user.email.toLowerCase().includes(searchQuery) 
          // ||
          // user.phoneNumber.toLowerCase().includes(searchQuery)
      )
    : users;
  // Render user rows
  const renderUserRows = () => {
    if (searchQuery && filteredUsers.length === 0) {
      return (
        <tr>
          <td colSpan="6">No data found.</td>
        </tr>
      );
    }

    return filteredUsers.map((user, index) => (
      <tr key={user._id}>
        {/* index */}
        <td data-title="Profile">
          <img src={user.image} alt="Profile" width="80" height="80" />
        </td>
        <td data-title="First Name">{user.firstName}</td>
        <td data-title="Last Name">{user.lastName}</td>
        <td data-title="Email">{user.email}</td>
        <td data-title="Phone Number">{user.phoneNumber}</td>
        <td id="buttons" data-title="Actions">
          <button id="edit-btn" onClick={() => editUser(index)}>Edit</button>
          <button id="delete-btn"  onClick={() => deleteUser(user._id)}>Delete</button>
        </td>
      </tr>
    ));
  };
  function clear(){
  localStorage.clear();
  }
  const deleteUser = async(_id) => {
    // const updatedUsers = [...users];
    // updatedUsers.splice(index, 1);
    console.log(_id);
    try {
      await fetch(`http://localhost:3500/api/v1/app/Dashboard/${_id}`, { method: 'DELETE' });
      // Remove the deleted item from the local state
      setUsers(users.filter(item => item._id !== _id));
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const editUser = (index) => {
    setShowPopup(true);
    setEditMode(true);
    setSelectedUserIndex(index);
    const selectedUser = users[index];
    setFormData({ ...selectedUser });
  };

          function settogglevisibility(){
               setToggle(true);
          }

        function settogglevisible(){
          setToggle(false);
          navigate('/dashboard')
        }

  return (
    <>
     <nav class="navbar">
        <h3 class="logo">LOGO</h3>
        <div class="Home-main">
            <NavLink to={`/dashboard/${userData._id}`} activeClassName="active" class="Home-link"  onClick={settogglevisible}>Home</NavLink>
        <div class="dropdown">
        <button class="dropbtn">          <i className="fas fa-user"></i>
       <span class="user">{`${userData.firstName} ${userData.lastName}`}</span><i class="fa fa-caret-down"></i></button>
            <div class="dropdown-content">
                <NavLink onClick={settogglevisibility} to={`/dashboard/${userData._id}/profile`}><i class="fas fa-user" style={{paddingright: '5px'}}></i>Profile</NavLink>
                <NavLink onClick={settogglevisibility} to={`/dashboard/${userData._id}/changepassword`}><i class="fas fa-lock" style={{paddingright: '5px'}}></i>Change Password</NavLink>
                <NavLink class="" to="/" onClick={clear}><i class="fas fa-sign-out-alt" style={{paddingright: '5px'}}></i>Logout</NavLink>
            </div>
        </div>
        </div>
    </nav>
    <Outlet/>
    {toggle ? null : (
    <><div class="content">
    <div class="searchbox">
          <input type="text" id="searchInput" placeholder="Search..." onChange={handleSearch} />
          </div>
          <input type="button" value="Add-User" class="useradd" onClick={()=>setShowPopup(true)} />
        </div><div class="data">
            <br />
            <table id='data2'>
              <thead>
                {renderTableHeaders()}
              </thead>
              <tbody>
                {renderUserRows()}
              </tbody>
            </table>
             
            {showPopup && (
              <form id="user-form" onSubmit={handleSubmit}>
                 <div class="popup1">
                <div class="head1">
                  <div class="icon1">
                    <div class="btn">
                      <button class="close-btn" onClick={clearForm}>&times;</button>
                    </div>
                    <div class="box1">
                      <div class="row1">
                         <input
                         type="text"
                         placeholder="First Name"
                         name="firstName"
                         id='fname-field'
                         value={formData.firstName}
                         onChange={handleInputChange}
                          />
                        <br />
                        <span id="error-msg">{ferror}</span>
                      </div>
                      <div class="row1">
                        <input 
                          type="text" 
                          placeholder="LastName"
                           name="lastName"
                          id="lname-field" value={formData.lastName} onChange={handleInputChange}  />
                        <br />
                        <span id="error-msg1">{lerror}</span>
                      </div>
                      <div class="row1">
                        <input type="email" placeholder="Email"
                           name="email"
                          id="mail-field" value={formData.email} onChange={handleInputChange}  />
                        <br />
                        <span id="error-msg2">{mailerror}</span>
                      </div>
                      <div class="row1">
                        <input type="num" 
                          name="phoneNumber"
                          placeholder="Phone" id="num-field" value={formData.phoneNumber} onChange={handleInputChange}  />
                        <br />
                        <span id="error-msg3">{numerror}</span>
                      </div>
                      <div class="row1">
                        <img
                src={formData.image}
                alt="Image Preview"
                 id="preview-image" 
                width="250" 
              /><br />

                        <input type="file" id="image-upload" accept="image/*"  onChange={handleImageUpload} />
                        <span id="error-msg4">{photoerror}</span>
                        <br />
                      </div>
                      {editMode ? (
              
                <input type="submit" value="Update" class='adduserbtn' />
              
            ) : (
              <input type="submit" value="Add User" class='adduserbtn'  />
            )}     
                    </div>
                  </div>
                </div>
              </div>
              </form>
            )}


          </div></>
    )}
    </>
  )
  
}

export default Dashboard