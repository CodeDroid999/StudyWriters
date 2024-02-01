import ApplicationsStatsCard from 'components/AdminDasboard/ApplicationsStatsCard';
import AssignmentsStatsCard from 'components/AdminDasboard/AsssignmentsStatsCard';
import ManageAdminsCard from 'components/AdminDasboard/ManageAdminsCard';
import UsersStatsCard from 'components/AdminDasboard/UsersStatsCard';
import Navbar from 'components/AdminLayout/Navbar';
import AdminSideNav from 'components/AdminLayout/SideNav';
import Footer from 'components/unAuthed/Footer';
import AdminAccess from 'hooks/AdminHook';
import RoleBasedAccess from 'hooks/AdminHook';
import Head from 'next/head';
import React from 'react';

const AdminDashboard: React.FC = () => {
    const { isUserAllowed } = AdminAccess(['Admin', 'SuperAdmin']);

    if (isUserAllowed()) {
        // Render the content for allowed users
        <>
            <Head>
                <title>
                    QualityUnitedWriters - Your Academic Research and Project Partner
                </title>
                <meta charSet="utf-8" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta
                    name="description"
                    content="Discover a dedicated platform for students and tutors offering expert assistance in a wide range of academic research and projects. Quality Unitted Writers connects you with quality solutions for your educational needs. Whether you're seeking help with essays, theses, or any academic work, our talented team is here to assist you."
                />
                <meta name="keywords" content="Academic writing services, Expert academic writers, Professional research assistance, High-quality research papers, Academic project support, Thesis and dissertation help, Essay writing service, Top-rated tutors, Academic success tips, Homework assistance, Online tutoring, Quality writing solutions, Best essay writers, Custom research papers, Academic support platform, Tutoring for students, Research paper editing, Writing and editing services, Academic guidance, Homework help for students" />
                <meta name="author" content="QualityUnitedWriters" />
                <meta name="robots" content="index, follow" />
                <meta name="og:title" property="og:title" content="QualityUnitedWriters - Your Academic Research and Project Partner" />
                <meta
                    name="og:description"
                    property="og:description"
                    content="Discover a dedicated platform for students and tutors offering expert assistance in a wide range of academic research and projects. Quality Unitted Writers connects you with quality solutions for your educational needs. Whether you're seeking help with essays, theses, or any academic work, our talented team is here to assist you."
                />
                <meta name="og:image" property="og:image" content="public/sync-my-socials-logo.png" />

                <meta name="og:url" property="og:url" content="https://www.qualityunitedswriters.com" />
            </Head>
            <Navbar />
            <div className="row flex pt-12 mt-8">
                <div className="container flex">
                    <div className="col-md-2 mx-auto ">
                        <AdminSideNav />
                    </div>
                    <div className="col-md-10 mx-auto h-full pl-2 shadow-inner">
                        <div className="row min-w-100 ">
                            <div className="row w-full mx-auto">
                                <div className="col-md-6 p-2">
                                    <ApplicationsStatsCard />

                                </div>
                                <div className="col-md-6 p-2">
                                    <AssignmentsStatsCard />
                                </div>
                            </div>
                            <div className="row w-full mx-auto">
                                <div className="col-md-6 p-2">
                                    <UsersStatsCard />
                                </div>
                                <div className="col-md-6 p-2">
                                    <ManageAdminsCard />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    } else {
        // Render the content for denied users
        return (
            <div className="flex h-screen bg-gray-100 justify-center align-center">
                <div className="container align-items-center mx-auto">
                    <img src="https://i.postimg.cc/d39KSRJ8/padlock.png" alt="" className="align-center mx-auto" />
                    <p className="text-lg text-red-600 text-center pt-5"> You are no longer granted access to this page. If you think this is a mistake contact support.</p>
                    <p className="text-center text-green-600 mt-3">
                        <a href="contact" className="py-1 px-2 text-white-100 border-2 rounded border-green-700">Contact Support</a>
                    </p>
                </div>
            </div >
        );
    }

};

export default AdminDashboard;