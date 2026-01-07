import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Github, Globe, User } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

/* ============== THEME ============== */
const THEME = {
  bg: '#100008',
  gradFrom: '#ff0202',
  gradTo: '#f755d9',
  softLayerA: 'rgba(255, 2, 2, 0.17)',
  softLayerB: 'rgba(247, 85, 217, 0.17)',
  textLight: '#ffffff',
  textDim: '#cbd5e1',
};

const TypewriterEffect = ({ text }) => {
  const [displayText, setDisplayText] = useState('');
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= text.length) {
        setDisplayText(text.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 260);
    return () => clearInterval(timer);
  }, [text]);

  return (
    <span className="inline-block">
      {displayText}
      <span
        className="ml-0.5"
        style={{
          animation: 'pulse 1.2s ease-in-out infinite',
          backgroundImage: `linear-gradient(45deg, ${THEME.gradFrom}, ${THEME.gradTo})`,
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
        }}
      >
        |
      </span>
    </span>
  );
};

const BackgroundEffect = () => (
  <div className="absolute inset-0 overflow-hidden">
    {/* ชั้นไล่สีอ่อนทั่วหน้า */}
    <div
      className="absolute inset-0"
      style={{
        backgroundImage: `linear-gradient(180deg, ${THEME.softLayerA} 0%, ${THEME.softLayerB} 100%)`,
        filter: 'blur(0.5px)',
      }}
    />
    {/* วงเรืองซ้ายบน */}
    <div
      className="absolute -top-40 -left-40 w-[520px] h-[520px] rounded-full blur-3xl opacity-25"
      style={{
        background: `radial-gradient(closest-side, ${THEME.gradFrom} 0%, transparent 70%)`,
      }}
    />
    {/* วงเรืองขวาล่าง */}
    <div
      className="absolute bottom-[-6rem] right-[-6rem] w-[600px] h-[600px] rounded-full blur-3xl opacity-20"
      style={{
        background: `radial-gradient(closest-side, ${THEME.gradTo} 0%, transparent 70%)`,
      }}
    />
  </div>
);

const IconButton = ({ Icon }) => (
  <div className="relative group hover:scale-110 transition-transform duration-300">
    <div
      className="absolute -inset-2 rounded-full blur opacity-40 group-hover:opacity-80 transition duration-300"
      style={{
        backgroundImage: `linear-gradient(90deg, ${THEME.gradFrom}, ${THEME.gradTo})`,
      }}
    />
    <div className="relative p-2 sm:p-3 bg-black/40 backdrop-blur-md rounded-full border border-white/10">
      <Icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" style={{ color: THEME.textLight }} />
    </div>
  </div>
);

const WelcomeScreen = ({ onLoadingComplete }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: false,
    });

    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => {
        onLoadingComplete?.();
      }, 1000);
    }, 4000);

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  const containerVariants = {
    exit: {
      opacity: 0,
      scale: 1.1,
      filter: 'blur(10px)',
      transition: {
        duration: 0.8,
        ease: 'easeInOut',
        when: 'beforeChildren',
        staggerChildren: 0.1,
      },
    },
  };

  const childVariants = {
    exit: {
      y: -20,
      opacity: 0,
      transition: { duration: 0.4, ease: 'easeInOut' },
    },
  };

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0"
          style={{ backgroundColor: THEME.bg }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit="exit"
          variants={containerVariants}
        >
          <BackgroundEffect />

          <div className="relative min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-4xl mx-auto">
              {/* Icons */}
              <motion.div
                className="flex justify-center gap-3 sm:gap-4 md:gap-8 mb-6 sm:mb-8 md:mb-12"
                variants={childVariants}
              >
                {[Code2, User, Github].map((Icon, index) => (
                  <div key={index} data-aos="fade-down" data-aos-delay={index * 200}>
                    <IconButton Icon={Icon} />
                  </div>
                ))}
              </motion.div>

              {/* Welcome Text */}
              <motion.div className="text-center mb-6 sm:mb-8 md:mb-12" variants={childVariants}>
                <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold space-y-2 sm:space-y-4">
                  <div className="mb-2 sm:mb-4">
                    <span
                      data-aos="fade-right"
                      data-aos-delay="200"
                      className="inline-block px-2 bg-clip-text text-transparent"
                      style={{
                        backgroundImage: 'linear-gradient(45deg, #ffffff, #ffe3e3)',
                      }}
                    >
                      Welcome
                    </span>{' '}
                    <span
                      data-aos="fade-right"
                      data-aos-delay="400"
                      className="inline-block px-2 bg-clip-text text-transparent"
                      style={{
                        backgroundImage: 'linear-gradient(45deg, #ffffff, #ffe3e3)',
                      }}
                    >
                      To
                    </span>{' '}
                    <span
                      data-aos="fade-right"
                      data-aos-delay="600"
                      className="inline-block px-2 bg-clip-text text-transparent"
                      style={{
                        backgroundImage: 'linear-gradient(45deg, #ffffff, #ffe3e3)',
                      }}
                    >
                      My
                    </span>
                  </div>
                  <div>
                    <span
                      data-aos="fade-up"
                      data-aos-delay="800"
                      className="inline-block px-2 bg-clip-text text-transparent"
                      style={{
                        backgroundImage: `linear-gradient(45deg, ${THEME.gradFrom}, ${THEME.gradTo})`,
                      }}
                    >
                      Portfolio
                    </span>{' '}
                    <span
                      data-aos="fade-up"
                      data-aos-delay="1000"
                      className="inline-block px-2 bg-clip-text text-transparent"
                      style={{
                        backgroundImage: `linear-gradient(45deg, ${THEME.gradFrom}, ${THEME.gradTo})`,
                      }}
                    >
                      Website
                    </span>
                  </div>
                </h1>
              </motion.div>

              {/* Website Link */}
              <motion.div
                className="text-center"
                variants={childVariants}
                data-aos="fade-up"
                data-aos-delay="1200"
              >
                <a
                  href="https://www.eki.fffffffffffmy.id"
                  className="inline-flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 rounded-full relative group hover:scale-105 transition-transform duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div
                    className="absolute inset-0 rounded-full blur-md group-hover:blur-lg transition-all duration-300"
                    style={{
                      backgroundImage: `linear-gradient(90deg, ${THEME.gradFrom}40, ${THEME.gradTo}40)`,
                    }}
                  />
                  <div className="relative flex items-center gap-2 text-lg sm:text-xl md:text-2xl">
                    <Globe className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: THEME.gradFrom }} />
                    <span
                      className="bg-clip-text text-transparent"
                      style={{
                        backgroundImage: `linear-gradient(45deg, ${THEME.gradFrom}, ${THEME.gradTo})`,
                      }}
                    >
                      <TypewriterEffect text="www.eki.ffffffffmy.id" />
                    </span>
                  </div>
                </a>
                <p className="mt-3 text-sm" style={{ color: THEME.textDim }}>
                  Press any key or wait a moment to enter
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeScreen;
