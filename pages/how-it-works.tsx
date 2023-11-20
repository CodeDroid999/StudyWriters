import Steps from 'components/howitworks/Steps';
import SideNav from 'components/layout/SideNav';
import Layout from 'components/unAuthed/layout';
import Link from 'next/link';
import React from 'react';

const Howitworks: React.FC = () => {
    return (
        <div className="h-50 flex items-center justify-center" style={{ backgroundImage: "url('public/main_cover.jpg')", backgroundSize: "cover" }}>
            <Layout>
                <div className="flex ">
                    <div className="container flex">
                        <div className="text-white  h-full">
                            <SideNav />
                        </div>
                        <div className="mx-auto h-full pl-5">
                            <h1 className="text-blue-500">How it works</h1>
                            <h2>QualityUnitedWriters - How it works</h2>

                            <p>
                                Thousands of college students have used HomeWorkForYou as their secret weapon to make their life easier.
                            </p>
                            <p>Now it is your turn.                        </p>

                            <h3>How to Get Started</h3>
                            <Steps />

                    
                        </div>
                    </div>
                </div>
            </Layout>
        </div>
    );
};

export default Howitworks;