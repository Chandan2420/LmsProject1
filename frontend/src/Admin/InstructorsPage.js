import React, { useEffect, useState } from 'react';
import './InstructorsPage.css';

const InstructorsPage = () => {
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchInstructors();
  }, []);

  const fetchInstructors = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/instructors'); 
      const data = await response.json();
      setInstructors(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching instructors:', error);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this instructor?")) {
      try {
        const response = await fetch(`http://localhost:5000/api/instructors/${id}`, {
          method: 'DELETE',
        });
        const data = await response.json();
        alert(data.message);
        setInstructors(instructors.filter(instructor => instructor._id !== id));
      } catch (error) {
        console.error('Error deleting instructor:', error);
      }
    }
  };

  const handleEdit = async (id, currentName, currentEmail, currentMobile) => {
    const newName = prompt("Enter new name", currentName);
    const newEmail = prompt("Enter new email", currentEmail);
    const newMobile = prompt("Enter new mobile", currentMobile);

    const updatedData = {};
    if (newName && newName !== currentName) updatedData.name = newName;
    if (newEmail && newEmail !== currentEmail) updatedData.email = newEmail;
    if (newMobile && newMobile !== currentMobile) updatedData.mobile = newMobile;

    if (Object.keys(updatedData).length === 0) {
      alert("No changes made.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/instructors/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      const updatedInstructor = await response.json();
      setInstructors(instructors.map(instructor => 
        instructor._id === id ? updatedInstructor : instructor
      ));
    } catch (error) {
      console.error('Error updating instructor:', error);
    }
  };

  const filteredInstructors = instructors.filter(instructor =>
    instructor.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <p>Loading instructors...</p>;
  }

  return (
    <div className='instructorsmycourse-wrapper'>
      <h2 className='instructorsmycourse-header'>Instructor List</h2>

      <input
        type="text"
        placeholder="Search by Instructor Name..."
        className="instructors-search-bar"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <hr className="instructorsdivider-line" />
      <table className='instructorscourse-table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredInstructors.map(instructor => (
            <tr key={instructor._id}>
              <td>{instructor.name}</td>
              <td>{instructor.email}</td>
              <td>{instructor.mobile}</td>
              <td>{instructor.role}</td>
              <td>
                <button 
                  className="edit-btn" 
                  onClick={() => handleEdit(instructor._id, instructor.name, instructor.email, instructor.mobile)}
                >
                  Edit
                </button>
                <button 
                  className="delete-btn" 
                  onClick={() => handleDelete(instructor._id)}
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
};

export default InstructorsPage;
