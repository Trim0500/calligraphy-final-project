import React from 'react';
import serena from "../resources/img/serena.PNG"
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import 'bootstrap/dist/css/bootstrap.css';

function About () {
    return (
        <div className={"container mt-5 "}>
            <form method={""}>
                <div className={"row"}>
                    <div class={"col-md-3 mt-5"}>
                        <img className={"img-thumbnail figure-img"} src={serena} alt={"Serena"} /><br />
                        <label className={"text-decoration-underline"}>Social Media Links</label><br />
                        <a href={"https://www.instagram.com/sereneflourish/"} target={"_serena"} className={"text-decoration-none"}>Instagram</a><br />
                        <a href={"#"} target={"_serena"} className={"text-decoration-none"}>Facebook</a><br />
                        <a href={"#"} target={"_serena"} className={"text-decoration-none"}>Visco</a><br />
                    </div>

                    <div className={"col-md-6 mt-5"}>
                            <h5> Serena Tam</h5>
                            <h6> Calligrapher & Engraver</h6>

                                <Tabs>
                                    <TabList>
                                        <Tab>About</Tab>
                                        <Tab>Experience</Tab>
                                        <Tab>Goal</Tab>
                                        <input type={"submit"} className={"btn float-end"} name={"btnEdit"} value={"Edit Profile"} />
                                    </TabList>

                                    <TabPanel>
                                        <div className={"row"}>
                                            <div className={"col-md-6"}>
                                                <label>Name</label>
                                            </div>
                                            <div className={"col-md-6"}>
                                                <p>Serena Tam</p>
                                            </div>
                                        </div>
                                        <div className={"row mt-3"}>
                                            <div className={"col-md-6"}>
                                                <label>Email</label>
                                            </div>
                                            <div className={"col-md-6"}>
                                                <p> serena@email.com</p>
                                            </div>
                                        </div>
                                        <div className={"row mt-3"}>
                                            <div className={"col-md-6"}>
                                                <label>Phone</label>
                                            </div>
                                            <div className={"col-md-6"}>
                                                <p>123 456 7890</p>
                                            </div>
                                        </div>
                                        <div className={"row mt-3"}>
                                            <div className={"col-md-6"}>
                                                <label>Profession</label>
                                            </div>
                                            <div className={"col-md-6"}>
                                                <p>Calligrapher & Engraver</p>
                                            </div>
                                        </div>
                                    </TabPanel>
                                    <TabPanel>
                                        <div className={"row"}>
                                            <div className={"col-md-6"}>
                                                <label>Experience</label>
                                            </div>
                                            <div className={"col-md-6"}>
                                                <p>PHD In Calligraphy with over 10 years of experience.</p>
                                            </div>
                                        </div>
                                        <div className={"row mt-3"}>
                                            <div className={"col-md-6"}>
                                                <label>Hourly Rate</label>
                                            </div>
                                            <div className={"col-md-6"}>
                                                <p> 10$/hr</p>
                                            </div>
                                        </div>
                                        <div className={"row mt-3"}>
                                            <div className={"col-md-6"}>
                                                <label>Languages</label>
                                            </div>
                                            <div className={"col-md-6"}>
                                                <p>English - French</p>
                                            </div>
                                        </div>
                                        <div className={"row mt-3"}>
                                            <div className={"col-md-6"}>
                                                <label>Profession</label>
                                            </div>
                                            <div className={"col-md-6"}>
                                                <p>Calligrapher & Engraver</p>
                                            </div>
                                        </div>
                                    </TabPanel>
                                    <TabPanel>
                                        <p> Lorem Ipsum or somethingLorem Ipsum or somethingLorem Ipsum or somethingLorem Ipsum or somethingLorem Ipsum or somethingLorem Ipsum or somethingLorem Ipsum or somethingLorem Ipsum or something</p>
                                    </TabPanel>
                                </Tabs>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default About;