import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Courseslms = () => {
  const { userId } = useParams(); // Get the logged-in instructor ID from the URL
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      fetchCourses();
    }
  }, [userId]);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/api/getcourses/${userId}`);
      setCourses(response.data);
    } catch (error) {
      console.error('Failed to fetch courses:', error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this course?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5001/api/deletecourse/${id}`);
      setCourses((prevCourses) => prevCourses.filter(course => course._id !== id));
    } catch (error) {
      console.error('Failed to delete course:', error);
    }
  };

  return (
    <div className="course-list" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', padding: '20px' }}>
      {courses.length === 0 ? (
        <p>No courses available.</p>
      ) : (
        courses.map((course) => {
          // Calculate total number of lessons
          const totalLessons = course.units?.reduce((acc, unit) => acc + (unit.lessons?.length || 0), 0) || 0;

          return (
            <div key={course._id} className="course-card" style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '10px', width: '300px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
              <h3>{course.title}</h3>

              {course.image && (
                <img 
                  src={`http://localhost:5001/uploadsImage/${course.image}`} 
                  alt={course.title} 
                  style={{ width: '100%', borderRadius: '10px', marginBottom: '10px' }} 
                />
              )}

              <p><strong>Author:</strong> {course.instructorName || "Unknown"}</p>
              <p><strong>Categories:</strong> {course.categories?.length ? course.categories.join(', ') : "None"}</p>
              <p><strong>Tags:</strong> {course.tags?.length ? course.tags.join(', ') : "None"}</p>
              <p><strong> Lessons:</strong> {totalLessons}</p>

              <button onClick={() => navigate(`/editcourse/${course._id}`)}>Edit</button>
              <button onClick={() => handleDelete(course._id)} style={{ marginLeft: '10px', backgroundColor: 'red', color: 'white' }}>Delete</button>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Courseslms;
