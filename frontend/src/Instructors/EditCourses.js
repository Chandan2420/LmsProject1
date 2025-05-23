import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './EditCourses.css';

const EditCourse = () => {
  const { id } = useParams(); // Get course ID from URL params
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    categories: [],
    tags: [],
    image: null,
  });

  const [categories, setCategories] = useState([
    'Web Development',
    'Data Science',
    'Design',
    'Marketing',
  ]);
  const [tags, setTags] = useState([
    'Beginner',
    'Intermediate',
    'Advanced',
    'Free',
    'Paid',
  ]);
  const [newCategory, setNewCategory] = useState('');
  const [newTag, setNewTag] = useState('');

  useEffect(() => {
    fetchCourse();
  }, []);

  const fetchCourse = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/api/getcourse/${id}`);
      const course = response.data;
      if (course) {
        setFormData({
          title: course.title,
          description: course.description,
          categories: course.categories,
          tags: course.tags,
          image: null,
        });
      }
    } catch (error) {
      console.error('Failed to fetch course:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === 'checkbox') {
      setFormData((prev) => ({
        ...prev,
        [name]: checked ? [value] : [],
      }));
    } else if (type === 'file') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const addCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setNewCategory('');
    }
  };

  const addTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('categories', JSON.stringify(formData.categories));
    formDataToSend.append('tags', JSON.stringify(formData.tags));
    if (formData.image) {
      formDataToSend.append('image', formData.image);
    }

    try {
      await axios.put(`http://localhost:5001/api/updatecourse/${id}`, formDataToSend);
      alert('Course updated successfully');
      navigate('/');
    } catch (error) {
      console.error('Failed to update course:', error);
      alert('Failed to update course');
    }
  };

  // Navigate to the curriculum page
  const goToCurriculum = () => {
    navigate(`/editcourse/${id}/curriculum`);
  };

  return (
    <form className="edit-course-form" onSubmit={handleSubmit}>
      <h2>Edit Course</h2>

      {/* Curriculum Button */}
      <button type="button" className="editcourse-curriculum-btn" onClick={goToCurriculum}>
        Curriculum
      </button>

      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Course Title"
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Course Description"
      />

      <h4>Course Categories</h4>
      {categories.map((category) => (
        <label key={category} className="checkbox-label">
          <input
            type="checkbox"
            name="categories"
            value={category}
            checked={formData.categories.includes(category)}
            onChange={handleChange}
          />
          {category}
        </label>
      ))}
      <div className="add-edit-field">
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Add New Category"
        />
        <button type="button" onClick={addCategory}>
          Add
        </button>
      </div>

      <h4>Course Tags</h4>
      {tags.map((tag) => (
        <label key={tag} className="checkbox-label">
          <input
            type="checkbox"
            name="tags"
            value={tag}
            checked={formData.tags.includes(tag)}
            onChange={handleChange}
          />
          {tag}
        </label>
      ))}
      <div className="add-edit-field">
        <input
          type="text"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          placeholder="Add New Tag"
        />
        <button type="button" onClick={addTag}>
          Add
        </button>
      </div>

      <input type="file" name="image" onChange={handleChange} />
      <button type="submit" className="edit-save-btn">
        Save Changes
      </button>
    </form>
  );
};

export default EditCourse;
