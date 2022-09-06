import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import {format} from 'date-fns';
import { UserContext } from "./UserContext";


const Medical = () => {
    const { user, isAuthenticated } = useAuth0();
    const [medicalHistorys, setMedicalHistorys] =  useState(null);
    // const [historyData, setHistoryData] = useState([]);
    const {historyData, setHistoryData} =useContext(UserContext);
    const[medicineData, setMedicineData] = useState([]);
    const [check, setCheck] = useState({ disease: [] });
    const [medicineCheck, setmedicineCheck] = useState({ vaccine: [] });
    const current = new Date();
    const date = `${current.getDate()}-${current.getMonth()+1}-${current.getFullYear()}`;
    //const date = format(new Date(),"h:m a . MMM d yyyy .")

    const handleChange = (name, value) => {
        setMedicalHistorys({...medicalHistorys, [name]: value})
        setMedicineData({...medicineData, [name]: value})
    }

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
    console.log("check", medicineCheck)
    
    const handleSubmit = (e) => {
        e.preventDefault();
        
        fetch(`/api/addHistory`, {
            method: "POST",
            headers: {
                Accept:"application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({...medicalHistorys,email:user.email, date:date ,...check, ...medicineData, ...medicineCheck} ),

        })
        .then((res) => res.json())
        .then((data) => {
            setHistoryData([...historyData, data.data ])
        })
        .catch((err) => {console.log(err)})
        
    }

    useEffect(() => {
        { isAuthenticated &&
        fetch(`/api/get-history/${user.email}`)
        .then(res => res.json())
        .then(data => {
            setHistoryData(data.data)
        })
        }
    },[isAuthenticated])

    console.log(historyData)
    
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
                    <div className="underline"></div>
                    <h2>Health Issues:</h2>
                    <div className="underline"></div>
                    <p>Please click the boxes if you ever had ,or do have any of the following disease </p>
                    <div className="underline"></div>
                    <div className="checkboxes">
                        <div className="check">
                            <input type="checkbox" value="anemia" name={"disease"} onChange={handleCheckbox} />
                            <label >Anemia</label>
                            <input type="checkbox" value="blood-pressure" name={"disease"}  onChange={ handleCheckbox} />
                            <label >Blood Pressure</label>
                            <input type="checkbox"value="diabetes" name={"disease"} onChange={handleCheckbox} />
                            <label >Diabetes</label>
                            <input type="checkbox" value="asthama" name={"disease"} onChange={handleCheckbox} />
                            <label >Asthama</label>
                            <input type="checkbox" value="anxiety" name={"disease"} onChange={handleCheckbox} />
                            <label >Anxiety</label>
                        </div>
                        <div className="check">
                            <input type="checkbox" value="chicken_pox" name={"disease"} onChange={handleCheckbox} />
                            <label >Chicken pox</label>
                            <input type="checkbox" value="eye" name={"disease"} onChange={handleCheckbox} />
                            <label >Eye problem</label>
                            <input type="checkbox" value="skin" name={"disease"} onChange={handleCheckbox} />
                            <label >Skin problems</label>
                            <input type="checkbox" value="lung" name={"disease"} onChange={handleCheckbox} />
                            <label >Lung problems</label>
                            <input type="checkbox" value="chest" name={"disease"} onChange={handleCheckbox} />
                            <label >Chest pain</label>
                        </div>
                        <div className="check">
                            <input type="checkbox" value="stroke" name={"disease"} onChange={handleCheckbox} />
                            <label >Stroke or paralysis</label>
                            <input type="checkbox" value="thyroid" name={"disease"} onChange={handleCheckbox} />
                            <label >Thyroid</label>
                            <input type="checkbox" value="drug" name={"disease"} onChange={handleCheckbox} />
                            <label >Drug or Alcohol dependency</label>
                        </div>   
                            
                        
                    </div>
                    <div className="underline"></div>
                    
                    <button type="Submit" className="button">Submit</button>

                    <div className="underline"></div>

                    <Link to="/">Click Here To Search For Doctors</Link>

                    <div className="underline"></div>

                
                    {historyData && <div className="details">
                        {historyData.map(history => {
                            return <div>
                            {/* <span>{date}</span> */}
                            
                            {/* <div>{history.history}</div> */}
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
                    <input type="checkbox" value="hepatitis_a" name={"vaccine"} onChange={handleMedicineCheckbox} />
                    <label >Hepatitis A</label>
                    <input type="checkbox" value="hepatitis_b" name={"vaccine"} onChange={handleMedicineCheckbox} />
                    <label >Hepatitis B</label>
                    <input type="checkbox" value="covid" name={"vaccine"} onChange={handleMedicineCheckbox} />
                    <label >Covid</label>
                            </div>
                            </div>
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
    /* background: radial-gradient(circle at 50% 50%, #7fe386, #6fe09b, #5eddb9, #4ed4da, #3d9fd7, #2c61d4, #2928c5, #5424b5); */
   
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