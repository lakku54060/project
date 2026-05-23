import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function addition() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState(null);

  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:3000/stu");
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const addUser = async () => {
    if (!name) return;

    if (editingId) {
      await axios.put(`http://localhost:3000/stu/${editingId}`, { name });
      setEditingId(null);
    } else {
      await axios.post("http://localhost:3000/stu", { name });
    }

    setName("");
    fetchUsers();
  };

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:3000/stu/${id}`);
    fetchUsers();
  };

  const editUser = (user) => {
    setName(user.name);
    setEditingId(user._id);
  };

  return (
    <div className="container mt-4">
      <h2>CRUD Table</h2>

      <div className="mb-3">
        <input
          className="form-control"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button className="btn btn-primary mt-2" onClick={addUser}>
          {editingId ? "Update" : "Add"}
        </button>
      </div>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => editUser(user)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteUser(user._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default addition;
