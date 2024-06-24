import React, { useState, useEffect } from 'react';
import '../style/stepTwo.css'; 
import { useNavigate,Link} from 'react-router-dom';
import { useStateContext } from './StateContext';
import axios from 'axios';
import { toast } from 'react-toastify';

function AttackStepTwo() {

    const navigate = useNavigate();

    const {selectedImages,setSelectedImages } = useStateContext();
    // const [select, setSelect] = useState(false);

    // const handleButtonClick = async () => {
    //     console.log(selectedImages)
    //     if(selectedImages.length !== 0){
    //         setSelectedImages(selectedImages)
    //         toast.success("Image selected successfully")
    //         navigate('/step-3'); 
    //     }else{
    //         toast.error("Please select images")
    //     }
     

        
    // };

    const handleButtonClick = async () => {
        console.log(selectedImages)

        if(selectedImages.length !== 0){
            setSelectedImages(selectedImages)

            try {
                const response = await axios.post('http://127.0.0.1:5000/upload-images', {
                    selectedImages: selectedImages
                });
                console.log(response.data); // Log response data if needed
                // navigate('/step-3');
            } catch (error) {
                console.error('Error posting selected images: ', error);
            }



            toast.success("Image selected successfully")
            navigate('/step-3'); 
        }else{
            toast.error("Please select images")
        }
       
    };

  
    const handleButtonClick1 = () => {
        navigate('/step-1'); 
      };

    const imageContext = require.context('../datasets/casia_webFace', false, /\.(png|jpe?g|svg)$/);
    const allImageFiles = imageContext.keys().map(imageContext);
    
    // State to keep track of the current page
    const [currentPage, setCurrentPage] = useState(1);

    // State to store images for the current page
    const [currentImages, setCurrentImages] = useState([]);

    // Number of images per page
    const imagesPerPage = 30;

    // Calculate total number of pages
    const totalPages = Math.ceil(allImageFiles.length / imagesPerPage);

    // Function to handle pagination
    const handlePagination = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Load images for the current page when the page changes
    useEffect(() => {
        const startIndex = (currentPage - 1) * imagesPerPage;
        const endIndex = startIndex + imagesPerPage;
        setCurrentImages(allImageFiles.slice(startIndex, endIndex));
    }, [currentPage]);

    // State to keep track of selected images
    
    // const {selectedImages,setSelectedImages } = useStateContext();


    // Function to handle image selection
    const handleImageSelect = (imageName) => {
        
        if (selectedImages.length < 10 || selectedImages.includes(imageName)) {
            setSelectedImages(prevSelectedImages => {
                if (prevSelectedImages.includes(imageName)) {
                   
                    return prevSelectedImages.filter(image => image !== imageName);
                } else {
                    
                    return [...prevSelectedImages, imageName];
                }
            });
        }
    };


     // State to store the uploaded image
     const [uploadedImageSrc, setUploadedImageSrc] = useState(null);

     // Function to handle file upload
     const handleFileUpload = (event) => {

         const file = event.target.files[0];
         const reader = new FileReader();
         reader.onload = (e) => {
             setUploadedImageSrc(e.target.result);
             setSelectedImages(prevSelectedImages => [...prevSelectedImages, e.target.result])
         };
         reader.readAsDataURL(file);

     };

     const handleClearImage = () => {
      
        setUploadedImageSrc('');
        const fileInput = document.querySelector('input[type="file"]');
        if (fileInput) {
            fileInput.value = '';
        }
     
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
                        <div>
                            <h2>Image Gallery</h2>
                            <div className="image-gallery">
                                {/* Display images */}
                                {currentImages
                                .filter(image => image.startsWith('data:image')) 
                                .map((image, index) => (
                                    <img
                                        key={index}
                                        src={image}
                                        alt={`Image ${index + 1}`}
                                        className={selectedImages.includes(image) ? 'selected' : ''}
                                        onClick={() => handleImageSelect(image)}
                                        style={{ maxWidth: '80px', maxHeight: '80px' }}
                                    />
                                ))}
                            </div>
                            {/* Pagination */}
                            <div className="pagination">
                                {Array.from({ length: totalPages }, (_, index) => (
                                    <button key={index + 1} onClick={() => handlePagination(index + 1)}>
                                        {index + 1}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="next-step-button">
                        <button className="prev2-button" onClick={handleButtonClick1}>Prev Step</button>
                        <button className="next2-button" onClick={handleButtonClick}>Next Step</button>           
                    </div>
                </div>

                {/* Selected Images */}
                <div className="selected-images">
                    <h2>Selected Images</h2>
                    {selectedImages.length === 0 ? (
                        <p>No images selected</p>
                    ) : (
                        <div className="image-gallery">
                            {/* Display selected images */}
                            {selectedImages.map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt={`Selected Image ${index + 1}`}
                                    style={{ maxWidth: '80px', maxHeight: '80px' }}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Lower row */}

                {/* <div className="row lower-row">
                    <div className="column upload-section">
                        <h2>Or Upload Your Own Image</h2>
                        <input type="file" accept="image/*" onChange={handleFileUpload} />
                    
                        {uploadedImageSrc && (
                                <button onClick={handleClearImage} style={{ maxWidth: '90px',marginTop:'8px' }}>Clear Image</button>
                            )}
                    </div>
                    <div className="column">
                    {uploadedImageSrc && (
                            <div className="uploaded-image">
                                <h3>Uploaded Image</h3>
                                <img 
                                    src={uploadedImageSrc} 
                                    alt="Uploaded"  
                                    style={{ maxWidth: '80px', maxHeight: '80px' }} 
                                    onClick={() => handleImageSelect(uploadedImageSrc)}
                                />
                            </div>
                        )}
                    </div>
                    <div className="column">
                        <h2>Input Text for Image Label</h2>
                        <input type="text" placeholder="Enter image label" />
                    </div>
                </div> */}

            </div>

            {/* Footer */}
            {/* <footer className="footer">
                <div className="footer-container">
                    <p>Footer</p>
                </div>
            </footer> */}
        </div>
    );
}

export default AttackStepTwo;
