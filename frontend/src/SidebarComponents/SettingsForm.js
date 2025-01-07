import React, { useState } from "react";
import "../SidebarComponents/SettingsForm.css";

const SettingsForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [avatar, setAvatar] = useState("https://via.placeholder.com/250");
  const [socialLinks, setSocialLinks] = useState({
    facebook: "",
    linkedin: "",
    github: "",
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setAvatar(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarRemove = () => {
    setAvatar("https://via.placeholder.com/250");
  };

  const handleSocialLinkChange = (event) => {
    const { name, value } = event.target;
    setSocialLinks((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (event) => {
    event.preventDefault();
    // Here, you can collect and process the form data.
    const formData = {
      // Add other form data here as needed
      avatar,
      socialLinks,
    };
    console.log("Form data saved:", formData);
    alert("Settings saved successfully!");
  };

  return (
    <div className="settings-container">
      <h2 className="settings-title">Settings</h2>
      <form className="settings-form" onSubmit={handleSave}>
        {/* Name fields */}
        <div className="form-group-row">
          <div className="form-group">
            <label htmlFor="first-name">First name</label>
            <input type="text" id="first-name" placeholder="First name" />
          </div>
          <div className="form-group">
            <label htmlFor="last-name">Last name</label>
            <input type="text" id="last-name" placeholder="Last name" />
          </div>
        </div>

        {/* Display name and email */}
        <div className="form-group-row">
          <div className="form-group">
            <label htmlFor="display-name">Display name*</label>
            <input type="text" id="display-name" placeholder="Display name" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email address*</label>
            <input type="email" id="email" placeholder="Email address" />
          </div>
        </div>

        {/* Avatar */}
        <div className="form-group avatar-group">
          <label>Avatar</label>
          <div className="avatar-controls">
            <img className="avatar-preview" src={avatar} alt="Avatar preview" />
            <div className="avatar-div">
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                style={{ display: "none" }}
                id="avatar-upload"
              />
              <label htmlFor="avatar-upload" className="avatar-button">
                Change
              </label>
              <button
                type="button"
                className="avatar-button"
                onClick={handleAvatarRemove}
              >
                Remove
              </button>
              {/* <p className="avatar-info">Upload image size 250×250px.</p> */}
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="form-group">
          <label htmlFor="bio">Biographical Info</label>
          <textarea
            id="bio"
            placeholder="Write something about yourself"
          ></textarea>
        </div>

        {/* Password and Phone */}
        <div className="form-group-row">
          <div className="form-group">
            <label htmlFor="password">New Password</label>
            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="New password"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input type="tel" id="phone" placeholder="Phone number" />
          </div>
        </div>

        {/* Social Links */}
        <div className="form-group-row">
          <div className="form-group">
            <label htmlFor="facebook">Facebook</label>
            <input
              type="url"
              id="facebook"
              name="facebook"
              value={socialLinks.facebook}
              onChange={handleSocialLinkChange}
              placeholder="Facebook link"
            />
          </div>
          <div className="form-group">
            <label htmlFor="linkedin">LinkedIn</label>
            <input
              type="url"
              id="linkedin"
              name="linkedin"
              value={socialLinks.linkedin}
              onChange={handleSocialLinkChange}
              placeholder="LinkedIn link"
            />
          </div>
          <div className="form-group">
            <label htmlFor="github">GitHub</label>
            <input
              type="url"
              id="github"
              name="github"
              value={socialLinks.github}
              onChange={handleSocialLinkChange}
              placeholder="GitHub link"
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="form-group">
          <button type="submit" className="save-button">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default SettingsForm;
