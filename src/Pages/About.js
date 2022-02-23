import React, {useEffect, useState} from 'react';
import serena from "../resources/img/serena.PNG";
import youtube from "../resources/img/icons/youtube.png";
import instagram from "../resources/img/icons/instagram.png";
import facebook from "../resources/img/icons/facebook.png";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import 'bootstrap/dist/css/bootstrap.css';
import axios from "axios";
import { useTranslation } from "react-i18next";
import "./../Locales/i18n";

export default function About () {
    const { t } = useTranslation();

    const [aboutInfo, setAboutInfo] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [profession, setProfession] = useState('');
    const [description, setDescription] = useState('');
    const [language, setLanguage] = useState('');
    const [country, setCountry] = useState('');
    const [experience, setExperience] = useState('');
    const [mission, setMission] = useState('');
    let [isEdit, setIsEdit] = useState(false);


    const GetAboutInfo = () => {
        let api = process.env.NODE_ENV === 'development' ? "https://localhost:5001/api/About/" : process.env.REACT_APP_BACKEND_URL + "/api/About/"

        fetch(api,
            {headers: { 'Content-Type' : 'application/json', 'Accept': 'application/json'}})
            .then(function(response) {
                //console.log(response);
                return response.json();
            })
            .then(function(data) {
                //console.log(data);
                setAboutInfo(data);
                componentDidMount(data);
            })
            .catch(error => console.log(error));
        console.log(aboutInfo);
    };

    function componentDidMount(data) {
        window.addEventListener('load', setInitialValues(data));
    }

    function setInitialValues(data){
        setName(data.Name);
        setEmail(data.Email);
        setPhone(data.Phone);
        setProfession(data.Profession);
        setDescription(data.Description);
        setLanguage(data.Language);
        setCountry(data.Country);
        setExperience(data.Experience);
        setMission(data.Mission);
        setIsEdit(false);
        return data;
    }

    useEffect(() => {
        GetAboutInfo();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    function handleEdit(event) {
        event.preventDefault();
        setIsEdit(true);
    }

    function handleSubmit(event) {
        event.preventDefault();
        setIsEdit(false);

        if (name === '' || email === '' || phone === '' || profession === '' || description === '' || language === '' || country === '' || experience === '' || mission === '') {
            alert(t("formFailEmpty"));
        } else {
            const data = {
                Name: name,
                Email: email,
                Phone: phone,
                Profession: profession,
                Description: description,
                Language: language,
                Country: country,
                Experience: experience,
                Mission: mission
            };
            console.log(data);

            let api = process.env.NODE_ENV === 'development' ? "https://localhost:5001/api/About/" : process.env.REACT_APP_BACKEND_URL + "/api/About/"

            axios.put(api, data)
                .then(function (response) {
                    console.log(response);
                    alert(t("aboutAlertUpdate"));
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }

    const handleNameChange = (event) => { setName(event.target.value);};
    const handleEmailChange = (event) => { setEmail(event.target.value); };
    const handlePhoneChange = (event) => { setPhone(event.target.value); };
    const handleDescriptionChange = (event) => { setDescription(event.target.value); };
    const handleProfessionChange = (event) => { setProfession(event.target.value); };
    const handleLanguageChange = (event) => { setLanguage(event.target.value); };
    const handleCountryChange = (event) => { setCountry(event.target.value); };
    const handleExperienceChange = (event) => { setExperience(event.target.value); };
    const handleMissionChange = (event) => { setMission(event.target.value); };


    return (
        <div className={"container mt-5 "}>
            <form onSubmit={handleSubmit}>
                <div className={"row"}>
                    <div className={"col-md-3 mt-5"}>
                        <img className={"img-thumbnail figure-img "} src={serena} alt={"Serena"} /><br />
                        <a href={"https://www.instagram.com/sereneflourish/"} className={"text-decoration-none"}><img className={"img-fluid col-sm-1 rounded"} src={instagram} alt={"Instagram"} /></a>
                        <a href={"https://www.instagram.com/sereneflourish/"} className={"text-decoration-none"}><img className={"img-fluid col-sm-1 rounded"} src={facebook} alt={"Facebook"} /></a>
                        <a href={"https://www.instagram.com/sereneflourish/"} className={"text-decoration-none"}><img className={"img-fluid col-sm-1 rounded"} src={youtube} alt={"Youtube"} /></a>
                    </div>

                    <div className={"col-md-6 mt-5"}>
                            <h5> Serena Tam</h5>
                            <h6> {t("professiontitle")}</h6>

                                <Tabs>
                                    <TabList>
                                        <Tab>{t("about")}</Tab>
                                        <Tab>{t("experience")}</Tab>
                                        <Tab>{t("goal")}</Tab>
                                        {localStorage.getItem('JwtToken') ?
                                            isEdit ?
                                                <input type={"submit"} className={"btn float-end"} name={"btnSave"}
                                                       value={t("submitText")}/>
                                                :
                                                <input type={"button"} onClick={handleEdit} className={"btn float-end"}
                                                       name={"btnEdit"} value={t("edit")}/>
                                            :
                                            null}
                                    </TabList>

                                    <TabPanel>
                                        <div className={"row"}>
                                            <div className={"col-md-6"}>
                                                <label>{t("formFirstNameLabel")}</label>
                                            </div>
                                            <div className={"col-md-6"}>
                                                {isEdit ? <input onChange={handleNameChange} name={"inputName"} className={"lh-base w-100"} value={name}/> : <label>{name}</label>}
                                            </div>
                                        </div>
                                        <div className={"row mt-3"}>
                                            <div className={"col-md-6"}>
                                                <label>{t("formEmailLabel")}</label>
                                            </div>
                                            <div className={"col-md-6"}>
                                                {isEdit ? <input onChange={handleEmailChange} name={"inputEmail"} className={"lh-base w-100"} value={email}/> : <label>{email}</label>}
                                            </div>
                                        </div>
                                        <div className={"row mt-3"}>
                                            <div className={"col-md-6"}>
                                                <label>{t("phone")}</label>
                                            </div>
                                            <div className={"col-md-6"}>
                                                {isEdit ? <input onChange={handlePhoneChange} name={"inputPhone"} className={"lh-base w-100"} value={phone}/> : <label>{phone}</label>}
                                            </div>
                                        </div>
                                        <div className={"row mt-3"}>
                                            <div className={"col-md-6"}>
                                                <label>{t("profession")}</label>
                                            </div>
                                            <div className={"col-md-6"}>
                                                {isEdit ? <input onChange={handleProfessionChange} name={"inputProfession"}  className={"lh-base w-100"} value={profession}/> : <label>{profession}</label>}
                                            </div>
                                        </div>
                                        <div className={"row mt-3"}>
                                            <div className={"col-md-6"}>
                                                <label>{t("aboutMe")}</label>
                                            </div>
                                            <div className={"col-md-6"}>
                                                {isEdit ? <textarea onChange={handleDescriptionChange} name={"inputDescription"}  className={"lh-base w-100"} value={description}/> : <label>{description}</label>}
                                            </div>
                                        </div>
                                    </TabPanel>
                                    <TabPanel>
                                        <div className={"row"}>
                                            <div className={"col-md-6"}>
                                                <label>{t("languages")}</label>
                                            </div>
                                            <div className={"col-md-6"}>
                                                {isEdit ? <input onChange={handleLanguageChange} name={"inputLanguage"}  className={"lh-base w-100"} value={language}/> : <label>{language}</label>}
                                            </div>
                                        </div>
                                        <div className={"row mt-3"}>
                                            <div className={"col-md-6"}>
                                                <label>{t("country")}</label>
                                            </div>
                                            <div className={"col-md-6"}>
                                                {isEdit ? <input onChange={handleCountryChange} name={"inputCountry"}  className={"lh-base w-100"} value={country}/> : <label>{country}</label>}
                                            </div>
                                        </div>
                                        <div className={"row mt-3"}>
                                            <div className={"col-md-6"}>
                                                <label>{t("experience")}</label>
                                            </div>
                                            <div className={"col-md-6"}>
                                                {isEdit ? <input onChange={handleExperienceChange} name={"inputExperience"}  className={"lh-base w-100"} value={experience}/> : <label>{experience}</label>}
                                            </div>
                                        </div>
                                    </TabPanel>
                                    <TabPanel>
                                        {isEdit ? <textarea onChange={handleMissionChange} name={"inputMission"}  className={"lh-base w-100"} value={mission}/> : <label>{mission}</label>}
                                    </TabPanel>
                                </Tabs>
                    </div>
                </div>
            </form>
        </div>
    );
}
