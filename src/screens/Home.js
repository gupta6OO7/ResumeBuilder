import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import myimg from './imgs/job.jpg';
import tem1 from './imgs/BasicTemplate_page.jpg';
import tem2 from './imgs/ImageTemplate_page.jpg';
import tem3 from './imgs/LinkTemplate_page.jpg';
import Footer from '../components/Footer';

export default function Home() {
    let navigate = useNavigate();

    //defining creds object
    //it will store user message
    const [creds, setcreds] = useState({
        Name: "",
        LastName: "",
        EmailAddress: "",
        PhoneNumber: "",
        LinkedIn: "",
        JobTitle: "",
        Summary: "",
        Skills: [""],
        Education: [{ SchoolName: "", Year: "", Description: "" }],
        Experience: [{ CompanyName: "", Year: "", Description: "" }],
        Achievements: [{ Type: "", Description: "" }]
    });

    //user choice of template
    const [template, settemplate] = useState("BasicTemplate");

    const handleSubmit = async (e) => {
        e.preventDefault();

        //
        ////////////////////////////////
        /////
        //     POST/localhost:8080/api/resume
        /////
        /////////////////////////////////
        //

        const response = await fetch('http://localhost:8080/api/resume', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ template, creds })
        });
        const json = await response.json();

        // if operation is successful
        // user will be navigated to download page

        if (!json.success) {
            alert('Enter Valid Credentials');
        } else {
            navigate('/download');
        }
    };

    //on change 
    //on add
    //handle
    //functions ----

    const onChange = (event) => {
        setcreds({ ...creds, [event.target.name]: event.target.value });
    };

    const onTemplateChange = (event) => {
        settemplate(event.target.value);
    };

    const handleSkillChange = (event, index) => {
        const { name, value } = event.target;
        const updatedSkills = [...creds.Skills];
        updatedSkills[index] = name;
        updatedSkills[index] = value;
        setcreds({ ...creds, Skills: updatedSkills });
    };

    const handleAddSkill = () => {
        setcreds({
            ...creds,
            Skills: [...creds.Skills, ""]
        });
    };

    const handleSchoolChange = (event, index) => {
        const { name, value } = event.target;
        const updatedSchools = [...creds.Education];
        updatedSchools[index] = { ...updatedSchools[index], [name]: value };
        setcreds({ ...creds, Education: updatedSchools });
    };

    const handleAddSchool = () => {
        setcreds({
            ...creds,
            Education: [...creds.Education, { SchoolName: "", Year: "", Description: "" }]
        });
    };

    const handleCompanyChange = (event, index) => {
        const { name, value } = event.target;
        const updatedCompany = [...creds.Experience];
        updatedCompany[index] = { ...updatedCompany[index], [name]: value };
        setcreds({ ...creds, Experience: updatedCompany });
    };

    const handleAddCompany = () => {
        setcreds({
            ...creds,
            Experience: [...creds.Experience, { CompanyName: "", Year: "", Description: "" }]
        });
    };

    const handleAchivementChange = (event, index) => {
        const { name, value } = event.target;
        const updatedAchivement = [...creds.Achievements];
        updatedAchivement[index] = { ...updatedAchivement[index], [name]: value };
        setcreds({ ...creds, Achievements: updatedAchivement });
    };

    const handleAddAchivement = () => {
        setcreds({
            ...creds,
            Achievements: [...creds.Achievements, { Type: "", Description: "" }]
        });
    };

    //xml
    return (
        <div>
            {/* navbar component */}
            <Navbar></Navbar>

            {/* home page */}
            <div id="jumbo1" className="jumbotron jumbotron-fluid" style={{ backgroundImage: `url(${myimg})`, backgroundSize: 'cover' }}>
                <div className="container" style={{ textAlign: 'left' }}>
                    <h4 className="display-5">Build Now</h4>
                    <h4 className="lead">A Quick and Easy Way to Create Your Professional Resume.</h4>
                </div>
            </div>

            <div className='mx-auto' style={{ paddingLeft: '80px', paddingRight: '80px', paddingTop: '120px' }}>
                <h2>Resume Templates for Every Career Path.</h2>
                <hr></hr>
            </div>

            <div className="card-group" style={{ paddingLeft: '80px', paddingRight: '80px', paddingBottom: '80px', backgroundColor: 'white' }}>

                <div className="card bg-white text-black">
                    <img src={tem1} className="card-img-top" alt="black theme"></img>
                    <div className="card-body mx-auto">
                        <h3 className="card-title">Basic Template</h3>
                    </div>
                </div>
                <div className="card bg-white text-black">
                    <img src={tem2} className="card-img-top" alt="red theme"></img>
                    <div className="card-body mx-auto">
                        <h3 className="card-title">Image Template</h3>
                    </div>
                </div>
                <div className="card bg-white text-black">
                    <img src={tem3} className="card-img-top" alt="yellow theme"></img>
                    <div className="card-body mx-auto">
                        <h3 className="card-title">Link Template</h3>
                    </div>
                </div>
            </div>

            <div className='mx-auto' style={{ paddingLeft: '160px', paddingRight: '160px' }}>
                <h1>Fill in the Blanks</h1>
            </div>

            <form className="row g-3" style={{ paddingTop: '20px', paddingLeft: '160px', paddingRight: '160px' }} onSubmit={handleSubmit}>
                <hr></hr>
                <h3>General Details</h3>
                {/* General details fields */}
                <div className="col-md-2 form-group">
                    <label for="exampleFormControlSelect1">Choose your template</label>
                    <select className="form-control" id="exampleFormControlSelect1" name='template' value={template} onChange={onTemplateChange}>
                        <option>BasicTemplate</option>
                        <option>ImageTemplate</option>
                        <option>LinkTemplate</option>
                    </select>
                </div>
                <div className="col-md-5 form-group">
                    <label for="exampleInputName">Name</label>
                    <input type="text" className="form-control" id="exampleInputName" placeholder="Enter name" name='Name' value={creds.Name} onChange={onChange}></input>
                </div>
                <div className="col-md-5 form-group">
                    <label for="exampleInputLName">Last name</label>
                    <input type="text" className="form-control" id="exampleInputLName" placeholder="Enter last name" name='LastName' value={creds.LastName} onChange={onChange}></input>
                </div>
                <div className="col-md-4 form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Enter email" name='EmailAddress' value={creds.EmailAddress} onChange={onChange}></input>
                </div>
                <div className="col-md-4 form-group">
                    <label for="pnum">Phone Number</label>
                    <input type="number" className="form-control" id="pnum" name='PhoneNumber' value={creds.PhoneNumber} onChange={onChange}></input>
                </div>
                <div className="col-md-4 form-group">
                    <label for="linkedin">LinkedIn Profile</label>
                    <input type="text" className="form-control" id="linkedin" placeholder="Paste profile link" name='LinkedIn' value={creds.LinkedIn} onChange={onChange}></input>
                </div>
                <div className="col-md-6 form-group">
                    <label for="jobtitle">Job Title</label>
                    <input type="text" className="form-control" id="jobtitle" placeholder="Enter job title" name='JobTitle' value={creds.JobTitle} onChange={onChange}></input>
                </div>
                <div className="col-md-6 form-group">
                    <label for="summary">Summary</label>
                    <textarea type="text" className="form-control" id="summary" placeholder="Enter summary" name='Summary' value={creds.Summary} onChange={onChange}></textarea>
                </div>
                <div className='col-12 mx-auto'>
                    <div className="alert alert-info" role="alert">
                        <p >*If you want to add link in textarea do it this way: &lt;a href="|yourLinkHere|"&gt;|yourTagHere|&lt;/a&gt;</p>
                        <p >For example: &lt;a href="https://www.google.co.in/"&gt;Google&lt;/a&gt;</p>
                    </div>
                </div>
                {/* ... */}

                {/* skill section */}
                <br></br>
                <div class="horule">
                    <div class="section-divider">
                        <span>Skills</span>
                    </div>
                </div>

                <div className='row'>
                    <div className='col-md-9'>
                        {creds.Skills.map((skill, index) => (
                            <div key={index} className="skill-entry">
                                <div className="col-md-10 form-group">
                                    <label>Enter Skill</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter text here"
                                        name='name'
                                        value={skill.name}
                                        onChange={(e) => handleSkillChange(e, index)}
                                    ></input>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* add more button to add more skills */}
                    <div className='col-md-2'>
                        <button type="button" className="btn btn-outline-success" onClick={handleAddSkill}>
                            Add More
                        </button>
                    </div>
                </div>

                {/* education section */}
                <br></br>
                <div class="horule">
                    <div class="section-divider">
                        <span>Education</span>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-10'>
                        {creds.Education.map((school, index) => (
                            <div key={index} className="row school-entry">
                                <div className="col-md-3 form-group">
                                    <label htmlFor={`schoolname${index}`}>School Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id={`schoolname${index}`}
                                        placeholder="Enter school name"
                                        name="SchoolName"
                                        value={school.SchoolName}
                                        onChange={(e) => handleSchoolChange(e, index)}
                                    ></input>
                                </div>
                                <div className="col-md-3 form-group">
                                    <label htmlFor={`schoolyear${index}`}>Year</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id={`schoolyear${index}`}
                                        placeholder="Ex: 20XX - 20XX"
                                        name="Year"
                                        value={school.Year}
                                        onChange={(e) => handleSchoolChange(e, index)}
                                    ></input>
                                </div>
                                <div className="col-md-5 form-group">
                                    <label htmlFor={`schooldesc${index}`}>Description</label>
                                    <textarea
                                        type="text"
                                        className="form-control"
                                        id={`schooldesc${index}`}
                                        placeholder="Enter school description"
                                        name="Description"
                                        value={school.Description}
                                        onChange={(e) => handleSchoolChange(e, index)}
                                    ></textarea>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='col-md-2'>
                        <button type="button" className="btn btn-outline-success" onClick={handleAddSchool}>
                            Add More
                        </button>
                    </div>
                </div>

                {/* experience section */}
                <br></br>
                <div class="horule">
                    <div class="section-divider">
                        <span>Experience</span>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-10'>
                        {creds.Experience.map((exp, index) => (
                            <div key={index} className="row exp-entry">
                                <div className="col-md-3 form-group">
                                    <label htmlFor={`companyname${index}`}>Company Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id={`companyname${index}`}
                                        placeholder="Enter company name"
                                        name="CompanyName"
                                        value={exp.CompanyName}
                                        onChange={(e) => handleCompanyChange(e, index)}
                                    ></input>
                                </div>
                                <div className="col-md-3 form-group">
                                    <label htmlFor={`duration${index}`}>Duration</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id={`duration${index}`}
                                        placeholder="Ex: 20XX - 20XX"
                                        name="Year"
                                        value={exp.Year}
                                        onChange={(e) => handleCompanyChange(e, index)}
                                    ></input>
                                </div>
                                <div className="col-md-5 form-group">
                                    <label htmlFor={`companydesc${index}`}>Description</label>
                                    <textarea
                                        type="text"
                                        className="form-control"
                                        id={`companydesc${index}`}
                                        placeholder="Enter company description"
                                        name="Description"
                                        value={exp.Description}
                                        onChange={(e) => handleCompanyChange(e, index)}
                                    ></textarea>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='col-md-2'>
                        <button type="button" className="btn btn-outline-success" onClick={handleAddCompany}>
                            Add More
                        </button>
                    </div>
                </div>

                {/* achivements section */}
                <br></br>
                <div class="horule">
                    <div class="section-divider">
                        <span>Achivements</span>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-10'>
                        {creds.Achievements.map((achv, index) => (
                            <div key={index} className="row achv-entry">
                                <div className="col-md-3 form-group">
                                    <label htmlFor={`achvname${index}`}>Achivement Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id={`achvname${index}`}
                                        placeholder="Enter achivement name"
                                        name="Type"
                                        value={achv.Type}
                                        onChange={(e) => handleAchivementChange(e, index)}
                                    ></input>
                                </div>
                                <div className="col-md-8 form-group">
                                    <label htmlFor={`achvdesc${index}`}>Achivement Description</label>
                                    <textarea
                                        type="text"
                                        className="form-control"
                                        id={`achvdesc${index}`}
                                        placeholder="Enter achivement description"
                                        name="Description"
                                        value={achv.Description}
                                        onChange={(e) => handleAchivementChange(e, index)}
                                    ></textarea>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='col-md-2'>
                        <button type="button" className="btn btn-outline-success" onClick={handleAddAchivement}>
                            Add More
                        </button>
                    </div>
                </div>


                {/* submit button for form */}
                <button type="submit" className="col-md-1 btn m-3 btn-primary">Submit</button>
            </form>

            {/* footer component */}
            <Footer></Footer>
        </div>
    )
}