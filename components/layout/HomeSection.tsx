import React from 'react';
import Alert from './Alert';
import CustomNavbar from './Navbar';

const Home: React.FC = () => {
    return (
        <header id="home" className="header_section">
             <div className="hero_bg_box">
                <div className="img-box">
                    <img src="public/hero-bg.jpg" alt="" />
                </div>
            </div>
            <div className="">
                <Alert />
            </div>
            <div className="header_bottom">
                <CustomNavbar />
            </div>
        </header>
    );
};

export default Home;
