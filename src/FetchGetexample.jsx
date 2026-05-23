import axios from "axios";
import { useState } from "react";
import React from "react";
import { createRoot } from 'react-dom/client'

function FetchGetexample() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  

  function registerUser()
  {
    axios.post("http://localhost:4000/stu", {
        email: email,
        password: password,
      }).then((res) => {console.log(res.data);
        showToast("Registered Successfully");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  function updateUser(id)
  {
    axios.put('http://localhost:4000/stu/'+id, {
        email: email,
        password: password,
      }).then((res) => {console.log(res.data);
        showToast("Updated Successfully");
      })
      .catch((err) => {
        console.error(err);
      });
  };


  return (
    <div className="container-fluid">
       <table border="3">
        <tr>
          <th>Email</th>
          <br/>
          <th>Password</th>
          
          <th>Action</th>
          
        </tr>
      </table>
    </div>
  );
}

export default FetchGetexample;
