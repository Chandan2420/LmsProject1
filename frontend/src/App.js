import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

import Navbar from "./Components/Navbar";
import HomeBanner from "./Pages/HomeBanner";
import Searchbar from "./Components/Searchbar";
import SignUpPage from "./Pages/SignUpPage";
import LoginPage from "./Pages/LoginPage";
import AboutUsPage from "./Pages/AboutUs";
import Caurosel from "./Pages/Caurosel";
import Courses from "./Pages/Courses";
import StatsSection from "./Pages/StatsSection";
import Sidebar from "./Components/Sidebar";
import Dashboard from "./Pages/Dashboard";
import DoughnutChart from "./SidebarComponents/DoughnutChart";
// import CourseAddForm from "./SidebarComponents/CourseAddForm";

import Why from "./Pages/Why";
import LessonList from "./SidebarComponents/LessonList";
import InstructorCard from "./Pages/InstructorCard";
import Footer from "./Components/Footer";
import SpecialSection from "./Pages/SpecialSelection";
import TeamSection from "./Pages/TeamSection";
import HiringSection from "./Pages/HiringSection";
import SettingsForm from "./SidebarComponents/SettingsForm";
import CourseForm from "./SidebarComponents/CourseForm";
import ContactForm from "./Pages/ContactForm";
import Aio from "./Components/Aio";
import InstructorSection from "./Pages/InstructorSection";
import FeaturesSection from "./Pages/FeaturesSection";
import TeachCourse from "./Pages/TeachCourse";
// import HeaderTabs from "./Pages/HeaderTabs";
import CardSection from "./Pages/CardSection";
import FlipCardComponent from "./Pages/FlipCardComponent";
function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        {/* <Aio/> */}

        {/* <CourseAddForm/> */}
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Searchbar />

                <HomeBanner />
                <Why />
                <CardSection />
                <Caurosel />
                <InstructorCard />
                {/* <FlipCardComponent/> */}
                {/* <Hello/> */}
                <Footer />
              </>
            }
          />

          <Route path="/add" element={<Sidebar />} />
          {/* <Route path="/add-course" element={<CourseAddForm/>}/> */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/lessons" element={<LessonList />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/add-course" element={<CourseForm />} />
          <Route path="/hello" element={<Sidebar />} />

          <Route
            path="/next"
            element={
              <>
                <InstructorSection /> <FeaturesSection />
                <TeachCourse />
              </>
            }
          />

          {/* <Route path="/add" element={<InstructorCard />} /> */}

          <Route path="/next" element={<InstructorSection />} />
          <Route
            path="/about-page"
            element={
              <>
                <SpecialSection />
                <StatsSection />
                <TeamSection /> <ContactForm /> <HiringSection />
                <Footer />

              </>
            }
          />
          <Route path="/courses" element={<Courses />} />
          <Route path="/settings" element={<SettingsForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
