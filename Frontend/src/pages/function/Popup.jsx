import { useEffect, useState } from "react";

export default function Popup({ message, setPopupMessage }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      setTimeout(() => setPopupMessage(""), 300); // wait for animation
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`
        fixed top-4 right-4 md:top-5 md:right-5 z-50
        transition-all duration-300 ease-in-out
        ${show ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}
      `}
    >
      <div className="flex items-center gap-3 bg-white border border-green-400 text-green-700 px-5 py-3 rounded-xl shadow-lg">
        <div className="w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
        <p className="font-medium">{message}</p>
      </div>
    </div>
  );
}
