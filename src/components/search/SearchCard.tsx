import React from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Badge } from "../ui/badge";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface SearchCardProps {
  title: string;
  description: string;
  link: string;
  image: string;
}

const SearchCard: React.FC<SearchCardProps> = ({
  title,
  description,
  link,
  image,
}) => {
  return (
    <Link href={link} className="group block w-full max-w-sm">
      <Card className="relative overflow-hidden aspect-5/4 rounded-[2rem] border-none transition-all duration-500 ease-out hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] hover:-translate-y-2">
        {/* Background Image - Using a background div to keep Card clean */}
        <div className="absolute inset-0 z-0">
          <Image
            src={image}
            alt="Become a seller"
            className="h-full w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
            fill
          />
          {/* The "Costly" Scrim Overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" />
        </div>

        {/* Content - Layered on top of image */}
        <div className="relative z-10 flex h-full flex-col justify-between p-2">
          <CardHeader className="flex-row justify-start items-center space-y-0">
            <Badge className="bg-white/10 text-white backdrop-blur-md border-none px-3 py-1 font-medium tracking-tight hover:bg-white/20">
              Featured
            </Badge>
          </CardHeader>

          <CardContent className="p-6 text-white">
            <div className="flex items-end justify-between gap-4">
              <div className="space-y-1.5">
                <h3 className="text-lg 2xl:text-2xl font-semibold tracking-tight leading-tight ">
                  {title}
                </h3>
                <p className="text-xs text-white/60 font-light leading-relaxed hidden 2xl:block">
                  {description}
                </p>
              </div>

              {/* Premium Icon Circle */}
              <div className="shrink-0 rounded-full bg-white/10 p-2.5 backdrop-blur-xl border border-white/10 transition-all duration-300 group-hover:bg-white group-hover:text-black">
                <ArrowUpRight className="size-5" />
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
    </Link>
  );
};

export default SearchCard;
