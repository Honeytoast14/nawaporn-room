import { useProgress } from "@react-three/drei";
import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [progressBar, setProgressBar] = useState(false);
  const { progress } = useProgress();

  useEffect(() => {
    const delay = setTimeout(() => {
      setProgressBar(true);
    }, 5000);

    if (progress === 100) {
      const timeout = setTimeout(() => {
        setVisible(false);
      }, 2700);

      return () => {
        clearTimeout(timeout);
      };
    }

    return () => {
      clearTimeout(delay);
    };
  }, [progress]);

  return (
    <div
      className={`absolute top-0 z-30 h-full w-full bg-second_white ${
        visible ? `opacity-100` : `pointer-events-none opacity-0`
      } transition-opacity duration-700 ease-in-out`}
    >
      <div className="flex h-full w-full flex-col items-center justify-center">
        <p className={`text-xl font-light text-main-black`}>
          Welcome to my portfolio.
        </p>
        <div
          className={`mt-2 w-40 rounded-xl bg-gray-400 ${progressBar ? `visible opacity-100` : `invisible opacity-0`} duration-200 ease-in`}
        >
          <div
            className="h-1 flex-none rounded-xl bg-main-black"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
