"use client";

import { useLanguage } from "@/context/lagnguageContext";
import { getTranslatedValue } from "@/hooks/getTranslatedValue";
import { getNewsByCategory } from "@/service/newsApi";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function PoliticsPage() {
  const [politics, setPolitics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { lang } = useLanguage();

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getNewsByCategory("politics", "en");
        setPolitics(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load news");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const newsData = politics?.data || [];
  const firstTwo = newsData.slice(0, 2);
  const lastFour = newsData.slice(2, 6);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10 animate-pulse">
        <div className="h-6 w-40 bg-gray-300 mb-6"></div>

        <div className="grid grid-cols-1 lg:grid-cols-3 border border-[#d6d6d6]">
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 border-r border-[#d6d6d6]">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="p-4 border-b sm:border-b-0 sm:border-r border-[#d6d6d6]"
              >
                <div className="h-52 bg-gray-300"></div>
                <div className="h-4 bg-gray-300 mt-3 w-3/4"></div>
                <div className="h-3 bg-gray-300 mt-2 w-full"></div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="p-3 border border-[#d6d6d6]">
                <div className="h-28 bg-gray-300"></div>
                <div className="h-3 bg-gray-300 mt-2 w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10 text-red-500">{error}</div>
    );
  }

  const t = {
    title: {
      en: "Politics",
      bn: "রাজনীতি",
    },
  };

  return (
    <div className="max-w-7xl mx-auto  py-6 sm:py-10">
      {/* Title */}
      <h2 className="text-xl md:text-3xl text-center font-semibold mb-6 border-y bg-white border-[#cfc7ba]  text-gray-600 py-3 flex items-center justify-center gap-3">
        <span className="w-2 h-2 animate-pulse rounded-full bg-gray-500"></span>

        {t.title[lang]}

        <span className="w-2 h-2 animate-pulse rounded-full bg-gray-500"></span>
      </h2>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT SIDE */}
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {firstTwo.map((news, i) => (
            <div key={i} className="overflow-hidden">
              <Link href={`/news/${news?._id || "#"}`}>
                <div className="relative w-full h-56 overflow-hidden">
                  <Image
                    src={news?.featuredImage?.[0] || "/placeholder.jpg"}
                    fill
                    className="object-cover hover:scale-105 transition duration-300"
                    alt={getTranslatedValue(news?.title, lang)}
                  />
                </div>
              </Link>

              <div className="py-4">
                <Link href={`/news/${news?._id || "#"}`}>
                  <h3 className="text-lg md:text-xl font-bold leading-snug line-clamp-2 hover:text-red-500 transition">
                    {getTranslatedValue(news?.title, lang)}
                  </h3>
                </Link>

                <p className="text-gray-600 text-sm mt-1 line-clamp-6 leading-6">
                  {getTranslatedValue(news?.content, lang)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT SIDE */}
        <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
          {lastFour.map((news, i) => (
            <Link
              href={`/news/${news?._id || "#"}`}
              key={i}
              className=" flex gap-3 p-3 hover:bg-gray-50 transition"
            >
              <div className="relative w-28 h-20 flex-shrink-0 overflow-hidden">
                <Image
                  src={news?.featuredImage?.[0] || "/placeholder.jpg"}
                  fill
                  className="object-cover hover:scale-105 transition duration-300"
                  alt={getTranslatedValue(news?.title, lang)}
                />
              </div>

              <div className="flex flex-col justify-between">
                <h4 className="text-sm font-semibold leading-5 line-clamp-3 hover:text-red-500 transition">
                  {getTranslatedValue(news?.title, lang)}
                </h4>

                <p className="text-xs text-gray-500 mt-2">১৩ মিনিট আগে</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
