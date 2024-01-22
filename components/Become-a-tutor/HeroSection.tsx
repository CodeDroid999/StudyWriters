import Image from 'next/image';
import React from 'react';
import Home from 'components/layout/HomeSection';
import Link from 'next/link';
import HeroBackground from 'public/bg/Become-a-Tutor-cover.jpg';

const HeroArea = () => {
  return (
    <div className="relative h-[80vh]">
      {/* Background Image */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={HeroBackground}
          alt="Background"
          layout="fill"
          objectFit="cover"
        />
      </div>

      {/* Gradient Cover */}
      <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent"></div>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex items-end justify-center text-white pb-3">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-gray-200">
            Earn <span className="text-gray-200">money</span>
          </h1>
          <h1 className="text-4xl font-bold mb-4">answering homework questions</h1>
          <p className="text-lg mb-6">
            Earn up to <strong>$7,500 USD </strong>monthly working from home tutoring students!
          </p>
          <div className="btn-box whitespace-nowrap">
            <Link className="btn-1 p-2 text-xl rounded bg-yellow-500 text-white" href="tutor-application">Apply now!</Link>
          </div>
          <p className="text-lg mt-4">Now accepting tutors from all over the world!</p>
        </div>
      </div>

      {/* Include Home component if needed */}
      <Home />
    </div>
  );
};

export default HeroArea;
