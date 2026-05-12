"use client";

import { getBreakingNews, getFeaturedNews } from "@/service/newsApi";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/lagnguageContext";
import { getTranslatedValue } from "@/hooks/getTranslatedValue";
import { MoveUpRight } from "lucide-react";

export default function HeroSection() {
  const [breaking, setBreaking] = useState([]);
  const [featured, setFeatured] = useState([]);

  const { lang } = useLanguage();

  useEffect(() => {
    const fetchBreaking = async () => {
      try {
        const data = await getBreakingNews();
        setBreaking(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBreaking();
  }, []);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const data = await getFeaturedNews();
        setFeatured(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFeatured();
  }, []);

  const mainNews = featured?.[0];
  const leftNews = featured?.[1];

  return (
    <section className="max-w-7xl mx-auto px-3 lg:px-0 pb-5 pt-3">
      <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.8fr_1fr] border border-[#cfc7ba] bg-[#f6f1e8]">
        {/* LEFT CARD */}
        <div className="border-b lg:border-b-0 lg:border-r border-[#cfc7ba] p-5">
          {leftNews && (
            <Link href={`/news/${leftNews?._id}`}>
              <div className="group">
                {/* TITLE */}
                <h2 className="text-[28px] leading-[1.15] font-bold text-[#1c1c1c]  hover:opacity-80 transition">
                  {getTranslatedValue(leftNews?.title, lang)}
                </h2>

                {/* META */}
                <div className="flex items-center gap-3 text-[13px] text-gray-600 mt-4 border-b border-[#cfc7ba] pb-4">
                  <span>Art</span>

                  <span className="w-1 h-1 rounded-full bg-red-500" />

                  <span>24/12/2024</span>

                  <MoveUpRight size={16} className="ml-auto text-gray-500" />
                </div>

                {/* DESCRIPTION */}
                <p className="mt-5 text-[15px] leading-7 text-[#444] line-clamp-6">
                  {getTranslatedValue(leftNews?.description, lang)}
                </p>

                {/* IMAGE */}
                <div className="mt-5 overflow-hidden">
                  <Image
                    src={leftNews?.featuredImage?.[0]}
                    alt="news"
                    width={800}
                    height={500}
                    className="w-full h-[220px] object-cover group-hover:scale-[1.03] transition duration-500"
                  />
                </div>

                {/* FOOT TEXT */}
                <p className="mt-5 text-[14px] leading-7 text-[#444] line-clamp-6">
                  {getTranslatedValue(leftNews?.content, lang)}
                </p>
              </div>
            </Link>
          )}
        </div>

        {/* CENTER MAIN NEWS */}
        <div className="border-b lg:border-b-0 lg:border-r border-[#cfc7ba] p-4 lg:p-5">
          {mainNews && (
            <Link href={`/news/${mainNews?._id}`}>
              <div className="group">
                {/* TOP BOX */}
                <div className="border border-[#cfc7ba] p-5">
                  <h1 className="text-[34px] md:text-[40px] leading-[1.1] font-bold text-[#1a1a1a] ">
                    {getTranslatedValue(mainNews?.title, lang)}
                  </h1>

                  {/* META */}
                  <div className="flex items-center gap-3 text-[13px] text-gray-600 mt-3">
                    <div className="w-10 h-[1px] bg-black" />

                    <span>Catastrophic</span>

                    <span className="w-1 h-1 rounded-full bg-red-500" />

                    <span>Milea Sandy E</span>

                    <span className="w-1 h-1 rounded-full bg-red-500" />

                    <span>24/12/2024</span>

                    <MoveUpRight size={16} className="ml-auto text-gray-500" />
                  </div>
                </div>

                {/* IMAGE */}
                <div className="mt-4 overflow-hidden">
                  <Image
                    src={mainNews?.featuredImage?.[0]}
                    alt="main-news"
                    width={1200}
                    height={800}
                    className="w-full h-52 md:h-72 object-cover group-hover:scale-[1.02] transition duration-500"
                  />
                </div>

                {/* DESCRIPTION */}
                <div className="pt-5">
                  <p className="text-[15px] text-ellipsis line-clamp-6 leading-7 text-[#444]">
                    {getTranslatedValue(mainNews?.content, lang)}
                  </p>
                </div>
              </div>
            </Link>
          )}
        </div>

        {/* RIGHT TRENDING */}
        <div className="p-5">
          {/* HEADER */}
          <div className="flex items-center justify-between border-b border-[#cfc7ba] pb-4">
            <h3 className="text-xl  font-bold text-[#1b1b1b]">
              {lang === "en" ? "Popular Article Now" : "জনপ্রিয় সংবাদ"}
            </h3>

            <span className="text-[12px] border border-[#ff7a59] text-[#ff7a59] px-2 py-1 rounded-full">
              20 Now
            </span>
          </div>

          {/* LIST */}
          <div className="divide-y divide-[#cfc7ba] mt-3">
            {breaking?.slice(0, 5).map((item, index) => (
              <Link key={item?._id} href={`/news/${item?._id}`}>
                <div className="flex py-2 group">
                  {/* NUMBER */}
                  <div className="min-w-[45px]">
                    <span className="text-xl leading-none italic font-bold text-[#1b1b1b] ">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* CONTENT */}
                  <div className="flex-1">
                    <h4 className="text-base leading-[1.3] font-semibold text-[#222] group-hover:opacity-70 transition line-clamp-2">
                      {getTranslatedValue(item?.title, lang)}
                    </h4>

                    <div className="flex items-center gap-3 mt-1 text-[12px] text-gray-500">
                      <span>20 Dec 2024</span>

                      <span>,</span>

                      <span>John Statman</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
