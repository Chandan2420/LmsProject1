import { useState } from "react";
import axios from "axios";
import "./AddCourseslms.css";

const AddCoursesLms = ({ userId, instructorName }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    categories: [],
    tags: [],
    image: null,
    newCategory: "",
    newTag: "",
  });

  const [categories, setCategories] = useState([
    "Web Development",
    "Data Science",
    "Design",
    "Marketing",
  ]);
  const [tags, setTags] = useState([
    "Beginner",
    "Intermediate",
    "Advanced",
    "Free",
    "Paid",
  ]);

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: checked
          ? [...prev[name], value]
          : prev[name].filter((item) => item !== value),
      }));
    } else if (type === "file") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAddCategory = () => {
    if (formData.newCategory.trim() !== "" && !categories.includes(formData.newCategory)) {
      setCategories((prev) => [...prev, formData.newCategory]);
      setFormData({ ...formData, newCategory: "" });
    }
  };

  const handleAddTag = () => {
    if (formData.newTag.trim() !== "" && !tags.includes(formData.newTag)) {
      setTags((prev) => [...prev, formData.newTag]);
      setFormData({ ...formData, newTag: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.title || !formData.description || !formData.image) {
      setError("Please fill in all required fields.");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("userId", userId); // Associate course with instructor
    formDataToSend.append("instructorName", instructorName); // Include instructor name
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("categories", JSON.stringify(formData.categories));
    formDataToSend.append("tags", JSON.stringify(formData.tags));
    formDataToSend.append("image", formData.image);

    try {
      await axios.post("http://localhost:5001/api/addcourselms", formDataToSend);
      alert("Course added successfully!");

      setFormData({
        title: "",
        description: "",
        categories: [],
        tags: [],
        image: null,
        newCategory: "",
        newTag: "",
      });

      document.querySelector('input[type="file"]').value = ""; // Reset file input
    } catch (error) {
      console.error("Error adding course:", error);
      setError("Failed to add course. Please try again.");
    }
  };

  return (
    <div className="add-courselms-container">
      <h2>Add New Course</h2>
      <p><strong>Instructor:</strong> {instructorName}</p> {/* Display instructor name */}
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Course Title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Course Description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <h4>Course Categories</h4>
        <div className="category-list">
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
        </div>

        <div className="add-category">
          <input
            type="text"
            placeholder="Add New Category"
            value={formData.newCategory}
            onChange={(e) =>
              setFormData({ ...formData, newCategory: e.target.value })
            }
          />
          <button type="button" className="add-courselms-btn" onClick={handleAddCategory}>
            Add Category
          </button>
        </div>

        <h4>Course Tags</h4>
        <div className="tag-list">
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
        </div>

        <div className="add-tag">
          <input
            type="text"
            placeholder="Add New Tag"
            value={formData.newTag}
            onChange={(e) =>
              setFormData({ ...formData, newTag: e.target.value })
            }
          />
          <button type="button" className="add-courselms-btn" onClick={handleAddTag}>
            Add Tag
          </button>
        </div>

        <input type="file" name="image" accept="image/*" onChange={handleChange} required />

        <button type="submit" className="submit-courselms-btn">
          Add Course
        </button>
      </form>
    </div>
  );
};

export default AddCoursesLms;
