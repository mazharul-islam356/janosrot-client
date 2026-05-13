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

        const data = await getNewsByCategory("world", "en");
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
    <div className="bg-[#f5f5f5] py-8">
      <div className="max-w-7xl mx-auto">
        {/* SECTION TITLE */}
        <div>
          <h2 className="text-xl md:text-3xl text-center font-semibold mb-6 border-y border-[#cfc7ba] bg-white text-gray-600 py-3 flex items-center justify-center gap-3">
            <span className="w-2 h-2 rounded-full animate-pulse bg-gray-500"></span>

            {t.title[lang]}

            <span className="w-2 h-2 rounded-full animate-pulse bg-gray-500"></span>
          </h2>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* FEATURED LEFT */}
          <div className="lg:col-span-7">
            {featuredNews && (
              <Link
                href={`/news/${featuredNews?._id || "#"}`}
                className="block bg-white border border-[#e3e3e3] overflow-hidden group"
              >
                <div className="relative w-full h-[260px] md:h-[450px] overflow-hidden">
                  <Image
                    src={featuredNews?.featuredImage?.[0] || "/placeholder.jpg"}
                    fill
                    alt={getTranslatedValue(featuredNews?.title, lang)}
                    className="object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>

                <div className="p-5">
                  <h3 className="text-2xl md:text-4xl leading-tight font-bold line-clamp-2 group-hover:text-[#23727b] transition">
                    {getTranslatedValue(featuredNews?.title, lang)}
                  </h3>

                  <p className="text-gray-600 text-base leading-7 mt-4 line-clamp-3">
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
                className="bg-white border border-[#e3e3e3] overflow-hidden group"
              >
                <div className="relative w-full h-44 overflow-hidden">
                  <Image
                    src={news?.featuredImage?.[0] || "/placeholder.jpg"}
                    fill
                    alt={getTranslatedValue(news?.title, lang)}
                    className="object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>

                <div className="p-4">
                  <h4 className="text-lg leading-7 font-semibold line-clamp-2 group-hover:text-[#23727b] transition">
                    {getTranslatedValue(news?.title, lang)}
                  </h4>

                  <p className="text-gray-600 leading-7 text-sm line-clamp-2">
                    {getTranslatedValue(news?.content, lang)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* BOTTOM NEWS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-5">
          {bottomNews.map((news, i) => (
            <Link
              href={`/news/${news?._id || "#"}`}
              key={i}
              className="bg-white border border-[#e3e3e3] overflow-hidden group"
            >
              <div className="relative w-full h-48 overflow-hidden">
                <Image
                  src={news?.featuredImage?.[0] || "/placeholder.jpg"}
                  fill
                  alt={getTranslatedValue(news?.title, lang)}
                  className="object-cover group-hover:scale-105 transition duration-500"
                />
              </div>

              <div className="p-4">
                <h4 className="text-lg leading-7 font-medium line-clamp-2 group-hover:text-[#23727b] transition">
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
