// import React from "react";
// import "../Pages/Courses.css";

// const Courses = () => {
//   const courses = [
//     {
//       id: 1,
//       name: "Mathematics",
//       category: "Class XI",
//       price: "FREE",
//       image: null,
//       views: 13

//     },
//     {
//       id: 2,
//       name: "Chemistry",
//       category: "Class XII",
//       price: "FREE",
//       image: null,
//       views: 18

//     },
//     {
//       id: 3,
//       name: "BIOLOGY",
//       category: "Class XII",
//       price: "FREE",
//       views: 45

//     },
//     {
//       id: 4,
//       name: "Physics-Class XI",
//       category: "Class XI",
//       price: "FREE",
//       views: 23

//     },
//     {
//       id: 5,
//       name: "Mathematics",
//       category: "Class XI",
//       price: "FREE",
//       image: null,
//       views: 33

//     },
//     {
//       id: 6,
//       name: "Chemistry",
//       category: "Class XII",
//       price: "FREE",
//       image: null,
//       views: 31

//     },
//     {
//       id: 7,
//       name: "BIOLOGY",
//       category: "Class XII",
//       price: "FREE",
//       views: 7

//     },
//     {
//       id: 8,
//       name: "Physics-Class XI",
//       category: "Class XI",
//       price: "FREE",
//       views: 28
//     },
//   ];

//   return (
//     <div className="courses-container">
//       <header className="header">
//         <h1>Courses</h1>
//         <div className="header-actions">
//           <button className="add-button">Add new</button>
//           <input
//             type="text"
//             placeholder="Search"
//             className="search-input"
//           />
//         </div>
//       </header>
//       <div className="course-cards">
//         {courses.map((course) => (
//           <div className="course-card" key={course.id}>
//             <div className="course-image">
//               {course.image ? (
//                 <img src={course.image} alt={course.name} />
//               ) : (
//                 <div className="no-image">
//                   <i className="fas fa-camera"></i>
//                   <p>NO IMAGE</p>
//                 </div>
//               )}
//               <div className="views">
//                 <i className="fas fa-eye"></i> {course.views}
//               </div>
//             </div>
//             <div className="course-info">
//               <h3>{course.category}</h3>
//               <p>{course.name}</p>
//               <span>{course.price}</span>
//             </div>
//             <div className="course-actions">
//               <a href="#" className="edit">
//                 Edit
//               </a>
//               <a href="#" className="view">
//                 View
//               </a>
//               <a href="#" className="delete">
//                 Delete
//               </a>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Courses;

import React, { useState } from "react";
import "../Pages/Courses.css";

const courseData = [
  {
    id: 1,
    title: "React JS",
    author: "Niranjan",
    lessons: 0,
    category: "Test",
    price: "Free",
  },
  {
    id: 2,
    title: "Java",
    author: "Niranjan",
    lessons: 0,
    category: "Class XII",
    price: "Free",
  },
  {
    id: 3,
    title: "Python",
    author: "Vineeth B",
    lessons: 31,
    category: "Class XII",
    price: "Free",
  },
  {
    id: 4,
    title: "Wordpress",
    author: "Chidananda",
    lessons: 20,
    category: "Class XI",
    price: "Free",
  },

  {
    id: 5,
    title: "Computer Networking",
    author: "Chidananda",
    lessons: 20,
    category: "Class XI",
    price: "Free",
  },
];

const CourseComponent = () => {
  const [filters, setFilters] = useState({
    category: [],
    price: [],
  });

  // Handle filter updates
  const handleFilterChange = (e) => {
    const { name, value, checked } = e.target;

    setFilters((prevFilters) => {
      if (checked) {
        return { ...prevFilters, [name]: [...prevFilters[name], value] };
      } else {
        return {
          ...prevFilters,
          [name]: prevFilters[name].filter((item) => item !== value),
        };
      }
    });
  };

  // Filter logic
  const filteredCourses = courseData.filter((course) => {
    const categoryMatch =
      filters.category.length === 0 ||
      filters.category.includes(course.category);
    const priceMatch =
      filters.price.length === 0 || filters.price.includes(course.price);

    return categoryMatch && priceMatch;
  });

  return (
    <div className="course-container">
      <h1>Courses</h1>

      <div className="main-content">
        {/* Course Cards Section */}
        <div className="course-cards">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <div key={course.id} className="course-card">
                <div className="course-header">
                  <span className="badge">{course.category}</span>
                </div>
                <h3>{course.title}</h3>
                <p>Author: {course.author}</p>
                <p>{course.lessons} Lessons</p>
                <button>Start Learning</button>
              </div>
            ))
          ) : (
            <p className="no-courses">No courses found</p>
          )}
        </div>

        {/* Filter Section */}
        <div className="filter-section">
          <h2>Categories</h2>
          <label>
            <input
              type="checkbox"
              name="category"
              value="Test"
              onChange={handleFilterChange}
            />{" "}
            Test
          </label>
          <label>
            <input
              type="checkbox"
              name="category"
              value="Class XII"
              onChange={handleFilterChange}
            />{" "}
            Class XII
          </label>
          <label>
            <input
              type="checkbox"
              name="category"
              value="Class XI"
              onChange={handleFilterChange}
            />{" "}
            Class XI
          </label>

          <h2>Price</h2>
          <label>
            <input
              type="checkbox"
              name="price"
              value="Free"
              onChange={handleFilterChange}
            />{" "}
            Free
          </label>
        </div>
      </div>
    </div>
  );
};

export default CourseComponent;
