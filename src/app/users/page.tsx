"use client";

import { useState } from "react";

const initialUsers = [
  { id: 1, name: "John", email: "john@gmail.com" },
  { id: 2, name: "Jane", email: "jane@gmail.com" },
  { id: 3, name: "Bob", email: "bob@gmail.com" },
];

export default function UsersPage() {
  const [users, setUsers] = useState(initialUsers);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState({
  name: "",
  email: "",
});
  const [edit, setEdit] = useState<number | null>(null);
  function handleDelete(id: number) {
    const del = users.filter((user) => user.id !== id);

    setUsers(del);
  }
  function validateUser(name: string, email: string) {

     const newErrors = {
    name: "",
    email: "",
  };

    if(name.trim() === ""){
      
      newErrors.name =  "pls insert name"
    }
    if(email.trim() === ""){
     
      newErrors.email = "pls insert email"
    }else if(!email.trim().includes("@")){
       
      newErrors.email =  "pls insert email correctly"
    }
    return newErrors
  }
  function handleAdd(name: string, email: string) {

    const valid = validateUser(name,email)

    setError(valid)

    if(valid.name !== "" || valid.email !== ""){
       
       return
    }
   
    const ids = users.map((id) => id.id);
    const userId = Math.max(0, ...ids) + 1;
    const newUser = {
      id: userId,
      name,
      email,
    };
    setUsers([...users, newUser]);
    setName("");
    setEmail("");
    setError({
  name: "",
  email: "",
});
  }
  function handleCancel(){
    setName("")
    setEmail("")
    setEdit(null)
    setError({
  name: "",
  email: "",
});
  }
  function handleEdit(id : number,name : string,email :string){
   setEdit(id)
   setName(name)
   setEmail(email)
   setError({
  name: "",
  email: "",
});
  }
  function handleUpdate(){

    if(edit === null){
      return
    }
    
    const valid = validateUser(name,email)

    setError(valid)

    if(valid.name !== "" || valid.email !== ""){
       
       return
    }
    
  
    // if(!email.includes(".co")){
    //    setError("pls put atleast .co")
    //   return error
    // }
    
    const updateData = users.map((user) =>{
      if(user.id === edit){
        return {...user,name,email}
      }
    
      return user
     
      
    })
      setUsers(updateData);
      handleCancel()
      
  }
  return (
    <div>
      <h1>user management</h1>
      <p>This is user page</p>
      <p>จำนวนผู้ใช้: {users.length}</p>
      <p>ผู้ใช้: {users.map((user) => user.name).join(",")}</p>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>name</th>
            <th>Email</th>
            <th>Action</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>

              <td>
                <button onClick={() => handleDelete(user.id)}>ลบ</button>
              </td>
              <td>
                <button onClick={() => handleEdit(user.id,user.name,user.email)}>แก้ไข</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      name :
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <p>{error.name}</p>
      <br />
      email :
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <p>{error.email}</p>
      {edit === null ?  <button onClick={() => handleAdd(name, email)}> add user </button>: <> <button onClick={handleUpdate} > save </button> <button onClick={()=>handleCancel()}> cancel </button></>}
    </div>
  );
}
