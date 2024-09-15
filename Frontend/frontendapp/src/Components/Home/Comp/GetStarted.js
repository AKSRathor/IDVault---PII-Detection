import React from 'react';
import productImg01 from '../Assets/productimg01.avif';
import { useNavigate } from 'react-router-dom';

const GetStarted = () => {
    const navigate = useNavigate()
  return (
    <div>
        <div>

{/* about text */}
<div className='px-4 lg:px-14 max-w-screen-2xl mx-auto my-8' id='product'>
    <div className='md:w-11/12 mx-auto flex flex-col md:flex-row justify-between items-center gap-12'>

        <div>
            <img src={productImg01} alt=''/>
        </div>

        <div className='md:w-3/5 mx-auto'>

            <h2 className='text-4xl text-black mb-4 md:w-4/5 tracking-wide font-bold'>Elevate your experience with our cutting-edge products.</h2>

            <p className='md:w-3/4 text-silver mb-8 tracking-wider'>
                Unleash the power of innovation with our flagship product. Designed to meet the demands of the modern industry, it seamlessly integrates advanced features Artificial Intelligence and Machine Learning to enhance efficiency, streamline processes, and propel the aircraft sequrity to new heights.
            </p>

            <button className='px-7 py-2 bg-red-500 text-black font-bold rounded hover:bg-pink-500 hover:text-black transition-all duration-300 hover:-translate-y-4' onClick={() => navigate("/userdash/rawhandler")}><span className='hover:tracking-wide'>Get Started</span></button>

        </div>
    </div>
</div>

</div>
</div>
  );
}

export default GetStarted;