import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href="/search">
      <p className="text-5xl md:text-7xl font-bold bg-linear-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
        COSTLY
      </p>
    </Link>
  );
};

export default Logo;
