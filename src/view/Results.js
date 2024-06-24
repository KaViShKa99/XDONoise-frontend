import React, { useState, useEffect } from 'react';
import '../style/results.css';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from './StateContext';

function XDONoisePage() {

  const navigate = useNavigate();

  const { predictionArray,setPredictionArray,setSelectedParameters,setSelectedImages,setSelectedModel } = useStateContext();

  const handleButtonClick = () => {
    setCurrentImages([])
    setPredictionArray(null)
    setSelectedParameters({attackName:"",type:"",lr: 0, th: 0 ,iter:0,eps:0,steps:0,numSample:0})
    setSelectedImages([])
    setSelectedModel(null)
    navigate('/'); 
  };

  // State to store images for the current page
  const [currentImages, setCurrentImages] = useState([]);

  useEffect(() => {
    if (predictionArray && predictionArray.length > 0 && predictionArray[0]["ori_img"]) {
      setCurrentImages(predictionArray[0]["ori_img"]);
    }
  }, []);


  // State to keep track of selected image
  const [selectedImage, setSelectedImage] = useState(null);

  // Function to handle image selection
  const handleImageSelect = (imageName) => {
    console.log(imageName)
    console.log(selectedImage)
  
    setSelectedImage(imageName === selectedImage ? null : imageName);
  };


  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="container">
          <h1>XDONoise</h1>
          <div className="nav-items">
            <a href="/">XDONoise</a>
            {/* <a href="/login">Login</a> */}
            {/* <a href="#">GitHub</a> */}
          </div>
        </div>
      </nav>
      {/* Main Content */}
      <div className="result-main-container">
        {/* First Row */}
        <div className="row">
          <div className="row1-result-column">
            {/* Original Image */}
            <div className="result-image-gallery">
              <span>Original Images</span>
              <div className="result-image-container">
                  
                { predictionArray && currentImages.map((imageBase64, index) => (
                  <img
                    key={index}
                    src={`data:image/jpeg;base64,${imageBase64}`}
                    alt={`Image ${index + 1}`}
                    className={selectedImage === index +1 ? 'selected' : ''}
                    onClick={() => handleImageSelect(index+1)}
                    style={{ maxWidth: '80px', maxHeight: '80px' }}
                  />
                ))}

              </div>
            </div>

            <div className="true-image-label">
              <span >True Image label : {predictionArray && selectedImage ? predictionArray[0]["true_label"][selectedImage-1] : ""}</span>
            </div>
          </div>
          <div className="row1-result-column">
            {/* Adversary Image */}
            <div className="result-image-gallery">
              <span>Adversary Image</span>
              <div className="image-container">

                  <div className="selected-images">
                      {predictionArray && selectedImage ? (
                          <img
                              // src={selectedImage}
                              src={`data:image/jpeg;base64,${predictionArray[0]["adv_img"][selectedImage-1]}`}
                              alt="Selected Image"
                              style={{ maxWidth: '200px', maxHeight: '200px' }}
                          />
                      ) : (
                          <p>No image selected</p>
                      )}
                  </div>
      
              </div>
            </div>
            <div className="adversary-image-label">
              <span>Adversary Image label : {predictionArray && selectedImage ? predictionArray[0]["adv_label"][selectedImage-1] : ""}</span>
            </div>            
          </div>
          <div className="row1-result-column3">
           
                <div className='result-flex-container'>

                    <div className="column3_1">
                        {/* XAI Original Image */}
                        <span>Original Image</span>
                        <div className="image-container">
                            {predictionArray && selectedImage ? (
                                <img
                                    // src={selectedImage}
                                    src={`data:image/jpeg;base64,${predictionArray[0]["ori_xai_img"][selectedImage-1]}`}
                                    alt="Selected Image"
                                    style={{ maxWidth: '200px', maxHeight: '200px', }}
                                />
                            ) : (
                                <p>No image selected</p>
                            )}
                        </div>
                    </div>
                    <div className="column3_2">
                    <span>Adversary Image</span>
                        {/* XAI Adversary Image */}
                        <div className="image-container">
                            {predictionArray && selectedImage ? (
                                <img
                                    src={`data:image/jpeg;base64,${predictionArray[0]["adv_xai_img"][selectedImage-1]}`}
                                    alt="Selected Image"
                                    style={{ maxWidth: '200px', maxHeight: '200px' }}
                                />
                            ) : (
                                <p></p>
                            )}
                        </div>
                    </div>

                </div>        
                
          </div>
        </div>
        {/* Second Row */}
        <div className="row">
            
            <div className="row2-result-column">

            <div className="description">
                <h2>Confidence Level</h2>
                <p>Confidence probabilty: {predictionArray && selectedImage ? predictionArray[0]["adv_pred_prob"][selectedImage-1] : ""}</p>
            </div>

            </div>
            <div className="row2-result-column">

            <div className="description">
                <h2>Magnitude Change</h2>
                <p>Magnitude Value: {selectedImage ? predictionArray[0]["magnitude"][selectedImage-1] : ""}</p>
            </div>

            </div>

            <div className="again-button">
                    <button className="start-again-button" onClick={handleButtonClick}>Start Again</button>
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

export default XDONoisePage;
