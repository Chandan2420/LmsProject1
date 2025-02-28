import React, { useState } from 'react';
import axios from 'axios';
import './AddInstitute.css';

const InstituteRegistrationForm = () => {
  const [formData, setFormData] = useState({
    instituteName: '',
    instituteType: '',
    phone: '',
    website: '',
    streetAddress: '',
    city: '',
    postalCode: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    logo: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, logo: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const formDataToSend = new FormData();
    for (const key in formData) {
      if (formData[key]) {
        formDataToSend.append(key, formData[key]);
      }
    }

    try {
      const response = await axios.post('http://localhost:5000/api/AddInstitutes', formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert(`Institute created successfully! Your Institute Code: ${response.data.instituteCode}`);
    } catch (error) {
      alert(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className="form-container">
      <div className="form-box">
        <h2 className="form-title">Institute Registration</h2>
        <form onSubmit={handleSubmit} className="form-content">
          <input type="text" name="instituteName" onChange={handleChange} placeholder="Institute Name" required />
          <input type="text" name="instituteType" onChange={handleChange} placeholder="Institute Type" required />
          <input type="text" name="phone" onChange={handleChange} placeholder="Phone" required />
          <input type="text" name="website" onChange={handleChange} placeholder="Website" required />
          <input type="text" name="streetAddress" onChange={handleChange} placeholder="Street Address" required />
          <input type="text" name="city" onChange={handleChange} placeholder="City" required />
          <input type="text" name="postalCode" onChange={handleChange} placeholder="Postal Code" required />
          <input type="text" name="username" onChange={handleChange} placeholder="Username" required />
          <input type="email" name="email" onChange={handleChange} placeholder="Email" required />
          <input type="password" name="password" onChange={handleChange} placeholder="Password" required />
          <input type="password" name="confirmPassword" onChange={handleChange} placeholder="Confirm Password" required />

          <h3>Add Logo (Optional)</h3>
          <input type="file" name="logo" onChange={handleFileChange} />

          <button type="submit">Register Institute</button>
        </form>
      </div>
    </div>
  );
};

export default InstituteRegistrationForm;
