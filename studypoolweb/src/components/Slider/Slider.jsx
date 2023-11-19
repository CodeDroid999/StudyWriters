import React from "react";
//slider css
import "./Slider.css";
//image
import main from "../../img/homepage5.jpeg";
//slider images
import Algebra from "../../img/Algebra.jpeg";
import Biology from "../../img/Biology.jpeg";
import chemistry from "../../img/chemistry.jpeg";
import economics from "../../img/economics.jpeg";

//we are using here swiper library
//npm add swiper
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

const Slider = () => {
  return (
    <div className="Slider">
      
      <div className="headerimage">
        <img src={main} alt="pic" />
      </div>


      <div className="slider">
      <span>Featured Subjects</span>
        <Swiper spaceBetween={30} slidesPerView={4} grabCursor={true} 
        className="SwiperSlider">
          {/* first slider item */}
          <SwiperSlide >
            <div className="slide1">
            <img src={Algebra} alt="img1" />
            <h3>Algebra</h3>
            </div>
          </SwiperSlide>
          {/* second slider item */}
          <SwiperSlide>
          <div className="slide1">
            <img src={Biology} alt="img1" />
            <h3>Biology</h3>
            </div>
          </SwiperSlide>
          {/* third slider item */}
          <SwiperSlide>
          <div className="slide1">
            <img src={chemistry} alt="img1" />
            <h3>Chemistry</h3>
            </div>
          </SwiperSlide>
          {/* fourth slider item */}
          <SwiperSlide>
          <div className="slide1">
            <img src={economics} alt="img1" />
            <h3>Economics</h3>
            </div>
          </SwiperSlide>
          {/* fifth slider item */}
          <SwiperSlide>
          <div className="slide1">
            <img src={Algebra} alt="img1" />
            <h3>History</h3>
            </div>
          </SwiperSlide>
          {/* sixth slider item */}
          <SwiperSlide>
          <div className="slide1">
            <img src={economics} alt="img1" />
            <h3>History</h3>
            </div>
          </SwiperSlide>
          {/* seven slider item */}
          <SwiperSlide>
          <div className="slide1">
            <img src={Biology} alt="img1" />
            <h3>History</h3>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};
export default Slider;
