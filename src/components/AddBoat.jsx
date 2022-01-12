import { useState } from "react";

export default function AddBoat({ facade,  setErrorMessage })
{
    
    const init = { beand: "", make: "" , name : "" };
    const [addCredentials, setAddCredentials] = useState(init);

    const performAdd = (evt) =>
    {
       
        facade.AddBoat(addCredentials.brand, addCredentials.make, addCredentials.name, setErrorMessage)
    }
    const onChange = (evt) =>
    {
        setAddCredentials({ ...addCredentials, [evt.target.id]: evt.target.value })
    }



    return (
        <div style={{textAlign:"center"}}>
            <h2>Add Boat</h2>
            <form onChange={onChange} >
                <input placeholder="beand" id="brand">Brand</input><br/><br/>
                <input placeholder="make" id="make" >Make</input><br/><br/>
                <input placeholder="name" id="name" >Name</input><br/><br/>
                <button onClick={performAdd}  >Add Boat</button>
            </form>
        </div>
    )

}