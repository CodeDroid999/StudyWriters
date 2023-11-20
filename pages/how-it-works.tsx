import Steps from 'components/howitworks/Steps';
import SideNav from 'components/layout/SideNav';
import Footer from 'components/unAuthed/Footer';
import CustomNavbar from 'components/unAuthed/Navbar';
import Layout from 'components/unAuthed/layout';
import Link from 'next/link';
import React from 'react';

const Howitworks: React.FC = () => {
    return (
        <>
                <CustomNavbar />
            <div className="row flex pt-12">
                <div className="container flex">
                    <div className="col-md-2 mx-auto">
                        <SideNav />
                    </div>
                    <div className="col-md-10 mx-auto h-full pl-5">
                        <h1 className="text-blue-500 text-xl ">How it works</h1>
                        <h2 className="text-orange-400 font-semibold">QualityUnitedWriters - How it works</h2>

                        <p className="pt-1 pb-2 text-lg">
                            Thousands of college students have used QualityUnitedwriters as their secret weapon to make their life easier.
                        </p>

                        <p className="pt-1 pb-2 text-lg">Now it is your turn.                        </p>

                        <h1 className="text-blue-500 text-xl">How to Get Started</h1>
                        <Steps />
                        <div className="pt-1 pb-2 text-lg">
                            Embarking on your academic journey with QualityUnitedWriters is a seamless process designed to empower students and make their educational endeavors more manageable. Joining the ranks of thousands of college students who have already discovered the benefits, our platform acts as your secret weapon for academic success. The process is simple yet effective – students connect with skilled writers who excel in their respective fields. Whether it is a challenging assignment, research paper, or any academic task, QualityUnitedWriters is your go-to destination. Step by step, you post your task, select the best-suited writer, and watch as your academic workload becomes more manageable. Experience the convenience and excellence that QualityUnitedWriters brings to your educational journey.
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Howitworks;