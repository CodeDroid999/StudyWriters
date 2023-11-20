import Steps from 'components/howitworks/Steps';
import SideNav from 'components/layout/SideNav';
import Layout from 'components/unAuthed/layout';
import Link from 'next/link';
import React from 'react';

const Howitworks: React.FC = () => {
    return (
            <div className="row flex ">
                <div className="container flex">
                    <div className="col-md-3 mx-auto">
                            <SideNav />
                    </div>
                   <div className="col-md-9 mx-auto h-full pl-5">
                        <h1 className="text-blue-500 text-xl">How it works</h1>
                        <h2>QualityUnitedWriters - How it works</h2>

                        <p className="pt-1 pb-2 text-lg">
                            Thousands of college students have used HomeWorkForYou as their secret weapon to make their life easier.
                        </p>
                        <p className="pt-1 pb-2 text-lg">Now it is your turn.                        </p>

                        <h1 className="text-blue-500 text-xl">How to Get Started</h1>
                        <Steps />
                   </div>
                </div>
            </div>
    );
};

export default Howitworks;