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
      <div className="max-w-7xl mx-auto px-4 py-8 animate-pulse">
        <div className="h-10 bg-gray-300 w-full mb-5"></div>

        <div className="grid lg:grid-cols-12 gap-5">
          <div className="lg:col-span-8 h-[420px] bg-gray-300"></div>

          <div className="lg:col-span-4 h-[420px] bg-gray-300"></div>
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
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* TOP TITLE BAR */}
        <div className="grid grid-cols-2 md:grid-cols-3 mb-5 border border-[#d9d9d9] bg-white">
          <div className="bg-[#e61e25] text-white px-4 py-2 text-lg font-semibold">
            {t.title[lang]}
          </div>

          <div className="hidden md:flex items-center justify-center text-gray-500 text-lg font-medium border-l border-r border-[#d9d9d9]">
            অনলাইন
          </div>

          <div className="flex items-center justify-center text-[#e61e25] text-lg font-semibold">
            {t.popular[lang]}
          </div>
        </div>

        {/* MAIN GRID */}
        <div className="grid lg:grid-cols-12 gap-5">
          {/* LEFT CONTENT */}
          <div className="lg:col-span-8">
            {/* TOP NEWS AREA */}
            <div className="grid md:grid-cols-3 gap-5">
              {/* MAIN BIG NEWS */}
              <div className="md:col-span-2 bg-white p-4">
                {mainNews && (
                  <Link href={`/news/${mainNews?._id || "#"}`}>
                    <div className="grid md:grid-cols-2 gap-4 items-center">
                      {/* TITLE */}
                      <div>
                        <h2 className="text-2xl md:text-[42px] leading-tight font-semibold line-clamp-5 hover:text-red-600 transition">
                          {getTranslatedValue(mainNews?.title, lang)}
                        </h2>

                        <p className="text-gray-500 text-sm mt-4 line-clamp-3">
                          {getTranslatedValue(mainNews?.content, lang)}
                        </p>
                      </div>

                      {/* IMAGE */}
                      <div className="relative w-full h-[260px] md:h-[320px] overflow-hidden">
                        <Image
                          src={
                            mainNews?.featuredImage?.[0] || "/placeholder.jpg"
                          }
                          fill
                          className="object-cover hover:scale-105 transition duration-300"
                          alt={getTranslatedValue(mainNews?.title, lang)}
                        />
                      </div>
                    </div>
                  </Link>
                )}
              </div>

              {/* SIDE SMALL NEWS */}
              <div className="space-y-5">
                {sideNews.map((news, i) => (
                  <Link
                    href={`/news/${news?._id || "#"}`}
                    key={i}
                    className="block bg-white p-3"
                  >
                    <div className="relative w-full h-44 overflow-hidden">
                      <Image
                        src={news?.featuredImage?.[0] || "/placeholder.jpg"}
                        fill
                        className="object-cover hover:scale-105 transition duration-300"
                        alt={getTranslatedValue(news?.title, lang)}
                      />
                    </div>

                    <h3 className="text-lg leading-7 mt-3 font-medium line-clamp-3 hover:text-red-600 transition">
                      {getTranslatedValue(news?.title, lang)}
                    </h3>
                  </Link>
                ))}
              </div>
            </div>

            {/* BOTTOM GRID */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-5">
              {bottomNews.map((news, i) => (
                <Link
                  href={`/news/${news?._id || "#"}`}
                  key={i}
                  className="bg-white p-3"
                >
                  <div className="relative w-full h-32 md:h-40 overflow-hidden">
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
          <div className="lg:col-span-4 bg-white p-4 h-[770px] overflow-y-auto">
            <div className="space-y-4">
              {listNews.map((news, i) => (
                <Link
                  href={`/news/${news?._id || "#"}`}
                  key={i}
                  className="flex gap-3 border-b border-[#ececec] pb-3 group"
                >
                  <span className="text-[#e61e25] mt-[2px] text-sm">☞</span>

                  <h3 className="text-base leading-7 line-clamp-2 group-hover:text-[#e61e25] transition">
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
