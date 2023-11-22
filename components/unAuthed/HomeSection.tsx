// Import necessary modules and components
import React from 'react';
import Alert from './Alert'; // Adjust the path if needed
import CustomNavbar from './Navbar';
import Image from 'next/image';

// Define the Home component
const Home: React.FC = () => {
    return (
        <header id="home" className="header_section">
            <div className="hero_bg_box">
                <div className="img-box">
                    <Image src="classNameg" alt="" />
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

// Export the Home component
export default Home;
