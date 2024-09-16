import logo from './logo.svg';
import './App.css';
import Dashboard from './Components/UserDash/Dashboard';
import {
    BrowserRouter,
    Routes,
    Route,
    Link,
} from "react-router-dom";
import HomePage from './Components/Home/Home';
import RawHandler from './Components/Rawdata.jsx/RawHandler';
import UploadPage from './Components/UploadPage/Upload';
import { useState } from 'react';
import SignIn from './Components/Home/SignIn';
import Register from './Components/Home/Register';
const myobj = [
    {
        "Address": {
            "pii": "IP_V6",
            "real_text": "1234 Elm St, Apt 5, NY"
        },
        "Credit Card Number": {
            "pii": "CREDIT_CARD",
            "real_text": "4111 1111 1111 1111"
        },
        "Date of Birth": {
            "pii": "IP_V6",
            "real_text": "1990-01-01"
        },
        "Email": {
            "pii": "EMAIL_ADDRESS",
            "real_text": "john.doe@email.com"
        },
        "ID": {
            "pii": "IP_V6",
            "real_text": 1
        },
        "Name": {
            "pii": "PERSON",
            "real_text": "John Doe"
        },
        "National ID": {
            "pii": "IP_V6",
            "real_text": "123-45-6789"
        },
        "Phone Number": {
            "pii": "IP_V6",
            "real_text": "+1-555-123-4567"
        }
    },
    {
        "Address": {
            "pii": "IP_V6",
            "real_text": "5678 Maple Ave, CA"
        },
        "Credit Card Number": {
            "pii": "AADHAAR_ID",
            "real_text": "4222 2222 2222 2222"
        },
        "Date of Birth": {
            "pii": "IP_V6",
            "real_text": "1985-05-15"
        },
        "Email": {
            "pii": "EMAIL_ADDRESS",
            "real_text": "jane.smith@email.com"
        },
        "ID": {
            "pii": "IP_V6",
            "real_text": 2
        },
        "Name": {
            "pii": "PERSON",
            "real_text": "Jane Smith"
        },
        "National ID": {
            "pii": "IP_V6",
            "real_text": "987-65-4321"
        },
        "Phone Number": {
            "pii": "IP_V6",
            "real_text": "+1-555-987-6543"
        }
    },
    {
        "Address": {
            "pii": "IP_V6",
            "real_text": "8765 Birch Rd, London"
        },
        "Credit Card Number": {
            "pii": "AADHAAR_ID",
            "real_text": "4333 3333 3333 3333"
        },
        "Date of Birth": {
            "pii": "IP_V6",
            "real_text": "1979-11-23"
        },
        "Email": {
            "pii": "EMAIL_ADDRESS",
            "real_text": "alice.johnson@email.com"
        },
        "ID": {
            "pii": "IP_V6",
            "real_text": 3
        },
        "Name": {
            "pii": "PERSON",
            "real_text": "Alice Johnson"
        },
        "National ID": {
            "pii": "IP_V6",
            "real_text": "999-88-7777"
        },
        "Phone Number": {
            "pii": "IP_V6",
            "real_text": "+44-20-7946-0958"
        }
    },
    {
        "Address": {
            "pii": "IP_V6",
            "real_text": "123 Hauptstraße, Berlin"
        },
        "Credit Card Number": {
            "pii": "AADHAAR_ID",
            "real_text": "4444 4444 4444 4444"
        },
        "Date of Birth": {
            "pii": "IP_V6",
            "real_text": "1995-02-12"
        },
        "Email": {
            "pii": "EMAIL_ADDRESS",
            "real_text": "bob.brown@email.com"
        },
        "ID": {
            "pii": "IP_V6",
            "real_text": 4
        },
        "Name": {
            "pii": "PERSON",
            "real_text": "Bob Brown"
        },
        "National ID": {
            "pii": "IP_V6",
            "real_text": "777-66-5555"
        },
        "Phone Number": {
            "pii": "IP_V6",
            "real_text": "+49-30-12345678"
        }
    }
]

function App() {
    const [modal2Open, setModal2Open] = useState(false);
    const [myReponse, setMyReponse] = useState(myobj)
    const [isLoaded, setIsLoaded] = useState(false)
    const [currentPage, setCurrentPage] = useState('2')
    const [reqBody, setReqBody] = useState(['this is initiator'])
    const fetchInfo = async (data) => {

        const response = await fetch(`http://127.0.0.1:5000/traversedocall`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        let xr = await response.json()
        return xr

    }
    return (
        <>
            <BrowserRouter>
                <div className="App">
                    <Routes>
                        <Route exact path="/" element={<HomePage />} />
                        <Route path='/signin' element={<SignIn />} />
                        <Route path='/register' element={<Register />} />
                        <Route path="userdash" element={<Dashboard modal2Open={modal2Open} setModal2Open={setModal2Open} isLoaded={isLoaded} setIsLoaded={setIsLoaded} myReponse={myReponse} setMyReponse={setMyReponse} fetchInfo={fetchInfo} reqBody={reqBody} setReqBody={setReqBody} currentPage={currentPage} setCurrentPage={setCurrentPage} />}>
                            <Route path="rawhandler" element={<RawHandler modal2Open={modal2Open} setModal2Open={setModal2Open} isLoaded={isLoaded} setIsLoaded={setIsLoaded} myReponse={myReponse} setMyReponse={setMyReponse} fetchInfo={fetchInfo} reqBody={reqBody} setReqBody={setReqBody} setCurrentPage={setCurrentPage} currentPage={currentPage} />} />
                            <Route path="handleupload" element={<UploadPage modal2Open={modal2Open} setModal2Open={setModal2Open} isLoaded={isLoaded} setIsLoaded={setIsLoaded} myReponse={myReponse} setMyReponse={setMyReponse} fetchInfo={fetchInfo} reqBody={reqBody} setReqBody={setReqBody} setCurrentPage={setCurrentPage} currentPage={currentPage} />} />
                        </Route>
                    </Routes>
                </div>
            </BrowserRouter>
        </>
    );
}

export default App;
