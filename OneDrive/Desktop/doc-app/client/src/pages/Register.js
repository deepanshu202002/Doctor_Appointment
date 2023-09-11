import React from 'react'
import {Form,Input, message} from 'antd'
import "../styles/RegisterStyles.css"
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { showLoading,hideLoading } from '../redux/features/alertSlice';
import axios from 'axios';
function Register() {
const navigate = useNavigate();
const dispatch  = useDispatch();
   const onfinishHandler = async(values)=>{
    try{
        dispatch(showLoading())
const res = await axios.post("/api/v1/user/register", values);
dispatch(hideLoading())
if(res.data="exist"){
console.log("register successfuly");
    navigate("/login");
}else{
console.log("not signed up");
}
    }catch(error){
        dispatch(hideLoading())
        console.log(error)
        message.error('something went wrong')
    }
   }
    return (
    <>
    <div className='form-container'>
    <Form layout="vertical" onFinish={onfinishHandler} className='register-form'>
        <h3 className='text-center'>Register Form</h3>
        <Form.Item label="Name" name="name">
        <Input type="text" required />
        </Form.Item>
        <Form.Item label="Email" name="email">
        <Input type="email" required />
        </Form.Item>
        <Form.Item label="Password" name="password">
        <Input type="password" required />
        </Form.Item>
   <Link to={"/login"} className='ms-2'>Already a user login here</Link>
        <button className='btn btn-primary' type='submit'>Register</button>
        </Form>
    </div>
    </>
  )
}

export default Register