// src/Pages/Portofolio.jsx
import React, { useEffect, useState, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AOS from "aos";
import "aos/dist/aos.css";

import { supabase } from "../supabase";
import CardProject from "../components/CardProject";
import TechStackIcon from "../components/TechStackIcon";
import Certificate from "../components/Certificate";
import { Code, Award, Boxes } from "lucide-react";

/* ================= THEME (แดง-ชมพู) ================= */
const THEME = {
  bg: "#100008",
  gradFrom: "#ff0202",
  gradTo: "#f755d9",
  glassStroke: "rgba(255,255,255,0.10)",
  glassFill:
    "linear-gradient(180deg, rgba(255,8,8,0.06) 0%, rgba(247,85,217,0.06) 100%)",
  hoverTint: "rgba(255,77,79,0.10)",
  selectTint:
    "linear-gradient(135deg, rgba(255,2,2,0.22), rgba(247,85,217,0.22))",
  shadowTint: "rgba(255,77,79,0.25)",
  textMuted: "#94a3b8",
  text: "#ffffff",
};

/* ================= Reusable ================= */
const ToggleButton = ({ onClick, isShowingMore }) => (
  <button
    onClick={onClick}
    className="
      px-3 py-1.5 text-slate-300 hover:text-white text-sm font-medium
      transition-all duration-300 ease-in-out flex items-center gap-2
      bg-white/5 hover:bg-white/10 rounded-md border border-white/10
      hover:border-white/20 backdrop-blur-sm group relative overflow-hidden
    "
  >
    <span className="relative z-10 flex items-center gap-2">
      {isShowingMore ? "See Less" : "See More"}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`transition-transform duration-300 ${
          isShowingMore ? "group-hover:-translate-y-0.5" : "group-hover:translate-y-0.5"
        }`}
      >
        <polyline points={isShowingMore ? "18 15 12 9 6 15" : "6 9 12 15 18 9"}></polyline>
      </svg>
    </span>
    <span
      className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full"
      style={{ background: `linear-gradient(90deg, ${THEME.gradFrom}, ${THEME.gradTo})` }}
    />
  </button>
);
ToggleButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  isShowingMore: PropTypes.bool.isRequired,
};

function TabPanel({ children, value, index, ...other }) {
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && (
        <Box sx={{ p: { xs: 1, sm: 3 } }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return { id: `full-width-tab-${index}`, "aria-controls": `full-width-tabpanel-${index}` };
}

/* ================= Data ================= */
const techStacks = [
  { icon: "html.svg", language: "HTML" },
  { icon: "css.svg", language: "CSS" },
  { icon: "javascript.svg", language: "JavaScript" },
  { icon: "tailwind.svg", language: "Tailwind CSS" },
  { icon: "reactjs.svg", language: "ReactJS" },
  { icon: "vite.svg", language: "Vite" },
  { icon: "nodejs.svg", language: "Node JS" },
  { icon: "bootstrap.svg", language: "Bootstrap" },
  { icon: "PHP2.svg", language: "PHP" },
  { icon: "flutter.svg", language: "Flutter" },
  { icon: "Dart.svg", language: "Dart" },
  { icon: "python.svg", language: "Python" },
  { icon: "next.svg", language: "Next.js" },
  { icon: "figma.svg", language: "Figma" },
  { icon: "sql.svg", language: "SQL" },
];

/* ================= Component ================= */
export default function FullWidthTabs() {
  const [value, setValue] = useState(0);
  const [projects, setProjects] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showAllCertificates, setShowAllCertificates] = useState(false);

  // SSR-safe
  const [initialItems, setInitialItems] = useState(6);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setInitialItems(window.innerWidth < 768 ? 4 : 6);
    }
  }, []);

  useEffect(() => {
    AOS.init({ once: false });
  }, []);

  const fetchData = useCallback(async () => {
    try {
      const [projectsResponse, certificatesResponse] = await Promise.all([
        supabase.from("projects").select("*").order("id", { ascending: true }),
        supabase.from("certificates").select("*").order("id", { ascending: true }),
      ]);
      if (projectsResponse.error) throw projectsResponse.error;
      if (certificatesResponse.error) throw certificatesResponse.error;

      const projectData = projectsResponse.data || [];
      const certificateData = certificatesResponse.data || [];
      setProjects(projectData);
      setCertificates(certificateData);
      localStorage.setItem("projects", JSON.stringify(projectData));
      localStorage.setItem("certificates", JSON.stringify(certificateData));
    } catch (error) {
      console.error("Error fetching data from Supabase:", error?.message || error);
    }
  }, []);

  useEffect(() => {
    try {
      const cachedP = localStorage.getItem("projects");
      const cachedC = localStorage.getItem("certificates");
      if (cachedP) setProjects(JSON.parse(cachedP));
      if (cachedC) setCertificates(JSON.parse(cachedC));
    } catch {}
    fetchData();
  }, [fetchData]);

  const handleChange = (_e, newValue) => setValue(newValue);
  const toggleShowMore = useCallback((type) => {
    if (type === "projects") setShowAllProjects((p) => !p);
    else setShowAllCertificates((p) => !p);
  }, []);

  const displayedProjects = useMemo(
    () => (showAllProjects ? projects : projects.slice(0, initialItems)),
    [showAllProjects, projects, initialItems]
  );
  const displayedCertificates = useMemo(
    () => (showAllCertificates ? certificates : certificates.slice(0, initialItems)),
    [showAllCertificates, certificates, initialItems]
  );

  // เพิ่มทางลัดคีย์บอร์ด ซ้าย/ขวา
  const onTabsKeyDown = useCallback(
    (e) => {
      if (e.key === "ArrowRight") setValue((v) => (v + 1) % 3);
      if (e.key === "ArrowLeft") setValue((v) => (v + 3 - 1) % 3);
    },
    []
  );

  return (
    <div
      id="Portofolio"
      className="relative w-full sm:mt-0 mt-[3rem] overflow-hidden md:px-[10%] px-[5%]"
      style={{ backgroundColor: THEME.bg }}
    >
      {/* ==== BG Layer (แดง/ชมพู นุ่มๆ) ==== */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgba(255,2,2,0.06) 0%, rgba(247,85,217,0.04) 100%)",
          }}
        />
        <div
          className="absolute -top-40 -left-40 w-[520px] h-[520px] rounded-full blur-3xl opacity-25"
          style={{ background: "radial-gradient(closest-side, #ff0202 0%, transparent 70%)" }}
        />
        <div
          className="absolute top-1/3 -right-32 w-[560px] h-[560px] rounded-full blur-3xl opacity-20"
          style={{ background: "radial-gradient(closest-side, #f755d9 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-40 opacity-25"
          style={{
            background: "linear-gradient(0deg, rgba(247,85,217,0.18) 0%, rgba(247,85,217,0) 100%)",
          }}
        />
      </div>

      {/* ===== Header ===== */}
      <div className="text-center pb-10" data-aos="fade-up" data-aos-duration="1000">
        <h2 className="inline-block text-3xl md:text-5xl font-bold text-center mx-auto text-transparent bg-clip-text">
          <span
            style={{
              backgroundImage: `linear-gradient(45deg, ${THEME.gradFrom} 10%, ${THEME.gradTo} 93%)`,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Portfolio Showcase
          </span>
        </h2>
        <p className="text-slate-300 max-w-2xl mx-auto text-sm md:text-base mt-2">
          Explore my journey through projects, certifications, and technical expertise.
          Each section represents a milestone in my continuous learning path.
        </p>
      </div>

      <Box sx={{ width: "100%" }}>
        {/* ===== Tabs (Glass + Glow) ===== */}
        <AppBar
          position="static"
          elevation={0}
          sx={{
            bgcolor: "transparent",
            border: `1px solid ${THEME.glassStroke}`,
            borderRadius: "20px",
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              inset: 0,
              background: THEME.glassFill,
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              zIndex: 0,
            },
          }}
          className="md:px-4"
        >
          <Tabs
            value={value}
            onChange={handleChange}
            onKeyDown={onTabsKeyDown}
            textColor="secondary"
            indicatorColor="secondary"
            variant="fullWidth"
            sx={{
              minHeight: "70px",
              "& .MuiTabs-indicator": { height: 0 },
              "& .MuiTabs-flexContainer": { gap: "8px" },
              "& .MuiTab-root": {
                fontSize: { xs: "0.9rem", md: "1rem" },
                fontWeight: 600,
                color: THEME.textMuted,
                textTransform: "none",
                transition: "all .4s cubic-bezier(0.4,0,0.2,1)",
                padding: "20px 0",
                zIndex: 1,
                margin: "8px",
                borderRadius: "12px",
                "&:hover": {
                  color: THEME.text,
                  backgroundColor: THEME.hoverTint,
                  transform: "translateY(-2px)",
                  "& .lucide": { transform: "scale(1.1) rotate(5deg)" },
                },
                "&.Mui-selected": {
                  color: THEME.text,
                  background: THEME.selectTint,
                  boxShadow: `0 4px 15px -3px ${THEME.shadowTint}`,
                  "& .lucide": { color: THEME.gradTo },
                },
              },
            }}
          >
            <Tab icon={<Code className="mb-2 w-5 h-5 transition-all duration-300" />} label="Projects" {...a11yProps(0)} />
            <Tab icon={<Award className="mb-2 w-5 h-5 transition-all duration-300" />} label="Certificates" {...a11yProps(1)} />
            <Tab icon={<Boxes className="mb-2 w-5 h-5 transition-all duration-300" />} label="Tech Stack" {...a11yProps(2)} />
          </Tabs>
        </AppBar>

        {/* ===== Panels (ไม่ใช้ react-swipeable-views แล้ว) ===== */}
        {/* Projects */}
        <TabPanel value={value} index={0}>
          <div className="container mx-auto flex justify-center items-center overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-5">
              {displayedProjects.map((project, index) => (
                <div
                  key={project.id || index}
                  data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                  data-aos-duration={index % 3 === 1 ? "1200" : "1000"}
                >
                  <CardProject
                    Img={project.Img}
                    Title={project.Title}
                    Description={project.Description}
                    Link={project.Link}
                    id={project.id}
                  />
                </div>
              ))}
            </div>
          </div>

          {projects.length > initialItems && (
            <div className="mt-6 w-full flex justify-start">
              <ToggleButton onClick={() => toggleShowMore("projects")} isShowingMore={showAllProjects} />
            </div>
          )}
        </TabPanel>

        {/* Certificates */}
        <TabPanel value={value} index={1}>
          <div className="container mx-auto flex justify-center items-center overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {displayedCertificates.map((certificate, index) => (
                <div
                  key={certificate.id || index}
                  data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                  data-aos-duration={index % 3 === 1 ? "1200" : "1000"}
                >
                  <Certificate ImgSertif={certificate.Img} />
                </div>
              ))}
            </div>
          </div>

          {certificates.length > initialItems && (
            <div className="mt-6 w-full flex justify-start">
              <ToggleButton onClick={() => toggleShowMore("certificates")} isShowingMore={showAllCertificates} />
            </div>
          )}
        </TabPanel>

        {/* Tech Stack */}
        <TabPanel value={value} index={2}>
          <div className="container mx-auto flex justify-center items-center overflow-hidden pb-[5%]">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 lg:gap-8 gap-5">
              {techStacks.map((stack, index) => (
                <div
                  key={index}
                  data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                  data-aos-duration={index % 3 === 1 ? "1200" : "1000"}
                >
                  <TechStackIcon TechStackIcon={stack.icon} Language={stack.language} />
                </div>
              ))}
            </div>
          </div>
        </TabPanel>
      </Box>
    </div>
  );
}
