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
  function handleDelete(id: number) {
    const del = users.filter((user) => user.id !== id);

    setUsers(del);
  }

  function handleAdd(name: string, email: string) {
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
      <br />
      email :
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={() => handleAdd(name, email)}> add user </button>
    </div>
  );
}
