import React from 'react'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import myimg from './imgs/download.jpg'

export default function Download() {

    const onButtonClick = () => {
        // using Java Script method to get PDF file
        fetch('generatedResume.pdf').then(response => {
            response.blob().then(blob => {
                // Creating new object of PDF file
                const fileURL = window.URL.createObjectURL(blob);
                // Setting various property values
                let alink = document.createElement('a');
                alink.href = fileURL;
                alink.download = 'generatedResume.pdf';
                alink.click();
            })
        })
    }

    //counter logic 
    //so that user knows when file generation is complete
    //default 15 seconds
    const [counter, setCounter] = React.useState(15);

    React.useEffect(() => {
        const timer =
            counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
        return () => clearInterval(timer);
    }, [counter]);

    //if counter === 0
    //user can download file
    //else user must wait
    if (counter > 0) {
        return (
            <div>
                <Navbar></Navbar>
                <div id="jumbo2" className="jumbotron jumbotron-fluid" style={{ backgroundImage: `url(${myimg})`, backgroundSize: 'cover' }}>
                    <div className="container" style={{ textAlign: 'left' }}>
                        <h4 className="display-6">Your resume will be genrated<br></br> in {counter} seconds.</h4>
                    </div>
                    <div className='container' style={{ textAlign: 'right'}}>
                        
                        <h4><q>To obtain quality resumes, patience <br></br>is required.</q></h4>
                        <br></br>
                        <h5><i>-Justmade Thatup</i></h5>
                    </div>
                </div>
                <Footer></Footer>
            </div>
        )
    }
    else {
        return (
            <div>
                <Navbar></Navbar>
                <div id="jumbo2" className="jumbotron jumbotron-fluid" style={{ backgroundImage: `url(${myimg})`, backgroundSize: 'cover' }}>
                    <div className="container" style={{ textAlign: 'left' }}>
                        <h2>You can download your <br></br>resume now.</h2>
                        <br></br>
                        <div>
                        <button type="button" className="btn btn-primary btn-lg" onClick={onButtonClick}>Download</button>
                        </div>
                    </div>
                    <div className='container' style={{ textAlign: 'right' }}>
                        
                        <h4>Hoping that your resume will <br></br>be chosen!</h4>
                    </div>
                </div>
                <Footer></Footer>
            </div>
        )
    }
}
