/** @format */
"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";

const ConditionalFooter = () => {
  const pathname = usePathname();
  
  // Hide footer on live auction pages
  const isLivePage = pathname.includes('/live');
  
  if (isLivePage) {
    return null;
  }
  
  return <Footer />;
};

export default ConditionalFooter;