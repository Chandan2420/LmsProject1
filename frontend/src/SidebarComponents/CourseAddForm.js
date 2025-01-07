// import React from 'react';
// import "../SidebarComponents/CourseAddForm.css";
// import { useForm } from 'react-hook-form';  // Importing react-hook-form
// import { yupResolver } from '@hookform/resolvers/yup';  // Importing yup resolver
// import * as Yup from 'yup';  // Importing Yup for validation

// // Validation schema for adding a course
// const validationSchema = Yup.object({
//   courseTitle: Yup.string()
//     .required('Course title is required')
//     .min(3, 'Course title must be at least 3 characters long'),
//   courseDescription: Yup.string()
//     .required('Course description is required')
//     .min(10, 'Description must be at least 10 characters long'),
//   startDate: Yup.date()
//     .required('Start date is required')
//     .min(new Date(), 'Start date cannot be in the past'),
//   endDate: Yup.date()
//     .required('End date is required')
//     .when('startDate', (startDate, schema) =>
//       startDate && schema.min(startDate, 'End date must be after start date')
//     ),
// }).required();

// const CourseAddForm = () => {
//   // Using react-hook-form to handle form data
//   const { register, handleSubmit, formState: { errors } } = useForm({
//     resolver: yupResolver(validationSchema),  // Using Yup validation schema
//   });

//   // Submit function
//   const onSubmit = (data) => {
//     alert('Course added successfully!');
//     console.log(data);  // Log form data to the console
//   };

//   return (
//     <div className="course-form-container">
//       <h2>Add New Course</h2>
//       <form onSubmit={handleSubmit(onSubmit)}>

//         {/* Course Title */}
//         <div>
//           <label>Course Title:</label>
//           <input type="text" {...register('courseTitle')} />
//           <p className="error-message">{errors.courseTitle?.message}</p>
//         </div>

//         {/* Course Description */}
//         <div>
//           <label>Course Description:</label>
//           <textarea {...register('courseDescription')} />
//           <p className="error-message">{errors.courseDescription?.message}</p>
//         </div>

//         {/* Start Date */}
//         <div>
//           <label>Start Date:</label>
//           <input type="date" {...register('startDate')} />
//           <p className="error-message">{errors.startDate?.message}</p>
//         </div>

//         {/* End Date */}
//         <div>
//           <label>End Date:</label>
//           <input type="date" {...register('endDate')} />
//           <p className="error-message">{errors.endDate?.message}</p>
//         </div>

//         {/* Submit Button */}
//         <button type="submit">Add Course</button>
//       </form>
//     </div>
//   );
// };

// export default CourseAddForm;

import React from "react";
import "../SidebarComponents/CourseAddForm.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

// Validation schema for adding a course
const validationSchema = Yup.object({
  courseTitle: Yup.string()
    .required("Course title is required")
    .min(3, "Course title must be at least 3 characters long"),
  courseDescription: Yup.string()
    .required("Course description is required")
    .min(10, "Description must be at least 10 characters long"),
  startDate: Yup.date()
    .required("Start date is required")
    .min(new Date(), "Start date cannot be in the past"),
  endDate: Yup.date()
    .required("End date is required")
    .when(
      "startDate",
      (startDate, schema) =>
        startDate && schema.min(startDate, "End date must be after start date")
    ),
  featuredImage: Yup.mixed()
    .required("Featured image is required")
    .test(
      "fileType",
      "Only PNG, JPEG, and JPG files are allowed",
      (value) =>
        value && ["image/png", "image/jpeg", "image/jpg"].includes(value.type)
    ),
}).required();

const CourseAddForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("courseTitle", data.courseTitle);
    formData.append("courseDescription", data.courseDescription);
    formData.append("startDate", data.startDate);
    formData.append("endDate", data.endDate);
    formData.append("featuredImage", data.featuredImage[0]); // Add the file

    // Log the FormData for verification
    console.log("Form Data:", Object.fromEntries(formData.entries()));

    alert("Course added successfully!");
  };

  return (
    <div className="course-whole-container">
      <div className="course-form-container">
        <h2>Add New Course</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Course Title */}
          <div>
            <label>Course Title:</label>
            <input type="text" {...register("courseTitle")} />
            <p className="error-message">{errors.courseTitle?.message}</p>
          </div>

          {/* Course Description */}
          <div>
            <label>Course Description:</label>
            <textarea {...register("courseDescription")} />
            <p className="error-message">{errors.courseDescription?.message}</p>
          </div>

          {/* Start Date */}
          <div>
            <label>Start Date:</label>
            <input type="date" {...register("startDate")} />
            <p className="error-message">{errors.startDate?.message}</p>
          </div>

          {/* End Date */}
          <div>
            <label>End Date:</label>
            <input type="date" {...register("endDate")} />
            <p className="error-message">{errors.endDate?.message}</p>
          </div>

          {/* Featured Image */}
          <div>
            <label>Featured Image:</label>
            <input
              type="file"
              {...register("featuredImage")}
              accept="image/png, image/jpeg, image/jpg"
            />
            <p className="error-message">{errors.featuredImage?.message}</p>
          </div>

          {/* Submit Button */}
          <button type="submit">Add Course</button>
        </form>
      </div>
    </div>
  );
};

export default CourseAddForm;
