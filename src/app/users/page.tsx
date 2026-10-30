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
  const [search,setSearch] = useState("")
  const [currentPage,setCurrentPage] = useState<number >(1)
  const [usersPerPage,setUsersPerPage] = useState<number >(3)
  const [sortOrder,setSortOrder] = useState("asc")

  //เอาไว้สำหรับค้นหาข้อมูล
  const filterUser = users.filter((user) =>{
    // user.name.toLowerCase().includes(search.toLowerCase())
    //  return true
    return user.name.toLowerCase().includes(search.toLowerCase()) || user.email.toLowerCase().includes(search.toLowerCase())
    
  })

  ///ตัวที่ไว้เรียงมากไปน้อย
  const sortedUsers = [...filterUser].sort((a,b)=> { return sortOrder === "asc"? a.name.localeCompare(b.name): b.name.localeCompare(a.name) })
  
  //pagination
  const totalPages = Math.max(1,Math.ceil(sortedUsers.length/usersPerPage))
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = sortedUsers.slice(indexOfFirstUser,indexOfLastUser)
 

  function handleDelete(id: number) {
    const del = users.filter((user) => user.id !== id);

    setUsers(del);
    const filteredAfterDelete = del.filter((user) => {
      return (
        user.name.toLowerCase().includes(search.toLowerCase())
        || user.email.toLowerCase().includes(search.toLowerCase())
      );
    });

    const newTotalPages = Math.max(
    1,
      Math.ceil(filteredAfterDelete.length / usersPerPage)
    );

    if (currentPage > newTotalPages) {
      setCurrentPage(newTotalPages);
    }

     
  
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
  function handleNext() {
    if(totalPages > currentPage){
      setCurrentPage(currentPage + 1)
    }
    
  }
  function handlePrevious() {
    if(currentPage>1){
      setCurrentPage(currentPage - 1)
    }
    
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
          {/* {users.map((user) => (
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
          ))} */}
          {currentUsers.length === 0 ?(
                  <tr>
          <td colSpan={5}>ไม่พบข้อมูล</td>
        </tr>
          ): currentUsers.map((user) => (
            
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
<br />
      <input type="text" value={search} placeholder="Search users..." onChange={(e)=> {setSearch(e.target.value); setCurrentPage(1)}} />
      <select value = {sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
        <option value="asc" >a-z</option>
        <option value="desc" >z-a</option>
      </select>
      <div>
        <button disabled={currentPage === 1} onClick={() => handlePrevious()}> prev</button>
        <p>page {currentPage} of {totalPages} page(s)</p>
          <button disabled={currentPage === totalPages} onClick={() => handleNext()}> next</button>
          
          
      </div>
      
    </div>
  );
}
