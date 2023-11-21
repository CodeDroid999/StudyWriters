import Home from 'components/layout/HomeSection';
import CustomNavbar from 'components/layout/Navbar';
import Image from 'next/image'
import Link from 'next/link';
import HeroBackground from "public/bg/Become-a-Tutor-cover.jpg"
import React from 'react';

const HeroArea = () => {
    return (
        <div className="hero_area">
            <div className="hero_bg_box">
                <div className="img-box">
                    <Image
                        src={HeroBackground}
                        alt="task"

                        className="w-full h-full"
                    />
                </div>
            </div>
            <Home />
            <section className=" slider_section ">
                <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-7">
                                        <div className="detail-box">
                                            <h1>
                                                Earn money
                                            </h1>
                                            <h1>
                                                Homework questions
                                            </h1>
                                            <p>
                                                Earn up to <strong>$7,500 USD </strong>monthly working from home tutoring students!
                                            </p>
                                            <div className="btn-box whitespace-nowrap">
                                                <Link href="/tutor-application/step1" className="btn-2 rounded bg-yellow-500 text-white"> Apply now! </Link>
                                            </div>
                                            <p>
                                                Now accepting tutors from all over the world!
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HeroArea;
