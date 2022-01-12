import { useState } from "react";
export default function CreateUser({ create }) {
    const init = { username: "", password: "" };
    const [credentials, setCredentials] = useState(init);
   
    const createUsr = (evt) => {
      evt.preventDefault();
      create(credentials.username, credentials.password);
    }
    const onChange = (evt) => {
      setCredentials({ ...credentials,[evt.target.id]: evt.target.value })
    }
   
    return (
      <div>
        <h2>Create User</h2>
        <form onChange={onChange} >
          <input placeholder="User Name" id="username" />
          <input placeholder="Password" id="password" />
          <button onClick={createUsr}>Create</button>
        </form>
      </div>
    )
   
  }