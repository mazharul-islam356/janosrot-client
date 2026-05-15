"use client";

import { getBreakingNews, getFeaturedNews } from "@/service/newsApi";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/lagnguageContext";
import { getTranslatedValue } from "@/hooks/getTranslatedValue";
import { MoveUpRight } from "lucide-react";
import { formatNumber } from "@/context/formatNumber";

// Skeleton Components
const HeroSkeleton = () => {
  return (
    <div className="bg-[#f6f1e8]">
      <section className="max-w-7xl mx-auto px-4 lg:px-0 md:pb-5 pb-3 pt-3">
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.8fr_1fr] md:border border-[#cfc7ba] bg-white">
          {/* LEFT CARD SKELETON */}
          <div className="border-b lg:border-b-0 lg:border-r border-[#cfc7ba] md:p-4 pt-4">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-full mb-3"></div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-4 bg-gray-200 rounded w-12"></div>
                <div className="w-1 h-1 rounded-full bg-gray-200"></div>
                <div className="h-4 bg-gray-200 rounded w-24"></div>
              </div>
              <div className="hidden md:block mb-3">
                <div className="h-16 bg-gray-200 rounded w-full"></div>
              </div>
              <div className="h-[200px] sm:h-[220px] bg-gray-200 rounded w-full mb-4"></div>
              <div className="h-20 bg-gray-200 rounded w-full"></div>
            </div>
          </div>

          {/* CENTER MAIN NEWS SKELETON */}
          <div className="md:border-b lg:border-b-0 lg:border-r border-[#cfc7ba] md:p-4 pt-5">
            <div className="animate-pulse">
              <div className="md:border border-[#cfc7ba] md:p-4 pb-5">
                <div className="h-10 bg-gray-200 rounded w-full mb-4"></div>
                <div className="h-10 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-[1px] bg-gray-200"></div>
                  <div className="h-4 bg-gray-200 rounded w-20"></div>
                  <div className="w-1 h-1 rounded-full bg-gray-200"></div>
                  <div className="h-4 bg-gray-200 rounded w-24"></div>
                </div>
              </div>
              <div className="h-[220px] sm:h-[300px] lg:h-64 bg-gray-200 rounded w-full mb-4"></div>
              <div className="h-24 bg-gray-200 rounded w-full"></div>
            </div>
          </div>

          {/* RIGHT TRENDING SKELETON */}
          <div className="md:p-4 pt-6">
            <div className="animate-pulse">
              <div className="flex items-center justify-between border-b border-[#cfc7ba] pb-4">
                <div className="h-6 bg-gray-200 rounded w-32"></div>
                <div className="h-5 bg-gray-200 rounded w-16"></div>
              </div>
              <div className="space-y-4 mt-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="h-6 bg-gray-200 rounded w-10"></div>
                    <div className="flex-1">
                      <div className="h-5 bg-gray-200 rounded w-full mb-2"></div>
                      <div className="flex gap-2">
                        <div className="h-3 bg-gray-200 rounded w-16"></div>
                        <div className="h-3 bg-gray-200 rounded w-20"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Format date helper
const formatDate = (dateString, lang) => {
  const date = new Date(dateString);
  return date.toLocaleDateString(lang === "bn" ? "bn-BD" : "en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

export default function HeroSection() {
  const [breaking, setBreaking] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const { lang } = useLanguage();

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      try {
        const [breakingData, featuredData] = await Promise.all([
          getBreakingNews(),
          getFeaturedNews(),
        ]);
        setBreaking(Array.isArray(breakingData) ? breakingData : []);
        setFeatured(Array.isArray(featuredData) ? featuredData : []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  if (loading) {
    return <HeroSkeleton />;
  }

  const mainNews = featured?.[0];
  const leftNews = featured?.[1];
  const title = {
    title: {
      en: "Now",
      bn: "টি এখন",
    },
  };
  return (
    <div className="bg-[#f6f1e8]">
      <section className="max-w-7xl mx-auto px-4 lg:px-0 md:pb-5 pb-3 pt-3">
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.8fr_1fr] md:border border-[#cfc7ba] bg-white px-4 md:px-0 rounded md:rounded-none">
          {/* LEFT CARD */}
          <div className="border-b lg:border-b-0 lg:border-r border-[#cfc7ba] md:p-4 pt-4">
            {leftNews && (
              <Link href={`/news/${leftNews?._id}`}>
                <div className="group">
                  {/* TITLE */}
                  <h2 className="text-[22px] sm:text-[26px] lg:text-[28px] leading-[1.2] font-bold text-[#1c1c1c] hover:opacity-80 transition">
                    {getTranslatedValue(leftNews?.title, lang)}
                  </h2>

                  {/* META - Dynamic Category & Date */}
                  <div className="flex flex-wrap items-center gap-2 text-[12px] sm:text-[13px] text-gray-600 md:mt-3 mt-1.5 border-b border-[#cfc7ba] md:pb-4 pb-3">
                    <span className="capitalize">
                      {getTranslatedValue(leftNews?.category, lang)}
                    </span>

                    <span className="w-1 h-1 rounded-full bg-teal-500" />

                    <span>
                      {formatDate(
                        leftNews?.publishedAt || leftNews?.createdAt,
                        lang,
                      )}
                    </span>

                    <MoveUpRight size={15} className="ml-auto text-gray-500" />
                  </div>

                  {/* DESCRIPTION */}
                  <div className="hidden md:block">
                    <p className="md:mt-3 text-[15px] leading-6 text-[#444] line-clamp-4 text-ellipsis">
                      {getTranslatedValue(leftNews?.content, lang)}
                    </p>
                  </div>

                  {/* IMAGE */}
                  <div className="mt-3 overflow-hidden rounded">
                    <Image
                      src={leftNews?.featuredImage?.[0]}
                      alt="news"
                      width={800}
                      height={500}
                      className="w-full h-[200px] sm:h-[220px] object-cover group-hover:scale-[1.03] transition duration-500"
                    />
                  </div>

                  {/* FOOT TEXT */}
                  <p className="mt-4 text-[14px] leading-6 sm:leading-7 text-[#444] line-clamp-4 sm:line-clamp-5">
                    {getTranslatedValue(leftNews?.content, lang)}
                  </p>
                </div>
              </Link>
            )}
          </div>

          {/* CENTER MAIN NEWS */}
          <div className="md:border-b lg:border-b-0 lg:border-r border-[#cfc7ba] md:p-4 pt-5">
            {mainNews && (
              <Link href={`/news/${mainNews?._id}`}>
                <div className="group">
                  {/* TOP BOX */}
                  <div className="md:border border-[#cfc7ba] md:p-4 pb-5">
                    <h1 className="text-[28px] sm:text-[34px] lg:text-[40px] leading-[1.15] font-bold text-[#1a1a1a]">
                      {getTranslatedValue(mainNews?.title, lang)}
                    </h1>

                    {/* META - Dynamic Category, Writer & Date */}
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[12px] sm:text-[13px] text-gray-600 md:mt-4 mt-1">
                      <div className="w-8 sm:w-10 h-[1px] bg-black" />

                      <span className="capitalize">
                        {getTranslatedValue(mainNews?.category, lang)}
                      </span>

                      <span className="w-1 h-1 rounded-full bg-teal-600" />

                      <span>{getTranslatedValue(mainNews?.writer, lang)}</span>

                      <span className="w-1 h-1 rounded-full bg-teal-600" />

                      <span>
                        {formatDate(
                          mainNews?.publishedAt || mainNews?.createdAt,
                          lang,
                        )}
                      </span>

                      <MoveUpRight
                        size={16}
                        className="ml-auto text-gray-500"
                      />
                    </div>
                  </div>

                  {/* IMAGE */}
                  <div className="md:mt-4 overflow-hidden md:rounded">
                    <Image
                      src={mainNews?.featuredImage?.[0]}
                      alt="main-news"
                      width={1200}
                      height={800}
                      className="w-full h-[220px] sm:h-[300px] lg:h-64 object-cover group-hover:scale-[1.02] transition duration-500"
                    />
                  </div>

                  {/* DESCRIPTION */}
                  <div className="md:pt-4 pt-2">
                    <p className="text-[14px] sm:text-[15px] line-clamp-7 leading-7 text-[#444]">
                      {getTranslatedValue(mainNews?.content, lang)}
                    </p>
                  </div>
                </div>
              </Link>
            )}
          </div>

          {/* RIGHT TRENDING */}
          <div className="md:p-4 pt-6">
            {/* HEADER */}
            <div className="flex items-center justify-between border-b border-[#cfc7ba] md:pb-4 pb-2 gap-3">
              <h3 className="text-lg sm:text-xl font-bold text-[#1b1b1b] leading-tight">
                {lang === "en" ? "Popular Article" : "জনপ্রিয় সংবাদ"}
              </h3>

              <span className="text-[11px] sm:text-[12px] border border-[#0796a3] text-[#0796a3] px-2 py-1 rounded-full whitespace-nowrap">
                {breaking.length} {title.title[lang]}
              </span>
            </div>

            {/* LIST - Dynamic with Writer & Date */}
            <div className="divide-y divide-[#cfc7ba] mt-3">
              {breaking?.slice(0, 5).map((item, index) => (
                <Link key={item?._id} href={`/news/${item?._id}`}>
                  <div className="flex md:gap-3 gap-0 md:py-4 py-2 group">
                    {/* NUMBER */}
                    <div className="min-w-[38px] sm:min-w-[45px]">
                      <span className="text-lg sm:text-xl leading-none italic font-bold text-[#1b1b1b]">
                        {formatNumber(index + 1, lang)}
                      </span>
                    </div>

                    {/* CONTENT */}
                    <div className="flex-1">
                      <h4 className="text-[14px] md:text-base leading-[1.4] font-semibold text-[#222] group-hover:opacity-70 transition line-clamp-2">
                        {getTranslatedValue(item?.title, lang)}
                      </h4>

                      <div className="flex flex-wrap items-center gap-2 md:mt-2 mt-1 text-[11px] sm:text-[12px] text-gray-500">
                        <span>
                          {formatDate(
                            item?.publishedAt || item?.createdAt,
                            lang,
                          )}
                        </span>
                        <span>,</span>
                        <span>{getTranslatedValue(item?.writer, lang)}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
