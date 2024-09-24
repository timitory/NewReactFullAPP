import React,{useState} from "react";
import { registerUser } from "../redux/authSlice";
import {useDispatch,useSelector} from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Register =()=> {
    const dispatch=useDispatch()
    const {error,loading}=useSelector((state)=> state.auth);

    const [formData,setFormData]= useState({
        firstname:'',
        email:'',
        password:'',

    });
    const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

    const handleChange =(e)=>{
        setFormData({...formData,
            [e.target.name] : [e.target.value]
        })
    };
    const handleSubmit =(e)=> {
        e.preventDefault();
        dispatch(registerUser(formData));
    };

    return (
        <div className="flex flex-col justify-center items-center mt-4">
            
            <h2 className="text-bg text-red-500 font-bold mb-4">SIGN UP FORM</h2>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col space-y-3">
                <div className="flex flex-col space-y-2">
                    <label>Name </label>
                    <input type="text" value={formData.firstname} name='firstname' placeholder="John Doe" onChange={handleChange} className="py-2 w-60 border border-green-600 px-3 rounded-lg" required/>
                    </div>
                    <div className="flex flex-col space-y-2">
                    <label>Email</label>
                    <input type="email" value={formData.email} name='email' placeholder="Enter Email" onChange={handleChange} className="py-2 w-60 border border-green-600 px-3 rounded-lg" required/>
                    </div>
                   
                <div className="flex flex-col space-y-2 relative">
                    <label>Password</label>
                    <input type={isVisible ? 'text' : 'password'} value={formData.password} name='password' placeholder="Enter One Time Password" onChange={handleChange} className="py-2 w-60 relative border border-green-600 px-3 rounded-lg" required/>
                    <FontAwesomeIcon icon={isVisible ? faEyeSlash : faEye} onClick={toggleVisibility} className="absolute right-0 bottom-3 px-2" />
                </div>
                
                </div>
                
                <div className="flex justify-between items-center">
                <button type="submit" 
                disabled={loading} className="flex justify-center items-center py-2 px-6 my-3 rounded-md bg-green-400">Sign Up

                </button>
                 <a className="flex hover:red font-mono text-md" href="/">Sign In</a>

                </div>
                

            </form>
            {loading && <p>Loading...</p>}
            {error && <p class='text-red-500 text-sm'>{{error}}</p> }
        </div>
    )
}
export default Register