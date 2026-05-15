"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { useLanguage } from "@/context/lagnguageContext";
import { getTranslatedValue } from "@/hooks/getTranslatedValue";
import { getNewsByCategory } from "@/service/newsApi";

export default function ThreeCategorySection() {
  const { lang } = useLanguage();

  const [campus, setCampus] = useState([]);
  const [tech, setTech] = useState([]);
  const [corporate, setCorporate] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [campusData, techData, corporateData] = await Promise.all([
          getNewsByCategory("religion", "en"),
          getNewsByCategory("technology", "en"),
          getNewsByCategory("education", "en"),
        ]);

        setCampus(campusData?.data || []);
        setTech(techData?.data || []);
        setCorporate(corporateData?.data || []);
      } catch (error) {
        console.error(error);
      }
    };

    loadData();
  }, []);

  const sections = [
    {
      title: {
        en: "Relegion",
        bn: "ধর্ম",
      },
      data: campus,
    },
    {
      title: {
        en: "Tech World",
        bn: "টেক ওয়ার্ল্ড",
      },
      data: tech,
    },
    {
      title: {
        en: "Education",
        bn: "শিক্ষা",
      },
      data: corporate,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 py-6 md:py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 md:gap-6">
        {sections.map((section, idx) => {
          const mainNews = section?.data?.[0];
          const sideNews = section?.data?.slice(1, 4);

          return (
            <div key={idx}>
              {/* TOP BAR */}
              <div className="flex items-center justify-between bg-[#ffffff] border border-[#dcdcdc] mb-2">
                <h2 className="text-[#23727b] text-base sm:text-lg md:text-xl font-medium px-3 md:px-4 py-2">
                  {section.title[lang]}
                </h2>

                <button className="bg-[#23727b] text-white px-3 sm:px-4 md:px-5 py-2 text-xs sm:text-sm">
                  আরো
                </button>
              </div>

              {/* MAIN CARD */}
              {mainNews && (
                <Link
                  href={`/news/${mainNews?._id || "#"}`}
                  className="block bg-[#ffffff] border border-[#e3e3e3] p-2 sm:p-3"
                >
                  <div className="relative w-full h-[220px] sm:h-[260px] md:h-[280px] overflow-hidden">
                    <Image
                      src={mainNews?.featuredImage?.[0] || "/placeholder.jpg"}
                      fill
                      alt={getTranslatedValue(mainNews?.title, lang)}
                      className="object-cover hover:scale-105 transition duration-300"
                    />
                  </div>

                  <h3 className="text-lg sm:text-xl md:text-2xl leading-7 sm:leading-8 md:leading-10 mt-3 md:mt-4 line-clamp-2 hover:text-[#23727b] transition">
                    {getTranslatedValue(mainNews?.title, lang)}
                  </h3>
                </Link>
              )}

              {/* SMALL LIST */}
              <div className="space-y-2 mt-2">
                {sideNews.map((news, i) => (
                  <Link
                    href={`/news/${news?._id || "#"}`}
                    key={i}
                    className="flex items-start gap-2 sm:gap-3 bg-[#ffffff] border border-[#e3e3e3] px-2 sm:px-3 py-3 sm:py-4 hover:bg-[#ececec] transition"
                  >
                    <span className="w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[8px] border-l-[#ff2d2d] mt-[5px] shrink-0"></span>

                    <h4 className="text-sm sm:text-base md:text-lg leading-6 sm:leading-7 md:leading-8 line-clamp-2 sm:line-clamp-1 hover:text-[#23727b] transition">
                      {getTranslatedValue(news?.title, lang)}
                    </h4>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
