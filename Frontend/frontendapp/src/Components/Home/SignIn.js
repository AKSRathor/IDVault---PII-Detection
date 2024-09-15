import React, {useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from "./Comp/Header";
import { BiUser } from 'react-icons/bi';
import { AiOutlineLock } from 'react-icons/ai';

const SignIn = () => {
  const nagivate = useNavigate()
  return (
    <>
      <Header />
      <div className='text-black h-[100vh] flex justify-center items-center bg-gradient-to-r from-red-700 to-red-400'>
        <div className='bg-blue-200 border border-blue-600 rounded-md p-8 mt-28 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-40 relative'>
          <h1 className='text-4xl text-Black font-bold text-center mb-6'>Login</h1>

          <div className='relative my-7'>
            <input
              type='text'
              name='userId'
              placeholder='Your User ID...'
              className='block w-72 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer placeholder:italic placeholder:text-white'
            />
            <BiUser className='absolute top-3 right-0 text-white text-2xl' />
          </div>

          <div className='relative my-7'>
            <input
              type='password'
              name='password'
              placeholder='Your Password...'
              className='block w-72 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer placeholder:italic placeholder:text-white'
            />
            <AiOutlineLock className='absolute top-3 right-0 text-white text-2xl' />
          </div>

          <div className='flex justify-between items-center text-white'>
            <div className='flex mt-4'>
              <input type='checkbox' className='mt-0.5 mr-2' name='' id='' />
              <label htmlFor='Remember Me' className='text-sm'>Remember Me</label>
            </div>
            <span className='text-white text-sm cursor-pointer mt-3'>Forgot Password?</span>
          </div>

          <button
            className='w-full mb-2 text-2xl font-bold mt-6 rounded-full bg-white text-black hover:bg-red-200 hover:text-black py-2 transition-colors duration-300'
          >
            Login
          </button>
          <div >
          <button
            className='w-full mb-2 text-2xl font-bold mt-6 rounded-full bg-white text-black hover:bg-red-200 hover:text-black py-2 transition-colors duration-300'
          onClick={()=>nagivate("/userdash/rawhandler")}>
          Without Login
          </button>
          </div>
          <div className='text-center mt-5'>
            <span className='m-4 text-black'>
            New Login Here? <Link to='/register' className='text-black text-decoration-line: underline'>Create an Account</Link>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
