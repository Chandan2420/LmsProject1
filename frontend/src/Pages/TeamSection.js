
 // import React from "react";
// import "../Pages/TeamSection.css";

// const TeamSection = () => {
//     const teamMembers = [
//       {
//         name: "Alex Suprun",
//         title: "Marketing Technologist",
//         bgClass: "bg-alex",
//       },
//       {
//         name: "Aaliyah Gale",
//         title: "SEO Consultant",
//         bgClass: "bg-aaliyah",
//       },
//       {
//         name: "Vicky Hladyntes",
//         title: "Web Analytics Developer",
//         bgClass: "bg-vicky",
//       },
//       {
//         name: "Anaya Madisyn",
//         title: "Digital Marketing Manager",
//         bgClass: "bg-anaya",
//       },
//       {
//         name: "John Doe",
//         title: "Product Manager",
//         bgClass: "bg-john",
//       },
//       {
//         name: "Jane Smith",
//         title: "UX Designer",
//         bgClass: "bg-jane",
//       },
//       {
//         name: "Anaya Madisyn",
//         title: "Digital Marketing Manager",
//         bgClass: "bg-anaya",
//       },
//       {
//         name: "John Doe",
//         title: "Product Manager",
//         bgClass: "bg-john",
//       },
//       {
//         name: "Jane Smith",
//         title: "UX Designer",
//         bgClass: "bg-jane",
//       },
//       {
//         name: "Alex Suprun",
//         title: "Marketing Technologist",
//         bgClass: "bg-alex",
//       },

//     ];

//     return (
//       <section className="team-section">
//         <h2>
//           Meet <span className="highlight">Our Team</span>
//         </h2>
//         <div className="team-grid">
//           {teamMembers.map((member, index) => (
//             <div className="team-member" key={index}>
//               <div className={`member-image ${member.bgClass}`}></div>
//               <h3>{member.name}</h3>
//               <p>{member.title}</p>
//             </div>
//           ))}
//         </div>
//       </section>
//     );
//   };

//   export default TeamSection;

import React from "react";
import "../Pages/TeamSection.css";

const TeamSection = () => {
  const teamMembers = [
    {
      name: "Alex Suprun",
      title: "Marketing Technologist",
      bgClass: "bg-alex",
    },
    {
      name: "Aaliyah Gale",
      title: "SEO Consultant",
      bgClass: "bg-aaliyah",
    },
    {
      name: "Vicky Hladyntes",
      title: "Web Analytics Developer",
      bgClass: "bg-vicky",
    },
    {
      name: "Anaya Madisyn",
      title: "Digital Marketing Manager",
      bgClass: "bg-anaya",
    },
    {
      name: "John Doe",
      title: "Product Manager",
      bgClass: "bg-john",
    },
    {
      name: "Jane Smith",
      title: "UX Designer",
      bgClass: "bg-jane",
    },
    {
      name: "John Doe",
      title: "Product Manager",
      bgClass: "bg-john",
    },
    {
      name: "Jane Smith",
      title: "UX Designer",
      bgClass: "bg-jane",
    },
  ];

  return (
    <section className="team-section">
      <h2>
        Meet <span className="highlight">Our Team</span>
      </h2>
      <div className="team-grid">
        {teamMembers.map((member, index) => (
          <div className="team-member" key={index}>
            <div className={`member-image ${member.bgClass}`}></div>
            <h3>{member.name}</h3>
            <p>{member.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TeamSection;
