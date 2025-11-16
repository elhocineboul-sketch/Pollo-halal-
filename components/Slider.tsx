import React, { useState, useEffect } from 'react';

export interface SliderProps {
  images: string[];
}

const Slider: React.FC<SliderProps> = ({ images }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="mx-5 my-5 rounded-2xl overflow-hidden h-52 relative shadow-xl">
      {images.map((imgSrc, index) => (
        <img
          key={index}
          src={imgSrc}
          alt={`Slide ${index + 1}`}
          loading="lazy"
          decoding="async"
          className={`w-full h-full object-cover absolute top-0 left-0 transition-all duration-700 ease-in-out transform-gpu ${
            index === currentSlide ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
          }`}
        />
      ))}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full bg-white bg-opacity-50 transition-all duration-300 ease-in-out ${
              index === currentSlide ? 'w-4 bg-amber-500' : ''
            }`}
            onClick={() => setCurrentSlide(index)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(Slider);
