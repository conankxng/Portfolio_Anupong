import React, { useEffect, memo, useMemo } from "react";
import { FileText, Code, Award, Globe, ArrowUpRight, Sparkles } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

/* ====== สีธีมหลักโทนแดง/ชมพู ====== */
const GRADIENT_TXT = "bg-[linear-gradient(45deg,_#ff0202_10%,_#f755d9_93%)]";
const GRADIENT_SOFT = "from-[#ff0202]/10 via-transparent to-[#f755d9]/10";
const GRADIENT_CARD = "from-[#ff3b3b] to-[#f755d9]";
const BRAND_FILL = "text-[#ff4d4f]";

/* ====== Header ====== */
const Header = memo(() => (
  <div className="text-center lg:mb-8 mb-2 px-[5%]">
    <div className="inline-block relative group">
      <h2
        className={`text-4xl md:text-5xl font-bold text-transparent bg-clip-text ${GRADIENT_TXT}`}
        data-aos="zoom-in-up"
        data-aos-duration="600"
      >
        About Me
      </h2>
    </div>

    <p
      className="mt-2 text-gray-400 max-w-2xl mx-auto text-base sm:text-lg flex items-center justify-center gap-2"
      data-aos="zoom-in-up"
      data-aos-duration="800"
    >
      <Sparkles className={`w-5 h-5 ${BRAND_FILL}`} />
      Transforming ideas into digital experiences
      <Sparkles className={`w-5 h-5 ${BRAND_FILL}`} />
    </p>
  </div>
));

/* ====== Profile Image ====== */
const ProfileImage = memo(() => (
  <div className="flex justify-end items-center sm:p-12 sm:py-0 sm:pb-0 p-0 py-2 pb-2">
    <div className="relative group" data-aos="fade-up" data-aos-duration="1000">
      {/* วงแสงด้านหลัง (เดสก์ท็อป) */}
      <div className="absolute -inset-6 opacity-25 z-0 hidden sm:block">
        <div className="absolute inset-0 bg-gradient-to-r from-rose-600 via-pink-500 to-fuchsia-600 rounded-full blur-2xl animate-spin-slower" />
        <div className="absolute inset-0 bg-gradient-to-l from-red-500 via-rose-500 to-pink-600 rounded-full blur-2xl animate-pulse-slow opacity-50" />
        <div className={`absolute inset-0 bg-gradient-to-t ${GRADIENT_SOFT} rounded-full blur-2xl animate-float opacity-60`} />
      </div>

      <div className="relative">
        <div className="w-72 h-72 sm:w-80 sm:h-80 rounded-full overflow-hidden shadow-[0_0_40px_rgba(255,77,79,0.25)] transition-all duration-700 group-hover:scale-105">
          <div className="absolute inset-0 border-4 border-white/15 rounded-full z-20 transition-all duration-700 group-hover:border-white/35 group-hover:scale-105" />

          {/* overlay hover (เดสก์ท็อป) */}

          <div className="absolute inset-0 bg-gradient-to-t from-rose-500/20 via-transparent to-pink-500/20 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 hidden sm:block" />

          <img
            src="/Photo.jpg"
            alt="Profile"
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-2"
            loading="lazy"
          />

          {/* เส้นวิบวับ/กรอบ (เดสก์ท็อป) */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 z-20 hidden sm:block">
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-white/10 to-transparent transform translate-y-full group-hover:-translate-y-full transition-transform duration-1000 delay-100" />
            <div className="absolute inset-0 rounded-full border-8 border-white/10 scale-0 group-hover:scale-100 transition-transform duration-700 animate-pulse-slow" />
          </div>
        </div>
      </div>
    </div>
  </div>
));

/* ====== การ์ดสถิติ ====== */
const StatCard = memo(({ icon: Icon, color, value, label, description, animation }) => (
  <div data-aos={animation} data-aos-duration={1300} className="relative group">
    <div className="relative z-10 bg-gray-900/50 backdrop-blur-lg rounded-2xl p-6 border border-white/10 overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl h-full flex flex-col justify-between">
      <div className={`absolute -z-10 inset-0 bg-gradient-to-br ${color} opacity-15 group-hover:opacity-25 transition-opacity duration-300`} />
      <div className="flex items-center justify-between mb-4">
        <div className="w-16 h-16 rounded-full flex items-center justify-center bg-white/10 transition-transform group-hover:rotate-6">
          <Icon className="w-8 h-8 text-white" />
        </div>
        <span className="text-4xl font-bold text-white">{value}</span>
      </div>

      <div>
        <p className="text-sm uppercase tracking-wider text-gray-300 mb-2">{label}</p>
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-400">{description}</p>
          <ArrowUpRight className="w-4 h-4 text-white/50 group-hover:text-white transition-colors" />
        </div>
      </div>
    </div>
  </div>
));

/* ====== หน้า About ====== */
const AboutPage = () => {
  // ดึงค่าจาก localStorage และคำนวณประสบการณ์
  const { totalProjects, totalCertificates, YearExperience } = useMemo(() => {
    const storedProjects = JSON.parse(localStorage.getItem("projects") || "[]");
    const storedCertificates = JSON.parse(localStorage.getItem("certificates") || "[]");

    const startDate = new Date("2021-11-06");
    const today = new Date();
    const experience =
      today.getFullYear() -
      startDate.getFullYear() -
      (today < new Date(today.getFullYear(), startDate.getMonth(), startDate.getDate()) ? 1 : 0);

    return {
      totalProjects: storedProjects.length,
      totalCertificates: storedCertificates.length,
      YearExperience: experience,
    };
  }, []);

  // ตั้งค่า AOS + debounce resize (JS เวอร์ชัน)
  useEffect(() => {
    const initAOS = () => {
      AOS.init({ once: false });
    };

    initAOS();

    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (typeof AOS?.refreshHard === "function") AOS.refreshHard();
        else AOS.refresh();
      }, 250);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  // ข้อมูลการ์ดสถิติ (โทนแดง/ชมพู)
  const statsData = useMemo(
    () => [
      {
        icon: Code,
        color: "from-[#ff3b3b] to-[#f755d9]",
        value: totalProjects,
        label: "Total Projects",
        description: "Innovative web solutions crafted",
        animation: "fade-right",
      },
      {
        icon: Award,
        color: "from-[#f755d9] to-[#ff3b3b]",
        value: totalCertificates,
        label: "Certificates",
        description: "Professional skills validated",
        animation: "fade-up",
      },
      {
        icon: Globe,
        color: "from-[#ff3b3b] to-[#f755d9]",
        value: YearExperience,
        label: "Years of Experience",
        description: "Continuous learning journey",
        animation: "fade-left",
      },
    ],
    [totalProjects, totalCertificates, YearExperience]
  );

  return (
    <div className="h-auto pb-[10%] text-white overflow-hidden px-[5%] sm:px-[5%] lg:px-[10%] mt-10 sm-mt-0" id="About">
      <Header />

      <div className="w-full mx-auto pt-8 sm:pt-12 relative">
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* ====== คอลัมน์ข้อความ ====== */}
          <div className="space-y-6 text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold" data-aos="fade-right" data-aos-duration="1000">
              <span className={`text-transparent bg-clip-text bg-gradient-to-r from-[#ff0202] to-[#f755d9]`}>
                Hello, I&apos;m
              </span>
              <span className="block mt-2 text-gray-200" data-aos="fade-right" data-aos-duration="1300">
                Anupong Phonjanthuk
              </span>
            </h2>

            <p
              className="text-base sm:text-lg lg:text-xl text-gray-400 leading-relaxed text-left lg:text-justify pb-4 sm:pb-0"
              data-aos="fade-right"
              data-aos-duration="1500"
            >
              Hello, my name is Anupong Phonjanthuk. <br className="block lg:hidden" />I am currently studying at Silpakorn University, Faculty of Digital Technology for Business. <br className="block lg:hidden" />I enjoy learning and studying the development of various technologies. <br className="block lg:hidden" />I have skills in web and application development.
            </p>

            {/* ====== กล่อง Quote (โทนแดง/ชมพู) ====== */}
            <div
              className={`relative bg-gradient-to-br ${GRADIENT_SOFT} border border-rose-400/30 rounded-2xl p-4 my-6 backdrop-blur-md shadow-2xl overflow-hidden`}
              data-aos="fade-up"
              data-aos-duration="1700"
            >
              <div className="absolute top-2 right-4 w-16 h-16 bg-gradient-to-r from-rose-400/25 to-pink-400/25 rounded-full blur-xl" />
              <div className="absolute -bottom-4 -left-2 w-12 h-12 bg-gradient-to-r from-pink-400/25 to-rose-400/25 rounded-full blur-lg" />

              <div className="absolute top-3 left-4 text-rose-400/70">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
                </svg>
              </div>

              <blockquote className="text-gray-300 text-center lg:text-left italic font-medium text-sm relative z-10 pl-6">
                &quot;Leveraging AI as a professional tool, not a replacement.&quot;
              </blockquote>
            </div>

            {/* ====== ปุ่ม CTA ====== */}
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4 w-full">
              <a href="https://drive.google.com/drive/folders/1BOm51Grsabb3zj6Xk27K-iRwI1zITcpo" className="w-full lg:w-auto">
                <button
                  data-aos="fade-up"
                  data-aos-duration="800"
                  className={`w-full lg:w-auto sm:px-6 py-2 sm:py-3 rounded-lg bg-gradient-to-r ${GRADIENT_CARD} text-white font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl`}
                >
                  <FileText className="w-4 h-4 sm:w-5 sm:h-5" /> Download CV
                </button>
              </a>

              <a href="#Portofolio" className="w-full lg:w-auto">
                <button
                  data-aos="fade-up"
                  data-aos-duration="1000"
                  className="w-full lg:w-auto sm:px-6 py-2 sm:py-3 rounded-lg border border-rose-400/50 text-rose-300 font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 hover:bg-rose-500/10"
                >
                  <Code className="w-4 h-4 sm:w-5 sm:h-5" /> View Projects
                </button>
              </a>
            </div>
          </div>

          {/* ====== รูปโปรไฟล์ ====== */}
          <ProfileImage />
        </div>

        {/* ====== การ์ดสถิติ ====== */}
        <a href="#Portofolio">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 cursor-pointer">
            {statsData.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </div>
        </a>
      </div>

      {/* keyframes เพิ่มเติมสำหรับเอฟเฟกต์ */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes spin-slower {
          to { transform: rotate(360deg); }
        }
        .animate-pulse-slow { animation: pulse 3s infinite; }
        .animate-spin-slower { animation: spin-slower 8s linear infinite; }
      `}</style>
    </div>
  );
};

export default memo(AboutPage);
