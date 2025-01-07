import React, { useState } from "react";
import "../SidebarComponents/LessonList.css";
const LessonList = () => {
  // Sample lessons data
  const [lessons, setLessons] = useState([
    {
      id: 1,
      name: "POST FERTILISATION",
      course: "BIOLOGY",
      author: "Vineeth B",
      dateModified: "11/22/2024",
    },
    {
      id: 2,
      name: "DOUBLE FERTILISATION",
      course: "BIOLOGY",
      author: "Vineeth B",
      dateModified: "11/22/2024",
    },
  ]);

  const [isModalOpen, setModalOpen] = useState(false); // Control modal visibility
  const [currentLesson, setCurrentLesson] = useState(null); // Lesson being edited or added
  const [searchQuery, setSearchQuery] = useState(""); // Search query

  // Handle open modal for adding or editing
  const handleOpenModal = (lesson = null) => {
    setCurrentLesson(lesson);
    setModalOpen(true);
  };

  // Handle close modal
  const handleCloseModal = () => {
    setCurrentLesson(null);
    setModalOpen(false);
  };

  // Handle save lesson (Add/Edit)
  const handleSaveLesson = (lessonData) => {
    if (lessonData.id) {
      // Update existing lesson
      setLessons((prevLessons) =>
        prevLessons.map((lesson) =>
          lesson.id === lessonData.id
            ? { ...lessonData, dateModified: new Date().toLocaleDateString() }
            : lesson
        )
      );
    } else {
      // Add new lesson
      const newLesson = {
        ...lessonData,
        id: lessons.length + 1,
        dateModified: new Date().toLocaleDateString(),
      };
      setLessons((prevLessons) => [...prevLessons, newLesson]);
    }
    handleCloseModal();
  };

  // Handle delete lesson
  const handleDeleteLesson = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this lesson?"
    );
    if (confirmed) {
      setLessons((prevLessons) =>
        prevLessons.filter((lesson) => lesson.id !== id)
      );
    }
  };

  // Filter lessons based on search query
  const filteredLessons = lessons.filter((lesson) =>
    lesson.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="lesson-list-wholediv">
      <div className="lesson-list-container">
        <h2>List your lessons</h2>

        {/* Add New Button */}
        <button className="add-new-button" onClick={() => handleOpenModal()}>
          Add New
        </button>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-bar"
        />

        {/* Lesson Table */}
        <table className="lesson-table">
          <div className="main-div">
            <thead className="table-head">
              <tr>
                <th>Name</th>
                <th>Course</th>
                <th>Author</th>
                <th>Preview</th>
                <th>Date Modified</th>
                <th>Actions</th>
              </tr>
            </thead>
          </div>
          <tbody>
            {filteredLessons.map((lesson) => (
              <tr key={lesson.id}>
                <td>{lesson.name}</td>
                <td>{lesson.course}</td>
                <td>{lesson.author}</td>
                <td>
                  <span className="preview-icon">👁️</span>
                </td>
                <td>{lesson.dateModified}</td>
                <td>
                  <button
                    className="edit-button"
                    onClick={() => handleOpenModal(lesson)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteLesson(lesson.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {filteredLessons.length === 0 && (
              <tr>
                <td colSpan="6">No lessons found</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Modal for Add/Edit Lesson */}
        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>{currentLesson ? "Edit Lesson" : "Add New Lesson"}</h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.target);
                  const lessonData = {
                    id: currentLesson?.id || null,
                    name: formData.get("name"),
                    course: formData.get("course"),
                    author: formData.get("author"),
                  };
                  handleSaveLesson(lessonData);
                }}
              >
                <label>
                  Name:
                  <input
                    type="text"
                    name="name"
                    defaultValue={currentLesson?.name || ""}
                    required
                  />
                </label>
                <label>
                  Course:
                  <input
                    type="text"
                    name="course"
                    defaultValue={currentLesson?.course || ""}
                    required
                  />
                </label>
                <label>
                  Author:
                  <input
                    type="text"
                    name="author"
                    defaultValue={currentLesson?.author || ""}
                    required
                  />
                </label>
                <div className="modal-actions">
                  <button type="submit" className="save-button">
                    Save
                  </button>
                  <button
                    type="button"
                    className="cancel-button"
                    onClick={handleCloseModal}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LessonList;
