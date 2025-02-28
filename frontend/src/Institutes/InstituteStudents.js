import React, { useState, useEffect } from "react";
import "./InstituteStudents.css";

const InstituteStudents = ({ instituteCode }) => {
  const [students, setStudents] = useState([]);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Fetch students from the backend
  const fetchStudents = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/fetchinstitutestudents?instituteCode=${instituteCode}`
      );
      if (response.ok) {
        const data = await response.json();
        setStudents(data);
      } else {
        console.error("Failed to fetch students");
      }
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [instituteCode]);

  // Handle student addition or update
  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = isEditing
      ? `http://localhost:5000/api/institutestudents/${currentStudent._id}`
      : "http://localhost:5000/api/institutestudents";
    const method = isEditing ? "PUT" : "POST";

    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, mobile, password, instituteCode }),
    });

    if (response.ok) {
      alert(isEditing ? "Student updated successfully" : "Student added successfully");
      setIsOpen(false);
      setIsEditing(false);
      setCurrentStudent(null);
      setName("");
      setEmail("");
      setMobile("");
      setPassword("");
      fetchStudents(); // Refresh student list
    } else {
      alert("Failed to save student details");
    }
  };

  // Open edit modal with student details
  const handleEdit = (student) => {
    setCurrentStudent(student);
    setName(student.name);
    setEmail(student.email);
    setMobile(student.mobile);
    setIsEditing(true);
    setIsOpen(true);
  };

  // Handle student deletion
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      const response = await fetch(`http://localhost:5000/api/institutestudents/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Student deleted successfully");
        fetchStudents(); // Refresh student list
      } else {
        alert("Failed to delete student");
      }
    }
  };

  return (
    <div className='institutestudentsmycourse-wrapper'>
      <button className="add-student-btn" onClick={() => { setIsOpen(true); setIsEditing(false); }}>Add Student</button>

      {isOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{isEditing ? "Edit Student" : "Add Student"}</h2>
            <form onSubmit={handleSubmit}>
              <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
              <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <input type="text" placeholder="Mobile" value={mobile} onChange={(e) => setMobile(e.target.value)} required />
              {!isEditing && <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />}
              <button type="submit">{isEditing ? "Update" : "Submit"}</button>
              <button type="button" className="close-btn" onClick={() => setIsOpen(false)}>Close</button>
            </form>
          </div>
        </div>
      )}

      <h2 className='institutestudentsmycourse-header'>Institute Students</h2>
      <hr className="institutestudentsdivider-line" />
      <table className='institutestudentscourse-table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.mobile}</td>
              <td>
                <button className="edit-btn" onClick={() => handleEdit(student)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(student._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InstituteStudents;
