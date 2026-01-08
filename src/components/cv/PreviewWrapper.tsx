import { useRef, useState, useEffect } from "react";

interface PreviewWrapperProps {
  children: React.ReactNode;
}

export default function PreviewWrapper({ children }: PreviewWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current || !contentRef.current) return;

      const containerWidth = containerRef.current.clientWidth;
      const cvWidth = 794; // A4 width in px (96 DPI)
      const padding = 32; // 2rem padding

      const availableWidth = containerWidth - padding;

      // Scale down if container is smaller than CV
      if (availableWidth < cvWidth) {
        setScale(availableWidth / cvWidth);
      } else {
        setScale(1);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      id="cv-preview"
      ref={containerRef}
      className="w-full h-full flex items-start justify-center overflow-visible"
    >
      <div
        ref={contentRef}
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "top center",
          width: "794px", // Force A4 width container
          minHeight: "1123px",
        }}
        className="shadow-2xl print:shadow-none print:transform-none origin-top print:w-full"
      >
        {children}
      </div>
    </div>
  );
}
