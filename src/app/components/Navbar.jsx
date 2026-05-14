"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Globe, Menu, Search, User, PenLine, X } from "lucide-react";
import { useLanguage } from "@/context/lagnguageContext";
import { getTranslatedValue } from "@/hooks/getTranslatedValue";

export default function NewsNavbar() {
  const { lang, toggleLanguage } = useLanguage();

  const [isOpen, setIsOpen] = useState(false);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const categories = [
    { name: { bn: "সংবাদ", en: "News" }, slug: "news" },
    { name: { bn: "বিশ্ব", en: "World" }, slug: "world" },
    { name: { bn: "ব্যবসা", en: "Business" }, slug: "business" },
    { name: { bn: "শিল্প", en: "Art" }, slug: "art" },
    { name: { bn: "লাইফস্টাইল", en: "Lifestyle" }, slug: "lifestyle" },
    { name: { bn: "খেলা", en: "Sport" }, slug: "sport" },
    { name: { bn: "মতামত", en: "Opinion" }, slug: "opinion" },
    { name: { bn: "সংস্কৃতি", en: "Culture" }, slug: "culture" },
    { name: { bn: "রাজনীতি", en: "Politics" }, slug: "politics" },
  ];

  const formattedDate = time.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const formattedTime = time.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <header className="w-full border-b border-[#cfc7ba] bg-[#f6f1e8]">
      <div className="max-w-7xl mx-auto">
        {/* TOP BAR */}
        <div className="hidden lg:grid grid-cols-3 items-center border-b border-[#cfc7ba] min-h-22">
          {/* LEFT */}
          <div className="flex items-center gap-4 border-r border-[#cfc7ba] h-full px-6">
            <div className="flex flex-col leading-none">
              <span className="text-[15px] font-medium text-black">
                {formattedDate}
              </span>

              <span className="text-[12px] text-gray-500 mt-2">
                {formattedTime}
              </span>
            </div>
          </div>

          {/* CENTER */}
          <div className="flex items-center justify-center h-full">
            <Link href="/">
              <Image
                src="/janosrot.png"
                width={400}
                height={400}
                alt="logo"
                className="object-cover w-32"
              />
            </Link>
          </div>

          {/* RIGHT */}
          <div className="flex items-center justify-end gap-4 border-l border-[#cfc7ba] h-full px-6">
            <button
              onClick={toggleLanguage}
              className="flex cursor-pointer items-center gap-2 text-sm font-medium hover:opacity-70 transition"
            >
              <Image
                src={lang === "en" ? "/flag.png" : "/united-kingdom.png"}
                width={500}
                height={500}
                alt={lang === "en" ? "Bangladesh Flag" : "UK Flag"}
                className="w-6 h-6 rounded-full border border-gray-300 object-cover"
              />

              {lang === "en" ? "বাংলা" : "English"}
            </button>
          </div>
        </div>

        {/* MOBILE HEADER */}
        <div className="lg:hidden flex items-center justify-between px-4 py-4 border-b border-[#cfc7ba]">
          <button onClick={() => setIsOpen(true)}>
            <Menu size={26} />
          </button>

          <Link href="/">
            <h1 className="text-[22px] font-black tracking-tight uppercase">
              NEWS PORTAL
            </h1>
          </Link>

          <button onClick={toggleLanguage} className="text-sm font-semibold">
            {lang === "en" ? "বাং" : "EN"}
          </button>
        </div>

        {/* CATEGORY NAV */}
        <nav className="md:flex sticky hidden top-1 items-center justify-between border-b border-[#cfc7ba]">
          {/* LEFT */}
          <div className="flex items-center">
            {/* CATEGORY BUTTON */}
            <button className="hidden lg:flex items-center gap-3 px-8 py-5 border-r border-[#cfc7ba] hover:bg-[#ebe3d6] transition">
              <span className="text-[15px] font-medium">
                {lang === "en" ? "Newspaper" : "পত্রিকা"}
              </span>
            </button>

            {/* MENU */}
            <button
              onClick={() => setIsOpen(true)}
              className="px-5 py-5 border-r border-[#cfc7ba] hover:bg-[#ebe3d6] transition"
            >
              <Menu size={22} strokeWidth={1.8} />
            </button>

            {/* LINKS */}
            <div className="hidden lg:flex items-center">
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/category/${category.slug}`}
                  className="px-6 py-5 text-[15px] font-medium text-[#222] hover:bg-[#ebe3d6] transition"
                >
                  {getTranslatedValue(category.name, lang)}
                </Link>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <button className="px-5 py-5 border-l border-[#cfc7ba] hover:bg-[#ebe3d6] transition">
            <Search size={20} strokeWidth={1.8} />
          </button>
        </nav>
      </div>

      {/* OVERLAY */}
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 bg-black/40 z-40 transition-all duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* SIDEBAR */}
      <div
        className={`fixed top-0 left-0 h-full w-[320px] bg-white z-50 transition-all duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between px-5 py-5 border-b">
          <h2 className="text-2xl font-black uppercase">Menu</h2>

          <button onClick={() => setIsOpen(false)}>
            <X size={24} />
          </button>
        </div>

        {/* NAVIGATION */}
        <div className="flex flex-col">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              onClick={() => setIsOpen(false)}
              className="px-5 py-4 border-b text-[17px] font-medium hover:bg-gray-50 transition"
            >
              {getTranslatedValue(category.name, lang)}
            </Link>
          ))}
        </div>

        {/* FOOTER */}
        <div className="absolute bottom-0 left-0 w-full p-5 border-t">
          <button className="w-full flex items-center justify-center gap-2 border rounded-full py-3">
            <User size={18} />

            <span className="font-medium">
              {lang === "en" ? "Login" : "লগইন"}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
