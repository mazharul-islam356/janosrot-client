"use client";

import { useLanguage } from "@/context/lagnguageContext";
import { getTranslatedValue } from "@/hooks/getTranslatedValue";
import { formatDateRelative } from "@/lib/formatDateRelative";
import { getNewsByCategory } from "@/service/newsApi";
import { History } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function International() {
  const [politics, setPolitics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { lang } = useLanguage();

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getNewsByCategory("international", "en");
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
      en: "International",
      bn: "আন্তর্জাতিক",
    },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-0 py-6 sm:py-10 overflow-hidden">
      {/* Title */}
      <h2 className="text-lg sm:text-xl md:text-3xl text-center font-semibold mb-6 border-y bg-white border-[#cfc7ba] text-gray-600 py-3 flex items-center justify-center gap-3">
        <span className="w-2 h-2 animate-pulse rounded-full bg-[#07626c]"></span>

        {t.title[lang]}

        <span className="w-2 h-2 animate-pulse rounded-full bg-[#07626c]"></span>
      </h2>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 md:gap-6 gap-3">
        {/* LEFT SIDE */}
        <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-2 md:gap-6 gap-3">
          {firstTwo.map((news, i) => (
            <div key={i} className="overflow-hidden bg-white">
              <Link href={`/news/${news?._id || "#"}`}>
                <div className="relative w-full h-32 md:h-56 overflow-hidden md:rounded-t-sm">
                  <Image
                    src={news?.featuredImage?.[0] || "/placeholder.jpg"}
                    fill
                    className="object-cover hover:scale-105 transition duration-300"
                    alt={getTranslatedValue(news?.title, lang)}
                  />
                </div>
              </Link>

              <div className="bg-white md:py-4 pt-2 px-4">
                <Link href={`/news/${news?._id || "#"}`}>
                  <h3 className="text-[16px] md:text-xl font-bold leading-7 md:leading-snug line-clamp-2 hover:text-teal-500 transition bg-white">
                    {getTranslatedValue(news?.title, lang)}
                  </h3>
                </Link>

                <p className="text-gray-600 text-[12px] sm:text-[15px] md:mt-2 line-clamp-3 md:line-clamp-6 leading-6 bg-white">
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
              className="flex gap-3 md:p-3 pl-3 py-3 rounded hover:bg-gray-50 transition bg-white"
            >
              <div className="relative w-28 sm:w-32 lg:w-28 h-20 sm:h-24 lg:h-20 flex-shrink-0 overflow-hidden md:rounded">
                <Image
                  src={news?.featuredImage?.[0] || "/placeholder.jpg"}
                  fill
                  className="object-cover hover:scale-105 transition duration-300"
                  alt={getTranslatedValue(news?.title, lang)}
                />
              </div>

              <div className="flex flex-col justify-between flex-1 bg-white px-4">
                <h4 className="text-[14px] sm:text-[15px] font-semibold leading-5 sm:leading-6 line-clamp-3 hover:text-teal-500 transition bg-white">
                  {getTranslatedValue(news?.title, lang)}
                </h4>

                <p className="text-[11px] sm:text-xs text-gray-500 mt-2 flex items-center gap-1 bg-white">
                  <History size={13} />
                  {formatDateRelative(
                    news?.publishedAt || news?.createdAt,
                    lang,
                  )}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
