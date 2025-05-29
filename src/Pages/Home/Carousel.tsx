import { useCallback, useRef } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { Link } from "react-router-dom";
import { Swiper } from "swiper/react";
import { Pagination } from "swiper/modules";
import { SwiperSlide, type SwiperClass } from "swiper/react";
import styles from "./Home.module.scss";
import "swiper/css";

export const Carousel = ({ items }: { items: any }) => {
  const sliderRef = useRef<{ swiper: SwiperClass } | null>(null);

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);
  return (
    <Swiper
      style={{ padding: "25px" }}
      ref={sliderRef}
      modules={[Pagination]}
      spaceBetween={10}
      slidesPerView={3}
      breakpoints={{
        1440: {
          slidesPerView: 4,
        },
        1024: {
          slidesPerView: 3,
        },
        640: {
          slidesPerView: 2,
        },
        320: {
          slidesPerView: 1,
        },
      }}
      pagination={{
        type: "bullets",
        bulletClass: "swiper-custom-bullet",
        bulletActiveClass: "swiper-custom-bullet-active",
        clickable: true,
      }}
    >
      {items.map((item: { art: number; images: string[]; link: string }) => (
        <SwiperSlide>
          <Link to={item.link} key={item.art}>
            <div className={styles.home_categories_item}>
              <img src={item.images[0]} alt={`Item ${item.art}`} />
              <p>Артикул: {item.art}</p>
              <span>Подробнее</span>
            </div>
          </Link>
        </SwiperSlide>
      ))}
      <div className="prev-arrow" onClick={handlePrev}>
        <BiChevronLeft />
      </div>
      <div className="next-arrow" onClick={handleNext}>
        <BiChevronRight />
      </div>
    </Swiper>
  );
};
