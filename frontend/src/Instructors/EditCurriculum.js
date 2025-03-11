import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./EditCurriculum.css";

const EditCurriculum = () => {
  const { title } = useParams();
  const navigate = useNavigate();
  const [units, setUnits] = useState([]);
  const [fileDocs, setFileDocs] = useState({});

  useEffect(() => {
    fetchCourse();
  }, []);

  const fetchCourse = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/api/getcourse/${title}`);
      if (response.data.units) {
        setUnits(response.data.units);
      }
    } catch (error) {
      console.error('Failed to fetch course:', error);
    }
  };

  const addUnit = () => {
    setUnits([...units, { title: '', lessons: [] }]);
  };

  const handleUnitChange = (index, value) => {
    const updatedUnits = [...units];
    updatedUnits[index].title = value;
    setUnits(updatedUnits);
  };

  const removeUnit = (index) => {
    const updatedUnits = units.filter((_, i) => i !== index);
    setUnits(updatedUnits);
  };

  const addLesson = (unitIndex) => {
    const updatedUnits = [...units];
    updatedUnits[unitIndex].lessons.push({ title: '', videoUrl: '', fileUrl: '' });
    setUnits(updatedUnits);
  };

  const handleLessonChange = (unitIndex, lessonIndex, key, value) => {
    const updatedUnits = [...units];
    updatedUnits[unitIndex].lessons[lessonIndex][key] = value;
    setUnits(updatedUnits);
  };

  const removeLesson = (unitIndex, lessonIndex) => {
    const updatedUnits = [...units];
    updatedUnits[unitIndex].lessons.splice(lessonIndex, 1);
    setUnits(updatedUnits);
  };

  const handleFileUpload = (unitIndex, lessonIndex, file) => {
    const updatedFiles = { ...fileDocs };
    updatedFiles[`${unitIndex}-${lessonIndex}`] = file;
    setFileDocs(updatedFiles);
  };

  const saveCurriculum = async () => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('units', JSON.stringify(units));

    Object.keys(fileDocs).forEach((key) => {
      formData.append('fileDocs', fileDocs[key]);
    });

    try {
      await axios.post('http://localhost:5001/api/createCurriculum', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Curriculum created successfully');
      navigate(`/editcourse/${title}`);
    } catch (error) {
      console.error('Failed to create curriculum:', error);
      alert('Failed to create curriculum');
    }
  };

  return (
    <div className="edit-curriculum-container">
      <h2 className="curriculum-title">Edit Curriculum for {title}</h2>
      <button className="add-unit-btn" onClick={addUnit}>Add Unit</button>
      {units.map((unit, unitIndex) => (
        <div key={unitIndex} className="unit-card">
          <input
            type="text"
            value={unit.title}
            onChange={(e) => handleUnitChange(unitIndex, e.target.value)}
            placeholder="Unit Title"
            className="unit-title"
          />
          <button className="curriculum-remove-btn" onClick={() => removeUnit(unitIndex)}>Remove Unit</button>
          <button className="add-lesson-btn" onClick={() => addLesson(unitIndex)}>Add Lesson</button>
          {unit.lessons.map((lesson, lessonIndex) => (
            <div key={lessonIndex} className="lesson-card">
              <input
                type="text"
                value={lesson.title}
                onChange={(e) => handleLessonChange(unitIndex, lessonIndex, 'title', e.target.value)}
                placeholder="Lesson Title"
                className="lesson-title"
              />
              <input
                type="text"
                value={lesson.videoUrl}
                onChange={(e) => handleLessonChange(unitIndex, lessonIndex, 'videoUrl', e.target.value)}
                placeholder="Enter Video URL"
                className="video-url"
              />
              <input
                type="file"
                accept=".pdf,.docx,.pptx"
                onChange={(e) => handleFileUpload(unitIndex, lessonIndex, e.target.files[0])}
                className="file-upload"
              />
              <button className="curriculum-remove-btn" onClick={() => removeLesson(unitIndex, lessonIndex)}>Remove Lesson</button>
            </div>
          ))}
        </div>
      ))}
      <button className="curriculum-save-btn" onClick={saveCurriculum}>Save Curriculum</button>
    </div>
  );
};

export default EditCurriculum;
