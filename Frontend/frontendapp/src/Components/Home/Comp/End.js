import React from 'react';
import { Footer } from 'flowbite-react';
import logo from '../Assets/logo.png';
import { BsFacebook, BsGithub, BsInstagram, BsTwitter } from 'react-icons/bs';

const End = () => {
  return (
    <div>
        <Footer className='my-16'>
            <div className="w-full">
                <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
                    <div className='space-y-4 my-8 mx-10'>
                        <a href=''className='text-2xl font-semibold flex items-center space-x-2'>
                        <img src={logo} alt='' className='w-20 inline-block items-center rounded-full' />
                        <span className='text-steelBlue'>IDVault</span>
                        </a>
                        <div>
                            <p className='mb-1 text-silver font-semibold'> Copyright © 2023 IDVault.</p>
                            <p className='text-silver'>All rights reserved.</p>
                        </div>
                    </div>
            <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
                <div>
                    <Footer.Title title="about" />
                    <Footer.LinkGroup col>
                    <Footer.Link href="#">Rishabh Sharma</Footer.Link>
                    <Footer.Link href="#">Ayush Rathor</Footer.Link>
                    </Footer.LinkGroup>
                </div>
                <div>
                    <Footer.Title title="Follow us" />
                    <Footer.LinkGroup col>
                    <Footer.Link href="#">Github</Footer.Link>
                    <Footer.Link href="#">Discord</Footer.Link>
                    </Footer.LinkGroup>
                </div>
                <div>
                    <Footer.Title title="Legal" />
                    <Footer.LinkGroup col>
                    <Footer.Link href="#">Privacy Policy</Footer.Link>
                    <Footer.Link href="#">Terms &amp; Conditions</Footer.Link>
                    </Footer.LinkGroup>
                </div>
                <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
                  <Footer.Icon href="#" icon={BsFacebook} />
                  <Footer.Icon href="#" icon={BsInstagram} />
                  <Footer.Icon href="#" icon={BsTwitter} />
                  <Footer.Icon href="#" icon={BsGithub} />
                </div>
            </div>
        </div>

          
        
      </div>
    </Footer>
    </div>
  )
}

export default End;