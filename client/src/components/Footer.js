import React, { useState, useEffect, useContext, useMemo } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import "../App2.css";

export default function Footer() {
          // later use 
  return (
    <div className="footer">
      <p>No of Transaction : 0</p>
      <p>Total website visit : 549 </p>
      <p>Total User : 118</p>
      {/* hardcoded later it will be dynamic */}
    </div>
  );
}
