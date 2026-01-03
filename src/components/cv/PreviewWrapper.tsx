import { useRef, useEffect, useState } from "react";

export default function PreviewWrapper({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        // Assuming CV width is ~800px. 
        // We subtract padding (32px total) from container width
        const availableWidth = containerWidth - 32;
        const newScale = Math.min(availableWidth / 800, 1);
        setScale(newScale);
      }
    };

    window.addEventListener("resize", updateScale);
    updateScale(); // Initial call

    // Observer for container resize (e.g. sidebar toggle)
    const resizeObserver = new ResizeObserver(updateScale);
    if (containerRef.current) resizeObserver.observe(containerRef.current);

    return () => {
      window.removeEventListener("resize", updateScale);
      resizeObserver.disconnect();
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="bg-muted/30 rounded-xl flex justify-center items-start overflow-hidden origin-top"
    >
      <div
        id="cv-preview"
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "top center",
          marginTop: "20px",
        }}
        className="transition-transform duration-200"
      >
        {children}
      </div>
    </div>
  );
}
