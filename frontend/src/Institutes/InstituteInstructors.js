import React, { useState, useEffect } from 'react';
import './InstituteInstructors.css';

const InstituteInstructors = ({ instituteCode }) => {
  const [instructors, setInstructors] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [editingInstructor, setEditingInstructor] = useState(null);

  // Fetch instructors from the backend
  const fetchInstructors = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/fetchinstituteinstructors?instituteCode=${instituteCode}`);
      if (response.ok) {
        const data = await response.json();
        setInstructors(data);
      } else {
        console.error('Failed to fetch instructors');
      }
    } catch (error) {
      console.error('Error fetching instructors:', error);
    }
  };

  useEffect(() => {
    fetchInstructors();
  }, [instituteCode]);

  // Handle instructor addition and editing
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const method = editingInstructor ? 'PUT' : 'POST';
    const url = editingInstructor
      ? `http://localhost:5000/api/instituteinstructors/${editingInstructor._id}`
      : 'http://localhost:5000/api/instituteinstructors';

    const body = editingInstructor
      ? { name, email, mobile }
      : { name, email, mobile, password, instituteCode };

    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      alert(editingInstructor ? 'Instructor updated successfully' : 'Instructor added successfully');
      setName('');
      setEmail('');
      setMobile('');
      setPassword('');
      setIsOpen(false);
      setEditingInstructor(null);
      fetchInstructors(); // Refresh list
    } else {
      alert('Failed to process request');
    }
  };

  // Open modal for editing instructor
  const handleEdit = (instructor) => {
    setEditingInstructor(instructor);
    setName(instructor.name);
    setEmail(instructor.email);
    setMobile(instructor.mobile);
    setIsOpen(true);
  };

  // Delete instructor
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this instructor?')) {
      const response = await fetch(`http://localhost:5000/api/instituteinstructors/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Instructor deleted successfully');
        fetchInstructors();
      } else {
        alert('Failed to delete instructor');
      }
    }
  };

  return (
    <div className='instituteinstructormycourse-wrapper'>
      <button className="add-instructor-btn" onClick={() => setIsOpen(true)}>Add Instructor</button>
      
      {isOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{editingInstructor ? 'Edit Instructor' : 'Add Instructor'}</h2>
            <form onSubmit={handleSubmit}>
              <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
              <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <input type="text" placeholder="Mobile" value={mobile} onChange={(e) => setMobile(e.target.value)} required />
              {!editingInstructor && (
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              )}
              <button className="submit-btn" type="submit">{editingInstructor ? 'Update' : 'Submit'}</button>
              <button className="close-btn" type="button" onClick={() => { setIsOpen(false); setEditingInstructor(null); }}>Close</button>
            </form>
          </div>
        </div>
      )}

      <h2 className='instituteinstructormycourse-header'>Institute Instructors</h2>
      <hr className="instituteinstructordivider-line" />
      <table className='instituteinstructorcourse-table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {instructors.map((instructor) => (
            <tr key={instructor._id}>
              <td>{instructor.name}</td>
              <td>{instructor.email}</td>
              <td>{instructor.mobile}</td>
              <td>
                <button className="edit-btn" onClick={() => handleEdit(instructor)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(instructor._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InstituteInstructors;
