// StateContext.js
import React, { createContext, useContext, useState } from 'react';

const StateContext = createContext();

export const StateProvider = ({ children }) => {
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedParameters, setSelectedParameters] = useState({attackName:"",type:"",lr: 0, th: 0 ,iter:0,eps:0,steps:0,numSample:0});
  const [predictionArray, setPredictionArray] = useState(null)

  return (
    <StateContext.Provider
      value={{
        selectedModel,
        setSelectedModel,
        selectedImages,
        setSelectedImages,
        selectedParameters,
        setSelectedParameters,
        predictionArray,
        setPredictionArray
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
