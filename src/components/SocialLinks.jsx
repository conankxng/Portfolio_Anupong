import { useEffect } from "react";
import {
  Linkedin,
  Github,
  Instagram,
  Youtube,
  ExternalLink,
  Facebook,
  
} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

/* ====== THEME (แดง-ชมพู) ====== */
const THEME = {
  bgCard: "#1a0f14",               // พื้นหลังการ์ด (ไม่ชน #100008)
  border: "rgba(255,255,255,0.10)",
  glass: "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(247,85,217,0.06) 45%, rgba(255,2,2,0.05) 100%)",
  gradFrom: "#ff0202",
  gradTo: "#f755d9",
  ring: "rgba(255,77,79,0.35)",
};

const socialLinks = [
  {
    name: "Facebook",
    displayName: "Facebook",
    subText: "Anupong Phonjanthuk",
    icon: Facebook,
    url: "https://www.facebook.com/profile.php?id=61557479425402",
    color: "#0A66C2",
    gradient: "from-[#0A66C2] to-[#0077B5]",
    isPrimary: true,
  },
  {
    name: "Instagram",
    displayName: "Instagram",
    subText: "@phonjanthuk.an",
    icon: Instagram,
    url: "https://www.instagram.com/phonjanthuk.an/",
    color: "#E4405F",
    gradient: "from-[#833AB4] via-[#E4405F] to-[#FCAF45]",
  },
{
  name: "LINE",
  displayName: "LINE",
  subText: "@Anupong", // ใส่ไอดีจริง
  icon: ({ className, ...props }) => (
    <img
      src="https://www.vectorlogo.zone/logos/line/line-icon.svg"
      alt="LINE"
      className={className}
      style={{ objectFit: "contain", display: "block" }}
      {...props}
    />
  ),
  url: "https://line.me/ti/p/Fu65vvjJ5H", // ลิงก์ Add Friend ของคุณ
  color: "#06C755",
  gradient: "from-[#06C755] to-[#06a84a]",
},


  {
    name: "GitHub",
    displayName: "Github",
    subText: "@conankxng",
    icon: Github,
    url: "https://github.com/conankxng",
    color: "#ffffff",
    gradient: "from-[#333] to-[#24292e]",
  },
  {
  name: "Discord",
  displayName: "Discord",
  subText: "Join my server",
  icon: ({ className, ...props }) => (
    <svg
      viewBox="0 0 24 24"
      className={className}
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Discord"
    >
      <path
        fill="#5865F2"
        d="M20.317 4.369a19.791 19.791 0 00-4.885-1.515.07.07 0 00-.073.035c-.211.375-.444.864-.608 1.249a18.27 18.27 0 00-5.453 0 12.266 12.266 0 00-.617-1.249.077.077 0 00-.073-.035 19.736 19.736 0 00-4.885 1.515.064.064 0 00-.03.025C1.275 9.09.78 13.682 1.076 18.222a.082.082 0 00.031.057 19.9 19.9 0 006.002 3.038.073.073 0 00.079-.027c.462-.63.873-1.295 1.226-1.993a.073.073 0 00-.04-.101c-.657-.249-1.283-.558-1.874-.92a.073.073 0 01-.007-.121c.125-.094.251-.193.371-.292a.07.07 0 01.073-.01c3.927 1.801 8.18 1.801 12.06 0a.07.07 0 01.074.009c.12.1.246.199.372.293a.073.073 0 01-.006.12 12.3 12.3 0 01-1.875.92.073.073 0 00-.04.102c.36.698.77 1.363 1.226 1.993a.073.073 0 00.079.028 19.876 19.876 0 006.002-3.04.082.082 0 00.032-.056c.5-6.177-.84-10.738-3.548-13.827a.06.06 0 00-.028-.023zM8.02 15.558c-1.183 0-2.155-1.087-2.155-2.426 0-1.338.956-2.426 2.155-2.426 1.21 0 2.173 1.098 2.155 2.426 0 1.339-.955 2.426-2.155 2.426zm7.966 0c-1.183 0-2.155-1.087-2.155-2.426 0-1.338.956-2.426 2.155-2.426 1.21 0 2.173 1.098 2.155 2.426 0 1.339-.955 2.426-2.155 2.426z"
      />
    </svg>
  ),
  url: "https://discord.gg/4KEjndtQ7Z",
  color: "#5865F2",
  gradient: "from-[#5865F2] to-[#4752C4]",
},

];

const SocialLinks = () => {
  const linkedIn = socialLinks.find((l) => l.isPrimary);
  const otherLinks = socialLinks.filter((l) => !l.isPrimary);
  const [instagram, youtube, github, tiktok] = otherLinks;

  useEffect(() => {
    AOS.init({ once: false, offset: 10 });
  }, []);

  /* การ์ดลิงก์ (reuse) */
  const LinkCard = ({ link, delay = 0, dense = false }) => (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        group relative flex items-center ${dense ? "gap-3 p-4 rounded-xl" : "justify-between p-5 rounded-2xl"}
        overflow-hidden transition-all duration-500
        border
        `}
      style={{
        backgroundColor: THEME.bgCard,
        borderColor: THEME.border,
        boxShadow: "0 14px 48px -14px rgba(247,85,217,0.22)",
      }}
      data-aos="fade-up"
      data-aos-delay={delay}
    >
      {/* glass overlay */}
      <div
        className="absolute inset-0 opacity-40 group-hover:opacity-55 transition-opacity duration-500"
        style={{ background: THEME.glass }}
      />
      {/* hover gradient tint */}
      <div
        className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-r ${link.gradient}`}
      />
      {/* ring on hover */}
      <div className="absolute inset-0 rounded-2xl ring-0 ring-transparent group-hover:ring-2 transition-[box-shadow] duration-300"
           style={{ boxShadow: `inset 0 0 0 0 ${THEME.ring}` }} />

      {/* left: icon + text */}
      <div className="relative flex items-center gap-4">
        <div className="relative flex items-center justify-center">
          <div
            className="absolute inset-0 opacity-20 rounded-md transition-all duration-500 group-hover:scale-110 group-hover:opacity-30"
            style={{ backgroundColor: link.color }}
          />
          <div className="relative p-2 rounded-md">
            <link.icon
              className={`${dense ? "w-5 h-5" : "w-6 h-6"} transition-all duration-500 group-hover:scale-110`}
              style={{ color: link.color }}
            />
          </div>
        </div>

        <div className="flex flex-col min-w-0">
          <span className={`${dense ? "text-sm" : "text-lg"} font-bold text-gray-200 leading-none group-hover:text-white transition-colors duration-300`}>
            {link.displayName}
          </span>
          <span className={`${dense ? "text-xs" : "text-sm"} text-gray-400 truncate group-hover:text-gray-300 transition-colors duration-300`}>
            {link.subText}
          </span>
        </div>
      </div>

      {/* right: external icon */}
      {!dense && (
        <ExternalLink
          className="relative w-5 h-5 text-gray-500 group-hover:text-white
                     opacity-0 group-hover:opacity-100 transition-all duration-300
                     transform -translate-x-1 group-hover:translate-x-0"
        />
      )}

      {/* shine sweep */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent
                     -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
        />
      </div>
    </a>
  );

  return (
    <div
      className="w-full rounded-3xl p-6 sm:p-7 lg:p-8"
      style={{
        background: `linear-gradient(180deg, rgba(255,8,8,0.06) 0%, rgba(247,85,217,0.06) 100%)`,
        border: `1px solid ${THEME.border}`,
        boxShadow: "0 18px 60px -16px rgba(255,2,2,0.22)",
      }}
    >
      <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2" data-aos="fade-down">
        <span
          className="inline-block w-8 h-1 rounded-full"
          style={{ background: `linear-gradient(90deg, ${THEME.gradFrom}, ${THEME.gradTo})` }}
        />
        Connect With Me
      </h3>

      <div className="flex flex-col gap-4">
        {/* Primary row */}
        <LinkCard link={linkedIn} delay={100} />

        {/* Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <LinkCard link={instagram} delay={200} dense />
          <LinkCard link={youtube} delay={300} dense />
        </div>

        {/* Row 3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <LinkCard link={github} delay={400} dense />
          <LinkCard link={tiktok} delay={500} dense />
        </div>
      </div>
    </div>
  );
};

export default SocialLinks;
