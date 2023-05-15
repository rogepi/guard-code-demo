import React from "react";

interface ICountDownProps {
  counter: number;
  setCounter: React.Dispatch<React.SetStateAction<number>>;
}

const CountDown = ({ counter, setCounter }: ICountDownProps) => {
  React.useEffect(() => {
    if (counter === 0) {
      setCounter(60);
    }
    const intervalId = setInterval(() => {
      setCounter(counter - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [counter, setCounter]);

  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (circumference * counter) / 60;

  return (
    <div>
      <svg width="100" height="100" className="-rotate-90 transform">
        <circle
          r={radius}
          cx="50"
          cy="50"
          fill="transparent"
          stroke="#fff"
          strokeWidth="8"
          strokeDasharray={`${circumference} ${circumference}`}
          style={{
            strokeDashoffset,
            transition: "stroke-dashoffset 1s linear",
          }}
        />
      </svg>
    </div>
  );
};

export default CountDown;
