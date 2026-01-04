import React from "react";

interface PdfSafeWrapperProps {
    children: React.ReactNode;
    id?: string;
    className?: string;
}

/**
 * PDF-safe wrapper for html2pdf / html2canvas.
 * - Forces A4 dimensions
 * - Forces white background
 * - Isolates Tailwind color system
 */
export const PdfSafeWrapper = ({
    children,
    id = "cv-pdf-root",
    className = "",
}: PdfSafeWrapperProps) => {
    return (
        <div

            id={id}
            className={`relative ${className}`}
            style={{
                width: "794px",        // A4 width @96dpi
                minHeight: "1123px",   // A4 height @96dpi
                backgroundColor: "#ffffff",
                color: "#000000",
                boxSizing: "border-box",
            }}
        >
            {children}
        </div>
    );
};
