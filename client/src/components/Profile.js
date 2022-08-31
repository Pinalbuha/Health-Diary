import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import { useHistory, useParams } from "react-router-dom";
import { useNavigate } from "react-router";

const Profile = () => {
    const { user, isAuthenticated } = useAuth0();
    const navigate = useNavigate();
        const [formData , setFormData] = useState(null);
        const [statusMessage, setStatusMessage]= useState("")

    const handleChange = (name, value) => {
        setFormData({...formData, [name]: value});
        console.log()
        console.log(formData)
    };

    const handleSubmit =(e) => {
      console.log(e)
        e.preventDefault();
      console.log("submit")
        fetch("/api/add-users", {
            method: "POST",
            headers: {
                Accept:"application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({...formData, email:user.email, name:user.name} ),

        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
        })
        .catch((err) => {console.log(err)})
   
     }
     console.log(user)
    return (
       isAuthenticated && (
        <div>
          <StyledForm onSubmit={ handleSubmit}>
            
            <div className="formDetails">
            <h2>Profile Details</h2>
            <label for="fname">First name:</label>
          
            <input type="text" placeholder="Enter Your Name" name={"name"} value={user.name}  onChange={(e) => handleChange("name",e.target.value)}/>
            
            <label for="fname">Email:</label>
            <input type="email" placeholder="Enter Email" value={user.email} name={"email" }onChange={(e) => handleChange("email",e.target.value)}/>
            
            <label for="fname">Phone no:</label>
            <input type="number" placeholder="Enter Phone"  name={"phone"} onChange={(e) => handleChange("phone",e.target.value)}/>
            <label for="fname">Enter Age</label>
            <input type="number" placeholder="Enter Age"  name={"age" }onChange={(e) => handleChange("age",e.target.value)}/>
            <label for="fname">Enter Gender</label>
            <input type="text" placeholder="Enter Gender"  name={"gender"} onChange={(e) => handleChange("gender",e.target.value)}/>
            <label for="fname">Enter Height</label>
            <input type="number" placeholder="Enter Height"  name={"height"} onChange={(e) => handleChange("height",e.target.value)} />
            <label for="fname">Enter Weight</label>
            <input type="number" placeholder="Enter Weight" name={"weight"}  onChange={(e) => handleChange("weight",e.target.value)}/>
            <label for="fname">Enter City</label>
            <input type="text" placeholder="Enter City" name={"city"}  onChange={(e) => handleChange("city",e.target.value)}/>
            <label for="fname">Enter Address</label>
            <input type="text" placeholder="Enter Address" name={"address" } onChange={(e) => handleChange("address",e.target.value)}/>
            <div >
              
              <button className="button" type="Submit">Submit</button> 
              <button className="button" type="Submit" >Update</button>
              
              

            </div>
            </div>



            
          </StyledForm>
        </div>
      )
     );
  };

export default Profile;

const StyledForm = styled.form`

display: flex;
align-items: center;
justify-content: center;
padding: 10px;
font-size: 25px;

.formDetails{
  border: 5px solid black;
  display: flex;
  flex-direction: column;
  width:400px;
  
  padding: 10px;
}

.formDetails input{
  padding: 10px;
}

.button{
  font-size: 30px;
  margin-top: 10px;
  background-color: blue;
  border: none;
  border-radius: 5px;
  margin-left: 5px;
}

`;

