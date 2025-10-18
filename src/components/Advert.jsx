// import { useEffect, useRef } from "react";
import { useProductContext } from "../contexts/useProductContext";
import styles from "./Advert.module.css";
function Advert() {
  const { step, dispatch } = useProductContext();
  // const intervalRef = useRef(null);

  const images = [
    "../images/flowers-622533_1280.jpg",
    "../images/v-a-tao-OxvlDO8RwKg-unsplash.jpg",
    "../images/milada-vigerova-p8Drpg_duLw-unsplash.jpg",
    "../images/paul-gaudriault-a-QH9MAAVNI-unsplash.jpg",
  ];
  const handleNext = () => {
    const nextStep = step >= images.length - 1 ? 0 : step + 1;
    dispatch({ type: "setStep", payload: nextStep });
  };

  const handlePrev = () => {
    const prevStep = step <= 0 ? images.length - 1 : step - 1;
    dispatch({ type: "setStep", payload: prevStep });
  };

  const handleDotClick = (index) => {
    dispatch({ type: "setStep", payload: index });
  };

  // useEffect(() => {
  //   intervalRef.current = setInterval(() => {
  //     handleNext();
  //   }, 5000); // Slide every 5 seconds
  //   return () => clearInterval(intervalRef.current); // Cleanup
  // }, [step]);

  // const handleMouseEnter = () => clearInterval(intervalRef.current);
  // const handleMouseLeave = () => {
  //   intervalRef.current = setInterval(() => {
  //     handleNext();
  //   }, 5000);
  // };

  return (
    <div
      className={styles.slider}
      // onMouseEnter={handleMouseEnter}
      // onMouseLeave={handleMouseLeave}
    >
      <button
        className={styles.left}
        onClick={handlePrev}
        aria-label="Previous slide"
      >
        ←
      </button>
      <div className={styles.sliderContainer}>
        <div
          className={styles.sliderTrack}
          style={{ transform: `translateX(-${step * 100}%)` }}
        >
          {images.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Slide ${index + 1}: Scenic beach view`}
              className={styles.slideImage}
            />
          ))}
        </div>
      </div>
      <button
        className={styles.right}
        onClick={handleNext}
        aria-label="Next slide"
      >
        →
      </button>
      <div className={styles.dots}>
        {images.map((_, index) => (
          <span
            key={index}
            className={`${styles.dot} ${step === index ? styles.active : ""}`}
            onClick={() => handleDotClick(index)}
            aria-label={`Go to slide ${index + 1}`}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                handleDotClick(index);
              }
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default Advert;
