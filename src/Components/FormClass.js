import React from 'react';
import { Row, Col } from 'react-bootstrap';
import ReCAPTCHA from "react-google-recaptcha";
import { useTranslation } from "react-i18next";
import "./../Locales/i18n";

export default class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            street: '',
            city: '',
            country: '',
            postal: '',
            foundServices: [],
            service: null,
            loadedData: false,
            startingRate: 0.0,
            comments: '',
            selectedFile: null,
            recaptchaStatus: false,
            errorNullInputs: false,
            submit: false
        }
        this.fileRef = React.createRef();
        this.recaptchaRef = React.createRef();
        this.handleChange = this.handleChange.bind(this);
        this.onFileChange = this.onFileChange.bind(this);
        this.handleRecaptchaValidation = this.handleRecaptchaValidation.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.resetAttachments = this.resetAttachments.bind(this);
    }

    resetAttachments() {
        this.fileRef.current.value = '';
        this.setState({
            selectedFile: null
        })
    }

    handleChange(e) {
        const target = e.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    onFileChange(e) {
        this.setState({
            selectedFile: e.target.files[0]
        })
    }

    componentDidMount() {
        let api = process.env.NODE_ENV === 'development' ? 'https://localhost:5001/api/form/services' : process.env.REACT_APP_BACKEND_URL + '/api/form/services';

        fetch(api).then((res) => res.json()).then((json) => {
            this.setState({
                foundServices: json,
                loadedData: true
            });
        })
    }

    async handleRecaptchaValidation() {
        const recaptchaValue = {
            token: this.recaptchaRef.current.getValue()
        }
        this.recaptchaRef.current.reset();

        let api = ''

        if(process.env.NODE_ENV === 'development') {
            api = 'http://localhost:8080/api/recaptcha';
        }
        else {
            api = process.env.REACT_APP_RECAPTCHA_URL + '/api/recaptcha';
        }

        await fetch(api, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(recaptchaValue)
        })
        .then((res) => res.json())
        .then((data) => {
            this.setState({
                recaptchaStatus: data.success
            })
            
            if(this.state.recaptchaStatus === false) {
                alert(Translate("formRecaptchaError"));
                return;
            }
            else {
                this.setState({
                    submit: true
                })
                this.handleFormSubmission();
            }
        })
        .catch((err) => console.error(err));
    }

    handleFormSubmission() {
        let api = process.env.NODE_ENV === 'development' ? 'https://localhost:5001/api/form' : process.env.REACT_APP_BACKEND_URL + '/api/form';
        let file = this.state.selectedFile;

        const dataPayload = new FormData();
        dataPayload.append("Customer.FirstName", this.state.firstName);
        dataPayload.append("Customer.LastName", this.state.lastName);
        dataPayload.append("Customer.Email", this.state.email);
        dataPayload.append("Customer.Address.Street", this.state.street);
        dataPayload.append("Customer.Address.Postal", this.state.postal);
        dataPayload.append("Customer.Address.City", this.state.city);
        dataPayload.append("Customer.Address.Country", this.state.country);
        dataPayload.append("ServiceType", this.state.service);
        dataPayload.append("StartingRate", this.state.startingRate);
        dataPayload.append("Comments", this.state.comments);
        if(file != null) {
            dataPayload.append("Attachments", file, file.name);
        }
        
        fetch(api, {
            method: 'POST',
            body: dataPayload
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })
            .catch(err => console.log(err));

            alert(Translate("formSucessAlert"))

            alert(Translate("formEmailAlert"))

            this.setState({
                firstName: '',
                lastName: '',
                email: '',
                street: '',
                city: '',
                country: '',
                postal: '',
                service: '',
                startingRate: '',
                comments: '',
                selectedFile: null,
                recaptchaValue: false,
                errorNullInputs: false,
                submit: false
            })

            this.fileRef.current.value = '';
            this.recaptchaRef.current.value = '';
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({
            errorNullInputs: false,
            submit: false
        })

        if (this.state.firstName === ''
        || this.state.lastName === ''
        || this.state.street ===''
        || this.state.postal === ''
        || this.state.city === ''
        || this.state.country === ''
        || this.state.comments === ''
        || this.state.service === '') {
            this.setState({
                errorNullInputs: true
            })
            Alert();
            event.preventDefault();
            return;
        }
        else if(this.recaptchaRef.current.getValue() === '') {
            alert(Translate("formFailRecaptcha"));
            event.preventDefault();
            return;
        }

        this.handleRecaptchaValidation();
    }

    successMessage() {
        return (
            <div className="success text-center" style={{
                display: this.state.submit ? 'block' : 'none',
                backgroundColor: '#FCC981',
            }}>
                <h1>{Translate("formSucessHeader")}</h1>
                <p>{Translate("formSucessText")}</p>
            </div>
        )
    }

    errorMessage() {
        return (
            <div className="error text-center" style={{
                display: this.state.errorNullInputs ? 'block' : 'none',
                backgroundColor: '#FCC981',
            }}>
                <h1>{Translate("formErrorHeader")}</h1>
                <p>{Translate("formErrorText")}</p>
            </div>
        )
    }

    render() {
        const {loadedData, foundServices} = this.state;
        const handleService = (e) => {
            const newVal = e.target.value;
            this.setState({
                service: e.target.value || null
            });
            handleStartingRate(newVal);
        }

        const handleStartingRate = (chosenService) => {
            foundServices.map(item => {
                if(chosenService === item.TypeName) {
                    this.setState({
                        startingRate: item.StartingRate
                    })
                }
                else if(chosenService === '') {
                    this.setState({
                        startingRate: 0.0
                    })
                }
                return this.state.startingRate;
            })
        }

        const RenderSelectTag = () => {
            if(!loadedData) {
                return(<div>{Translate("formServicesNotLoaded")}</div>)
            }
            else {
                return(
                    <div className="form-group">
                        <label htmlFor="service">{Translate("formServiceLabel")}</label>
                        <select className="form-control" name="service" value={this.state.service || ''} onChange={handleService}>
                            <option value=''>{Translate("formServicePrompt")}</option>
                            {foundServices.map((item) =>
                                (<option value={item.TypeName} name={item.TypeName + "-select"} key={item.ServiceId}>{item.TypeName}</option>)
                            )}
                        </select>
                        <div name='startingRate'>{Translate("formStartingRateLabel") + this.state.startingRate}/hr</div>
                    </div>
                )
            }
        }

        const RenderForm = () => {
            return(
                <div className="container mt-5">
                        <div className="messages">
                            {this.successMessage()}
                            {this.errorMessage()}
                        </div>
                        <div className="card">
                            <div className="card-header">
                                <h4>{Translate("formHeader")}</h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit={this.handleSubmit}>
                                    <Row>
                                        <Col>
                                        <div className="form-group">
                                            <label htmlFor="firstName">{Translate("formFirstNameLabel")}</label>
                                            <input className="form-control" name="firstName" onChange={this.handleChange} value={this.state.firstName}/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="lastName">{Translate("formLastNameLabel")}</label>
                                            <input className="form-control" name="lastName" onChange={this.handleChange} value={this.state.lastName}/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="email">{Translate("formEmailLabel")}</label>
                                            <input className="form-control" name="email" onChange={this.handleChange} value={this.state.email}/>
                                        </div>
                                        </Col>
                                        <Col>
                                        <div className="form-group">
                                            <label htmlFor="Street">{Translate("formStreetLabel")}</label>
                                            <input className="form-control" name="street" onChange={this.handleChange} value={this.state.street} />
                                            <label htmlFor="Postal">{Translate("formCodeLabel")}</label>
                                            <input className="form-control" name="postal" onChange={this.handleChange} value={this.state.postal} />
                                            <label htmlFor="City">{Translate("formCityLabel")}</label>
                                            <input className="form-control" name="city" onChange={this.handleChange} value={this.state.city} />
                                            <label htmlFor="Country">{Translate("formCountryLabel")}</label>
                                            <input className="form-control" name="country" onChange={this.handleChange} value={this.state.country} />
                                        </div>
                                        </Col>
                                        <Col>
                                        <RenderSelectTag />
                                        <div className="form-group">
                                            <label htmlFor="comments">{Translate("formCommentsLabel")}</label>
                                            <textarea className="form-control" name="comments" value={this.state.comments} onChange={this.handleChange}/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="attachments">{Translate("formFileLabel")}</label>
                                            <input type="file" className="form-control" name="attachments" ref={this.fileRef} onChange={this.onFileChange}/>
                                        </div>
                                        </Col>
                                        <Row>
                                            <Col>
                                            <ReCAPTCHA ref={this.recaptchaRef} sitekey={!process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI' : process.env.REACT_APP_RECAPTCHA_SITE_KEY} />
                                            </Col>
                                            <Col>
                                            <button style={{display: 'block', margin: '1em auto 1em auto'}} type="submit" className="btn btn-primary" name="submit-btn">{Translate("submitText")}</button>
                                            </Col>
                                            <Col>
                                            <button style={{display: 'block', margin: '1em auto 1em auto'}} type="button" className="btn btn-primary" name="reset-btn" onClick={this.resetAttachments}>{Translate("formAttachmentsBtnText")}</button>
                                            </Col>
                                        </Row>
                                    </Row>
                                </form>
                            </div>
                        </div>
            </div>
            )
        }

        return (
            <RenderForm />
        );
    }
}

export function Translate(key) {
    const { t } = useTranslation();

    return t(key)
}

export function Alert() {
    var alertText = Translate("formFailEmpty");

    alert(alertText);
}