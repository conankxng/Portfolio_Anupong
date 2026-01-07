import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft, ExternalLink, Github, Code2, Star,
  ChevronRight, Layers, Layout, Globe, Package, Cpu, Code,
} from "lucide-react";
import Swal from "sweetalert2";

/* ========= THEME (แดง/ชมพู) ========= */
const THEME = {
  bg: "#100008",
  gradFrom: "#ff0202",
  gradTo: "#f755d9",
  glassStroke: "rgba(255,255,255,0.10)",
  text: "#ffffff",
  textMuted: "#cbd5e1",
};
const GRAD_TXT = {
  backgroundImage: `linear-gradient(45deg, ${THEME.gradFrom} 10%, ${THEME.gradTo} 93%)`,
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  WebkitTextFillColor: "transparent",
};
const SOFT_GRAD = `linear-gradient(135deg, rgba(255,2,2,.10), rgba(247,85,217,.10))`;
const SOFT_GRAD_HOVER = `linear-gradient(135deg, rgba(255,2,2,.18), rgba(247,85,217,.18))`;

const TECH_ICONS = {
  React: Globe,
  Tailwind: Layout,
  Express: Cpu,
  Python: Code,
  Javascript: Code,
  HTML: Code,
  CSS: Code,
  default: Package,
};

const TechBadge = ({ tech }) => {
  const Icon = TECH_ICONS[tech] || TECH_ICONS["default"];

  return (
    <div
      className="group relative overflow-hidden px-3 py-2 md:px-4 md:py-2.5 rounded-xl border transition-all duration-300 cursor-default"
      style={{
        background: SOFT_GRAD,
        borderColor: "rgba(255,2,2,.18)",
      }}
    >
      <div
        className="absolute inset-0 transition-all duration-500"
        style={{ background: SOFT_GRAD_HOVER, opacity: 0 }}
      />
      <div className="relative flex items-center gap-1.5 md:gap-2">
        <Icon className="w-3.5 h-3.5 md:w-4 md:h-4" style={{ color: THEME.gradTo }} />
        <span className="text-xs md:text-sm font-medium transition-colors"
              style={{ color: "#f5d3e8" }}>
          {tech}
        </span>
      </div>
    </div>
  );
};

const FeatureItem = ({ feature }) => {
  return (
    <li
      className="group flex items-start space-x-3 p-2.5 md:p-3.5 rounded-xl transition-all duration-300 border"
      style={{
        background: "transparent",
        borderColor: "transparent",
      }}
    >
      <div className="relative mt-2">
        <div
          className="absolute -inset-1 rounded-full blur transition-opacity duration-300"
          style={{ background: SOFT_GRAD_HOVER, opacity: 0 }}
        />
        <div
          className="relative w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-transform duration-300"
          style={{
            background: `linear-gradient(90deg, ${THEME.gradFrom}, ${THEME.gradTo})`,
          }}
        />
      </div>
      <span className="text-sm md:text-base transition-colors"
            style={{ color: THEME.textMuted }}>
        {feature}
      </span>
    </li>
  );
};

const ProjectStats = ({ project }) => {
  const techStackCount = project?.TechStack?.length || 0;
  const featuresCount = project?.Features?.length || 0;

  return (
    <div className="grid grid-cols-2 gap-3 md:gap-4 p-3 md:p-4 rounded-xl overflow-hidden relative"
         style={{ background: "rgba(255,255,255,0.03)" }}>
      <div
        className="absolute inset-0 opacity-40 blur-2xl z-0"
        style={{
          background: SOFT_GRAD_HOVER,
        }}
      />

      <div
        className="relative z-10 flex items-center space-x-2 md:space-x-3 p-2 md:p-3 rounded-lg transition-all duration-300 hover:scale-105 backdrop-blur-xl"
        style={{
          background: "rgba(255,255,255,0.06)",
          border: `1px solid ${THEME.glassStroke}`,
        }}
      >
        <div className="p-1.5 md:p-2 rounded-full"
             style={{ background: "rgba(255,2,2,.22)" }}>
          <Code2 className="w-4 h-4 md:w-6 md:h-6" style={{ color: THEME.gradFrom }} strokeWidth={1.5} />
        </div>
        <div className="flex-grow">
          <div className="text-lg md:text-xl font-semibold" style={{ color: "#ffd6e9" }}>{techStackCount}</div>
          <div className="text-[10px] md:text-xs" style={{ color: THEME.textMuted }}>Total Teknologi</div>
        </div>
      </div>

      <div
        className="relative z-10 flex items-center space-x-2 md:space-x-3 p-2 md:p-3 rounded-lg transition-all duration-300 hover:scale-105 backdrop-blur-xl"
        style={{
          background: "rgba(255,255,255,0.06)",
          border: `1px solid ${THEME.glassStroke}`,
        }}
      >
        <div className="p-1.5 md:p-2 rounded-full"
             style={{ background: "rgba(247,85,217,.22)" }}>
          <Layers className="w-4 h-4 md:w-6 md:h-6" style={{ color: THEME.gradTo }} strokeWidth={1.5} />
        </div>
        <div className="flex-grow">
          <div className="text-lg md:text-xl font-semibold" style={{ color: "#ffd6e9" }}>{featuresCount}</div>
          <div className="text-[10px] md:text-xs" style={{ color: THEME.textMuted }}>Fitur Utama</div>
        </div>
      </div>
    </div>
  );
};

const handleGithubClick = (githubLink) => {
  if (githubLink === "Private") {
    Swal.fire({
      icon: "info",
      title: "Source Code Private",
      text: "Maaf, source code untuk proyek ini bersifat privat.",
      confirmButtonText: "Mengerti",
      confirmButtonColor: THEME.gradFrom,
      background: THEME.bg,
      color: THEME.text,
    });
    return false;
  }
  return true;
};

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const storedProjects = JSON.parse(localStorage.getItem("projects")) || [];
    const selectedProject = storedProjects.find((p) => String(p.id) === id);

    if (selectedProject) {
      const enhancedProject = {
        ...selectedProject,
        Features: selectedProject.Features || [],
        TechStack: selectedProject.TechStack || [],
        Github: selectedProject.Github || "https://github.com/conankxng",
      };
      setProject(enhancedProject);
    }
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center"
           style={{ backgroundColor: THEME.bg }}>
        <div className="text-center space-y-6 animate-fadeIn">
          <div className="w-16 h-16 md:w-24 md:h-24 mx-auto border-4 rounded-full animate-spin"
               style={{ borderColor: "rgba(247,85,217,.3)", borderTopColor: THEME.gradTo }} />
          <h2 className="text-xl md:text-3xl font-bold" style={{ color: THEME.text }}>Loading Project...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-[2%] sm:px-0 relative overflow-hidden"
         style={{ backgroundColor: THEME.bg, color: THEME.text }}>
      {/* BG layer */}
      <div className="fixed inset-0">
        <div className="absolute -inset-[10px] opacity-25">
          <div className="absolute top-0 -left-4 w-72 md:w-96 h-72 md:h-96 rounded-full mix-blend-screen filter blur-3xl animate-blob"
               style={{ background: "radial-gradient(circle, rgba(255,2,2,.35), transparent 60%)" }} />
          <div className="absolute top-0 -right-4 w-72 md:w-96 h-72 md:h-96 rounded-full mix-blend-screen filter blur-3xl animate-blob animation-delay-2000"
               style={{ background: "radial-gradient(circle, rgba(247,85,217,.35), transparent 60%)" }} />
          <div className="absolute -bottom-8 left-20 w-72 md:w-96 h-72 md:h-96 rounded-full mix-blend-screen filter blur-3xl animate-blob animation-delay-4000"
               style={{ background: "radial-gradient(circle, rgba(255,2,2,.25), transparent 60%)" }} />
        </div>
        <div className="absolute inset-0 opacity-[0.03]"
             style={{ backgroundImage: "url('/grid.svg')" }} />
      </div>

      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-16">
          {/* Breadcrumb / Back */}
          <div className="flex items-center space-x-2 md:space-x-4 mb-8 md:mb-12 animate-fadeIn">
            <button
              onClick={() => navigate(-1)}
              className="group inline-flex items-center space-x-1.5 md:space-x-2 px-3 md:px-5 py-2 md:py-2.5 rounded-xl transition-all duration-300 text-sm md:text-base"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: `1px solid ${THEME.glassStroke}`,
                backdropFilter: "blur(12px)",
              }}
            >
              <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 transition-transform group-hover:-translate-x-1" />
              <span>Back</span>
            </button>
            <div className="flex items-center space-x-1 md:space-x-2 text-sm md:text-base"
                 style={{ color: "rgba(255,255,255,.6)" }}>
              <span>Projects</span>
              <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
              <span className="truncate" style={{ color: THEME.text }}>{project.Title}</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 md:gap-16">
            {/* Left column */}
            <div className="space-y-6 md:space-y-10 animate-slideInLeft">
              <div className="space-y-4 md:space-y-6">
                <h1 className="text-3xl md:text-6xl font-bold leading-tight text-transparent bg-clip-text"
                    style={GRAD_TXT}>
                  {project.Title}
                </h1>
                <div className="relative h-1 w-16 md:w-24">
                  <div className="absolute inset-0 rounded-full"
                       style={{ background: `linear-gradient(90deg, ${THEME.gradFrom}, ${THEME.gradTo})` }} />
                  <div className="absolute inset-0 rounded-full blur-sm"
                       style={{ background: `linear-gradient(90deg, ${THEME.gradFrom}, ${THEME.gradTo})` }} />
                </div>
              </div>

              <div className="prose prose-invert max-w-none">
                <p className="text-base md:text-lg leading-relaxed" style={{ color: "rgba(255,255,255,.85)" }}>
                  {project.Description}
                </p>
              </div>

              <ProjectStats project={project} />

              <div className="flex flex-wrap gap-3 md:gap-4">
                {/* Live Demo */}
                <a
                  href={project.Link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center space-x-1.5 md:space-x-2 px-4 md:px-8 py-2.5 md:py-4 rounded-xl transition-all duration-300 border backdrop-blur-xl overflow-hidden text-sm md:text-base"
                  style={{
                    color: "#ffd6e9",
                    background: "rgba(255,255,255,0.06)",
                    borderColor: THEME.glassStroke,
                  }}
                >
                  <div className="absolute inset-0 translate-y-[100%] transition-transform duration-300 group-hover:translate-y-[0%]"
                       style={{ background: SOFT_GRAD }} />
                  <ExternalLink className="relative w-4 h-4 md:w-5 md:h-5 transition-transform group-hover:rotate-12" />
                  <span className="relative font-medium">Live Demo</span>
                </a>

                {/* Github */}
                <a
                  href={project.Github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => !handleGithubClick(project.Github) && e.preventDefault()}
                  className="group relative inline-flex items-center space-x-1.5 md:space-x-2 px-4 md:px-8 py-2.5 md:py-4 rounded-xl transition-all duration-300 border backdrop-blur-xl overflow-hidden text-sm md:text-base"
                  style={{
                    color: "#ffd6e9",
                    background: "rgba(255,255,255,0.06)",
                    borderColor: THEME.glassStroke,
                  }}
                >
                  <div className="absolute inset-0 translate-y-[100%] transition-transform duration-300 group-hover:translate-y-[0%]"
                       style={{ background: SOFT_GRAD_HOVER }} />
                  <Github className="relative w-4 h-4 md:w-5 md:h-5 transition-transform group-hover:rotate-12" />
                  <span className="relative font-medium">Github</span>
                </a>
              </div>

              <div className="space-y-4 md:space-y-6">
                <h3 className="text-lg md:text-xl font-semibold mt-[3rem] md:mt-0 flex items-center gap-2 md:gap-3"
                    style={{ color: THEME.text }}>
                  <Code2 className="w-4 h-4 md:w-5 md:h-5" style={{ color: THEME.gradTo }} />
                  Technologies Used
                </h3>
                {project.TechStack.length > 0 ? (
                  <div className="flex flex-wrap gap-2 md:gap-3">
                    {project.TechStack.map((tech, index) => (
                      <TechBadge key={index} tech={tech} />
                    ))}
                  </div>
                ) : (
                  <p className="text-sm md:text-base" style={{ color: THEME.textMuted }}>No technologies added.</p>
                )}
              </div>
            </div>

            {/* Right column */}
            <div className="space-y-6 md:space-y-10 animate-slideInRight">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl group"
                   style={{ border: `1px solid ${THEME.glassStroke}` }}>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                     style={{ background: "linear-gradient(180deg, #100008, transparent)" }} />
                <img
                  src={project.Img}
                  alt={project.Title}
                  className="w-full object-cover transform transition-transform duration-700 will-change-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/10 transition-colors duration-300 rounded-2xl" />
              </div>

              <div
                className="backdrop-blur-xl rounded-2xl p-8 space-y-6 transition-colors duration-300 group"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: `1px solid ${THEME.glassStroke}`,
                }}
              >
                <h3 className="text-xl font-semibold flex items-center gap-3" style={{ color: THEME.text }}>
                  <Star className="w-5 h-5 transition-transform duration-300"
                        style={{ color: "#ffd166" }} />
                  Key Features
                </h3>
                {project.Features.length > 0 ? (
                  <ul className="list-none space-y-2">
                    {project.Features.map((feature, index) => (
                      <FeatureItem key={index} feature={feature} />
                    ))}
                  </ul>
                ) : (
                  <p style={{ color: THEME.textMuted }}>No features added.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* keyframes */}
      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob { animation: blob 10s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        .animate-fadeIn { animation: fadeIn 0.7s ease-out; }
        .animate-slideInLeft { animation: slideInLeft 0.7s ease-out; }
        .animate-slideInRight { animation: slideInRight 0.7s ease-out; }
        @keyframes fadeIn { from {opacity:0} to {opacity:1} }
        @keyframes slideInLeft { from {opacity:0; transform: translateX(-30px);} to {opacity:1; transform: translateX(0);} }
        @keyframes slideInRight { from {opacity:0; transform: translateX(30px);} to {opacity:1; transform: translateX(0);} }
      `}</style>
    </div>
  );
};

export default ProjectDetails;
