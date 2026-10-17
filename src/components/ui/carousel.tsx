"use client";

import { AnimatePresence, motion } from "framer-motion";
import type React from "react";
import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; // Using chevron for carousel

type CarouselProps<T> = {
  items: T[];
  itemsPerPage?: number;
  getItemKey: (item: T) => React.Key;
  renderItem: (item: T) => React.ReactNode;
};

const Carousel = <T,>({
  items,
  itemsPerPage = 6,
  getItemKey,
  renderItem,
}: CarouselProps<T>) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex + itemsPerPage;
      // Loop back to start if at or beyond the end
      return newIndex < items.length ? newIndex : 0;
    });
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex - itemsPerPage;
      // Loop to end if at or before the start
      return newIndex >= 0 ? newIndex : (totalPages - 1) * itemsPerPage;
    });
  };

  const currentVisibleItems = items.slice(
    currentIndex,
    currentIndex + itemsPerPage,
  );

  return (
    <div className="relative w-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex} // Key change forces re-render and animation
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 py-10" // Adjust grid for itemsPerPage
        >
          {currentVisibleItems.length > 0 ? (
            currentVisibleItems.map((item: T, idx: number) => (
              <motion.div
                key={getItemKey(item)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                {renderItem(item)}
              </motion.div>
            ))
          ) : (
            <p className="text-center text-neutral-400 col-span-full">
              No items to display.
            </p>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      {items.length > itemsPerPage && ( // Only show buttons if there are more items than can fit on one page
        <>
          <div className="absolute inset-y-0 left-0 flex items-center -ml-8">
            {" "}
            {/* Adjusted margin for button visibility */}
            <button
              type="button"
              onClick={handlePrev}
              className="bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-full shadow-lg focus:outline-none transition-colors duration-200"
            >
              <FaChevronLeft className="h-5 w-5" />
            </button>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center -mr-8">
            {" "}
            {/* Adjusted margin for button visibility */}
            <button
              type="button"
              onClick={handleNext}
              className="bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-full shadow-lg focus:outline-none transition-colors duration-200"
            >
              <FaChevronRight className="h-5 w-5" />
            </button>
          </div>
        </>
      )}

      {/* Pagination Dots */}
      {totalPages > 1 && ( // Only show dots if there is more than one page
        <div className="flex justify-center mt-4 space-x-2">
          {Array.from({ length: totalPages }, (_, page) => ({
            key: `page-${page}`,
            page,
          })).map(({ key, page }) => (
            <button
              key={key}
              type="button"
              onClick={() => setCurrentIndex(page * itemsPerPage)}
              className={`h-2 w-2 rounded-full ${
                Math.floor(currentIndex / itemsPerPage) === page
                  ? "bg-indigo-500"
                  : "bg-neutral-600"
              }`}
            ></button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;
