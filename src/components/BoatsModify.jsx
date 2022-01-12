
import React,{useEffect,useState} from 'react';

export default function BoatsModify({facade , setErrorMessage}){

  const [boats,setBoats] = useState([])
 
  const init = { id: "b_id" };
  const [boat, setBoat] = useState(init);
  
  const updateList = (data) => {
    setBoats(data)
    
  };
  
  useEffect(()=> {
      facade.fetchData("harbour/allboats", updateList, setErrorMessage);
  },[facade,setErrorMessage]);
  



    const performDelete= (evt) =>
    {
        evt.preventDefault();
        facade.deleteboat(boat.b_id, setErrorMessage)
    }
    const onChange = (evt) =>
    {
        setBoat({ ...boat, [evt.target.b_id]: evt.target.b_id })
    }



    const performEdit= (evt) =>
    {
        evt.preventDefault();
        facade.EditBoat(boat.b_id, setErrorMessage)
    }








//const handleInput = (event) => {
  //    setBoat({ ...boat, [event.target.id]: event.target.value })
  //}
  
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
      <td>
          <form  onChange={onChange}>
<a href="xx" onClick={performEdit}>edit</a> / <a href="xx" onClick={performDelete}>delete</a>
</form>
</td>

      </tr>))}
      </tbody>
  </table>
  </div>
  
  );
  }
  