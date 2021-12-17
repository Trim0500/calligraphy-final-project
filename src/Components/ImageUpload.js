import React, {useState, useRef} from 'react';
import  no_image from '../resources/img/no_image.png';
import 'bootstrap/dist/css/bootstrap.css';
import {Container} from "react-bootstrap";
import {Card} from "react-bootstrap";

// upload image and save it under resources/img on the filepath

function ImageUpload(){
    const [ImageTitle, setImageTitle] = useState('');
    const [ImageData, setImage] = useState(null);
    
    const fileInput = useRef(null);
    
    const handleImageUpload = (e) => {
        e.preventDefault();

        const file = fileInput.current.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setImage(reader.result);
        }
        reader.readAsDataURL(file);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        let api = 'https://localhost:5001/api/image';

        const base64_image_data= ImageData.split(',')[1];

        let formData = {
            ImageTitle : ImageTitle,
            ImageData : base64_image_data
        }

        console.log(JSON.stringify(formData));

        fetch(api, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(err => console.log(err));


        setImageTitle('');
        setImage(null);
    }

    const handleImageTitleChange = (e) => {
        setImageTitle(e.target.value);
    }

    return(
        <Container>
            <Card>
                <Card.Body>
                    <Card.Title>Upload Image</Card.Title>
                    <Card.Text>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="imageTitle">Image Title</label>
                                <input type="text" className="form-control" id="imageTitle" value={ImageTitle} onChange={handleImageTitleChange}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="image">Image</label>
                                <input type="file" className="form-control-file" id="image" ref={fileInput} onChange={handleImageUpload}/>
                            </div>
                            <button type="submit" className="btn btn-primary">Upload</button>
                        </form>
                    </Card.Text>
                </Card.Body>
            </Card>
            <br/>
            <Card>
                <Card.Body>
                    <Card.Title>Image Preview</Card.Title>
                    <Card.Text>
                        {ImageData ? <img src={ImageData} alt="Image Preview" width="100%" height="100%"/> : <img src={no_image} alt="No Image Preview" width="100%" height="100%"/>}
                    </Card.Text>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default ImageUpload;