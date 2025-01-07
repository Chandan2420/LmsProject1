import React from "react";
import "../Pages/Caurosel.css";

function Caurosel() {
  return (
    <>
      <div class="void" id="void">
        <div class="crop">
          <h1>Our Courses</h1>
          <ul id="card-list">
            <li>
              <div class="card">
                <a href="">
                  <span class="model-name">Web Development</span>
                  <span>
                    The process of creating, testing, and deploying web-based
                    applications that run on remote servers and are accessed by
                    users via the internet
                  </span>
                </a>
              </div>
            </li>
            <li>
              <div class="card">
                <a href="">
                  <span class="model-name">Data Science</span>
                  <span>
                    {" "}
                    It is a multidisciplinary approach that combines principles
                    and practices from the fields of mathematics, statistics,
                    artificial intelligence, and computer engineering to analyze
                    large amounts of data.
                  </span>
                </a>
              </div>
            </li>
            <li>
              <div class="card">
                <a href="">
                  <span class="model-name">Digital Marketing</span>
                  <span>
                    {/* {" "} */}
                    The promotion of brands to connect with potential customers
                    using the internet and other forms of digital communication.
                  </span>
                </a>
              </div>
            </li>
            <li>
              <div class="card">
                <a href="">
                  <span class="model-name">Graphic Design</span>
                  <span>
                    A creative process that uses a combination of art and
                    technology to communicate ideas visually
                  </span>
                </a>
              </div>
            </li>
            <li>
              <div class="card">
                <a href="">
                  <span class="model-name">Android Development</span>
                  <span>
                    {/* {" "} */}
                    The process of creating applications for devices running an
                    Android operating system.
                  </span>
                </a>
              </div>
            </li>
            <li>
              <div class="card">
                <a href="">
                  <span class="model-name">Artificial Intelligence</span>
                  <span>
                    Artificial intelligence (AI) is a set of technologies that
                    enable computers to perform a variety of advanced functions.
                  </span>
                </a>
              </div>
            </li>
          </ul>
          <div class="last-circle"></div>
          <div class="second-circle"></div>
        </div>
        <div class="mask"></div>
        <div class="center-circle">
          {/* {" "} */}
          <br></br>
        </div>
      </div>
    </>
  );
}

export default Caurosel;
