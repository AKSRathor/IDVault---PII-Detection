import React, {useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../Home/Comp/Header';
import { BiUser } from 'react-icons/bi';
import { AiOutlineLock } from 'react-icons/ai';
const Register = () => {
  const navigate = useNavigate()
  return (
    <>
      <Header />

      <div className='text-black h-[100vh] flex justify-center items-center bg-gradient-to-r from-red-700 to-red-400'>
        <div className='bg-blue-200 border border-blue-600 rounded-md p-8 mt-28 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-40 relative'>
          <h1 className='text-4xl text-Black font-bold text-center mb-6'>Register</h1>

          <div className='relative my-7'>
            <input
              type='text'
              name='userId'
              placeholder='User ID...'
              className='block w-80 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer placeholder:italic placeholder:text-white'
            />
            <BiUser className='absolute top-3 right-2 text-white text-2xl' />
          </div>

          <div className='relative my-7'>
            <input
              type='text'
              name='firstName'
              placeholder='First Name...'
              className='block w-80 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer placeholder:italic placeholder:text-white'
            />
          </div>

          <div className='relative my-7'>
            <input
              type='text'
              name='lastName'
              placeholder='Last Name...'
              className='block w-80 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer placeholder:italic placeholder:text-white'
            />
          </div>

          <div className='relative my-7'>
            <input
              type='email'
              name='email'
              placeholder='Email...'
              className='block w-80 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer placeholder:italic placeholder:text-white'
            />
          </div>

          <div className='relative my-7'>
            <input
              type='password'
              name='password'
              placeholder='Password...'
              className='block w-80 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer placeholder:italic placeholder:text-white'
            />
            <AiOutlineLock className='absolute top-3 right-2 text-white text-2xl' />
          </div>

          <button
            className='w-full mb-2 text-2xl font-bold mt-6 rounded-full bg-white text-black hover:bg-red-200 hover:text-black py-2 transition-colors duration-300'
          onClick={()=> navigate('/')}>
            Register
          </button>

          <div className='text-center mt-5'>
            <span className='m-4 text-white'>
              Already have an account?{' '}
              <Link to='/signin' className='text-black text-decoration-line: underline'>
                Login Here
              </Link>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
