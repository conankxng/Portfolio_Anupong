import React from "react";
import { Link } from "react-router-dom";
import { ExternalLink, ArrowRight } from "lucide-react";

const CardProject = ({ Img, Title, Description, Link: ProjectLink, id }) => {
  const handleLiveDemo = (e) => {
    if (!ProjectLink) {
      e.preventDefault();
      alert("Live demo link is not available");
    }
  };

  const handleDetails = (e) => {
    if (!id) {
      e.preventDefault();
      alert("Project details are not available");
    }
  };

  return (
    <div className="group relative w-full">
      {/* พื้นหลังการ์ดใหม่: plum/charcoal + glass เบา ๆ (ไม่ซ้ำ #100008) */}
      <div
        className="
          relative overflow-hidden rounded-2xl
          bg-[#1a0f14]/90 backdrop-blur-xl
          border border-white/10
          shadow-[0_10px_40px_-10px_rgba(247,85,217,0.20)]
          transition-all duration-300
          hover:shadow-[0_18px_60px_-12px_rgba(255,2,2,0.28)]
          hover:-translate-y-0.5
        "
      >
        {/* โทนไล่สีอ่อนเนียน ๆ ไม่เด่นเกิน */}
        <div
          className="absolute inset-0 opacity-40 group-hover:opacity-55 transition-opacity duration-300"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(247,85,217,0.06) 45%, rgba(255,2,2,0.05) 100%)",
          }}
        />

        <div className="relative p-5 z-10">
          {/* รูปโปรเจกต์ */}
          <div className="relative overflow-hidden rounded-xl">
            <img
              src={Img}
              alt={Title || "Project image"}
              className="w-full h-full object-cover transform group-hover:scale-[1.03] transition-transform duration-500"
              loading="lazy"
            />
            {/* เส้นไฮไลต์เบา ๆ ตอน hover */}
            <div className="pointer-events-none absolute inset-0 rounded-xl border border-transparent group-hover:border-rose-300/25 transition-colors duration-300" />
          </div>

          <div className="mt-4 space-y-3">
            {/* ชื่อโปรเจกต์: ไล่สีแดง→ชมพู ตามธีม */}
            <h3
              className="text-xl font-semibold bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(90deg, #ff0202, #f755d9)" }}
            >
              {Title}
            </h3>

            {/* คำอธิบายอ่านง่ายบนฐานใหม่ */}
            <p className="text-slate-200/85 text-sm leading-relaxed line-clamp-2">
              {Description}
            </p>

            <div className="pt-4 flex items-center justify-between">
              {/* Live Demo */}
              {ProjectLink ? (
                <a
                  href={ProjectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleLiveDemo}
                  className="
                    inline-flex items-center gap-2 text-sm font-medium
                    px-3 py-2 rounded-lg
                    bg-gradient-to-r from-[#ff0202]/18 to-[#f755d9]/18
                    text-white
                    border border-rose-300/25
                    transition-all duration-200
                    hover:from-[#ff0202]/28 hover:to-[#f755d9]/28
                    hover:-translate-y-0.5
                  "
                >
                  <span>Live Demo</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              ) : (
                <span className="text-slate-500 text-sm">Demo Not Available</span>
              )}

              {/* Details */}
              {id ? (
                <Link
                  to={`/project/${id}`}
                  onClick={handleDetails}
                  className="
                    inline-flex items-center gap-2 px-4 py-2 rounded-lg
                    text-white/90
                    border border-rose-300/25
                    transition-all duration-200
                    hover:bg-rose-500/10
                    hover:-translate-y-0.5
                    focus:outline-none focus:ring-2 focus:ring-rose-400/40
                  "
                >
                  <span className="text-sm font-medium">Details</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              ) : (
                <span className="text-slate-500 text-sm">Details Not Available</span>
              )}
            </div>
          </div>

          {/* กรอบนอกเรืองแสงอ่อน ๆ */}
          <div className="absolute -inset-px rounded-2xl pointer-events-none border border-transparent group-hover:border-rose-300/35 transition-colors duration-300 -z-10"></div>
        </div>
      </div>
    </div>
  );
};

export default CardProject;
