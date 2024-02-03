import React, { useState } from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

const StatsCounter = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  const [startAnimation, setStartAnimation] = useState(false);

  // Update startAnimation state when the element is in view
  if (inView && !startAnimation) {
    setStartAnimation(true);
  }

  return (
    <div className="hidden md:block w-screen">
      <div ref={ref} className={`row justify-center items-center space-x-2 pt-4 pb-4 bg-gray-100 ${startAnimation ? 'animate' : ''}`}>
        <div className="flex w-100 space-x-4 justify-center align-center">
          <div className="rounded text-center p-2 shadow">
            <h2 className="text-3xl font-bold rounded-xl shadow-inner p-1">
              <CountUp end={4877} duration={2} start={startAnimation ? null : undefined} /> <span className="text-green-500 text-5xl ">+</span>
            </h2>
            <p className="text-xl font-bold pt-2 pb-2 text-green-950">Users</p>
          </div>
          <div className="rounded text-center p-2 shadow">
            <h2 className="text-3xl font-bold rounded-xl shadow-inner p-1">
              <CountUp end={96} duration={2} start={startAnimation ? null : undefined} /> <span className="text-green-500 text-5xl ">%</span>
            </h2>
            <p className="text-xl font-bold pt-2 pb-2 text-green-950">Daily Visitors</p>
          </div>
          <div className="rounded text-center p-2 shadow">
            <h2 className="text-3xl font-bold rounded-xl shadow-inner p-1">
              <CountUp end={99.37} duration={2} decimals={2} start={startAnimation ? null : undefined} /> <span className="text-green-500 text-5xl ">%</span>
            </h2>
            <p className="text-xl font-bold pt-2 pb-2 text-green-950">Current Quality Score</p>
          </div>
          <div className="rounded text-center p-2 shadow">
            <h2 className="text-3xl font-bold rounded-xl shadow-inner p-1">
              <CountUp end={99.99} duration={2} decimals={2} start={startAnimation ? null : undefined} /> <span className="text-green-500 text-5xl ">%</span>
            </h2>
            <p className="text-xl font-bold pt-2 pb-2 text-green-950">Customer Satisfaction</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default StatsCounter;
