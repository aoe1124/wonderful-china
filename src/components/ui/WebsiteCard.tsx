"use client";

import { Website } from "@/types";
import Image from "next/image";

interface WebsiteCardProps {
  website: Website;
}

export function WebsiteCard({ website }: WebsiteCardProps) {
  return (
    <a
      href={website.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all border border-primary/10 hover:-translate-y-1"
    >
      <div className="flex items-center gap-4 mb-3">
        {website.icon ? (
          <Image
            src={website.icon}
            alt={website.title}
            width={40}
            height={40}
            className="rounded-lg"
          />
        ) : (
          <div className="w-10 h-10 bg-primary/5 rounded-lg flex items-center justify-center text-primary">
            {website.title[0]}
          </div>
        )}
        <h3 className="text-lg font-bold group-hover:text-accent transition-colors">
          {website.title}
        </h3>
      </div>
      <p className="text-primary/70 text-sm line-clamp-2">
        {website.description}
      </p>
    </a>
  );
} 