import { useState } from 'react';
import axios from 'axios';

const AddCoursesLms = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    categories: [],
    tags: [],
    image: null,
    newCategory: '',
    newTag: '',
  });

  const [categories, setCategories] = useState(['Web Development', 'Data Science', 'Design', 'Marketing']);
  const [tags, setTags] = useState(['Beginner', 'Intermediate', 'Advanced', 'Free', 'Paid']);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === 'checkbox') {
      setFormData((prev) => ({
        ...prev,
        [name]: checked ? [...prev[name], value] : prev[name].filter((item) => item !== value),
      }));
    } else if (type === 'file') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAddCategory = () => {
    if (formData.newCategory.trim() !== '') {
      setCategories((prev) => [...prev, formData.newCategory]);
      setFormData({ ...formData, newCategory: '' });
    }
  };

  const handleAddTag = () => {
    if (formData.newTag.trim() !== '') {
      setTags((prev) => [...prev, formData.newTag]);
      setFormData({ ...formData, newTag: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('categories', JSON.stringify(formData.categories));
    formDataToSend.append('tags', JSON.stringify(formData.tags));
    formDataToSend.append('image', formData.image);

    try {
      const response = await axios.post('http://localhost:5001/api/addcourselms', formDataToSend);
      console.log(response.data);
      alert('Course added successfully!');
      setFormData({
        title: '',
        description: '',
        categories: [],
        tags: [],
        image: null,
        newCategory: '',
        newTag: '',
      });
    } catch (error) {
      console.error(error);
      alert('Failed to add course');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="Course Title"
        value={formData.title}
        onChange={handleChange}
      />

      <textarea
        name="description"
        placeholder="Course Description"
        value={formData.description}
        onChange={handleChange}
      />

      <h4>Course Categories</h4>
      {categories.map((category) => (
        <label key={category}>
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
      <input
        type="text"
        placeholder="Add New Category"
        value={formData.newCategory}
        onChange={(e) => setFormData({ ...formData, newCategory: e.target.value })}
      />
      <button type="button" onClick={handleAddCategory}>Add New Category</button>

      <h4>Course Tags</h4>
      {tags.map((tag) => (
        <label key={tag}>
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
      <input
        type="text"
        placeholder="Add New Tag"
        value={formData.newTag}
        onChange={(e) => setFormData({ ...formData, newTag: e.target.value })}
      />
      <button type="button" onClick={handleAddTag}>Add New Tag</button>

      <input type="file" name="image" onChange={handleChange} />

      <button type="submit">Add Course</button>
    </form>
  );
};

export default AddCoursesLms;
