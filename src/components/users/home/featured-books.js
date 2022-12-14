import React, { useState, useRef, useEffect } from "react";
import { Container } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import "./featured-books.scss";
import { getFeaturedBooks } from "../../../api/book-service";
import Loading from "../../general/loading/loading";
import { getBookImage } from "../../../utils/functions/book";

const FeaturedBooks = () => {
  const [isEnd, setIsEnd] = useState(false);
  const [isBeginning, setIsBeginning] = useState(true);
  const swiperRef = useRef(null);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({});

  const handlePrev = () => {
    swiperRef.current.swiper.slidePrev();
  };

  const handleNext = () => {
    swiperRef.current.swiper.slideNext();
  };

  const handleChange = (e) => {
    setIsBeginning(e.isBeginning);
    setIsEnd(e.isEnd);
  };

  const loadData = async (page) => {
    try {
      const resp = await getFeaturedBooks(page, 10, "name", "ASC");
      const {
        content,
        numberOfElements,
        size,
        totalElements,
        totalPages,
        pageable,
      } = resp.data;

      setBooks(content);

      setPagination({
        numberOfElements,
        size,
        totalElements,
        totalPages,
        pageable,
      });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData(0);
  }, []);

  return (
    <div className="swiper">
      <div className="swiper-wrapper">
        {loading ? (
          <Loading />
        ) : (
          <Container className="swiper-slide">
            <div
              className={`arrow ${isBeginning ? "passive" : ""}`}
              onClick={handlePrev}
            >
              <IoIosArrowDropleft />
            </div>
            <Swiper
              onSlideChange={handleChange}
              ref={swiperRef}
              breakpoints={{
                0: {
                  spaceBetween: 10,
                  slidesPerView: 1,
                },
                576: {
                  spaceBetween: 20,
                  slidesPerView: 1,
                },
                768: {
                  spaceBetween: 20,
                  slidesPerView: 2,
                },
                992: {
                  spaceBetween: 20,
                  slidesPerView: 3,
                },
                1200: {
                  spaceBetween: 20,
                  slidesPerView: 5,
                },
              }}
            >
              {books.map((book, index) => (
                <SwiperSlide key={index}>
                  <div className="swiper-cont">
                    <div className="container py-2">
                      <div className="owl-carousel team-carousel position-relative">
                        <a
                          className="feature-books-link"
                          href={`./book-detail/?id=${book.id}`}
                        >
                          <div className="team-item">
                            <img
                              src={getBookImage(book.image)}
                              className="img-fluid rounded"
                              alt={book.name}
                            />

                            <div className="bg-light text-center p-2">
                              <div className="book-title">
                                <h5 className="mb-3">{book.name}</h5>
                              </div>
                              <div className="book-author">
                                <p className="mb-2">{book.bookAuthor.name}</p>
                              </div>
                              <div className="d-flex justify-content-center">
                                {book.publishDate}
                              </div>
                            </div>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <div
              className={`arrow ${isEnd ? "passive" : ""}`}
              onClick={handleNext}
            >
              <IoIosArrowDropright />
            </div>
          </Container>
        )}
      </div>
      <div className="swiper-button-next"></div>
      <div className="swiper-button-prev"></div>
    </div>
  );
};

export default FeaturedBooks;
