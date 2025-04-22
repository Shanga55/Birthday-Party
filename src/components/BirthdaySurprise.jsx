import React, { useState, useEffect } from "react";
import "./BirthdaySurprise.css";
import Photo from "../assets/photo.jpg";

const BirthdaySurprise = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [poppedBalloons, setPoppedBalloons] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const messages = [
    "پیرۆز بێت لەدایکبوونت🎉",
    "ئەمڕۆ ڕۆژی تۆیە بدرەوشێنەوە! 💎🌟",
    "ئێمە نەک تەنیا پورزا بەڵکو هاوڕێی ژیانیشین 👫💕",
    "لەم ڕۆژە تایبەتەدا باوەشێکت پێدادەکەم و پێتدەڵێم 🤗💞",
    "شایەنی هەموو کێک و خۆشییەکانی و جیهان باشترە کاتێک تۆ تێیدایت🍰😊",
    "",
  ];

  const handleBalloonClick = () => {
    const newCount = poppedBalloons + 1;
    setPoppedBalloons(newCount);
    if (newCount >= 6) {
      setShowMessage(true);
    }
  };

  const getBalloonStyle = (index) => {
    const baseStyle = {
      backgroundColor: `hsl(${index * 60}, 100%, 70%)`,
      animationDelay: `${index * 0.2}s`,
    };

    if (isMobile) {
      return {
        ...baseStyle,
        left: `${5 + (index % 3) * 30}%`,
        top: `${20 + Math.floor(index / 3) * 30}%`,
        fontSize: "24px",
      };
    } else {
      return {
        ...baseStyle,
        left: `${10 + index * 12}%`,
        fontSize: "32px",
      };
    }
  };

  return (
    <div className="birthday-container">
      <h1>Happy birthday Rezhin</h1>

      {!showMessage ? (
        <div className="balloons-container">
          <p className="instructions">
            بالۆنەکا تەقنە پەی ئانەی سوپڕایزەکەی وینی
          </p>
          <div className="balloons">
            {messages.map((message, i) => (
              <div
                key={i}
                className={`balloon ${i < poppedBalloons ? "popped" : ""}`}
                onClick={handleBalloonClick}
                style={getBalloonStyle(i)}
                title={message}
              >
                {i < poppedBalloons ? "💥" : "🎈"}
              </div>
            ))}
          </div>
          {poppedBalloons > 0 && (
            <div className="current-message">
              <p>{messages[poppedBalloons - 1]}</p>
            </div>
          )}
        </div>
      ) : (
        <div className="birthday-message">
          <div>
            <div className="cake"> 🎂</div>
            <img src={Photo} alt="" className="photo" />
          </div>
          <div className="message-content">
            <p className="kurdish-text">پورزای ئەزیزم</p>
            <p className="kurdish-text">
              چی ڕوە تایبەتەنە گەرەکما پەنەت واچو کە چنە گرنگەنی پەیم
            </p>
            <p className="kurdish-text highlight">
              تۆ گەورەترین هەدیەو خواینی پەی من
            </p>
            <p className="kurdish-text">فرەم وەشە گەرەکەنی</p>
            <p className="signature">شەنێ ❤️</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BirthdaySurprise;
