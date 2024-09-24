import { useState } from "react";

function Image({ src, alt }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="overflow-hidden relative">
      {!loaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
      )}
      <img
        src={src}
        alt={alt}
        className={`object-fill w-full transition-opacity duration-500 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}

export default Image;
