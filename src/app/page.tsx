/** @format */

"use client";

import { useAppSelector } from "@/redux/hooks";
import HomePage from "./home/page";
import SellerHome from "./sellerHome/page";

export default function Home() {
  const userRole = useAppSelector((state) => state.userRole.role);

  return <div>{userRole === "buyer" ? <HomePage /> : <SellerHome />}</div>;
}
