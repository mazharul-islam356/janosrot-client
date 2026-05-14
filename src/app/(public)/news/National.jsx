"use client";

import { useLanguage } from "@/context/lagnguageContext";
import { getTranslatedValue } from "@/hooks/getTranslatedValue";
import { getNewsByCategory } from "@/service/newsApi";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const National = () => {
  const [business, setBusiness] = useState([]);
  const [loading, setLoading] = useState(true);
  const { lang } = useLanguage();

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        const data = await getNewsByCategory("national", "en");

        setBusiness(data?.data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [lang]);

  const title = {
    title: {
      en: "National",
      bn: "জাতীয় ",
    },
  };

  // SKELETON
  if (loading) {
    return (
      <section className="bg-[#f5f5f3] py-8 lg:py-12 animate-pulse">
        <div className="max-w-7xl mx-auto px-4">
          {/* TOP */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 border-b border-gray-300 pb-10">
            {[1, 2].map((item) => (
              <div key={item}>
                <div className="w-full h-[250px] md:h-[340px] bg-gray-300 rounded"></div>

                <div className="mt-5 space-y-4">
                  <div className="h-10 bg-gray-300 rounded w-full"></div>
                  <div className="h-10 bg-gray-300 rounded w-4/5"></div>

                  <div className="h-4 bg-gray-300 rounded w-1/3"></div>

                  <div className="space-y-2 pt-2">
                    <div className="h-4 bg-gray-300 rounded w-full"></div>
                    <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                    <div className="h-4 bg-gray-300 rounded w-4/6"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* BOTTOM */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pt-10">
            {[1, 2, 3, 4].map((item) => (
              <div key={item}>
                <div className="w-full h-[180px] bg-gray-300 rounded"></div>

                <div className="pt-4 space-y-3">
                  <div className="h-6 bg-gray-300 rounded w-full"></div>
                  <div className="h-6 bg-gray-300 rounded w-5/6"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2 mt-3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const heroLeft = business[0];
  const heroRight = business[1];
  const bottomNews = business.slice(2, 6);

  return (
    <section className="py-6 md:py-8 lg:pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-0">
        {/* TITLE */}
        <h2 className="text-lg sm:text-xl md:text-3xl text-center font-semibold mb-6 border-y border-[#cfc7ba] bg-white text-gray-600 py-3 flex items-center justify-center gap-3">
          <span className="w-2 h-2 animate-pulse rounded-full bg-[#07626c]"></span>

          {title.title[lang]}

          <span className="w-2 h-2 animate-pulse rounded-full bg-[#07626c]"></span>
        </h2>

        {/* TOP SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 md:pb-5 ">
          {/* LEFT */}
          <div>
            <Link href={`/news/${heroLeft?._id}`}>
              <div className="overflow-hidden rounded">
                <Image
                  src={heroLeft?.featuredImage?.[0] || "/placeholder.jpg"}
                  alt={getTranslatedValue(heroLeft?.title, lang)}
                  width={900}
                  height={500}
                  className="w-full h-[220px] sm:h-[260px] md:h-[340px] object-cover hover:scale-105 duration-500"
                />
              </div>

              <div className="mt-4 md:mt-5">
                <h2 className="text-[22px] sm:text-[26px] md:text-3xl leading-[32px] md:leading-[48px] text-ellipsis line-clamp-2 text-[#001848]">
                  <span className="text-red-700">
                    {lang === "bn" ? "ইন্টারেক্টিভ" : "Interactive"}
                  </span>{" "}
                  / {getTranslatedValue(heroLeft?.title, lang)}
                </h2>

                <div className="mt-3 text-[11px] sm:text-[12px] md:text-[13px] uppercase text-gray-700 tracking-wide">
                  {new Date(heroLeft?.createdAt).toDateString()} •{" "}
                  {getTranslatedValue(heroLeft?.category, lang)}
                </div>

                <p className="mt-3 md:mt-4 text-[15px] sm:text-[16px] md:text-[18px] leading-7 md:leading-8 text-gray-700 line-clamp-4">
                  {getTranslatedValue(heroLeft?.content, lang)?.slice(0, 160)}
                  ...
                </p>
              </div>
            </Link>
          </div>

          {/* RIGHT */}
          <div>
            <Link href={`/news/${heroRight?._id}`}>
              <div className="overflow-hidden rounded">
                <Image
                  src={heroRight?.featuredImage?.[0] || "/placeholder.jpg"}
                  alt={getTranslatedValue(heroRight?.title, lang)}
                  width={900}
                  height={500}
                  className="w-full h-[220px] sm:h-[260px] md:h-[340px] object-cover hover:scale-105 duration-500"
                />
              </div>

              <div className="mt-4 md:mt-5">
                <h2 className="text-[22px] sm:text-[26px] md:text-3xl leading-[32px] md:leading-[48px] text-[#001848] line-clamp-2">
                  {getTranslatedValue(heroRight?.title, lang)}
                </h2>

                <div className="mt-3 text-[11px] sm:text-[12px] md:text-[13px] uppercase text-gray-700 tracking-wide">
                  {new Date(heroRight?.createdAt).toDateString()} •{" "}
                  {getTranslatedValue(heroRight?.category, lang)}
                </div>

                <p className="mt-3 md:mt-4 text-[15px] sm:text-[16px] md:text-[18px] leading-7 md:leading-8 text-gray-700 line-clamp-4">
                  {getTranslatedValue(heroRight?.content, lang)?.slice(0, 150)}
                  ...
                </p>
              </div>
            </Link>
          </div>
        </div>

        {/* BOTTOM NEWS GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 pt-8 md:pt-10">
          {bottomNews.map((news, index) => (
            <Link key={news?._id} href={`/news/${news?._id}`}>
              <article className="group">
                <div className="overflow-hidden rounded">
                  <Image
                    src={news?.featuredImage?.[0] || "/placeholder.jpg"}
                    alt={getTranslatedValue(news?.title, lang)}
                    width={500}
                    height={300}
                    className="w-full h-44 sm:h-50 lg:h-45 object-cover group-hover:scale-105 duration-500"
                  />
                </div>

                <div className="pt-4">
                  <h3 className="text-[17px] md:text-[22px] leading-7 md:leading-8 text-[#001848] line-clamp-2">
                    <span className="text-teal-700">
                      {index === 1
                        ? lang === "bn"
                          ? "ভিডিও"
                          : "Watch"
                        : index === 2
                          ? lang === "bn"
                            ? "তদন্ত"
                            : "Investigation"
                          : ""}
                    </span>

                    {index === 1 || index === 2 ? " / " : ""}

                    {getTranslatedValue(news?.title, lang)}
                  </h3>

                  <div className="mt-2 md:mt-4 text-[11px]  md:text-[13px] uppercase text-gray-700 tracking-wide">
                    {new Date(news?.createdAt).toDateString()} •{" "}
                    {getTranslatedValue(news?.category, lang)}
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default National;
