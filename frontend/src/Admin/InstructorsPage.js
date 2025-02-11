import React, { useEffect, useState } from 'react';
import './InstructorsPage.css';
const InstructorsPage = () => {
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);

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
      console.error('Error fetching students:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading students...</p>;
  }

  return (
    <div className='instructorsmycourse-wrapper'>
      <h2 className='instructorsmycourse-header'>Instructor List</h2>
      <hr className="instructorsdivider-line" />
      <table className='instructorscourse-table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {instructors.map(instructor => (
            <tr key={instructor._id}>
              <td>{instructor.name}</td>
              <td>{instructor.email}</td>
              <td>{instructor.mobile}</td>
              <td>{instructor.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InstructorsPage;
