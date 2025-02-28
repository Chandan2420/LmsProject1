import React, { useEffect, useState } from 'react';
import './StudentsPage.css';

const StudentsPage = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/students'); 
      const data = await response.json();
      setStudents(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching students:', error);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        const response = await fetch(`http://localhost:5000/api/students/${id}`, {
          method: 'DELETE',
        });
        const data = await response.json();
        alert(data.message);
        setStudents(students.filter(student => student._id !== id));
      } catch (error) {
        console.error('Error deleting student:', error);
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
      const response = await fetch(`http://localhost:5000/api/students/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      const updatedStudent = await response.json();
      setStudents(students.map(student => 
        student._id === id ? updatedStudent : student
      ));
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <p>Loading students...</p>;
  }

  return (
    <div className='studentsmycourse-wrapper'>
      <h2 className='studentsmycourse-header'>Student List</h2>

      <input
        type="text"
        placeholder="Search by Student Name..."
        className="students-search-bar"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <hr className="studentsdivider-line" />
      <table className='studentscourse-table'>
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
          {filteredStudents.map(student => (
            <tr key={student._id}>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.mobile}</td>
              <td>{student.role}</td>
              <td>
                <button 
                  className="edit-btn" 
                  onClick={() => handleEdit(student._id, student.name, student.email, student.mobile)}
                >
                  Edit
                </button>
                <button 
                  className="delete-btn" 
                  onClick={() => handleDelete(student._id)}
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

export default StudentsPage;
