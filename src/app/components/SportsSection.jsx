"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { useLanguage } from "@/context/lagnguageContext";
import { getTranslatedValue } from "@/hooks/getTranslatedValue";
import { getNewsByCategory } from "@/service/newsApi";

export default function SportsSection() {
  const { lang } = useLanguage();

  const [sports, setSports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSports = async () => {
      try {
        setLoading(true);

        const data = await getNewsByCategory("sports", "en");
        setSports(data?.data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadSports();
  }, []);

  const featuredNews = sports[0];
  const sideNews = sports.slice(1, 5);
  const bottomNews = sports.slice(5, 9);

  const t = {
    title: {
      en: "Sports",
      bn: "খেলাধুলা",
    },
  };

  // ---------------- LOADING ----------------
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 animate-pulse">
        <div className="h-10 w-44 bg-gray-300 mb-6"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <div className="lg:col-span-7 h-[450px] bg-gray-300"></div>

          <div className="lg:col-span-5 grid grid-cols-2 gap-5">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-[210px] bg-gray-300"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f5f5f5] pb-6 pt-2 md:py-6 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-0">
        {/* SECTION TITLE */}
        <div>
          <h2 className="text-lg sm:text-xl md:text-3xl text-center font-semibold mb-6 border-y border-[#cfc7ba] bg-white text-gray-600 py-3 flex items-center justify-center gap-3">
            <span className="w-2 h-2 rounded-full animate-pulse bg-[#07626c]"></span>

            {t.title[lang]}

            <span className="w-2 h-2 rounded-full animate-pulse bg-[#07626c]"></span>
          </h2>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* FEATURED LEFT */}
          <div className="lg:col-span-7">
            {featuredNews && (
              <Link
                href={`/news/${featuredNews?._id || "#"}`}
                className="block bg-white border border-[#e3e3e3] overflow-hidden group rounded"
              >
                <div className="relative w-full h-[240px] sm:h-[320px] md:h-[450px] overflow-hidden">
                  <Image
                    src={featuredNews?.featuredImage?.[0] || "/placeholder.jpg"}
                    fill
                    alt={getTranslatedValue(featuredNews?.title, lang)}
                    className="object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>

                <div className="p-4 sm:p-5">
                  <h3 className="text-[24px] sm:text-[30px] md:text-4xl leading-tight font-bold line-clamp-2 group-hover:text-[#23727b] transition">
                    {getTranslatedValue(featuredNews?.title, lang)}
                  </h3>

                  <p className="text-gray-600 text-[14px] sm:text-[15px] md:text-base leading-6 sm:leading-7 mt-3 sm:mt-4 md:line-clamp-5 line-clamp-3">
                    {getTranslatedValue(featuredNews?.content, lang)}
                  </p>
                </div>
              </Link>
            )}
          </div>

          {/* RIGHT GRID */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {sideNews.map((news, i) => (
              <Link
                href={`/news/${news?._id || "#"}`}
                key={i}
                className="bg-white border border-[#e3e3e3] overflow-hidden group rounded"
              >
                <div className="relative w-full h-[220px] sm:h-44 overflow-hidden">
                  <Image
                    src={news?.featuredImage?.[0] || "/placeholder.jpg"}
                    fill
                    alt={getTranslatedValue(news?.title, lang)}
                    className="object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>

                <div className="p-4">
                  <h4 className="text-[18px] sm:text-lg leading-7 font-semibold line-clamp-2 group-hover:text-[#23727b] transition">
                    {getTranslatedValue(news?.title, lang)}
                  </h4>

                  <p className="text-gray-600 leading-6 sm:leading-7 text-[13px] sm:text-sm line-clamp-2 mt-2">
                    {getTranslatedValue(news?.content, lang)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* BOTTOM NEWS GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 md:gap-5 gap-3 md:mt-5 mt-3">
          {bottomNews.map((news, i) => (
            <Link
              href={`/news/${news?._id || "#"}`}
              key={i}
              className="bg-white border border-[#e3e3e3] overflow-hidden group rounded"
            >
              <div className="relative w-full h-32 md:h-48 overflow-hidden">
                <Image
                  src={news?.featuredImage?.[0] || "/placeholder.jpg"}
                  fill
                  alt={getTranslatedValue(news?.title, lang)}
                  className="object-cover group-hover:scale-105 transition duration-500"
                />
              </div>

              <div className="md:p-4 px-2 py-2">
                <h4 className="text-[14px] md:text-lg md:leading-7 font-medium line-clamp-2 group-hover:text-[#23727b] transition">
                  {getTranslatedValue(news?.title, lang)}
                </h4>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
