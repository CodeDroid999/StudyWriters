import React from 'react';

const PopularCountries = () => {
    const popularCountries = [
        'Canada',
        'India',
        'Indonesia',
        'Malaysia',
        'Mexico',
        'Nigeria',
        'Pakistan',
        'Philippines',
        'South Africa',
        'Ukraine',
        'United States',
        'Vietnam',
        'Zambia',
    ];

    return (
        <div className="sm:px-18  flex h-[50vh] flex-col-reverse items-center  bg-violet-100  px-4 py-16  lg:px-24 xl:my-10 xl:flex-row  xl:px-36">
            <div className="container">
                <div className="flex flex-1 flex-col items-center justify-center">
                    <h1 className="text-center  font-bold text-yellow-500 md:mt-10 md:mb-5 ">
                        Popular Tutor Countries
                    </h1>
                    <div className="flex justify-center w-full flex-col md:flex-row md:space-x-6">
                            <div>
                                <div className="list-disc md:space-x-4 space-y-2 col-sm-12 sm:text-sm">
                                    {popularCountries.map((country, index) => (
                                        <span key={index} className="mb-2">
                                            {country}
                                        </span>
                                    ))}
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default PopularCountries;
