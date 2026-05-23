import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

function Hero() {
  return (
    <section id="billboard" className="bg-light py-5">
      <div className="container">

        {/* Title */}
        <div className="row justify-content-center text-center">

          <h1 className="section-title mt-4">
            New Collections
          </h1>

          <div className="col-md-6">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Saepe voluptas ut dolorum consequuntur, adipisci repellat!
              Eveniet commodi voluptatem voluptate.
            </p>
          </div>

        </div>

        {/* Swiper Slider */}
        <div className="row mt-4">

          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={30}
            slidesPerView={3}
            breakpoints={{
              0: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              992: { slidesPerView: 3 }
            }}
          >

            {/* Slide 1 */}
            <SwiperSlide>

              <div className="banner-item image-zoom-effect">

                <div className="image-holder">

                  <img
                    src="/images/banner-image-6.jpg"
                    alt="product"
                    className="img-fluid"
                  />

                </div>

                <div className="banner-content py-3">

                  <h5 className="text-uppercase">
                    Soft leather jackets
                  </h5>

                  <p>
                    Discover premium leather jackets with modern fit.
                  </p>

                  <a
                    href="#"
                    className="btn btn-dark btn-sm text-uppercase"
                  >
                    Discover Now
                  </a>

                </div>

              </div>

            </SwiperSlide>

            {/* Slide 2 */}
            <SwiperSlide>

              <div className="banner-item image-zoom-effect">

                <div className="image-holder">

                  <img
                    src="/images/banner-image-1.jpg"
                    alt="product"
                    className="img-fluid"
                  />

                </div>

                <div className="banner-content py-3">

                  <h5 className="text-uppercase">
                    Stylish Women Wear
                  </h5>

                  <p>
                    New fashion collection for modern women.
                  </p>

                  <a
                    href="#"
                    className="btn btn-dark btn-sm text-uppercase"
                  >
                    Discover Now
                  </a>

                </div>

              </div>

            </SwiperSlide>

            {/* Slide 3 */}
            <SwiperSlide>

              <div className="banner-item image-zoom-effect">

                <div className="image-holder">

                  <img
                    src="/images/banner-image-2.jpg"
                    alt="product"
                    className="img-fluid"
                  />

                </div>

                <div className="banner-content py-3">

                  <h5 className="text-uppercase">
                    Trendy Accessories
                  </h5>

                  <p>
                    Upgrade your look with latest accessories.
                  </p>

                  <a
                    href="#"
                    className="btn btn-dark btn-sm text-uppercase"
                  >
                    Discover Now
                  </a>

                </div>

              </div>

            </SwiperSlide>

          </Swiper>

        </div>

      </div>
    </section>
  );
}

export default Hero;
