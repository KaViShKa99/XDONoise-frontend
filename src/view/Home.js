import '../style/home.css';
import bgImg from '../images/xdo_bg.png' 
import algoImg from '../images/algorithm.png' 
import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import TypingAnimation from './TypingAnimation'

function Home() {

  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/step-1'); 
  };
 
 
  return (
    <div>
    {/* Navbar */}
    <nav className="navbar">
    <div className="container">
      <h1>XDONoise</h1>
      <div className="nav-items">
        <a href="/">XDONoise</a>
        {/* <a href="#">Login</a> */}
        {/* <a href="#">GitHub</a> */}
      </div>
    </div>
  </nav>
    {/* Main Content */}
    <div className="main_container">
      <div className="row">
        <div className="column">
          <img src={bgImg} alt="Image" />
        </div>
        <div className="column">
          <div className="description">
            {/* <h2>What is the XDONoise Attack?</h2> */}
            <h2><TypingAnimation text="What is the XDONoise Attack?" /></h2>
            {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nulla facilisi nullam vehicula ipsum a. Vel fringilla est ullamcorper eget nulla. Ornare arcu odio ut sem. Morbi tincidunt ornare massa eget egestas purus viverra accumsan in. Praesent elementum facilisis leo vel fringilla. Mattis vulputate enim nulla aliquet porttitor. Etiam tempor orci eu lobortis elementum nibh tellus molestie. Nullam vehicula ipsum a arcu cursus vitae congue mauris rhoncus. Felis imperdiet proin fermentum leo vel orci.</p> */}
            <p>
            The XDONoise Attack refers to a novel adversarial noise assault technique orchestrated by Explainable Artificial Intelligence (XAI) aimed at deceiving target models. This method leverages Grad-CAM++ to pinpoint sensitive distributions within images, allowing for the visualization of crucial regions influencing model predictions. The attack is formulated by analyzing variations in gradient loss, specifically in these identified vulnerable areas. In essence, XDONoise Attack strategically manipulates these regions with adversarial noise to mislead the target model's decision-making process.
            </p>
            
            <button className="custom-button" onClick={handleButtonClick}>Start Attack</button>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="column">
          <div className="description">
            <h2>XDONoise Algorithm</h2>
            {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lacus luctus accumsan tortor posuere ac ut consequat semper viverra. Scelerisque eu ultrices vitae auctor. Pharetra convallis posuere morbi leo urna. Sed felis eget velit aliquet sagittis id consectetur purus. Aliquet nec ullamcorper sit amet risus nullam eget felis eget. Tincidunt nunc pulvinar sapien et ligula ullamcorper malesuada. Dictum sit amet justo donec enim.</p> */}
          
            <p>
            The first step of the process is to compute a gradient-weighted map, which shows the important areas in the input image for the target layer and model. Next, Grad-CAM++ produces a binary mask, represented by the letter "M," that identifies the relevant regions that are essential for the target class. The gradient loss distribution is then obtained by the procedure by computing the gradient loss of the original picture and multiplying it with the Grad-CAM++ binary mask.             </p>
          </div>
        </div>
        <div className="column">
          <img src={algoImg} alt="Image" />
        </div>
      </div>
    </div>

    {/* Footer */}
    {/* <footer className="footer">
      <div className="container">
        <p>Footer</p>
      </div>
    </footer> */}
  </div>
  );
}

export default Home;
