// 1페이지 화면구성
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Home() {
  const [quote, setQuote] = useState("");
  const navigate = useNavigate();

  const fetchQuote = async () => {
    try {
      const response = await fetch(`https://api.adviceslip.com/advice?timestamp=${new Date().getTime()}`);
      const data = await response.json();
      setQuote(data.slip.advice);
    } catch (error) {
      console.error("에러 발생:", error);
    }
  };

  useEffect(() => {
    fetchQuote();
    const interval = setInterval(fetchQuote, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-container">
      <h1 className="home-title">오늘의 명언</h1>

      <div className="quote-box">
        {/* 버튼 위로 */}
        <button className="button" onClick={() => navigate("/quote")}>
          오늘의 명언 뽑기
        </button>

        {/* 루프 명언 아래로 */}
        <div className="scrolling-quote">
          <p>{quote}</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
