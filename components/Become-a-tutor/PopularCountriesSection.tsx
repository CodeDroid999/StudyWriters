import React from 'react';

const PopularCountries = () => {
    const popularCountries = [
        'Canada',
        'India',
        'Poland',
        'Indonesia',
        'Malaysia',
        'Mexico',
        'Nigeria',
        'Kenya',
        'Pakistan',
        'Philippines',
    ];

    return (
        <div className="sm:px-18  flex h-[50vh] flex-col-reverse items-center  bg-green-700  px-4 py-16  lg:px-24 xl:my-10 xl:flex-row  xl:px-36">
            <div className="container">
                <div className="flex flex-1 flex-col items-center justify-center">
                    <h1 className="text-center  text-2xl font-bold text-gray-100 pt-2 pb-4  ">
                        Popular Tutor Countries
                    </h1>
                    <div className="row justify-between">
                        <div className="col-sm-2 col-md-1 py-2">
                            {popularCountries.map((country, index) => (
                                <span key={index} className="py-2 px-2 text-lg text-white">
                                    {country}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default PopularCountries;
