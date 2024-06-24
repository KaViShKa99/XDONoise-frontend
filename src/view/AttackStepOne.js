import '../style/stepOne.css';
import React from 'react';
import { useNavigate,Link } from 'react-router-dom';
import { useStateContext } from './StateContext';
import { toast } from 'react-toastify';

function AttackStepOne() {

  const { selectedModel, setSelectedModel } = useStateContext();
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (selectedModel){
      toast.success("Model select successfully")
      navigate('/step-2'); 
    }else{
      toast.error("Please Select the Model !")
    }
    
  };
  const handleButtonClick1 = () => {
    navigate('/'); 
  };

  const handleModelSelect = (value) => {
    setSelectedModel(prevSelectedModel => prevSelectedModel === value ? null : value);
  };


  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="container">
          <h1>XDONoise</h1>
          <div className="nav-items">
            <Link to="/">XDONoise</Link>
            {/* <Link to="/login">Login</Link> */}
            {/* <a href="#">GitHub</a> */}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="main_container">
        {/* Upper row */}
        <div className="row upper-row">
          <div className="column">
            <h2>XDONoise Adversarial Attack Simulator</h2>
            <div className='upper_container'>
              <h3>Select the desired model</h3>


              <div className="buttons">

                  <input
                    type="radio"
                    id="model1"
                    name="model"
                    value="vggface2"
                    checked={selectedModel === "vggface2"}
                    onChange={() => handleModelSelect("vggface2")}
                  />
                  <label htmlFor="model1">VGGFace2 Pre trained Model</label><br />
                  <input
                    type="radio"
                    id="model2"
                    name="model"
                    value="casiaWebFace"
                    checked={selectedModel === "casiaWebFace"}
                    onChange={() => handleModelSelect("casiaWebFace")}
                  />
                  <label htmlFor="model2">Casia-weface Pre trained Model</label><br />

              </div>


            </div>
          </div>
          <div className="next-step-button">
            <button className="prev1-button" onClick={handleButtonClick1}>Prev Step</button>
            <button className="next1-button" onClick={handleButtonClick}>Next Step</button>
          </div>
        </div>

        {/* Lower row */}
        <div className="row lower-row">
          <div className="column">
            <div className="description">
              <h2>Model Description</h2>
              {selectedModel === "vggface2" ? (
                  <p>
                      The VGGFace2 dataset pre-trained with the InceptionResNetV1 architecture is a comprehensive collection of facial images designed for face recognition tasks. It contains a vast array of face images spanning diverse demographics, poses, and lighting conditions. The InceptionResNetV1 architecture, renowned for its deep and efficient feature extraction capabilities, has been utilized to pre-train models on this dataset. This combination offers a powerful foundation for face recognition systems, enabling accurate and robust identification of individuals in various real-world scenarios.
                  </p>
              ) : selectedModel === "casiaWebFace" ? (
                  <p>
                      The CASIA-WebFace dataset, pre-trained with the InceptionResNetV1 architecture, is a widely-used facial recognition dataset containing a large collection of facial images. These images are sourced from the internet and cover a diverse range of individuals, expressions, and lighting conditions. Leveraging the InceptionResNetV1 architecture for pre-training ensures robust feature extraction and representation learning, making it well-suited for facial recognition tasks. With its extensive coverage and high-quality annotations, the CASIA-WebFace dataset pre-trained with InceptionResNetV1 serves as a valuable resource for training and evaluating facial recognition models, enabling advancements in the field of biometric authentication and identification.
                  </p>
              ) : (
                  <p>
                      Please select a model.
                  </p>
              )}
             
            </div>
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

export default AttackStepOne;