import React, {useState, useRef} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {MulterError} from "multer"; 

// upload image and save it under resources/img on the filepath

function ImageUpload(){
    const [imagePath, setImagePath] = useState('');
    const [imageTitle, setImageTitle] = useState('');
    const [imageext, setImageext] = useState('');
    const [image, setImage] = useState(null);
    
    const fileInput = useRef(null);
    
    const handleImageUpload = (e) => {
        e.preventDefault();
        const file = fileInput.current.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setImage(reader.result);
        }
        reader.readAsDataURL(file);
        
        const fileName = file.name;
        const fileExt = fileName.slice(fileName.lastIndexOf('.'));
        setImageext(fileExt);
        
    }
    
    const handleImageTitle = (e) => {
        setImageTitle(e.target.value);
    }
    
    const handleImageInsideProject = (e) => {
        //
        
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();

        let api = 'https://localhost:5001/api/image';
        //json object to be sent to the server
        let json = {
            "ImageTitle" : imageTitle,
            "ImagePath": "resources/img/" + imageTitle + imageext
        }
        console.log(json);
        fetch(api, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(json)
        })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err));
        
        
        setImagePath('');
        setImageTitle('');
        setImage(null);
    }
    
    return(
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="imageTitle">Image Title</label>
                            <input type="text" className="form-control" id="imageTitle" onChange={handleImageTitle}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="image">Image</label>
                            <input type="file" className="form-control" id="image" ref={fileInput} onChange={handleImageUpload}/>
                        </div>
                        <button type="submit" className="btn btn-primary mt-2">Submit</button>
                    </form>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <img src={image} alt="Uploaded Image" className="img-fluid"/>
                </div>
            </div>
        </div>
    );
    
}

export default ImageUpload;