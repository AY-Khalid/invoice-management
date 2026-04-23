import { useState, useEffect } from "react";
import profile from "../assets/profile.webp";
import logo from "../assets/logo.webp";

export default function Aside() {

  const [darkMode, setDarkMode] = useState(false);

  
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      setDarkMode(true);
    }
  }, []);


  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  function toggleTheme() {
    setDarkMode(prev => !prev);
  }

  return (
    <aside className="aside-container">
      <img src={logo} alt="" className="logo" />

      <div className="aside-bottom">
        <i 
          className="fa-solid fa-moon" 
          onClick={toggleTheme} 
          style={{ cursor: "pointer" }}
        ></i>

        {/* <i className="fa-solid fa-circle"></i> */}
        <hr />
        <img src={profile} alt="" className="profile-img" />
      </div>
    </aside>
  );
}