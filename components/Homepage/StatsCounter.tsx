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
    <div ref={ref} className={`flex justify-center items-center space-x-4 p-4 ${startAnimation ? 'animate' : ''}`}>
      <div className="text-center p-2">
        <h2 className="text-3xl font-bold">
          <CountUp end={48777} duration={2} start={startAnimation ? null : undefined} /> +
        </h2>
        <p className="text-sm">Visitors</p>
      </div>
      <div className="text-center p-2">
        <h2 className="text-3xl font-bold">
          <CountUp end={136050} duration={2} start={startAnimation ? null : undefined} /> +
        </h2>
        <p className="text-sm">Completed Tasks</p>
      </div>
      <div className="text-center p-2">
        <h2 className="text-3xl font-bold">
          <CountUp end={9.37} duration={2} decimals={2} start={startAnimation ? null : undefined} /> +
        </h2>
        <p className="text-sm">Current Quality Score</p>
      </div>
      <div className="text-center p-2">
        <h2 className="text-3xl font-bold">
          <CountUp end={2674} duration={2} start={startAnimation ? null : undefined} /> +
        </h2>
        <p className="text-sm">Writers Active</p>
      </div>
    </div>
  );
};

export default StatsCounter;
