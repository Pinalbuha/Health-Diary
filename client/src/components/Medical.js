import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import {format} from 'date-fns';
import { UserContext } from "./UserContext";


const Medical = () => {
    const { user, isAuthenticated } = useAuth0();
    const [medicalHistorys, setMedicalHistorys] =  useState(null);
    const {historyData, setHistoryData} =useContext(UserContext);
    const[medicineData, setMedicineData] = useState([]);
    const [check, setCheck] = useState({ disease: [] });
    const [medicineCheck, setmedicineCheck] = useState({ vaccine: [] });

    //Function for success message
    const handleSuccessMessage = () => {
        window.alert("Succesful")
    }
    //Function for input message
    const handleChange = (name, value) => {
        setMedicalHistorys({...medicalHistorys, [name]: value})
        setMedicineData({...medicineData, [name]: value})
    }
    // function for health Issues checkbox
    const handleCheckbox = (e) => {
        const { value, checked} =e.target
        console.log(`${value} is ${checked}`)
        const { disease } = check;
        if(checked){
            setCheck({
                disease: [...disease, value],
            })
        }else{
            setCheck({
                disease: disease.filter((e) => e !== value),
            })
        }
    }

// function for Immunizations checkbox
    const handleMedicineCheckbox = (e) => {
        const { value, checked} =e.target
        console.log(`${value} is ${checked}`)
        const { vaccine } = medicineCheck;
        if(checked){
            setmedicineCheck({
                vaccine: [...vaccine, value],
            })
        }else{
            setmedicineCheck({
                vaccine: vaccine.filter((e) => e !== value),
            })
        }
    }

    //Function for posting the data
    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`/api/addHistory`, {
            method: "POST",
            headers: {
                Accept:"application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({...medicalHistorys,email:user.email ,...check, ...medicineData, ...medicineCheck} ),
        })
        .then((res) => res.json())
        .then((data) => {
            setHistoryData([...historyData, data.data ])
        })
        .catch((err) => {console.log(err)})
        }

    //fetching the history data based on user email
    useEffect(() => {
        { isAuthenticated &&
        fetch(`/api/get-history/${user.email}`)
        .then(res => res.json())
        .then(data => {
            setHistoryData(data.data)
        })
        }
    },[isAuthenticated])
    
    return(
        <Wrapper>
            
            <h1 className="heading">Medical History</h1>
            <div className="subDiv">
                <form onSubmit={handleSubmit}>
                    <div className="mainDiv">
                    <div className="medical">
                    <h2 className="heading">Medical Data</h2>
                    <div className="underline"></div>
                    <Input type="text" name={"history"} onChange={(e) => handleChange("history",e.target.value)} ></Input>
                    {/* <input type="file" /> */}
                    <div className="underline"></div>
                    <h2>Health Issues:</h2>
                    <div className="underline"></div>
                    <p>Please click the boxes if you ever had ,or do have any of the following disease </p>
                    <div className="underline"></div>
                    <div className="checkboxes">
                        <div className="check">
                            <input type="checkbox" value="Anemia" name={"disease"} onChange={handleCheckbox} />
                            <label >Anemia</label>
                            <input type="checkbox" value="High Blood Pressure" name={"disease"}  onChange={ handleCheckbox} />
                            <label >High Blood Pressure</label>
                            <input type="checkbox"value="Diabetes" name={"disease"} onChange={handleCheckbox} />
                            <label >Diabetes</label>
                            <input type="checkbox" value="Asthama" name={"disease"} onChange={handleCheckbox} />
                            <label >Asthama</label>
                            <input type="checkbox" value="Anxiety" name={"disease"} onChange={handleCheckbox} />
                            <label >Anxiety</label>
                        </div>
                        <div className="check">
                            <input type="checkbox" value="Chicken Pox" name={"disease"} onChange={handleCheckbox} />
                            <label >Chicken pox</label>
                            <input type="checkbox" value="Eye Issues" name={"disease"} onChange={handleCheckbox} />
                            <label >Eye Issues</label>
                            <input type="checkbox" value="Skin Issues" name={"disease"} onChange={handleCheckbox} />
                            <label >Skin Issues</label>
                            <input type="checkbox" value="Lung Issues" name={"disease"} onChange={handleCheckbox} />
                            <label >Lung Issues</label>
                            <input type="checkbox" value="Chest Pain" name={"disease"} onChange={handleCheckbox} />
                            <label >Chest pain</label>
                        </div>
                        <div className="check">
                            <input type="checkbox" value="Stroke/Paralysis" name={"disease"} onChange={handleCheckbox} />
                            <label >Stroke/Paralysis</label>
                            <input type="checkbox" value="Thyroid" name={"disease"} onChange={handleCheckbox} />
                            <label >Thyroid</label>
                            <input type="checkbox" value="Drug/Alcohol Addiction" name={"disease"} onChange={handleCheckbox} />
                            <label >Drug/Alcohol Addiction</label>
                        </div>   
                            
                        
                    </div>
                    {/* <div className="underline"></div>
                    <input type="date" name={"date"} onChange={(e) => handleChange("date",e.target.value)}></input> */}
                    <div className="underline"></div>
                    
                    <button type="Submit" onClick={handleSuccessMessage} className="button">Submit</button>

                    <div className="underline"></div>

                    <Link to="/">Click Here To Search For Doctors</Link>

                    <div className="underline"></div>

                
                    {historyData && <div className="details">
                        {historyData.map(history => {
                            return <div>
                            <div>{history.history}</div>
                            <div>{history.disease.map(dis => {
                                return(
                                    <div>{dis}</div>
                                )
                            })}</div>
                            </div>
                        })}
                    </div> }
                    </div>
                    <div className="medicine">
                    <h2 className="heading">Prescription data</h2>
                    <div className="underline"></div>
                    <Input type="text" name={"medicine"} onChange={(e) => handleChange("medicine",e.target.value)} ></Input>
                    <div className="underline"></div>
                    <h2>Immunizations:</h2>
                    <div className="underline"></div>
                    <p>Please click the boxes if you have taken any of the vaccines below</p>
                    <div className="underline"></div>
                    <div className="checkboxes">
                    <div className="check">
                    <input type="checkbox" value="Hepatitis A" name={"vaccine"} onChange={handleMedicineCheckbox} />
                    <label >Hepatitis A</label>
                    <input type="checkbox" value="Hepatitis B" name={"vaccine"} onChange={handleMedicineCheckbox} />
                    <label >Hepatitis B</label>
                    <input type="checkbox" value="Covid Dose 1" name={"vaccine"} onChange={handleMedicineCheckbox} />
                    <label >Covid Dose 1</label>
                    </div>
                    <div className="check">
                    <input type="checkbox" value="Influenza" name={"vaccine"} onChange={handleMedicineCheckbox} />
                    <label >Influenza</label>
                    <input type="checkbox" value="Covid Dose 2" name={"vaccine"} onChange={handleMedicineCheckbox} />
                    <label >Covid Dose 2</label>
                    <input type="checkbox" value="Tetanus" name={"vaccine"} onChange={handleMedicineCheckbox} />
                    <label >Tetanus</label>
                    </div>
                    <div className="check">
                    <input type="checkbox" value="MMR" name={"vaccine"} onChange={handleMedicineCheckbox} />
                    <label >MMR</label>
                    <input type="checkbox" value="Varicella" name={"vaccine"} onChange={handleMedicineCheckbox} />
                    <label >Varicella</label>
                    <input type="checkbox" value="Meningococcal" name={"vaccine"} onChange={handleMedicineCheckbox} />
                    <label >Meningococcal</label>
                    </div>

                            </div>
                            {/* <div className="underline"></div>
                            <input type="date" name={"date"} onChange={(e) => handleChange("date",e.target.value)}></input> */}
                            <div className="underline"></div>
                    {/* <button type="Submit"  className="button">Submit</button> */}
                    {/* <div className="underline"></div> */}
                    <div className="details">
                    {historyData && <div>
                        {historyData.map(medicine => {
                            return <div>
                            {/* <span>{date}</span> */}
                            
                            <div>{medicine.medicine}</div>
                            <div>{medicine.vaccine.map(vac => {
                                return (
                                    <div>{vac}</div>
                                )
                            })}</div>
                            </div>
                        })}
                    </div> }

                    </div>
                    </div>
                    </div>
                    
                    
                    
                </form>
                
            </div>
            
        </Wrapper>
    )


}

export default Medical;

const Wrapper = styled.div`
background: linear-gradient(180deg, hsla(112, 23%, 40%, 1) 22%, hsla(42, 100%, 66%, 1) 100%);
display: flex;
flex-direction: column;
align-items: center;
/* justify-content: center; */
gap:15px;

height: 100vh;
.subDiv{
    margin-bottom: 25;
}
.mainDiv{
    background-color: #DCB13B;
    border: 5px solid #072b04;
    display: flex;
    padding: 20px;
    justify-content: center;
    
    gap:50px;
    border-radius: 15px;
    box-shadow: 1px 1px 5px 3px #B8BAD6;
   
}

.underline{
    border: 1px solid #072b04;
}

.heading{
    
    padding: 10px;
}

.medicine{
    
    display: flex;
    flex-direction: column;
    width: 600px;
    padding: 10px;
    gap:10px;

}

.medical{
    
    display: flex;
    flex-direction: column;
    width: 600px;
    padding: 10px;
    gap:10px;
}

a{
    text-decoration: none;
    font-size: 20px;
    color: #072b04;
}

.checkboxes{
    
    display: flex;
    /* justify-content: start; */
    flex-direction: column;
    /* flex-wrap: wrap; */
    gap:10px;
}

.check{
    
    display: flex;
    /* align-items: center; */
    gap:5px;
    flex-wrap: wrap;
    /* flex-direction: column; */
}

.button{
display: flex;
width: 100px;
font-size: 20px;
background-color: #072b04;
color: white;
border: none;
padding: 5px;
border-radius: 15px;
align-items: center;
justify-content: center;

}

.details{
    font-size: 20px;
}

`;

const Input = styled.input`
display: flex;
width: 100%;
height: 70px;
border-radius: 10px;
font-size: 20px;
`;