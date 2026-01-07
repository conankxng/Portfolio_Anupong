import React, { memo, useState, useCallback } from "react";
import PropTypes from "prop-types";

const TechStackIcon = ({
  TechStackIcon: iconSrc,
  Language,
  className = "",
  size = "xl",             // 'sm' | 'md' | 'lg' | 'xl'
  onClick,
  asButton = true,
}) => {
  const [imgError, setImgError] = useState(false);
  const isInteractive = asButton && typeof onClick === "function";

  const imgSize =
    size === "xl"
      ? "h-20 w-20 md:h-24 md:w-24"
      : size === "lg"
      ? "h-16 w-16 md:h-20 md:w-20"
      : size === "sm"
      ? "h-10 w-10 md:h-12 md:w-12"
      : "h-14 w-14 md:h-16 md:w-16"; // md

  const titleSize =
    size === "xl" ? "text-base md:text-lg"
    : size === "lg" ? "text-sm md:text-base"
    : "text-sm md:text-base";

  const handleKeyDown = useCallback(
    (e) => {
      if (!isInteractive) return;
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onClick?.(e);
      }
    },
    [isInteractive, onClick]
  );

  return (
    <div
      className={`
        group relative overflow-hidden rounded-3xl
        backdrop-blur-xl border border-white/10
        shadow-[0_18px_60px_-14px_rgba(247,85,217,0.28)]
        transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_80px_-16px_rgba(255,2,2,0.32)]
        w-full h-full flex flex-col items-center justify-center gap-4
        px-6 py-8
        ${className}
      `}
      style={{ backgroundColor: "#1a0f14" }}
      role={isInteractive ? "button" : "img"}
      tabIndex={isInteractive ? 0 : -1}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      aria-label={Language}
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-40 group-hover:opacity-55 transition-opacity duration-300"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(247,85,217,0.06) 45%, rgba(255,2,2,0.05) 100%)",
        }}
      />
      <div className="pointer-events-none absolute -inset-px rounded-3xl border border-transparent group-hover:border-rose-300/30 transition-colors duration-300" />

      <div className="relative">
        <div
          className="absolute -inset-4 rounded-full blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-300"
          style={{
            background:
              "radial-gradient(circle, rgba(247,85,217,0.25), transparent 60%)",
          }}
        />
        {iconSrc && !imgError ? (
          <img
            src={iconSrc}
            alt=""
            loading="lazy"
            draggable="false"
            onError={() => setImgError(true)}
            className={`relative ${imgSize} transform transition-transform duration-300 group-hover:scale-105`}
          />
        ) : (
          <div
            className={`relative ${imgSize} rounded-xl`}
            style={{
              background: "linear-gradient(135deg,#ff0202 0%,#f755d9 100%)",
              opacity: 0.7,
            }}
            aria-hidden="true"
          />
        )}
      </div>

      {/* เปลี่ยนเป็นสีขาว */}
      <span
        className={`${titleSize} font-semibold text-white/90 group-hover:text-white tracking-wide transition-colors duration-300`}
      >
        {Language}
      </span>

      {isInteractive && (
        <span className="pointer-events-none absolute inset-0 rounded-3xl ring-0 ring-rose-400/0 group-focus:ring-2 group-focus:ring-rose-400/40 transition-[box-shadow] duration-300" />
      )}
    </div>
  );
};

TechStackIcon.propTypes = {
  TechStackIcon: PropTypes.string,
  Language: PropTypes.string.isRequired,
  className: PropTypes.string,
  size: PropTypes.oneOf(["sm", "md", "lg", "xl"]),
  onClick: PropTypes.func,
  asButton: PropTypes.bool,
};

export default memo(TechStackIcon);
