import React, { useEffect, useState } from 'react';
import './InstitutesPages.css';

const InstitutesPages = () => {
  const [institutes, setInstitutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchInstitutes();
  }, []);

  const fetchInstitutes = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/institutes');
      const data = await response.json();
      setInstitutes(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching institutes:', error);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this institute?")) {
      try {
        const response = await fetch(`http://localhost:5000/api/institutes/${id}`, {
          method: 'DELETE',
        });
        const data = await response.json();
        alert(data.message);
        setInstitutes(institutes.filter(institute => institute._id !== id));
      } catch (error) {
        console.error('Error deleting institute:', error);
      }
    }
  };

  const handleEdit = async (institute) => {
    const newName = prompt("Enter new Institute Name:", institute.instituteName);
    const newEmail = prompt("Enter new Email:", institute.email);
    const newCode = prompt("Enter new Institute Code:", institute.instituteCode);
    const newType = prompt("Enter new Institute Type:", institute.instituteType);
    const newPhone = prompt("Enter new Phone Number:", institute.phone);
    const newWebsite = prompt("Enter new Website URL:", institute.website);
    const newStreetAddress = prompt("Enter new Street Address:", institute.streetAddress);
    const newCity = prompt("Enter new City:", institute.city);
    const newPostalCode = prompt("Enter new Postal Code:", institute.postalCode);
    const newUsername = prompt("Enter new Username:", institute.username);

    if (!newName || !newCode || !newType || !newPhone || !newWebsite || !newStreetAddress || !newCity || !newPostalCode || !newEmail || !newUsername) {
      alert("All fields are required!");
      return;
    }

    const updatedInstitute = {
      ...institute,
      instituteName: newName,
      instituteCode: newCode,
      instituteType: newType,
      phone: newPhone,
      website: newWebsite,
      streetAddress: newStreetAddress,
      city: newCity,
      postalCode: newPostalCode,
      email: newEmail,
      username: newUsername,
    };

    try {
      const response = await fetch(`http://localhost:5000/api/institutes/${institute._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedInstitute),
      });

      const data = await response.json();
      setInstitutes(institutes.map(inst => inst._id === data._id ? data : inst));
    } catch (error) {
      console.error('Error updating institute:', error);
    }
  };

  const filteredInstitutes = institutes.filter(institute =>
    institute.instituteName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <p>Loading institutes...</p>;
  }

  return (
    <div className="institutes-wrapper">
      <h2 className="institutes-header">Institutes List</h2>
      <input
        type="text"
        placeholder="Search by Institute Name..."
        className="institutes-search-bar"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <hr className="institutesdivider-line" />
      <div className="institutes-container">
        {filteredInstitutes.map((institute) => (
          <div key={institute._id} className="institute-card">
            <h3>{institute.instituteName}</h3>
            <p><strong>Code:</strong> {institute.instituteCode}</p>
            <p><strong>Type:</strong> {institute.instituteType}</p>
            <p><strong>Phone:</strong> {institute.phone}</p>
            <p><strong>Website:</strong> {institute.website}</p>
            <p><strong>Address:</strong> {institute.streetAddress}, {institute.city}, {institute.postalCode}</p>
            <p><strong>Email:</strong> {institute.email}</p>
            <p><strong>Username:</strong> {institute.username}</p>

            <button className="edit-btn" onClick={() => handleEdit(institute)}>Edit</button>
            <button className="delete-btn" onClick={() => handleDelete(institute._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InstitutesPages;
