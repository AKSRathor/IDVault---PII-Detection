import React from 'react';
import productImg02 from '../Assets/productimg02.png';
const Testemonials = () => {
    return (
        <div>
            <div>
                {/* company stats */}
                <div className='px-4 lg:px-14 max-w-screen-2xl mx-auto py-16 bg-gradient-to-r from-red-700 to-red-400'>
                    <div className='flex flex-col md:flex-row justify-between items-center gap-8'>
                        <div className='md:w-1/3'>
                            <img src={productImg02} alt='' className='rounded-full' />
                        </div>

                        <div className='md:w-2/3 mx-auto'>
                            <div>
                                <p className='md:-4/5 text-sm text-black tracking-wide mb-8 leading-7'>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                                </p>
                                <h5 className='text-black text-xl font-semibold mb-2'>John Stilan</h5>
                                <p className='text-base text-black mb-8'>AWS Security Association</p>
                                <div>
                                    <div className='flex items-center gap-8 flex-wrap'>
                                        <div className='flex items-center gap-8'>
                                            <a href='/' className='group font-bold text-black hover:text-white hover:tracking-wide flex items-center'>
                                                Meet all customers{" "}
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="17"
                                                    height="11"
                                                    viewBox='0 0 17 11'
                                                    fill='none'
                                                    className='inline-block ml-2 group-hover:stroke-white'
                                                >
                                                    <path
                                                        d="M12 9.39905L15.2929 6.106115C15.6834 5.71563 15.6834 5.08246 15.2929 4.69194L12 1.39905M15 5.39905L1 5.39905"
                                                        stroke="#000000"
                                                        strokeWidth="2"
                                                    />
                                                </svg>
                                            </a>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Testemonials;