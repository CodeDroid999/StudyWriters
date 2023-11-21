import React from 'react';

const HighestEarner = () => {
  // Sample data
  const earners = [
    { name: 'Allanmitch', rating: 5, earnings: 94372 },
    { name: 'Parmajohn', rating: 5, earnings: 92447 },
    { name: 'Chexmex', rating: 5, earnings: 80329 },
    { name: 'jkim', rating: 5, earnings: 78669 },
    { name: 'Dorime', rating: 5, earnings: 74615 },
  ];

  return (
    <div className="flex md:space-x-10">
      {earners.map((earner, index) => (
        <div key={index} className="mb-6">
          <h2 className="text-xl font-semibold text-blue-950">{earner.name}</h2>
          {/* Display star rating */}
          <div className="flex mb-2">
            {Array.from({ length: earner.rating }, (_, i) => (
              <span key={i} className="text-yellow-500">&#9733;</span>
            ))}
          </div>
          {/* Display earnings */}
          <p className="text-lg">${earner.earnings.toFixed(2)}</p>
        </div>
      ))}
    </div>
  );
};

export default HighestEarner;
