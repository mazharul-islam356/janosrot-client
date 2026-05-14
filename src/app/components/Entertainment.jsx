"use client";

import { getNewsByCategory } from "@/service/newsApi";
import { getTranslatedValue } from "@/hooks/getTranslatedValue";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useLanguage } from "@/context/lagnguageContext";
import Link from "next/link";

export default function Entertainment() {
  const [entertainment, setEntertainment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { lang } = useLanguage();

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getNewsByCategory("entertainment", "en");
        setEntertainment(data);
      } catch (error) {
        console.error(error);
        setError("Failed to load entertainment news");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const newsData = entertainment?.data || [];

  const mainNews = newsData[0];
  const sideNews = newsData.slice(1, 3);
  const listNews = newsData.slice(3, 13);
  const bottomNews = newsData.slice(13, 17);

  // ---------------- LOADING ----------------
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-3 md:px-4 py-6 md:py-8 animate-pulse">
        <div className="h-10 bg-gray-300 w-full mb-5"></div>

        <div className="grid lg:grid-cols-12 gap-4">
          <div className="lg:col-span-8 h-[320px] md:h-[420px] bg-gray-300 rounded"></div>

          <div className="lg:col-span-4 h-[320px] md:h-[420px] bg-gray-300 rounded"></div>
        </div>
      </div>
    );
  }

  // ---------------- ERROR ----------------
  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10 text-red-500">{error}</div>
    );
  }

  const t = {
    title: {
      en: "Entertainment",
      bn: "বিনোদন",
    },
    popular: {
      en: "Most Read",
      bn: "সর্বাধিক পঠিত",
    },
  };

  return (
    <div className="bg-[#f3f3f3]">
      <div className="max-w-7xl mx-auto px-3 md:px-4 py-4 md:py-6">
        {/* TOP TITLE BAR */}
        <div className="grid grid-cols-1 md:grid-cols-3 border-y border-[#d9d9d9] bg-white overflow-hidden mb-4">
          {/* Title Section */}
          <div className="md:col-span-2 border-b md:border-b-0 md:border-r border-[#d9d9d9]">
            <h2 className="text-lg sm:text-xl md:text-3xl font-semibold text-gray-700 py-3 md:py-4 px-4 flex items-center justify-center gap-3 text-center">
              <span className="w-2 h-2 rounded-full animate-pulse bg-[#07626c]"></span>

              {t.title[lang]}

              <span className="w-2 h-2 rounded-full animate-pulse bg-[#07626c]"></span>
            </h2>
          </div>

          {/* Popular Section */}
          <div className="items-center justify-center py-3 md:py-4 px-4 hidden md:flex bg-[#fafafa]">
            <span className="text-[#07626c] text-base md:text-lg font-semibold tracking-wide uppercase">
              {t.popular[lang]}
            </span>
          </div>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 md:gap-4">
          {/* LEFT CONTENT */}
          <div className="lg:col-span-8">
            {/* TOP NEWS AREA */}
            <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4 gap-3">
              {/* MAIN BIG NEWS */}
              <div className="md:col-span-3 bg-white p-3 md:p-4">
                {mainNews && (
                  <Link href={`/news/${mainNews?._id || "#"}`}>
                    <div className="flex flex-col">
                      {/* TOP CONTENT */}
                      <div className="flex flex-col md:flex-row-reverse gap-4">
                        {/* IMAGE */}
                        <div className="relative w-full md:w-2/5 h-[220px] sm:h-[260px] md:h-[240px] overflow-hidden shrink-0 rounded">
                          <Image
                            src={
                              mainNews?.featuredImage?.[0] || "/placeholder.jpg"
                            }
                            fill
                            className="object-cover hover:scale-105 transition duration-300"
                            alt={getTranslatedValue(mainNews?.title, lang)}
                          />
                        </div>

                        {/* TITLE */}
                        <div className="flex-1">
                          <h2 className="text-xl sm:text-2xl md:text-[36px] leading-snug md:leading-tight font-semibold line-clamp-4 hover:text-red-600 transition">
                            {getTranslatedValue(mainNews?.title, lang)}
                          </h2>
                        </div>
                      </div>

                      {/* CONTENT */}
                      <div className="mt-4">
                        <p className="text-gray-600 text-sm sm:text-base leading-7 line-clamp-5 md:line-clamp-8">
                          {getTranslatedValue(mainNews?.content, lang)}
                        </p>
                      </div>
                    </div>
                  </Link>
                )}
              </div>

              {/* SIDE SMALL NEWS */}

              <div className="grid grid-cols-2 md:grid-cols-1 gap-3 md:gap-5 col-span-1">
                {sideNews.map((news, i) => (
                  <Link
                    href={`/news/${news?._id || "#"}`}
                    key={i}
                    className="block bg-white p-2 md:p-3"
                  >
                    <div className="relative w-full h-28 sm:h-36 md:h-32 overflow-hidden rounded">
                      <Image
                        src={news?.featuredImage?.[0] || "/placeholder.jpg"}
                        fill
                        className="object-cover hover:scale-105 transition duration-300"
                        alt={getTranslatedValue(news?.title, lang)}
                      />
                    </div>

                    <h3 className="text-sm sm:text-base md:text-lg leading-5 md:leading-7 mt-2 md:mt-3 font-medium line-clamp-3 hover:text-red-600 transition">
                      {getTranslatedValue(news?.title, lang)}
                    </h3>
                  </Link>
                ))}
              </div>
            </div>

            {/* BOTTOM GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 mt-5">
              {bottomNews.map((news, i) => (
                <Link
                  href={`/news/${news?._id || "#"}`}
                  key={i}
                  className="bg-white p-3"
                >
                  <div className="relative w-full h-44 sm:h-40 md:h-40 overflow-hidden rounded">
                    <Image
                      src={news?.featuredImage?.[0] || "/placeholder.jpg"}
                      fill
                      className="object-cover hover:scale-105 transition duration-300"
                      alt={getTranslatedValue(news?.title, lang)}
                    />
                  </div>

                  <h4 className="text-sm md:text-lg leading-6 mt-3 font-medium line-clamp-3 hover:text-red-600 transition">
                    {getTranslatedValue(news?.title, lang)}
                  </h4>
                </Link>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE LIST */}
          <div className="lg:col-span-4 bg-white p-4 max-h-[500px] lg:max-h-[730px] overflow-y-auto">
            {/* Mobile Title */}
            <div className="md:hidden mb-4 border-b pb-2">
              <h3 className="text-lg font-semibold text-[#07626c]">
                {t.popular[lang]}
              </h3>
            </div>

            <div className="space-y-4">
              {listNews.map((news, i) => (
                <Link
                  href={`/news/${news?._id || "#"}`}
                  key={i}
                  className="flex gap-3 border-b border-[#ececec] pb-3 group"
                >
                  <span className="text-[#e61e25] mt-[2px] text-sm shrink-0">
                    ☞
                  </span>

                  <h3 className="text-sm sm:text-base leading-7 line-clamp-2 group-hover:text-[#e61e25] transition">
                    {getTranslatedValue(news?.title, lang)}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
