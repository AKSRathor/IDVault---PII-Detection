import React, { useEffect, useState } from 'react';
import logo from '../Assets/logo.png';
import { Link } from 'react-router-dom';  // Updated import
import { FaAlignJustify, FaCircleXmark } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';


const Header = () => {

    const navigate = useNavigate();

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSticky, setIsSticky] = useState(false);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);  // Clean up the listener correctly
        };
    }, []);
    const navItems = [
        { link: 'PII Detection', path: '../userdash/rawhandler' },
        { link: 'PII Table Analysis', path: '../userdash/rawhandler' },
    ];

    return (
        <header className='w-full bg-white md:bg-transparent fixed top-0 left-0 right-0' style={{ background: "white" }}>
            <nav className={`py-4 lg:px-14 px-4 ${isSticky ? "sticky top-0 left-0 right-0 border bg-white duration-300" : ""}`}>
                <div className='flex justify-between items-center text-base gap-8'>

                    <Link to='/' className='text-2xl font-semibold flex items-center'>
                        <img src={logo} alt='' className='w-20 inline-block items-center rounded-full' />
                        <span className='text-red-600'>IDVault</span>
                    </Link>

                    {/* navitems for large devices */}
                    <ul className='md:flex space-x-12 hidden'>
                        {
                            navItems.map(({ link, path }) => (
                                <Link
                                    to={path}
                                    key={path}
                                    className='block cursor-pointer text-base text-naturalGrey hover:text-steelBlue font-bold'>
                                    {link}
                                </Link>
                            ))
                        }
                    </ul>

                    {/* buttons for large devices */}
                    {<div className='space-x-12 hidden lg:flex items-center'>

                        <button className='hidden lg:flex items-center text-red-600 hover:text-silver font-bold' onClick={() => navigate("/signin")}>Login</button>

                        <button className='bg-red-600 text-black py-2 px-4 transition-all duration-300 rounded hover:bg-silver font-bold' onClick={() => navigate("/register")}>Register</button>

                    </div>}
                    {/* menu button for only mobile devices */}
                    <div className='md:hidden'>
                        <button
                            onClick={toggleMenu}
                            className='text-naturalGrey focus:outline-none focus:text-steelBlue'>
                            {
                                isMenuOpen ? (<FaCircleXmark className='h-6 w-6 ' />) : (<FaAlignJustify className='h-6 w-6' />)
                            }
                        </button>
                    </div>

                </div>

                {/* nav items for mobile devices */}
                <div className={`space-y-4 px-4 mt-16 py-7 bg-steelBlue ${isMenuOpen ? "block fixed top-0 right-0 left-0" : "hidden"}`}>
                    {
                        navItems.map(({ link, path }) => (
                            <Link
                                to={path}
                                key={path}
                                className='block text-base text-silver hover:text-white font-bold'>
                                {link}
                            </Link>
                        ))
                    }
                </div>

            </nav>
        </header>
    );
};

export default Header;
