import '../style/stepThree.css';
import React, { useState, useEffect } from 'react';
import { useNavigate,Link  } from 'react-router-dom';
import { Slider  } from 'rsuite';
import { useStateContext } from './StateContext';
import axios from 'axios';
import { toast } from 'react-toastify';



function AttackStepThree() {


  const { predictionArray,selectedModel,selectedImages ,selectedParameters,setSelectedParameters ,setPredictionArray } = useStateContext();
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleButtonClick1 = () => {
    navigate('/step-2'); 
  };

  const [value, setValue] = useState({attackName:"",type:"",lr: 0, th: 0 ,iter:0,eps:0,steps:0,numSample:0})
  const [selectedAttack, setSelectedAttack] = useState('');
  const [selectedAttackType, setSelectedAttackType] = useState('');
  
  const [loading, setLoading] = useState(false);

  const handleSliderChange = (newValue, key) => {
    
    
    setValue((prevValue) => ({
      ...prevValue,
      [key]: newValue 
    }));
  };

  const handleAttackSelect = (attack) => {
    setValue({attackName:"",type:"",lr: 0, th: 0 ,iter:0,eps:0,steps:0,numSample:0})
    setSelectedAttackType('')
    setSelectedAttack(attack);
  };

  const handleAttackType = (attack) =>{
    setSelectedAttackType(attack)
  }

  useEffect(() => {
    console.log(selectedAttackType)
    setValue((prevValue) => ({
      ...prevValue,
      ["type"]: selectedAttackType.slice(0, -1)
    }));
  }, [selectedAttackType]);

  useEffect(() => {
    console.log(selectedAttack)
    setValue((prevValue) => ({
      ...prevValue,
      ["attackName"]: selectedAttack
    }));
  }, [selectedAttack]);

 
  const handleButtonClick = async () => {
    setSelectedParameters(value)
    setIsLoading(true);
    // console.log(selectedAttack)
    // console.log(selectedModel)
    // console.log(selectedAttackType)
    // console.log(selectedImages)
    // console.log(predictionArray)

    if (selectedAttack !== '' && selectedModel !== null && selectedAttackType !== '' && selectedImages !== null){
      toast.success("Waiting for prediction")
      try {
  
        const modelPayload = {
          selectedModel: selectedModel,
          // selectedParameters: selectedParameters
          selectedParameters: value
        };
  
        
        const imagesPayload = {
          selectedImages: selectedImages
        };
  
        // console.log(modelPayload)
        // console.log(imagesPayload)
    
        const modelResponse = await axios.post('http://127.0.0.1:5000/attack-parameters', modelPayload);
        // const imagesResponse = await axios.post('http://127.0.0.1:5000/upload-images', imagesPayload);
    
        console.log('Model response:', modelResponse.data);
        // console.log('Images response', imagesResponse.data);
  
  
        // if (modelResponse.status === 200 && imagesResponse.status === 200) {
          if (modelResponse.status === 200 ) {
          toast.success(modelResponse.data.message)
          let adv_imgs = modelResponse.data;
          setPredictionArray(adv_imgs.adv_images);
          navigate('/results');
        } else {
          // console.error('Model or images response was not successful');
          toast.error("Waiting for prediction")
        }
        
      } catch (error) {
        console.error('Error:', error);
      }

    }else{
      toast.error("Please select attack parameters")
    }

    setIsLoading(false);
  };

  
  useEffect(() => {
    // setSelectedParameters(value)
    // console.log(selectedModel)
    // console.log(value)
    // console.log(selectedParameters)
  });


  

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
        {/* {loading && <Loading />} */}
        <div className="row upper-row">

          <div className="column1">
            <h2>XDONoise Adversarial Attack Simulator</h2>

              {/* Attack options */}
            <div className="attack-options">

                <div className="attack-buttons">
                  
                    <input
                      type="radio"
                      id="gradcampp"
                      name="gradcampp"
                      value="gradcampp"
                      checked={selectedAttack === 'gradcampp'}
                      onChange={() => handleAttackSelect('gradcampp')}
                    />
                    
                    <label htmlFor="gradcampp">XDONoise GradCampp </label><br />
                    
                    <input
                      type="radio"
                      id="ig"
                      name="ig"
                      value="ig"
                      checked={selectedAttack === 'ig'}
                      onChange={() => handleAttackSelect('ig')}
                    />
                    
                    <label htmlFor="ig">XDONoise Integrated Gradients</label><br />

                    <input
                      type="radio"
                      id="gradshap"
                      name="gradshap"
                      value="gradshap"
                      checked={selectedAttack === 'gradshap'}
                      onChange={() => handleAttackSelect('gradshap')}
                    />
                    
                    <label htmlFor="gradshap">XDONoise Gradient Shap</label><br />

                </div>  

            </div>




            <div className="flex-container">
              <div className={`column2 ${selectedAttack === 'gradcampp' ? '' : 'disabled'}`}> 
              
                <h3>XDONoise GradCampp</h3>

                  <div className='attack-types'>
                  <input
                      type="radio"
                      id="fgsm1"
                      name="fgsm1"
                      value="fgsm1"
                      checked={selectedAttackType === 'fgsm1'}
                      onChange={() => handleAttackType('fgsm1')}
                    />
                    
                    <label htmlFor="fgsm1">FGSM</label><br />
                    
                    <input
                      type="radio"
                      id="pgd1"
                      name="pgd1"
                      value="pgd1"
                      checked={selectedAttackType === 'pgd1'}
                      onChange={() => handleAttackType('pgd1')}
                    />
                    
                    <label htmlFor="pgd1">PGD</label><br />

                  </div>

                <div className={`${selectedAttackType === '' && value.attackName ==="gradcampp"? 'disabled' : ''}`}>

                    <div className="tune-parameter">
                      <label htmlFor="attack1-lr">Learning rate: {value.lr}</label>
                      <Slider
                        tooltip={false}
                        progress 
                        graduated
                        style={{ marginTop: 16 , marginBottom:40}}
                        min={1}
                        max={5}
                        renderMark={mark =>mark/100}
                        onChange={(value) => handleSliderChange(value/100, 'lr',value)}
                      />
                      
                    </div>
                    <div className="tune-parameter">
                      <label htmlFor="attack2-threshold">Threshold: {value.th} </label>
                      <Slider
                        tooltip={false}
                        progress 
                        graduated
                        style={{ marginTop: 16 , marginBottom:40}}
                        min={1}
                        max={8}
                        renderMark={mark =>mark/10}
                        onChange={(value) => handleSliderChange(value/10, 'th',value)}
                      />
                    </div>
                    <div className="tune-parameter">
                      <label htmlFor="parameter3">Iterations :{value.iter}</label>
                      <Slider
                        disabled={selectedAttackType === 'fgsm1'}
                        tooltip={false}
                        progress 
                        graduated
                        style={{ marginTop: 16 , marginBottom:40}}
                        min={1}
                        max={5}
                        renderMark={mark =>mark}
                        onChange={(value) => handleSliderChange(value, 'iter',value)}
                      />
                    </div>
                    <div className="tune-parameter">
                      <label htmlFor="parameter4">Epsilon :{value.eps}</label>
                      <Slider
                        disabled={selectedAttackType === 'fgsm1'}
                        tooltip={false}
                        progress 
                        graduated
                        style={{ marginTop: 16 , marginBottom:40}}
                        min={1}
                        max={3}
                        renderMark={mark =>mark/100}
                        onChange={(value) => handleSliderChange(value/100, 'eps',value)}
                      />
                    </div>

                </div>

              </div>
          
              <div className={`column3 ${selectedAttack === 'ig' ? '' : 'disabled'}`}>
                  <h3>XDONoise Integrated Gradients</h3>


                  <div className='attack-types'>
                  <input
                      type="radio"
                      id="fgsm2"
                      name="fgsm2"
                      value="fgsm2"
                      checked={selectedAttackType === 'fgsm2'}
                      onChange={() => handleAttackType('fgsm2')}
                    />
                    
                    <label htmlFor="fgsm2">FGSM</label><br />
                    
                    <input
                      type="radio"
                      id="pgd2"
                      name="pgd2"
                      value="pgd2"
                      checked={selectedAttackType === 'pgd2'}
                      onChange={() => handleAttackType('pgd2')}
                    />
                    
                    <label htmlFor="pgd2">PGD</label><br />

                  </div>

                <div className={`${selectedAttackType === '' && value.attackName ==="ig"? 'disabled' : ''}`}>

                   
                    <div className="tune-parameter">
                      <label htmlFor="attack1-lr">Learning rate: {value.lr}</label>
                      <Slider
                        tooltip={false}
                        progress 
                        graduated
                        style={{ marginTop: 16 , marginBottom:40}}
                        min={1}
                        max={5}
                        renderMark={mark =>mark/100}
                        onChange={(value) => handleSliderChange(value/100, 'lr',value)}
                      />
                      
                    </div>
                    <div className="tune-parameter">
                      <label htmlFor="attack2-threshold">Threshold: {value.th} </label>
                      <Slider
                        tooltip={false}
                        progress 
                        graduated
                        style={{ marginTop: 16 , marginBottom:40}}
                        min={1}
                        max={8}
                        renderMark={mark =>mark/100}
                        onChange={(value) => handleSliderChange(value/100, 'th',value)}
                      />
                    </div>
                    <div className="tune-parameter">
                      <label htmlFor="attack2-steps">Steps: {value.steps} </label>
                      <Slider
                        tooltip={false}
                        progress 
                        graduated
                        style={{ marginTop: 16 , marginBottom:40}}
                        min={0}
                        max={20}
                        step={5}
                        renderMark={mark =>mark}
                        onChange={(value) => handleSliderChange(value, 'th',value)}
                      />
                    </div>
                    <div className="tune-parameter">
                      <label htmlFor="parameter3">Iterations :{value.iter}</label>
                      <Slider
                        disabled={selectedAttackType === 'fgsm2'}
                        tooltip={false}
                        progress 
                        graduated
                        style={{ marginTop: 16 , marginBottom:40}}
                        min={1}
                        max={5}
                        renderMark={mark =>mark}
                        onChange={(value) => handleSliderChange(value, 'iter',value)}
                      />
                    </div>
                    <div className="tune-parameter">
                      <label htmlFor="parameter4">Epsilon :{value.eps}</label>
                      <Slider
                        disabled={selectedAttackType === 'fgsm2'}
                        tooltip={false}
                        progress 
                        graduated
                        style={{ marginTop: 16 , marginBottom:40}}
                        min={1}
                        max={3}
                        renderMark={mark =>mark/10}
                        onChange={(value) => handleSliderChange(value/10, 'eps',value)}
                      />
                    </div>

                </div>



              </div>

              <div className={`column4 ${selectedAttack === 'gradshap' ? '' : 'disabled'}`}>
                  <h3>XDONoise Gradient Shap</h3>


                  <div className='attack-types'>
                  <input
                      type="radio"
                      id="fgsm3"
                      name="fgsm3"
                      value="fgsm3"
                      checked={selectedAttackType === 'fgsm3'}
                      onChange={() => handleAttackType('fgsm3')}
                    />
                    
                    <label htmlFor="fgsm3">FGSM</label><br />
                    
                    <input
                      type="radio"
                      id="pgd3"
                      name="pgd3"
                      value="pgd3"
                      checked={selectedAttackType === 'pgd3'}
                      onChange={() => handleAttackType('pgd3')}
                    />
                    
                    <label htmlFor="pgd3">PGD</label><br />

                  </div>

                <div className={`${selectedAttackType === '' && value.attackName ==="gradshap"? 'disabled' : ''}`}>

                   
                    <div className="tune-parameter">
                      <label htmlFor="attack1-lr">Learning rate: {value.lr}</label>
                      <Slider
                        tooltip={false}
                        progress 
                        graduated
                        style={{ marginTop: 16 , marginBottom:40}}
                        min={1}
                        max={5}
                        renderMark={mark =>mark/100}
                        onChange={(value) => handleSliderChange(value/100, 'lr')}
                      />
                      
                    </div>
                    <div className="tune-parameter">
                      <label htmlFor="attack2-threshold">Threshold: {value.th} </label>
                      <Slider
                        tooltip={false}
                        progress 
                        graduated
                        style={{ marginTop: 16 , marginBottom:40}}
                        min={1}
                        max={8}
                        renderMark={mark =>mark/10}
                        onChange={(value) => handleSliderChange(value/10, 'th')}
                      />
                    </div>
                    <div className="tune-parameter">
                      <label htmlFor="attack2-steps">Num Samples: {value.numSample} </label>
                      <Slider
                        tooltip={false}
                        progress 
                        graduated
                        style={{ marginTop: 16 , marginBottom:40}}
                        min={0}
                        max={20}
                        step={5}
                        renderMark={mark =>mark}
                        onChange={(value) => handleSliderChange(value, 'numSample')}
                      />
                    </div>
                    <div className="tune-parameter">
                      <label htmlFor="parameter3">Iterations :{value.iter}</label>
                      <Slider
                        disabled={selectedAttackType === 'fgsm3'}
                        tooltip={false}
                        progress 
                        graduated
                        style={{ marginTop: 16 , marginBottom:40}}
                        min={1}
                        max={5}
                        renderMark={mark =>mark}
                        onChange={(value) => handleSliderChange(value, 'iter')}
                      />
                    </div>
                    <div className="tune-parameter">
                      <label htmlFor="parameter4">Epsilon :{value.eps}</label>
                      <Slider
                        disabled={selectedAttackType === 'fgsm3'}
                        tooltip={false}
                        progress 
                        graduated
                        style={{ marginTop: 16 , marginBottom:40}}
                        min={1}
                        max={3}
                        renderMark={mark =>mark/10}
                        onChange={(value) => handleSliderChange(value/10, 'eps')}
                      />
                    </div>

                </div>



              </div>
            </div>
          </div>

          <div className="column5">
            <button className="get-prediction-button" onClick={handleButtonClick1}>Prev Step</button>
            <button className="get-prediction-button" onClick={handleButtonClick}>Get Predictions</button>

            {/* <div class="loading-container">
            <div class="roller"></div>
            <div class="loading-text">Loading...</div> */}

            <div>
              {isLoading ? (
                <div class="loading-container">
                  <div class="roller"></div>
                  <div class="loading-text">Predicting...</div>
                </div>
              ) : null}
            </div>
                    
          </div>
          
         
        </div>
        

        {/* Lower row */}
        <div className="row lower-row">
          <div className="column">
            <div className="tuned-attack-description">
              <h2>Tuned Attack Description</h2>
              {selectedAttack === "gradcampp" ? (
                  <p>
                    GradCAM++, another XAI technique, offers valuable insights into model decisions by highlighting influential regions within input images. In this study, the authors harnessed GradCAM++ to identify crucial areas for introducing perturbations. By thresholding the attribution map generated by GradCAM++, specific regions were targeted for perturbations using FGSM and PGD attacks. 
                  </p>
              ) : selectedAttack === "ig" ? (
                  <p>
                    Integrated Gradient, as an XAI technique, provides valuable insights into feature importance
                    and facilitates the interpretation of model behavior by identifying influential input features.
                    The author utilized this method by thresholding the attribution map and capturing areas to
                    introduce perturbations using FGSM and PGD attacks, improving two variations of adversarial
                    attacks.
                  </p>
              ) : selectedAttack === "gradshap" ? (
                  <p>
                    The author utilized GradientSHAP, an XAI approach, to calculate Shapley values by analyzing
                    the model's gradients concerning input features. By integrating this method into FGSM and
                    PGD adversarial attacks, and refining them through attribution map thresholding and targeted
                    region capture, the author improved the efficacy of both attack strategies.
                  </p>
              ) :(
                  <p>
                      Please select a attack.
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

export default AttackStepThree;
