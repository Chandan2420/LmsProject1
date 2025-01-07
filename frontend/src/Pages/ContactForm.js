import React, { useState } from "react";
import "../Pages/ContactForm.css";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    optIn: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    alert("Form submitted successfully!");
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
      optIn: false,
    });
  };

  return (
    <div className="contact-container">
      <div className="contact-header">
        <h2>We'd love to hear from you</h2>
        <p>So we can get to know you and your needs better.</p>
      </div>
      <div className="contact-body">
        {/* <div className="contact-info">
          <h3>Here's What We Can Help With:</h3>
          <ul>
            <li>💬 Contact our sales team to talk about your LMS requirements</li>
            <li>💬 Get customer support</li>
            <li>💬 Contact our partnerships team</li>
            <li>💬 Answer any other questions you may have</li>
          </ul>
          <p>
            Run into a problem using our services? Check out our{" "}
            <a href="/policy">Policy</a> for set-up guides, feature release
            notes, and troubleshooting articles.
          </p>
        </div> */}
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <input
              type="text"
              name="name"
              placeholder="*Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="*Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <input
            type="text"
            name="subject"
            placeholder="*Subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="*Message"
            value={formData.message}
            onChange={handleChange}
            required
          />
          {/* <div className="form-row">
            <label>
              <input
                type="checkbox"
                name="optIn"
                checked={formData.optIn}
                onChange={handleChange}
              />
              Opt in for the latest promotions and events. You may unsubscribe
              at any time.
            </label>
          </div>
          <p>
            By filling out this form and clicking submit, you agree to our{" "}
            <a href="/privacy-policy">privacy policy</a>.
          </p> */}
          <button type="submit" className="btn-submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
