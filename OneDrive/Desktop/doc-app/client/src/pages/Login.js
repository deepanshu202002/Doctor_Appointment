import React from 'react'
import {Form,Input,message} from 'antd'
import "../styles/RegisterStyles.css"
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { showLoading,hideLoading } from '../redux/features/alertSlice';
// import { fetchData } from '../redux/features/userSlice';
function Login() {
  const navigate = useNavigate();
  const dispatch  = useDispatch();
          const onfinishHandler = async (values)=>{
        try{
          dispatch(showLoading())
const res = await axios.post('/api/v1/user/login',values);
window.location.reload();
dispatch(hideLoading())
if(res.data.message){
  localStorage.setItem("token",res.data.authtoken);
  console.log(res.data.authtoken)
  message.success("login successfully");
  navigate('/')
  // dispatch(fetchData())
} else{
 message.error(res.data.message);
}
        }catch (error){
          dispatch(hideLoading())
          console.log(error);
          message.error("something went wrong")
        }
       }
        return (
        <>
        <div className='form-container'>
        <Form layout="vertical" onFinish={onfinishHandler} className='register-form'>
            <h3 className='text-center'>Login Form</h3>
            <Form.Item label="Email" name="email">
            <Input type="email" required />
            </Form.Item>
            <Form.Item label="Password" name="password">
            <Input type="password" required />
            </Form.Item>
       <Link to={"/register"} className='ms-2'>Not a user Register here</Link>
            <button className='btn btn-primary' type='submit'>Login</button>
            </Form>
        </div>
        </>
      )
  
}

export default Login