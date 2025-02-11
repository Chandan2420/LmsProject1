import React, { useState } from 'react';
import axios from 'axios';
import './AddInstitute.css';

const InstituteRegistrationForm = () => {
  const [formData, setFormData] = useState({
    instituteName: '',
    instituteCode: '',
    instituteType: '',
    affiliation: '',
    email: '',
    phone: '',
    website: '',
    streetAddress: '',
    city: '',
    postalCode: '',
    contactPersonName: '',
    contactPersonRole: '',
    contactEmail: '',
    contactPhone: '',
    username: '',
    password: '',
    confirmPassword: '',
    numberOfStudents: '',
    numberOfInstructors: '',
    logo: null,
    termsAccepted: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    const data = new FormData();
    Object.keys(formData).forEach(key => {
      data.append(key, formData[key]);
    });

    try {
      const response = await axios.post('http://localhost:5000/api/institutes', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Institute registered successfully!');
      console.log('Server Response:', response.data);
    } catch (error) {
      console.error(error);
      alert('Registration failed.');
    }
  };

  return (
    <div className="form-container">
      < div className="form-box">
      <h2 className="form-title">Institute Registration</h2>
      <form onSubmit={handleSubmit} className="form-content">
        <input name="instituteName" type="text" placeholder="Institute Name" value={formData.instituteName} onChange={handleChange} required className="p-2 border rounded" />
        <input name="instituteCode" type="text" placeholder="Institute Code" value={formData.instituteCode} onChange={handleChange} required className="p-2 border rounded" />
        <input name="instituteType" type="text" placeholder="Type of Institute" value={formData.instituteType} onChange={handleChange} className="p-2 border rounded" />
        <input name="affiliation" type="text" placeholder="Affiliation/Accreditation" value={formData.affiliation} onChange={handleChange} className="p-2 border rounded" />

        <input name="email" type="email" placeholder="Official Email" value={formData.email} onChange={handleChange} required className="p-2 border rounded" />
        <input name="phone" type="text" placeholder="Phone Number" value={formData.phone} onChange={handleChange} className="p-2 border rounded" />
        <input name="website" type="url" placeholder="Website (Optional)" value={formData.website} onChange={handleChange} className="p-2 border rounded" />

        <input name="streetAddress" type="text" placeholder="Street Address" value={formData.streetAddress} onChange={handleChange} className="p-2 border rounded" />
        <input name="city" type="text" placeholder="City" value={formData.city} onChange={handleChange} className="p-2 border rounded" />
        <input name="postalCode" type="text" placeholder="Postal/ZIP Code" value={formData.postalCode} onChange={handleChange} className="p-2 border rounded" />

        <h3>Contact Person Details</h3>
        <input name="contactPersonName" type="text" placeholder="Full Name" value={formData.contactPersonName} onChange={handleChange} required className="p-2 border rounded" />
        <input name="contactPersonRole" type="text" placeholder="Designation/Role" value={formData.contactPersonRole} onChange={handleChange} className="p-2 border rounded" />
        <input name="contactEmail" type="email" placeholder="Contact Email" value={formData.contactEmail} onChange={handleChange} required className="p-2 border rounded" />
        <input name="contactPhone" type="text" placeholder="Contact Phone Number" value={formData.contactPhone} onChange={handleChange} className="p-2 border rounded" />

        <h3>Account Credentials</h3>
        <input name="username" type="text" placeholder="Username" value={formData.username} onChange={handleChange} required className="p-2 border rounded" />
        <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} required className="p-2 border rounded" />
        <input name="confirmPassword" type="password" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required className="p-2 border rounded" />

        <h3>Additional Information</h3>
        <input name="numberOfStudents" type="number" placeholder="Number of Students" value={formData.numberOfStudents} onChange={handleChange} className="p-2 border rounded" />
        <input name="numberOfInstructors" type="number" placeholder="Number of Instructors" value={formData.numberOfInstructors} onChange={handleChange} className="p-2 border rounded" />
        
        <h3>Add Logo</h3>
        <input name="logo" type="file"  accept="image/*" onChange={handleChange} />

        <label className="flex items-center">
          <input name="termsAccepted" type="checkbox" checked={formData.termsAccepted} onChange={handleChange} required />
          I agree to the terms and conditions.
        </label>

        <button type="submit">Register Institute</button>
      </form>
      </div>
    </div>
  );
};

export default InstituteRegistrationForm;
