import React,{useState,useEffect} from 'react';




function Oners({facade, errorMessage, setErrorMessage }) {
const [onwers,setOwners] = useState([])
const [owner,setOwner]= useState({id:"",name:"",address:"",phone:""});

const updateList = (data) => {
   console.log(data)
    setOwners(data)
    console.log(data)
};

useEffect(()=> {
    facade.fetchData("harbour/all", updateList, setErrorMessage);
},[facade,setErrorMessage]);


const handleInput = (event) => {
    setOwner({ ...owner, [event.target.id]: event.target.value })
}

return(
    <div>
    <table className="table table-striped">
    <thead>
        <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Address</th>
            <th>Phone</th>
        </tr>
    </thead>
    <tbody>
{onwers.map((owner) => (<tr key={owner.id}>
    <td>{owner.id}</td>
    <td>{owner.name}</td>
    <td>{owner.address}</td>
    <td>{owner.phone}</td>
    </tr>))}
    </tbody>
</table>
</div>

);
}
export default Oners;