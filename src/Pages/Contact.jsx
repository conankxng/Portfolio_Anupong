import React, { useState, useEffect } from "react";
import { Share2, User, Mail, MessageSquare, Send } from "lucide-react";
import SocialLinks from "../components/SocialLinks";
import Komentar from "../components/Commentar";
import Swal from "sweetalert2";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";

/* ========= THEME (แดง/ชมพู) ========= */
const THEME = {
  bg: "#100008",
  gradFrom: "#ff0202",
  gradTo: "#f755d9",
  glassStroke: "rgba(255,255,255,0.10)",
  glassFill:
    "linear-gradient(180deg, rgba(255,8,8,0.06) 0%, rgba(247,85,217,0.06) 100%)",
  hoverTint: "rgba(255,77,79,0.10)",
  ring: "rgba(255,2,2,0.35)",
  text: "#ffffff",
  textMuted: "#cbd5e1",
};

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    AOS.init({ once: false });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  Swal.fire({
    title: "Mengirim Pesan...",
    html: "Harap tunggu selagi kami mengirim pesan Anda",
    allowOutsideClick: false,
    didOpen: () => Swal.showLoading(),
    background: THEME.bg,
    color: THEME.text,
  });

  try {
    const formSubmitUrl = "https://formsubmit.co/ajax/ariyayam2429@gmail.com";

    await axios.post(
      formSubmitUrl,
      {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        _replyto: formData.email,            // ✅ ตอบกลับหาผู้ส่งได้ทันที
        _subject: "Pesan Baru dari Website Portfolio",
        _captcha: "false",
        _template: "table",
        _honey: "",                          // ✅ honeypot (ปล่อยว่างไว้)
        // _next: "https://your-site.com/thanks", // (ถ้าต้องการ redirect)
      },
      {
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        timeout: 15000,
      }
    );

    Swal.close();
    await Swal.fire({
      title: "Berhasil!",
      text: "Pesan Anda telah berhasil terkirim!",
      icon: "success",
      confirmButtonColor: THEME.gradFrom,
      background: THEME.bg,
      color: THEME.text,
      timer: 2000,
      timerProgressBar: true,
    });

    setFormData({ name: "", email: "", message: "" });
  } catch (error) {
    Swal.close();

    console.error("FormSubmit error:", {
      status: error?.response?.status,
      data: error?.response?.data,
      message: error?.message,
    });

    const needsVerify =
      error?.response?.status === 422 ||
      /verify/i.test(error?.response?.data?.message || "");

    await Swal.fire({
      title: "Gagal!",
      html: needsVerify
        ? "Akun FormSubmit Anda perlu verifikasi email dulu. Cek inbox <b>ariyayam2429@gmail.com</b> lalu klik tombol verifikasi."
        : "Terjadi kesalahan saat mengirim. Coba lagi nanti.",
      icon: "error",
      confirmButtonColor: THEME.gradFrom,
      background: THEME.bg,
      color: THEME.text,
    });
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <div
      className="relative px-[5%] sm:px-[5%] lg:px-[10%] overflow-hidden"
      style={{ backgroundColor: THEME.bg }}
    >
      {/* BG glow layer */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{ backgroundImage: THEME.glassFill, filter: "blur(0.5px)" }}
        />
        <div
          className="absolute -top-32 -left-24 w-[520px] h-[520px] rounded-full blur-3xl opacity-25"
          style={{
            background: `radial-gradient(closest-side, ${THEME.gradFrom} 0%, transparent 70%)`,
          }}
        />
        <div
          className="absolute bottom-[-6rem] right-[-6rem] w-[620px] h-[620px] rounded-full blur-3xl opacity-20"
          style={{
            background: `radial-gradient(closest-side, ${THEME.gradTo} 0%, transparent 70%)`,
          }}
        />
      </div>

      {/* Header */}
      <div className="text-center lg:mt-[5%] mt-10 mb-2 sm:px-0 px-[5%]">
        <h2
          data-aos="fade-down"
          data-aos-duration="1000"
          className="inline-block text-3xl md:text-5xl font-bold text-center mx-auto text-transparent bg-clip-text"
          style={{
            backgroundImage: `linear-gradient(45deg, ${THEME.gradFrom} 10%, ${THEME.gradTo} 93%)`,
          }}
        >
          Can talk and inquire
        </h2>
        <p
          data-aos="fade-up"
          data-aos-duration="1100"
          className="max-w-2xl mx-auto text-sm md:text-base mt-2"
          style={{ color: THEME.textMuted }}
        >
          You can contact us below and we will get back to you right away.
        </p>
      </div>

      {/* Content */}
      <div
        className="h-auto py-10 flex items-center justify-center 2xl:pr-[3.1%] lg:pr-[3.8%] md:px-0"
        id="Contact"
      >
        <div className="container px-[1%] grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-[45%_55%] 2xl:grid-cols-[35%_65%] gap-12">
          {/* Form Card */}
          <div
            className="rounded-3xl p-5 py-10 sm:p-10 shadow-2xl transform transition-all duration-500"
            style={{
              background: "rgba(255,255,255,0.05)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: `1px solid ${THEME.glassStroke}`,
              boxShadow: `0 10px 40px -10px rgba(255,77,79,0.20)`,
            }}
          >
            <div className="flex justify-between items-start mb-8">
              <div>
                <h2
                  className="text-4xl font-bold mb-3 text-transparent bg-clip-text"
                  style={{
                    backgroundImage: `linear-gradient(90deg, ${THEME.gradFrom}, ${THEME.gradTo})`,
                  }}
                >
                  Contact us
                </h2>
                <p style={{ color: THEME.textMuted }}>
                  Ada yang ingin didiskusikan? Kirim saya pesan dan mari kita bicara.
                </p>
              </div>
              <Share2 className="w-10 h-10 opacity-70" style={{ color: THEME.gradFrom }} />
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div data-aos="fade-up" data-aos-delay="100" className="relative group">
                <User className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-focus-within:text-white transition-colors" />
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full p-4 pl-12 rounded-xl placeholder-gray-500 text-white focus:outline-none transition-all duration-300 disabled:opacity-50"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    border: `1px solid ${THEME.glassStroke}`,
                    boxShadow: "inset 0 0 0 0 transparent",
                  }}
                  onFocus={(e) => (e.currentTarget.style.boxShadow = `0 0 0 3px ${THEME.ring}`)}
                  onBlur={(e) => (e.currentTarget.style.boxShadow = "inset 0 0 0 0 transparent")}
                  required
                />
              </div>

              {/* Email */}
              <div data-aos="fade-up" data-aos-delay="200" className="relative group">
                <Mail className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-focus-within:text-white transition-colors" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full p-4 pl-12 rounded-xl placeholder-gray-500 text-white focus:outline-none transition-all duration-300 disabled:opacity-50"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    border: `1px solid ${THEME.glassStroke}`,
                  }}
                  onFocus={(e) => (e.currentTarget.style.boxShadow = `0 0 0 3px ${THEME.ring}`)}
                  onBlur={(e) => (e.currentTarget.style.boxShadow = "inset 0 0 0 0 transparent")}
                  required
                />
              </div>

              {/* Message */}
              <div data-aos="fade-up" data-aos-delay="300" className="relative group">
                <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-focus-within:text-white transition-colors" />
                <textarea
                  name="message"
                  placeholder="message"
                  value={formData.message}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full resize-none p-4 pl-12 rounded-xl placeholder-gray-500 text-white focus:outline-none transition-all duration-300 h-[9.9rem] disabled:opacity-50"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    border: `1px solid ${THEME.glassStroke}`,
                  }}
                  onFocus={(e) => (e.currentTarget.style.boxShadow = `0 0 0 3px ${THEME.ring}`)}
                  onBlur={(e) => (e.currentTarget.style.boxShadow = "inset 0 0 0 0 transparent")}
                  required
                />
              </div>

              {/* Submit */}
              <button
                data-aos="fade-up"
                data-aos-delay="400"
                type="submit"
                disabled={isSubmitting}
                className="w-full text-white py-4 rounded-xl font-semibold transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  backgroundImage: `linear-gradient(90deg, ${THEME.gradFrom}, ${THEME.gradTo})`,
                  boxShadow: `0 10px 25px -8px rgba(247,85,217,0.35)`,
                }}
              >
                <Send className="w-5 h-5" />
                {isSubmitting ? "Mengirim..." : "Anupong"}
              </button>
            </form>

            <div
              className="mt-10 pt-6 flex justify-center space-x-6"
              style={{ borderTop: `1px solid ${THEME.glassStroke}` }}
            >
              <SocialLinks />
            </div>
          </div>

          {/* Comment Card */}
          <div
            className="rounded-3xl p-3 py-3 md:p-10 md:py-8 shadow-2xl transform transition-all duration-500"
            style={{
              background: "rgba(255,255,255,0.05)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: `1px solid ${THEME.glassStroke}`,
              boxShadow: `0 10px 40px -10px rgba(247,85,217,0.20)`,
            }}
          >
            <Komentar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
