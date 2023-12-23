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
    <>
      <div ref={ref} className={`row justify-center items-center space-x-4 pt-4 pb-4 ${startAnimation ? 'animate' : ''}`}>
        <div className="flex w-100 space-x-4 justify-center align-center">
          <div className="rounded text-center p-2 shadow">
            <h2 className="text-3xl font-bold rounded-xl shadow-inner p-1">
              <CountUp end={48777} duration={2} start={startAnimation ? null : undefined} /> <span className="text-green-500 text-5xl ">+</span>
            </h2>
            <p className="text-xl font-bold pt-2 pb-2">Visitors</p>
          </div>
          <div className="rounded text-center p-2 shadow">
            <h2 className="text-3xl font-bold rounded-xl shadow-inner p-1">
              <CountUp end={136050} duration={2} start={startAnimation ? null : undefined} /> <span className="text-green-500 text-5xl ">+</span>
            </h2>
            <p className="text-xl font-bold pt-2 pb-2">Completed Assignments</p>
          </div>
          <div className="rounded text-center p-2 shadow">
            <h2 className="text-3xl font-bold rounded-xl shadow-inner p-1">
              <CountUp end={9.37} duration={2} decimals={2} start={startAnimation ? null : undefined} /> <span className="text-green-500 text-5xl ">+</span>
            </h2>
            <p className="text-xl font-bold pt-2 pb-2">Current Quality Score</p>
          </div>
          <div className="rounded text-center p-2 shadow">
            <h2 className="text-3xl font-bold rounded-xl shadow-inner p-1">
              <CountUp end={2674} duration={2} start={startAnimation ? null : undefined} /> <span className="text-green-500 text-5xl ">+</span>
            </h2>
            <p className="text-xl font-bold pt-2 pb-2">Writers Active</p>
          </div>
        </div>
      </div>

    </>
  );
};

export default StatsCounter;
