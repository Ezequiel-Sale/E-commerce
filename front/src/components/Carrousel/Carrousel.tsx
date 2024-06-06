"use client";
import React, { useEffect } from 'react';

const Carrousel: React.FC = () => {
  useEffect(() => {
    const items = document.querySelectorAll('[data-carousel-item]');
    let currentItem: number = 0;
    const totalItems: number = items.length;
    function showItem(index: any) {
      items[currentItem].classList.add('hidden');
      currentItem = index;
      items[currentItem].classList.remove('hidden');
    }

    showItem(0);

    const intervalId = setInterval(() => {
        const nextIndex: number = (currentItem + 1) % totalItems;
        showItem(nextIndex);
      }, 4000); 
  
      return () => clearInterval(intervalId);
  }, []);

  return (
    <div id="default-carousel" className="relative w-full mt-24 rounded-sm" data-carousel="slide">
      <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
        <div className="hidden duration-700 ease-in-out" data-carousel-item="active">
          <img src="/big-banner-iphone-11-pro.jpg" className="absolute block w-full h-96 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="Banner 1" />
        </div>
        <div className="hidden duration-700 ease-in-out" data-carousel-item>
          <img src="/mac-banner.jpg" className="absolute block w-full -translate-x-1/2 h-96 -translate-y-1/2 top-1/2 left-1/2" alt="Banner 2" />
        </div>
        <div className="hidden duration-700 ease-in-out" data-carousel-item>
          <img src="/ipad.jpg" className="absolute block w-full h-96 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="Banner 3" />
        </div>
        <div className="hidden duration-700 ease-in-out" data-carousel-item>
          <img src="/accesories.jpg" className="absolute block w-full h-96 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="Banner 4" />
        </div>
        <div className="hidden duration-700 ease-in-out" data-carousel-item>
          <img src="/ip14.jpg" className="absolute block w-full h-96 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="Banner 5" />
        </div>
      </div>
    </div>
  );
}

export default Carrousel;
