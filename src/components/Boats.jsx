import React,{useState,useEffect} from 'react';




function Boats({facade, errorMessage, setErrorMessage }) {
const [boats,setBoats] = useState([])
const [boat,setBoat]= useState({id:"",name:"",address:"",phone:""});

const updateList = (data) => {
   console.log(data)
    setBoats(data)
    console.log(data)
};

useEffect(()=> {
    facade.fetchData("harbour/allboats", updateList, setErrorMessage);
},[facade,setErrorMessage]);




return(
    <div>
    <table className="table table-striped">
    <thead>
        <tr>
            <th>Id</th>
            <th>Brand</th>
            <th>Make</th>
            <th>Name</th>
        </tr>
    </thead>
    <tbody>
{boats.map((boat) => (<tr key={boat.id}>
    <td>{boat.b_id}</td>
    <td>{boat.brand}</td>
    <td>{boat.make}</td>
    <td>{boat.name}</td>
    </tr>))}
    </tbody>
</table>
</div>

);
}
export default Boats;