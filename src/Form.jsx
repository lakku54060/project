import React, { useState } from "react";

function RegistrationForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    mobile: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    showToast("Registration Successful!");
  };

  return (
    
    <form action="/action_page.php"onSubmit={handleSubmit}>
        <div className="container-fluid">
  <div class="mb-3 mt-3">
    <label for="email" class="form-label">Email:</label>
    <input type="email" class="form-control" id="email" placeholder="Enter email" name="email"/>
  </div>
  <div class="mb-3">
    <label for="pwd" class="form-label">Password:</label>
    <input type="password" class="form-control" id="pwd" placeholder="Enter password" name="pswd"/>
  </div>
  <div class="form-check mb-3">
    <label class="form-check-label">
      <input class="form-check-input" type="checkbox" name="remember"/> Remember me
    </label>
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
  </div>
</form>
    
    
  );
}

export default RegistrationForm;
