import React, { useState } from "react";
import "../SidebarComponents/CourseForm.css";

const CourseForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    categories: [],
    tags: [],
    featuredImage: null,
    imagePreview: null,
  });

  const [submittedData, setSubmittedData] = useState(null); // For displaying submitted data

  const categories = [
    "Basics of Computer",
    "Class XI",
    "Class XII",
    "Coaching",
    "Language Learning",
    "Online Business",
  ];
  const tags = [
    "css",
    "foundation",
    "IOT",
    "less",
    "node",
    "python",
    "tutorial",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e, type) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [type]: checked
        ? [...prev[type], value]
        : prev[type].filter((item) => item !== value),
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        featuredImage: file,
        imagePreview: URL.createObjectURL(file), // Generate preview URL
      });
    }
  };

  const handlePublish = (e) => {
    e.preventDefault();
    const { title, description, categories, tags, featuredImage } = formData;

    if (
      !title ||
      !description ||
      !categories.length ||
      !tags.length ||
      !featuredImage
    ) {
      alert("Please fill all fields and upload an image!");
      return;
    }

    // Create form data for submission
    const submittedFormData = new FormData();
    submittedFormData.append("title", title);
    submittedFormData.append("description", description);
    submittedFormData.append("categories", categories.join(", "));
    submittedFormData.append("tags", tags.join(", "));
    submittedFormData.append("featuredImage", featuredImage);

    setSubmittedData({
      title,
      description,
      categories,
      tags,
      imagePreview: formData.imagePreview,
    });

    // Reset form after submission
    setFormData({
      title: "",
      description: "",
      categories: [],
      tags: [],
      featuredImage: null,
      imagePreview: null,
    });

    alert("Course submitted successfully!");
  };

  return (
    <div className="course-form-container">
      <form onSubmit={handlePublish} className="course-form">
        <div className="form-header">
          <h1>Add new Course</h1>
          <div className="form-buttons">
            <button type="button" className="btn-save-draft">
              Save Draft
            </button>
            <button type="submit" className="btn-publish">
              Publish
            </button>
          </div>
        </div>

        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Enter course title"
            className="form-control"
            required
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Enter course description"
            className="form-control"
            rows="4"
          />
        </div>

        <div className="form-flex">
          <div className="form-group">
            <label>Course Categories</label>
            <div className="checkbox-group">
              {categories.map((category) => (
                <label key={category}>
                  <input
                    type="checkbox"
                    value={category}
                    onChange={(e) => handleCheckboxChange(e, "categories")}
                  />
                  {category}
                </label>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Course Tags</label>
            <div className="checkbox-group">
              {tags.map((tag) => (
                <label key={tag}>
                  <input
                    type="checkbox"
                    value={tag}
                    onChange={(e) => handleCheckboxChange(e, "tags")}
                  />
                  {tag}
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="form-group">
          <label>Featured Image</label>
          <div className="file-upload">
            <input
              type="file"
              onChange={handleFileChange}
              accept="image/png, image/jpeg"
              className="form-control-file"
            />
            <span>Upload a file or drag and drop</span>
          </div>
          {formData.imagePreview && (
            <div className="image-preview">
              <img src={formData.imagePreview} alt="Preview" />
            </div>
          )}
        </div>
      </form>

      {submittedData && (
        <div className="submitted-data">
          <h2>Submitted Course</h2>
          <p>
            <strong>Title:</strong> {submittedData.title}
          </p>
          <p>
            <strong>Description:</strong> {submittedData.description}
          </p>
          <p>
            <strong>Categories:</strong> {submittedData.categories.join(", ")}
          </p>
          <p>
            <strong>Tags:</strong> {submittedData.tags.join(", ")}
          </p>
          <div className="submitted-image">
            <strong>Uploaded Image:</strong>
            <img src={submittedData.imagePreview} alt="Uploaded" />
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseForm;
