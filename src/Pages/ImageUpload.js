import React, {useState, useRef} from 'react';
import  no_image from '../resources/img/no_image.png';
import 'bootstrap/dist/css/bootstrap.css';
import {Container} from "react-bootstrap";
import {Card} from "react-bootstrap";
import {useParams} from "react-router-dom";
import axios from "axios";

// upload image and save it under resources/img on the filepath

export default function ImageUpload() {
    const [ImageTitle, setImageTitle] = useState('');
    const [ImageData, setImage] = useState(no_image);
    const [ImageDescription, setImageDescription] = useState('');
    const {id} = useParams();
    const fileInput = useRef(null);

    const _validFileExtensions = [".jpg", ".jpeg", ".bmp", ".gif", ".png"];

    const handleImageUpload = (e) => {
        e.preventDefault();

        const sFileName = fileInput.current.files[0].name;
        if (sFileName.length > 0) {
            let blnValid = false;
            for (let j = 0; j < _validFileExtensions.length; j++) {
                const sCurExtension = _validFileExtensions[j];
                if (sFileName.substr(sFileName.length - sCurExtension.length, sCurExtension.length).toLowerCase() === sCurExtension.toLowerCase()) {
                    blnValid = true;
                    break;
                }
            }

            if (!blnValid) {
                fileInput.current.value = '';
                alert("Sorry, " + sFileName + " is invalid, allowed extensions are: " + _validFileExtensions.join(", "));
                return false;
            }

            else {
                const file = fileInput.current.files[0];
                const reader = new FileReader();
                reader.onloadend = () => {
                    setImage(reader.result);
                }
                reader.readAsDataURL(file);
                console.log(reader.result);
            }
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let api = process.env.NODE_ENV === 'development' ? 'https://localhost:5001/api/image' : process.env.REACT_APP_BACKEND_URL + `/api/image`

        if (ImageData  === null) {
            alert('Please select an image');
            return;
        }

        if (ImageTitle === '') {
            alert('Please enter a title');
            return;
        }

        //verify if the image is already in the database by checking if its 404
        fetch(api + "/portfolio/" + id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(res => {
            if (res.status === 404) {
                // if the image is not in the database, then upload it
                let formData = {
                    ImageId : id,
                    Title : ImageTitle,
                    ImageData : ImageData,
                    Description: ImageDescription
                }
                
                axios.post(api, formData, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }).then(res => {
                    if (res.status === 200) {
                        alert('Image uploaded successfully');
                        window.location.href = '/admin/dashboard/portfolio';
                    }
                    else {
                        console.log(JSON.stringify(formData));
                        alert('Image upload failed');
                    }
                }).catch(() => {
                    alert('Image upload failed');
                });
            }
            else {
                let formData = {
                    ImageId : id,
                    Title : ImageTitle,
                    ImageData : ImageData,
                    Description: ImageDescription
                }
                
                axios.put(api + "/" + id, formData, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }).then(res => {
                    if (res.status === 200) {
                        alert('Image updated successfully');
                        window.location.href = '/admin/dashboard/portfolio';
                    }
                    else {
                        console.log(JSON.stringify(formData));
                        alert('Image update failed');
                    }
                }).catch(() => {
                    alert('Image update failed');
                });
                
            }
        }).catch(() => {
            alert('Image upload failed');
        });
    }
    const handleImageTitleChange = (e) => {
        setImageTitle(e.target.value);
    }

    const handleImageDescriptionChange = (e) => {
        setImageDescription(e.target.value);
    }

    return(
        <Container className="mt-5">
            <Card>
                <Card.Header className={'headerStyle'}>
                    <h3 className="text-center">Upload Portfolio Image</h3>
                </Card.Header>
                <Card.Body>
                    <Card.Text>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group w-25">
                                <label htmlFor="imageTitle">Title</label>
                                <input type="text" className="form-control" id="imageTitle" aria-describedby="imageTitleHelp" placeholder="Enter image title" value={ImageTitle} onChange={handleImageTitleChange}/>
                            </div>
                            <div className="form-group w-50">
                                <label htmlFor="image">Description</label>
                                <textarea className="form-control" id="imageDescription" rows="3" value={ImageDescription} onChange={handleImageDescriptionChange}/>
                            </div>
                            <div className="form-group my-2">
                                <input type="file" className="form-control-file" id="image" ref={fileInput} onChange={handleImageUpload}/>
                            </div>
                            <button type="submit" className="btn btn-primary buttonStyle">Upload</button>
                        </form>
                    </Card.Text>
                </Card.Body>
            </Card>
            <br/>
            <Card className="w-50 offset-3">
                <Card.Header style={{background:'linear-gradient(135deg, rgba(255, 179, 71, 1) 39%, rgba(255, 200, 71, 1) 101%)', color:'black'}}>
                    <h3 className="text-center" >Preview</h3>
                </Card.Header>
                <Card.Body>
                    <Card.Text>
                        <img src={ImageData} alt="preview" width="50%" height="50%" className="img-fluid offset-3"/>
                    </Card.Text>
                </Card.Body>
            </Card>
        </Container>
    );
}