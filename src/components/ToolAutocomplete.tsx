import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { simpleIconsList } from "@/lib/simpleIcons";
import { Input } from "@/components/ui/input";

interface ToolAutocompleteProps {
  onSelect: (tool: { id: string; label: string }) => void;
}

export function ToolAutocomplete({ onSelect }: ToolAutocompleteProps) {
  const [query, setQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });

  const results = simpleIconsList
    .filter(icon =>
      icon.label.toLowerCase().includes(query.toLowerCase())
    )
    .slice(0, 8);

  useEffect(() => {
    const updatePosition = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setPosition({
          top: rect.bottom + window.scrollY,
          left: rect.left + window.scrollX,
          width: rect.width,
        });
      }
    };

    if (query) {
      updatePosition();
      window.addEventListener("resize", updatePosition);
      window.addEventListener("scroll", updatePosition, true);
    }

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [query]);

  const dropdown = (
    <div
      className="absolute z-[9999] mt-1 bg-white dark:bg-gray-900 border dark:border-gray-800 rounded-lg shadow-xl max-h-60 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      style={{
        top: position.top,
        left: position.left,
        width: position.width,
      }}
    >
      {results.map(icon => (
        <button
          key={icon.id}
          type="button"
          onClick={() => {
            onSelect(icon);
            setQuery("");
          }}
          className="flex items-center gap-3 w-full px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left border-b last:border-0 border-gray-100 dark:border-gray-800"
        >
          <div className="p-1.5 bg-gray-50 dark:bg-gray-800 rounded border border-gray-100 dark:border-gray-700">
            <img
              src={`https://cdn.simpleicons.org/${icon.id}`}
              className="w-4 h-4"
              loading="lazy"
              alt=""
            />
          </div>
          <span className="font-medium text-sm text-gray-700 dark:text-gray-200">{icon.label}</span>
        </button>
      ))}
    </div>
  );

  return (
    <div ref={containerRef} className="relative w-full">
      <Input
        placeholder="Rechercher un outil (Figma, VS Code, Excel...)"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full bg-white dark:bg-gray-800 dark:border-gray-700"
      />

      {query && results.length > 0 && position.width > 0 && typeof document !== 'undefined' && createPortal(dropdown, document.body)}
    </div>
  );
}
