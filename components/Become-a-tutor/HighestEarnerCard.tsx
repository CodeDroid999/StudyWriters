import React from 'react';

const HighestEarner = () => {
  // Sample data
  const earners = [
    { name: 'Allanmitch', rating: 5, earnings: 94372 },
    { name: 'Parmajohn', rating: 4, earnings: 92447 },
    { name: 'Chexmex', rating: 4, earnings: 80329 },
    { name: 'jkim', rating: 5, earnings: 78669 },
  ];

  return (
    <div className="row  w-full bg-green-500">
      {earners.map((earner, index) => (
        <div key={index} className="col-md-3 col-sm-6 border">
          <h2 className="text-center text-xl font-semibold text-blue-950">{earner.name}</h2>
          {/* Display star rating */}
          <div className="flex mb-2 text-center w-full">
            {Array.from({ length: earner.rating }, (_, i) => (
              <span key={i} className="text-yellow-500 text-lg p-1 text-center">&#9733;</span>
            ))}
          </div>
          {/* Display earnings */}
          <p className="text-lg text-gray-200 text-center">$ {earner.earnings.toFixed(2)}</p>
        </div>
      ))}
    </div>
  );
};

export default HighestEarner;
