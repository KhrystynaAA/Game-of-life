import React, { useState } from 'react';
import { Link} from 'react-router-dom';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

function Signup () {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: ''
    });
 
    const navigate = useNavigate();
    const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8081/signup', values)
    .then(res => {
        if(res.data.Status === "Success"){
            navigate('/');
        }else{
            alert(res.data.Error);
        }
    
    })
    .then(err => console.log(err));
        
    }
    
    return(
        <div className='d-flex justify-content-center align-items-center vh-100'>
            <div className='bg-white p-3 rounded w-25'>
                <h3>Sign Up</h3>
                <form action="" onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="name"><strong>Name</strong></label>
                        <input type="name" placeholder='Enter Name' name='name' 
                         onChange={e => setValues({...values, name: e.target.value})} className='form-control rounded-0'/>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="email"><strong>Email</strong></label>
                        <input type="email" placeholder='Enter Email' name='email' 
                         onChange={e => setValues({...values, email: e.target.value})} className='form-control rounded-0'/>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="password"><strong>Password</strong></label>
                        <input type="password" placeholder='Enter Password' name='password' 
                         onChange={e => setValues({...values, password: e.target.value})} className='form-control rounded-0'/>
                    </div>
                    <button type='submit' className='btn btn-success w-100'>Sign up</button>
                    <p/>
                    <Link to="/" className='btn btn-default border w-100 bg-light text-decoration-none'>Log in</Link>
                </form>
            </div>
        </div>
    )
}

export default Signup