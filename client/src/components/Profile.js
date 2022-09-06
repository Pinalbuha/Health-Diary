import {  useEffect, useState ,useContext} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import { Link, useHistory, useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import { UserContext } from "./UserContext";

const Profile = () => {
    const { user, isAuthenticated } = useAuth0();
    const navigate = useNavigate();
    const [formData , setFormData] = useState(null);
    const [statusMessage, setStatusMessage]= useState("")
    const {historyData, setHistoryData} =useContext(UserContext);

    const handleChange = (name, value) => {
        setFormData({...formData, [name]: value});
        console.log(formData)
    };

    

    useEffect(() => {
      { isAuthenticated &&
      fetch(`/api/users/${user.email}`)
      .then((res) => res.json())
      .then(data => {
        setFormData({...formData, address:data.data.address ,blood_group:data.data.blood_group, age:data.data.age,birthdate:data.data.birthdate ,phone:data.data.phone, postal:data.data.postal, sex:data.data.sex, height:data.data.height, weight:data.data.weight, city:data.data.city})
        })
      .catch(err => {console.log(err)})
      }},[isAuthenticated])


    const handleSubmit =(e) => {
      e.preventDefault();
      fetch("/api/add-users", {
        method: "POST",
        headers: {
          Accept:"application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({...formData, email:user.email, name:user.name, firstname:user.given_name, lastname:user.family_name} ),
      })
      .then((res) => res.json())
      .then((data) => { console.log(data)})
      .catch((err) => {console.log(err)})
      }
    console.log(user)
    return (
      <div>
        {isAuthenticated &&  formData &&
        <div>
          <StyledForm onSubmit={ handleSubmit}>
            <div className="main">
              <div className="mainDiv"  >
                
                <div className="subHead">
                  {/* <h3>User Profile</h3> */}
                  <h3><img src={user.picture} className="img"/> {` ${user.given_name}'s Profile`}</h3>
                  
              </div>
              {/* { user.given_name === undefined ? <h1 className="secondMain">{`Hello ${user.nickname.toUpperCase()}`}</h1> :
            <h1 className="secondMain">{`Hello ${user.given_name}`}</h1> }
            <p className="para">This is your profile page</p> */}
            </div>
            <div className="formDetails">
            <h3 className="formHeading">Personal Information</h3>
            <div className="subForm">
              <div className="firstInput">
                <div className="input">
                <label for="fname">User name:</label>
          
                <input type="text" placeholder="Enter Your Name" name={"name"} value={user.name}  onChange={(e) => handleChange("name",e.target.value)}/>
                </div>
                <div className="input">
                <label for="fname">Email:</label>
                <input type="email" placeholder="Enter Email" value={user.email} name={"email" }onChange={(e) => handleChange("email",e.target.value)}/>
                </div>
            </div>
            <div className="firstInput">
                <div className="input">
                <label for="fname">First name:</label>
          
                <input type="text" placeholder="Enter Your First Name" name={"givenname"} value={user.given_name}  onChange={(e) => handleChange("givenname",e.target.value)}/>
                </div>
                <div className="input">
                <label for="fname">Last name:</label>
                <input type="text" placeholder="Enter Your last name" value={user.family_name} name={"familyname" }onChange={(e) => handleChange("familyname",e.target.value)}/>
                </div>
            </div>
            <div className="firstInput">
            <div className="input">
            <label for="fname">Enter Sex</label>
            <input type="text" placeholder="Enter Sex"  name={"sex"} value = {formData.gender} onChange={(e) => handleChange("sex",e.target.value)}/>
            </div>
                <div className="input">
                <label for="fname">Enter Age</label>
                <input type="number" placeholder="Enter Age"  name={"age"} value = {formData.age} onChange={(e) => handleChange("age",e.target.value)}/>
                </div>
            </div>
            <div className="firstInput">
                <div className="input">
                <label for="fname">Enter Height</label>
            <input type="number" placeholder="Enter Height"  name={"height"} value = {formData.height} onChange={(e) => handleChange("height",e.target.value)} />
                </div>
                <div className="input">
                <label for="fname">Enter Weight</label>
            <input type="number" placeholder="Enter Weight" name={"weight"} value = {formData.weight} onChange={(e) => handleChange("weight",e.target.value)}/>
                </div>
            </div>
            <div className="firstInput">
                <div className="input">
                <label for="fname">Enter Blood Group</label>
            <input type="text" placeholder="Enter blood group"  name={"blood_group"} value = {formData.blood_group} onChange={(e) => handleChange("blood_group",e.target.value)} />
                </div>
                
            </div>
            <br></br>
            <h3 className="formHeading">Contact Information</h3>
            <div className="firstInput">
                <div className="input">
                <label for="fname">Phone no:</label>
                <input type="number" placeholder="Enter Phone"  name={"phone"} value = {formData.phone} onChange={(e) => handleChange("phone",e.target.value)}/>
                </div>
                <div className="input">
                <label for="fname">Postal code</label>
                <input type="text" placeholder="Enter Zip"  name={"postal"} value = {formData.postal} onChange={(e) => handleChange("postal",e.target.value)}/>
                </div>
          </div>
          <div className="firstInput">
                <div className="input">
                  <label for="fname">Enter City</label>
                  <input type="text" placeholder="Enter City" name={"city"} value = {formData.city} onChange={(e) => handleChange("city",e.target.value)}/>
                </div>
                <div className="input">
                <label for="fname">Enter Address</label>
            <input type="text" placeholder="Enter Address" name={"address" } value={formData.address} onChange={(e) => handleChange("address",e.target.value)}/>
      
                </div>
          </div>
          <div className="firstInput">
                <div className="input">
                  <label for="fname">Enter Birth Date</label>
                  <input type="date"  name={"birthdate"} value = {formData.birthdate} onChange={(e) => handleChange("birthdate",e.target.value)}/>
                </div>
                
          </div>
            
            
            
      
                      <div>
              {formData === ""  ? <button className="button" type="Submit" >Submit</button> :
              <button className="button" type="Submit" >Update</button> }

            </div>
            </div>
            
            </div>
            <div className="userInfo"> 
            
            <img className="image" src={user.picture} />
            <div>
              <h3 className="formHeading">Your Medical Info</h3>
              <div>
                    {historyData && <div>
                        {historyData.map(history => {
                            return 
                            <div>{history.vaccine.map(vac => {
                                return (
                                    <div>{vac}</div>
                                )
                            })}</div>
                            
                        })}
                    </div> }

              </div>
              <Link to="/medical" >Click here to get more details</Link>


            </div>
          </div>
          

            </div>
          </StyledForm>
        </div>
      // ): (<div><h3>Sign In to use this feature</h3></div>
    }
      </div>
  )};

export default Profile;

const StyledForm = styled.form`


.mainDiv{
  
  display: flex;
  flex-direction: column;
  font-size: 20px;
  font-weight: bold;
  height: 150vh;
  color: white;
  /* position: relative; */
/* background: rgb(63,94,251);
background: radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(4,6,24,1) 100%); */
background: linear-gradient(180deg, hsla(112, 23%, 40%, 1) 22%, hsla(42, 100%, 66%, 1) 100%);

}




.subHead{
  color: #DCB13B;
  padding: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
}

.subHead h3{
  display: flex;
  gap: 5px;
  align-items: center;
  
}

.img{
  border-radius: 50%;
  width: 50px;
}

.formHeading{
  font-size: 25px;
  display: flex;
  
}
.secondMain{
  display:flex;
  padding: 5px;
  padding-top: 100px;
  color: white;
  align-items: center;
  justify-content: center;
}

.para{
display: flex;
align-items: center;
justify-content: center;
}

.userInfo{
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  width:400px;
  position: absolute;
  
  transform: translate(950px, -850px);
  height:400px;
  box-shadow: 1px 1px 5px 3px #B8BAD6;
  background-color: #DCB13B;
  border: 5px solid #072b04;
}

.image{
  width:200px;
  height: 200px;
  border-radius: 50% ;
  transform: translate(100px, -60px);
  
}

.formDetails{
  border: 5px solid #072b04;
  display: flex;
  flex-direction: column;
  width:800px;
  
  position: absolute;
  transform: translate(50px, -850px);
  /* background-color: white; */
  border-radius: 15px;
  padding: 15px;
  box-shadow: 1px 1px 5px 3px #B8BAD6;
  background-color: #DCB13B;
  
}

.formDetails input{
  padding: 10px;
  border: 1px solid lightgray;
  border-radius: 5px;
  gap:5px;
  
}
.formDetails label{
  
  font-size: 20px;
  color: #072b04;
  display: flex;
  width: 50%;
  
  
}

.input{
  display: flex;
  flex-direction: column;
  width: 50%;
  
}

.subForm{
  
  display: flex;
  flex-direction: column;
  gap:10px;
}

.firstInput{
  
  display: flex;
  gap: 30px;
}

a{
  text-decoration: none;
  color:#072b04;
  font-size: 20px;
}

.button{
  font-size: 20px;
  margin-top: 10px;
  background-color: #072b04;
  border: none;
  border-radius: 5px;
  padding: 10px;
  color: white;
  width:200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

`;

