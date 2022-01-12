import {  useState } from "react";


function BoatsByHName({facade,  setErrorMessage }) {


  const init = {  name : "" };
  const [boats, setBoats] = useState(init);
const updateList= (data)=>{
  setBoats(data)
}

  const performGet = (evt) =>
  {
      evt.preventDefault();
      facade.getBoat("harbour/" + evt.target.name,updateList, setErrorMessage)
  }
  const onChange = (evt) =>
  {
      setBoats({ ...boats, [evt.target.id]: evt.target.value })
  }




  return (

    <div>
      <div>
            <table className="table table-light">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Brand</th>
                        <th>Make</th>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
     
                </tbody>
            </table>
        </div>

        <form onChange={onChange}>
        
        <input placeholder="name" id="name" />
        <button onClick={performGet}>Search</button>
      </form>

    </div>
  );
}
export default BoatsByHName;