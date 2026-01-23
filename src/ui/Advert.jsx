import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "react-feather";

const slides = [
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&h=600&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1000&h=600&fit=crop&crop=face",
  "https://picsum.photos/800/600?random=6",
  "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1000&h=600&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1000&h=600&fit=crop&crop=face",
];
function Advert() {
  const [curr, setCurr] = useState(0);
  const prev = () =>
    setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1));

  const next = () =>
    setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1));
  useEffect(() => {
    const slideInterval = setInterval(next, 3000);
    return () => clearInterval(slideInterval);
  });
  return (
    <div className="col-span-2 rounded-2xl bg-amber-600 row-span-4 overflow-hidden relative">
      <div
        className="flex transition-transform ease-out duration-500 w-full h-full"
        style={{ transform: `translateX(-${curr * 100}%)` }}
      >
        {slides.map((s, i) => (
          <img
            src={s}
            alt="hey"
            key={i}
            className="w-full h-full object-cover flex-shrink-0"
          />
        ))}
      </div>
      <div className="absolute inset-0 flex items-center justify-between px-4 ">
        <button
          onClick={prev}
          className="p-1 rounded-full shadow bg-white/80 text-gray-800"
        >
          <ChevronLeft size={40} />
        </button>
        <button
          onClick={next}
          className="p-1 rounded-full shadow bg-white/80 text-gray-800"
        >
          <ChevronRight size={40} />
        </button>
      </div>
      <div className="absolute bottom-4 right-0 left-0">
        <div className="flex items-center justify-center gap-2">
          {slides.map((_, i) => (
            <div
              className={`transition-all w-2 h-2 bg-white rounded-full ${
                curr === i ? "p-1.5" : "bg-opacity-50"
              }`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Advert;
