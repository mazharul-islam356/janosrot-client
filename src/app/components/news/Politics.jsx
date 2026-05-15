"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { getNewsByCategory } from "@/service/newsApi";
import { getTranslatedValue } from "@/hooks/getTranslatedValue";
import { useLanguage } from "@/context/lagnguageContext";
import Link from "next/link";
import { History } from "lucide-react";
import { formatDateRelative } from "@/lib/formatDateRelative";

export default function Politics() {
  const [world, setWorld] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { lang } = useLanguage();

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getNewsByCategory("politics", "en");
        setWorld(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load world news");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const newsData = world?.data || [];

  const leftNews = newsData.slice(0, 3);
  const featured = newsData[3];
  const rightNews = newsData.slice(4, 7);

  // ---------------- LOADING ----------------
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10 animate-pulse">
        <div className="h-6 w-32 bg-gray-300 mb-6 rounded"></div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left */}
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 bg-gray-300 rounded"></div>
            ))}
          </div>

          {/* Center */}
          <div className="h-64 bg-gray-300 rounded"></div>

          {/* Right */}
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 bg-gray-300 rounded"></div>
            ))}
          </div>
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
      en: "Politics",
      bn: "রাজনীতি",
    },
  };

  return (
    <div className="pt-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4">
        {/* TITLE */}
        <h2 className="text-xl md:text-3xl text-center font-semibold mb-6 border-y bg-white border-[#cfc7ba] text-gray-600 py-3 flex items-center justify-center gap-3">
          <span className="w-2 h-2 animate-pulse rounded-full bg-[#07626c]"></span>

          {t.title[lang]}

          <span className="w-2 h-2 animate-pulse rounded-full bg-[#07626c]"></span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 md:gap-6 gap-4">
          {/* LEFT */}
          <div className="space-y-4 hidden md:block sm:space-y-5">
            {leftNews.map((news, i) => (
              <div
                key={i}
                className="flex gap-3 sm:gap-4 border-b p-3 rounded bg-white"
              >
                <div className="flex-1">
                  <Link href={`/news/${news?._id || "#"}`}>
                    <h3 className="text-sm sm:text-base font-medium leading-snug line-clamp-2">
                      {getTranslatedValue(news?.title, lang)}
                    </h3>
                  </Link>

                  <p className="text-[11px] sm:text-xs flex items-center gap-1 text-gray-500 mt-2">
                    <History size={13} />
                    {formatDateRelative(
                      news?.publishedAt || news?.createdAt,
                      lang,
                    )}
                  </p>
                </div>

                <Link href={`/news/${news?._id || "#"}`}>
                  <Image
                    src={news?.featuredImage?.[0] || "/placeholder.jpg"}
                    width={120}
                    height={80}
                    alt={getTranslatedValue(news?.title, lang)}
                    className="object-cover w-[90px] sm:w-[120px] h-[60px] sm:h-[80px]"
                  />
                </Link>
              </div>
            ))}
          </div>

          {/* CENTER FEATURED */}
          <div className="lg:border-l lg:border-r lg:border-gray-300 lg:px-4">
            {featured && (
              <div className="bg-white">
                <Link href={`/news/${featured?._id || "#"}`}>
                  <div className="relative w-full h-52 sm:h-64 md:h-72">
                    <Image
                      src={featured?.featuredImage?.[0] || "/placeholder.jpg"}
                      fill
                      alt={getTranslatedValue(featured?.title, lang)}
                      className="object-cover"
                    />
                  </div>

                  <div className="p-4">
                    <h2 className="text-lg sm:text-xl font-semibold mt-2 leading-snug line-clamp-2">
                      {getTranslatedValue(featured?.title, lang)}
                    </h2>

                    <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                      {getTranslatedValue(featured?.content, lang)}
                    </p>

                    <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                      <History size={13} />
                      {formatDateRelative(
                        featured?.publishedAt || featured?.createdAt,
                        lang,
                      )}
                    </p>
                  </div>
                </Link>
              </div>
            )}
          </div>

          {/* RIGHT */}
          <div className="md:space-y-4 space-y-3">
            {rightNews.map((news, i) => (
              <div
                key={i}
                className="flex flex-row-reverse gap-3 sm:gap-4 border-b p-3 rounded bg-white"
              >
                <div className="flex-1">
                  <Link href={`/news/${news?._id || "#"}`}>
                    <h3 className="text-sm sm:text-base font-medium leading-snug line-clamp-2">
                      {getTranslatedValue(news?.title, lang)}
                    </h3>
                  </Link>

                  <p className="text-[11px] flex items-center gap-1 sm:text-xs text-gray-500 mt-2">
                    <History size={13} />
                    {formatDateRelative(
                      news?.publishedAt || news?.createdAt,
                      lang,
                    )}
                  </p>
                </div>

                <Link href={`/news/${news?._id || "#"}`}>
                  <Image
                    src={news?.featuredImage?.[0] || "/placeholder.jpg"}
                    width={120}
                    height={80}
                    alt={getTranslatedValue(news?.title, lang)}
                    className="object-cover w-[90px] sm:w-[120px] h-[60px] sm:h-[80px]"
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
