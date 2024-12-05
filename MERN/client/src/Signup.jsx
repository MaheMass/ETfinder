// src/SignUp.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import  axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [name,setName]=useState()
  const [email, setEmail]=useState()
  const [password, setPassword]=useState()
  const navigate = useNavigate();
  const handleSubmit=(e)=>{
    e.preventDefault()
    axios.post('http://localhost:3001/register', {name, email, password})
   .then(result=>{console.log(result)
    navigate('/login')
   })
   .catch(err=>console.log(err))
  }

  return (
    <div className="d-flex  mx-5 justify-content-center align-items-center   ">
      <div className=" p-5 shadow rounded w-500 justify-content-center bg-light " >
        <h2 className="text-center mb-3">Register </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label"><strong>Name</strong></label>
            <input
              type="text"
              id="username"
              placeholder="Enter your Name"
              name="username"
              onChange={(e)=>setName (e.target.value)} 
              
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label"><strong>Emeil</strong></label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email address"
              name="email"
              onChange={(e)=>setEmail (e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label"><strong>Password</strong></label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              onChange={(e)=>setPassword (e.target.value)}
              className="form-control"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Register</button>
          <p className="mt-3 text-center">
            Already have an account?</p>
            <p className="mt-3 text-center">
            <Link to="/login" className="btn btn-default border w-100 bg-light">Login</Link>
            </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
