/** @format */

import Image from "next/image";
import Link from "next/link";
import React from "react";

const BottomCTACard = () => {
  return (
    <div className=" bg-primary  overflow-hidden ">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-0 md:gap-4">
        <div className=" col-span-1 md:col-span-2 p-8 flex flex-col justify-center h-52 md:h-[320px] xl:h-[369px]  overflow-hidden">
          <h2 className="text-white text-2xl md:text-3xl xl:text-5xl font-serif mb-4">
            Find Highly Sought After With Lower Price
          </h2>
          <p className="text-white  text-sm md:text-base mb-2">
            Browse thousands of live auction ancient materials
          </p>
          <Link
            href="#"
            className="text-white text-xs md:text-sm hover:text-white/80 underline self-start"
          >
            PARTICIPATE LIVE AUCTION
          </Link>
        </div>
        <div className="col-span-1 md:col-span-3 flex gap-2 xl:gap-4 py-8 p-4 justify-center items-center md:h-[329px] xl:h-[360px]">
          <Image
            src="/LiveAucBanner-1.jpg"
            alt="Luxury handbag"
            width={400}
            height={400}
            className="w-16 sm:w-24 sm:h-28 md:w-36 md:h-40  xl:w-[228px] h-24 xl:h-[239px] rounded mt-4 md:mt-6 xl:mt-8"
          />
          <Image
            src="/LiveAucBanner-2.jpg"
            alt="Gold jewelry"
            width={300}
            height={300}
            className="w-16 sm:w-24 sm:h-28 sm:mt-[-12px] md:w-36 md:h-40 md:mt-[-30px] xl:w-[210px] h-24 xl:h-[245px] xl:mt-[-40px] rounded"
          />
          <Image
            src="/LiveAucBanner-3.jpg"
            alt="Leather accessories"
            width={300}
            height={300}
            className="w-16 sm:w-24 sm:h-28 md:w-36 md:h-40 xl:w-[228px] h-24 xl:h-[239px] rounded mt-4 md:mt-6 xl:mt-8"
          />
        </div>
      </div>
    </div>
  );
};

export default BottomCTACard;
