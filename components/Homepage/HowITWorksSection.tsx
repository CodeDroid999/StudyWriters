import StudentSteps from 'components/howitworks/Steps';
import Image from 'next/image'
import HeroBackground from "public/main_cover.jpg"
import React from 'react';

const HowItWorksSection = () => {
    return (
        <div className="container mx-auto pl-5 bg-gray-100 pt-4">
            <h1 className="font-bold text-center md:text-6xl text-4xl text-green-950 md:pt-3 whitespace-nowrap">
                How it works
            </h1>
            <p className=" text-center text-lg">
                Thousands of college students have used QualityUnitedWriters as their secret weapon to make their life easier.
                <br></br>Now it is your turn.                        </p>
            <StudentSteps />
        </div>
    );
};

export default HowItWorksSection;
