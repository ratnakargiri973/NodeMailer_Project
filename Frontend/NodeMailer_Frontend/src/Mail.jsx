import React, { useState } from 'react';
import axios from 'axios'; 
import './Mail.css';

function Mail() {
    const [show, setShow] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        
        axios.post('http://localhost:6969/user', {
            name, 
            email, 
            message
        })
        .then(() => {
            console.log("Form Data Submitted", name, email, message);
            setShow(true); 
        })
        .catch((err) => {
            console.log(err);
        });
    }

    return (
        <>
        {!show && 
            <div className='Register'>
                <h1>Contact Us</h1>
                <form onSubmit={handleSubmit} id='form'>
                    <div>
                        <label htmlFor="name">Name:</label>
                        <input 
                            type="text" 
                            id="name" 
                            name="name" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                            required 
                        />
                    </div>

                    <div>
                        <label htmlFor="email">Email:</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                        />
                    </div>

                    <div>
                        <label htmlFor="message">Message:</label>
                        <textarea 
                            id="message" 
                            name="message" 
                            value={message} 
                            onChange={(e) => setMessage(e.target.value)} 
                            required 
                        />
                    </div>

                    <button type="submit">Submit</button>
                </form>
            </div>
        }

        {show && 
            <>
                <h1>Thank you for getting in touch with us.</h1>
                <h2>We have received your message and will respond to your inquiry as soon as possible.</h2>
                <h2>Check your email for a confirmation message. We appreciate your time and look forward to assisting you further.</h2>
            </>
        }
        </>
    );
}

export default Mail;
