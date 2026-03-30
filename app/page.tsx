"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { RiGraduationCapFill } from "react-icons/ri";
import { PiCertificateFill } from "react-icons/pi";
import { SiCisco } from "react-icons/si";
import { TfiMicrosoftAlt } from "react-icons/tfi";
import { SiGmail } from "react-icons/si";
import { FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { SlBadge } from "react-icons/sl";
import { MdVerified } from "react-icons/md";
import { GrTest } from "react-icons/gr";
import emailjs from "emailjs-com";

import {
  FaHome,
  FaUser,
  FaAmazon,
  FaReact,
  FaPython,
  FaLaptopCode,
  FaEnvelope,
} from "react-icons/fa";

const menu = [
  { id: "home", icon: <FaHome /> },
  { id: "about", icon: <FaUser /> },
  { id: "education", icon: <RiGraduationCapFill /> },
  { id: "projects", icon: <FaLaptopCode /> },
  { id: "certifications", icon: <PiCertificateFill /> },
  { id: "contact", icon: <FaEnvelope /> },
];

const projects: Array<{
  id: number;
  title: string;
  description: string;
  media: Array<{ type: 'image' | 'video'; url: string; title: string }>;
  tech: string[];
  details: string[];
  challenges: string;
  results: string;
  link: string;
}> = [
  {
    id: 1,
    title: "Tek-up University network infrastructure and configuration",
    description: "Cisco devices configuration and infrastructure",
    media: [
      { type: "image", url: "/images/18844.jpg", title: "Topologiy" },
      { type: "image", url: "/images/18845.jpg", title: "Infrastructure" }
    ],
    tech: ["TCP/IP", "VLAN", "DHCP", "OSPF", "VPN", "NAT", "Cisco IOS", "ACL", "SUBNETTIGN"],
    details: [
      "Designed hierarchical network topology (Core, Distribution, Access layers)",
      "Configured VLAN segmentation for departments (HR, IT, Finance, Administration)",
      "Implemented Inter-VLAN routing using Layer 3 switch",
      "Configured OSPF dynamic routing between routers",
      "Deployed DHCP server for automatic IP address allocation",
      "Implemented Access Control Lists (ACLs) for traffic filtering and security",
      "Configured site-to-site VPN for secure remote connectivity",
      "Enabled NAT/PAT for internet access",
      "Configured SSH secure remote management for Cisco devices",
      "Performed network testing and troubleshooting using ping, traceroute and show commands"
    ],
    challenges: "Resolving routing inconsistencies and VLAN communication issues while maintaining minimal network downtime during configuration deployment.",
    results: "Achieved secure network segmentation, improved traffic management efficiency, and reduced broadcast traffic while ensuring stable connectivity across all departments.",
    link: "#"
  },
  {
    id: 2,
    title: "Personal Portfolio Website – Design, Development & Deployment",
    description: "Designed and developed a responsive personal portfolio website to showcase projects, certifications, and technical skills. Built using modern frontend technologies with performance optimization and clean UI/UX principles.",
    media: [
      { type: "image", url: "/images/port1.png", title: "Dashboard Demo" },
      { type: "image", url: "/images/port2.png", title: "Main Dashboard" },
      { type: "video", url: "/videos/port3.mp4", title: "Analytics Graphs" }
    ],
    tech: ["React", "Next.js", "JavaScript", "CSS", "Framer Motion", "Responsive Design", "Git", "GitHub", "Vercel Deployment"],
    details: [
      "Designed modern UI layout with fixed sidebar navigation",
      "Implemented responsive design compatible with desktop and mobile devices",
      "Developed reusable React components for scalability",
      "Integrated smooth animations using Framer Motion",
      "Created project showcase system with media gallery support",
      "Optimized website performance and loading speed",
      "Implemented clean routing and page structure using Next.js",
      "Deployed live application using Vercel cloud hosting",
      "Version control and CI workflow managed with Git and GitHub"
    ],
    challenges: "Maintaining responsive layout consistency while implementing complex animations and fixed sidebars across multiple screen sizes.",
    results: "Delivered a fast, professional online portfolio improving personal branding visibility and providing recruiters quick access to projects and certifications.",
    link: "#"
  },
];

export default function Home() {
  const [active, setActive] = useState("home");
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [selectedMedia, setSelectedMedia] = useState<{
    url: string;
    type: 'image' | 'video';
    title: string;
  } | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const nextProject = () => {
    setCurrentProjectIndex((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentProjectIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const goToProject = (index: number) => {
    setCurrentProjectIndex(index);
  };

  const openLightbox = (media: { url: string; type: 'image' | 'video'; title: string }) => {
    setSelectedMedia(media);
    setIsLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    setSelectedMedia(null);
    document.body.style.overflow = '';
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isLightboxOpen) {
        closeLightbox();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isLightboxOpen]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    const offsets: Record<string, number> = {
      home: 50,
      about: -150,
      education: -100,
      projects: -50,
      certifications: -40,
      contact: -90,
    };

    // Adjust offset for mobile
    const isMobile = window.innerWidth <= 768;
    let offset = offsets[id] ?? 80;
    if (isMobile) {
      offset = -70; // Account for bottom nav on mobile
    }

    const y = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    
    emailjs
      .sendForm(
        "service_jhel3oy",
        "template_y8qx93d",
        form,
        "ePCZnNMfnyu29sLWw"
      )
      .then(
        () => {
          alert("Message sent!");
          form.reset();
        },
        () => alert("Failed to send message. Please try again.")
      );
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 150;
      let current = "home";
      for (const sec of menu) {
        const el = document.getElementById(sec.id);
        if (!el) continue;
        if (scrollPos >= el.offsetTop) {
          current = sec.id;
        }
      }
      setActive(current);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="layout">
      {/* ===== SIDEBAR ===== */}
      <div className="leftSidebar">
        <motion.div
          className="sidebarIcons"
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {menu.map((item, i) => (
            <motion.span
              key={i}
              className={active === item.id ? "activeIcon" : ""}
              whileHover={{ scale: 1.25, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => scrollToSection(item.id)}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === 'Enter') scrollToSection(item.id);
              }}
            >
              {item.icon}
            </motion.span>
          ))}
        </motion.div>
      </div>

      {/* ===== MAIN CONTENT ===== */}
      <div className="mainContent">
        <div className="contentWrapper">
          <section id="home">
            <motion.h1
              className="heroTitle"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              Hi I'm Ayoub
            </motion.h1>

            <motion.p
              className="heroSubtitle"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Network & Telecommunications Technician | Web Developer (React)
              Building scalable networks and modern web applications
            </motion.p>

            <motion.div
              className="certifications"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <motion.span whileHover={{ scale: 1.2, rotate: 360 }} transition={{ duration: 0.5 }}><FaAmazon /></motion.span>
              <motion.span whileHover={{ scale: 1.2, rotate: 360 }} transition={{ duration: 0.5 }}><SiCisco /></motion.span>
              <motion.span whileHover={{ scale: 1.2, rotate: 360 }} transition={{ duration: 0.5 }}><FaPython /></motion.span>
              <motion.span whileHover={{ scale: 1.2, rotate: 360 }} transition={{ duration: 0.5 }}><TfiMicrosoftAlt /></motion.span>
              <motion.span whileHover={{ scale: 1.2, rotate: 360 }} transition={{ duration: 0.5 }}><FaReact /></motion.span>
            </motion.div>

            <motion.button
              onClick={() => scrollToSection("contact")}
              className="hireBtn withme"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
            >
              Connect with me
            </motion.button>
          </section>

          <section id="about" className="section">
            <h2>About Me</h2>
            <p>
              I am a Network Technician and Administrator with experience in Cisco routing, switching, and troubleshooting.<br />
              ISTQB-certified with strong skills in software testing and system quality.<br />
              Currently learning AWS and cloud computing, while also developing in web development with React.js
              and automating tasks with Python
              combining networking expertise with modern infrastructure and applications.<br />
              Passionate about building reliable, efficient systems and solving real-world technical challenges.
            </p>
            <h2>Personal Info</h2>
            <p><strong>Age:</strong> 24 <br />
              <strong>Residence:</strong> Tunis, Tunisia</p>
          </section>

          <section id="education" className="section">
            <h2>Education</h2>
            <p>
              2020-2021 | High School Degree (baccalaureate diploma)<br />
              2022-2023 | Higher Institute of Technological Studies<br />
              2023-2025 | Technical institute of networks and telecommunication (baccalaureate + 2)
            </p>
            <h2>Experience</h2>
            <p>2024-Present | Junior System Administrator - TEK-UP University (Contract)</p>
            <ul>
              <li>Cisco equipment configuration</li>
              <li>Managed Dalo Radius for user authentication and network access control.</li>
              <li>Developed scripts for automation and troubleshooting.</li>
              <li>Assisted in cabling and network setup.</li>
            </ul>
            <p>2023 | IT Support - Actia engineering services (Apprenticeship)</p>
            <ul>
              <li>IT Support Tools & Ticketing Systems</li>
              <li>LAN/WAN/Wi-Fi setup and troubleshooting</li>
            </ul>
          </section>

          <section id="projects" className="section">
            <h2>Projects & Learning</h2>
            <div className="projects-slider-container">
              <button className="slider-nav prev" onClick={prevProject} type="button">❮</button>
              <div className="slider-main">
                <div className="project-card">
                  <div className="project-media-gallery">
                    <div className="media-thumbnails">
                      {projects[currentProjectIndex].media.map((media, idx) => (
                        <div key={idx} className="media-thumbnail" onClick={() => openLightbox(media)} role="button" tabIndex={0}>
                          {media.type === 'video' ? (
                            <div className="thumbnail-video">
                              <video src={media.url} preload="metadata" />
                              <div className="play-overlay"><span>▶</span></div>
                            </div>
                          ) : (
                            <img src={media.url} alt={media.title} />
                          )}
                          <span className="thumbnail-title">{media.title}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="project-content-scrollable">
                    <div className="project-content-inner">
                      <h3 className="project-title">{projects[currentProjectIndex].title}</h3>
                      <p className="project-description">{projects[currentProjectIndex].description}</p>
                      <div className="project-tech">
                        <h4>Technologies Used</h4>
                        <div className="tech-badges">
                          {projects[currentProjectIndex].tech.map((tech, idx) => (
                            <span key={idx} className="tech-badge">{tech}</span>
                          ))}
                        </div>
                      </div>
                      {projects[currentProjectIndex].details && (
                        <div className="project-details">
                          <h4>Project Details</h4>
                          <ul>
                            {projects[currentProjectIndex].details.map((detail, idx) => (
                              <li key={idx}>{detail}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {projects[currentProjectIndex].challenges && (
                        <div className="project-challenges">
                          <h4>Challenges & Solutions</h4>
                          <p>{projects[currentProjectIndex].challenges}</p>
                        </div>
                      )}
                      {projects[currentProjectIndex].results && (
                        <div className="project-results">
                          <h4>Results & Impact</h4>
                          <p>{projects[currentProjectIndex].results}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <button className="slider-nav next" onClick={nextProject} type="button">❯</button>
            </div>
            <div className="slider-dots">
              {projects.map((_, idx) => (
                <button 
                  key={idx} 
                  className={`dot ${currentProjectIndex === idx ? 'active' : ''}`} 
                  onClick={() => goToProject(idx)}
                  type="button"
                  aria-label={`Go to project ${idx + 1}`}
                />
              ))}
            </div>
            {isLightboxOpen && selectedMedia && (
              <div className="lightbox-overlay" onClick={closeLightbox}>
                <div className="lightbox-container" onClick={(e) => e.stopPropagation()}>
                  <button className="lightbox-close" onClick={closeLightbox} type="button">✕</button>
                  <div className="lightbox-media">
                    {selectedMedia.type === 'video' ? (
                      <video src={selectedMedia.url} controls autoPlay className="lightbox-video" />
                    ) : (
                      <img src={selectedMedia.url} alt={selectedMedia.title} className="lightbox-image" />
                    )}
                  </div>
                  <div className="lightbox-caption">
                    <h3>{selectedMedia.title}</h3>
                    <p>{projects[currentProjectIndex].title}</p>
                  </div>
                </div>
              </div>
            )}
          </section>

          <section id="certifications" className="section">
            <h2>Certifications</h2>
            <div className="certifications-grid">
              <div className="cert-category">
                <h3 className="category-title">
                  <MdVerified className="category-icon" />
                  Official Certifications
                </h3>
                <div className="cert-cards">
                  <div className="cert-card">
                    <div className="cert-icon"><GrTest /></div>
                    <div className="cert-content">
                      <h4>ISTQB® Certified Tester Foundation Level (ISTQB CTFL)</h4>
                      <p className="cert-issuer">ISTQB</p>
                      <p className="cert-date">Issued: March 2026</p>
                      <p className="cert-id">Credential ID: Brightest2026034810</p>
                      <a className="cert-link" href="/certifications/CTFL.pdf" download="CTFL.pdf">Download Certificate →</a>
                    </div>
                  </div>
                  <div className="cert-card">
                    <div className="cert-icon"><TfiMicrosoftAlt /></div>
                    <div className="cert-content">
                      <h4>Microsoft Office Specialist: Associate (Office 2019)</h4>
                      <p className="cert-issuer">Microsoft</p>
                      <p className="cert-date">Issued: Mai 2023</p>
                      <p className="cert-id">Credential ID: wv8rS-FaHu</p>
                      <a className="cert-link" href="/certifications/mos.jpg" download="mos.jpg">Download Certificate →</a>
                    </div>
                  </div>
                  <div className="cert-card">
                    <div className="cert-icon"><FaAmazon /></div>
                    <div className="cert-content">
                      <h4>AWS Cloud Computing Practitioner</h4>
                      <p className="cert-issuer">AWS SkillBuilder</p>
                      <p className="cert-date">In process...</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="cert-category">
                <h3 className="category-title">
                  <SlBadge className="category-icon" />
                  Academic Certifications
                </h3>
                <div className="cert-cards">
                  <div className="cert-card">
                    <div className="cert-icon"><SiCisco /></div>
                    <div className="cert-content">
                      <h4>Cisco Certified Network Associate (CCNA)</h4>
                      <p className="cert-issuer">NetAcad</p>
                      <p className="cert-date">Issued: Mar 2024</p>
                      <a className="cert-link" href="/certifications/ccna.jpg" download="ccna.jpg">Download Certificate →</a>
                    </div>
                  </div>
                  <div className="cert-card">
                    <div className="cert-icon"><FaPython /></div>
                    <div className="cert-content">
                      <h4>Python Essentials 1</h4>
                      <p className="cert-issuer">NetAcad</p>
                      <p className="cert-date">Issued: Aug 2024</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="contact" className="section">
            <h2>Contact</h2>
            <div className="socialunit"><SiGmail /> &nbsp; <a href="mailto:ayoubfalousnet@gmail.com" target="_blank" rel="noopener noreferrer">ayoubfalousnet@gmail.com</a></div>
            <div className="socialunit"><FaLinkedin /> &nbsp; <a href="https://linkedin.com/in/ayoub-el-fellous-24468a32a" target="_blank" rel="noopener noreferrer">Ayoub El Fellous</a></div>
            <div className="socialunit"><FaWhatsapp /> &nbsp;<a href="https://wa.me/21658102572" target="_blank" rel="noopener noreferrer">+216 58102572</a></div>
            <h2>Propose</h2>
            <form className="contactForm" onSubmit={sendEmail}>
              <div className="row">
                <input name="user_name" type="text" placeholder="Your Name*" required />
                <input name="user_email" type="email" placeholder="Your Email*" required />
              </div>
              <div className="row">
                <textarea name="message" placeholder="Your Message...*" rows={6} required />
              </div>
              <button type="submit" className="hireBtn">Send Message</button>
            </form>
          </section>
        </div>
      </div>

      {/* ===== RIGHT PANEL WITH ANIMATIONS ===== */}
      <motion.div
        className="rightPanel"
        initial={{ x: 340, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <div className="rightPanel-top">
          {/* Profile Image with Hover Overlay */}
          <div className="profile-image-container">
            <motion.img
              src="/images/new.profile.png"
              className="profileImage"
              alt="Ayoub El Fellous"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
            />
            <div className="profile-overlay">
              <div className="overlay-text">
                2
                <small>Years Experience</small>
              </div>
            </div>
          </div>

          <motion.h2
            className="profileName"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Ayoub El Fellous
          </motion.h2>

          <motion.p
            className="profileDesc"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            Junior Network Technician & Admin<br />
            At TEK-UP University<br />
            Always learning. Always improving. Always building.
          </motion.p>
        </div>

        <motion.div
          className="rightPanel-bottom"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <div className="socials">
            <motion.span
              whileHover={{ scale: 1.2, y: -5 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => window.location.href = "mailto:ayoubfalousnet@gmail.com"}
              role="button"
              tabIndex={0}
            >
              <SiGmail />
            </motion.span>
            <motion.span
              whileHover={{ scale: 1.2, y: -5 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => window.open("https://linkedin.com/in/ayoub-el-fellous-24468a32a", "_blank")}
              role="button"
              tabIndex={0}
            >
              <FaLinkedin />
            </motion.span>
            <motion.span
              whileHover={{ scale: 1.2, y: -5 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => window.open("https://wa.me/21658102572", "_blank")}
              role="button"
              tabIndex={0}
            >
              <FaWhatsapp />
            </motion.span>
          </div>
        </motion.div>
      </motion.div>

      {/* Mobile Bottom Navigation */}
      <div className="mobile-bottom-nav">
        {menu.map((item) => (
          <div
            key={item.id}
            className={`mobile-nav-item ${active === item.id ? 'active' : ''}`}
            onClick={() => scrollToSection(item.id)}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => {
              if (e.key === 'Enter' || e.key === ' ') scrollToSection(item.id);
            }}
          >
            <span>{item.icon}</span>
            <span>{item.id}</span>
          </div>
        ))}
      </div>
    </div>
  );
}