import {  useState } from "react";


function OwnersByBName({facade, errorMessage, setErrorMessage }) {
  
  



  return (

    <div>
      <div>
            <table className="table table-light">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Phone</th>
                    </tr>
                </thead>
                <tbody>
       
                </tbody>
            </table>
        </div>

        <form >
        
        <input placeholder="name" id="name" />
        <button >Search</button>
      </form>

    </div>
  );
}
export default OwnersByBName;