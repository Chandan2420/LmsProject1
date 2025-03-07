import { BrowserRouter as  Link, useNavigate,} from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Courseslms = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/getcourses');
      setCourses(response.data);
    } catch (error) {
      console.error('Failed to fetch courses:', error);
    }
  };

  const handleDelete = async (title) => {
    try {
      await axios.delete('http://localhost:5001/api/deletecourse', { data: { title } });
      fetchCourses();
    } catch (error) {
      console.error('Failed to delete course:', error);
    }
  };

  return (
    <div className="course-list" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', padding: '20px' }}>
      {courses.map((course) => (
        <div key={course.title}  className="course-card" style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '10px', width: '300px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
          <h3>{course.title}</h3>
          {course.image && (
                  <img src={`http://localhost:5001/uploadsImage/${course.image}`} alt={course.title} style={{ width: '100%', borderRadius: '10px', marginBottom: '10px' }} />
                )}

          <p><strong>Categories:</strong> {course.categories.join(', ')}</p>
          <p><strong>Tags:</strong> {course.tags.join(', ')}</p>

          <button onClick={() => navigate(`/editcourse/${course.title}`)}>Edit</button>
          <button onClick={() => handleDelete(course.title)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default Courseslms;
