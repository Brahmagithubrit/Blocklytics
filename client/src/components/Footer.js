import React, { useState, useEffect, useContext, useMemo } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import "../App2.css";

export default function Footer() {
          // later use 
  return (
    <div className="bg-white text-black dark:bg-black dark:text-white fixed bottom-0 h-[50px] w-full bg-gray-200 text-black  text-sm flex flex-row justify-center ml-[5px] mr-[5px] mt-[15px] pb-[5px] font-light items-center z-10 shadow-sm">
      <p className="m-[10px]">No of Transaction : 0</p>
      <p>Total website visit : 549 </p>
      <p>Total User : 118</p>
      {/* hardcoded later it will be dynamic */}
    </div>
  );
}
