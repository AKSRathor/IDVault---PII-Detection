import React from 'react';
import Header from './Comp/Header';
import Hero from './Comp/Hero';
import About from './Comp/About';
import GetStarted from './Comp/GetStarted';
import Testemonials from './Comp/Testemonials';
import Services from './Comp/Services';
import End from './Comp/End';

const HomePage = () => {
  return (
    <div>
      <Header />
      <Hero />
      <GetStarted/>
      <Services/>
      <Testemonials/>
      <About/>
      <End/>
    </div>
  )
}

export default HomePage