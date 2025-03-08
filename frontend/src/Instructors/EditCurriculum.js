import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

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

  // Add new unit
  const addUnit = () => {
    setUnits([...units, { title: '', lessons: [] }]);
  };

  // Update unit title
  const handleUnitChange = (index, value) => {
    const updatedUnits = [...units];
    updatedUnits[index].title = value;
    setUnits(updatedUnits);
  };

  // Remove a unit
  const removeUnit = (index) => {
    const updatedUnits = units.filter((_, i) => i !== index);
    setUnits(updatedUnits);
  };

  // Add lesson to a unit
  const addLesson = (unitIndex) => {
    const updatedUnits = [...units];
    updatedUnits[unitIndex].lessons.push({ title: '', videoUrl: '', fileUrl: '' });
    setUnits(updatedUnits);
  };

  // Update lesson details
  const handleLessonChange = (unitIndex, lessonIndex, key, value) => {
    const updatedUnits = [...units];
    updatedUnits[unitIndex].lessons[lessonIndex][key] = value;
    setUnits(updatedUnits);
  };

  // Remove a lesson from a unit
  const removeLesson = (unitIndex, lessonIndex) => {
    const updatedUnits = [...units];
    updatedUnits[unitIndex].lessons.splice(lessonIndex, 1);
    setUnits(updatedUnits);
  };

  // Handle file upload
  const handleFileUpload = (unitIndex, lessonIndex, file) => {
    const updatedFiles = { ...fileDocs };
    const key = `${unitIndex}-${lessonIndex}`;
    updatedFiles[key] = file;
    setFileDocs(updatedFiles);
  };

  // Save curriculum
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
    <div>
      <h2>Edit Curriculum for {title}</h2>

      {/* Add Unit Button */}
      <button onClick={addUnit}>Add Unit</button>

      {units.map((unit, unitIndex) => (
        <div key={unitIndex} className="unit">
          <input
            type="text"
            value={unit.title}
            onChange={(e) => handleUnitChange(unitIndex, e.target.value)}
            placeholder="Unit Title"
          />
          <button onClick={() => removeUnit(unitIndex)}>Remove Unit</button>

          {/* Add Lesson Button */}
          <button onClick={() => addLesson(unitIndex)}>Add Lesson</button>

          {unit.lessons.map((lesson, lessonIndex) => (
            <div key={lessonIndex} className="lesson">
              <input
                type="text"
                value={lesson.title}
                onChange={(e) => handleLessonChange(unitIndex, lessonIndex, 'title', e.target.value)}
                placeholder="Lesson Title"
              />

              {/* Enter Video URL */}
              <input
                type="text"
                value={lesson.videoUrl}
                onChange={(e) => handleLessonChange(unitIndex, lessonIndex, 'videoUrl', e.target.value)}
                placeholder="Enter Video URL"
              />

              {/* Upload File */}
              <input
                type="file"
                accept=".pdf,.docx,.pptx"
                onChange={(e) => handleFileUpload(unitIndex, lessonIndex, e.target.files[0])}
              />

              <button onClick={() => removeLesson(unitIndex, lessonIndex)}>Remove Lesson</button>
            </div>
          ))}
        </div>
      ))}

      {/* Save Button */}
      <button onClick={saveCurriculum}>Save Curriculum</button>
    </div>
  );
};

export default EditCurriculum;
