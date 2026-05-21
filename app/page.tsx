"use client";

import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import {
  ArrowRight,
  Award,
  BookOpen,
  Briefcase,
  Code2,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Shield,
  Star,
  Zap,
} from "lucide-react";

function ScrollSection({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <div
      ref={ref}
      className={`${isVisible ? "animate-fade-in-up" : "opacity-0"} transition-all duration-700 ${className}`}
    >
      {children}
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-linear-to-bl from-blue-600/20 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-linear-to-tr from-cyan-500/20 to-transparent rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }

        .animate-slide-in-right {
          animation: slideInRight 0.6s ease-out forwards;
        }

        .animate-scale-in {
          animation: scaleIn 0.6s ease-out forwards;
        }

        .stagger-1 { animation-delay: 0.1s; }
        .stagger-2 { animation-delay: 0.2s; }
        .stagger-3 { animation-delay: 0.3s; }
        .stagger-4 { animation-delay: 0.4s; }
        .stagger-5 { animation-delay: 0.5s; }
      `}</style>

      <div className="relative z-10">
        {/* Hero Section - Banner Profile */}
        <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl w-full items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-block animate-fade-in-up">
                  <div className="px-4 py-2 rounded-full bg-linear-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 backdrop-blur-sm">
                    <p className="text-sm font-medium text-cyan-300">
                      Welcome to my portfolio
                    </p>
                  </div>
                </div>
                <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-balance leading-tight animate-fade-in-up stagger-1">
                  Syed Aqeel
                  <br />
                  <span className="bg-linear-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                    Abbas
                  </span>
                </h1>
              </div>

              <div className="space-y-4 animate-fade-in-up stagger-2">
                <p className="text-xl font-semibold text-white">
                  AI Engineer & Full-Stack Developer
                </p>
                <p className="text-lg text-slate-300 max-w-md">
                  Certified Ethical Hacker specializing in RAG/LLM integration,
                  secure system architecture, and scalable AI-powered platforms.
                  Building intelligent solutions that transform businesses.
                </p>
              </div>

              {/* Key Features */}
              <div className="space-y-3 py-4 animate-fade-in-up stagger-3">
                {[
                  {
                    icon: Code2,
                    text: "Next.js, React, Python, FastAPI, Express.js",
                  },
                  { icon: Zap, text: "RAG & LLM Integration Specialist" },
                  {
                    icon: Shield,
                    text: "CEH Certified | Security & Architecture",
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 text-slate-200"
                  >
                    <div className="p-2 rounded-lg bg-blue-500/20 border border-blue-500/30">
                      <item.icon className="w-5 h-5 text-blue-400" />
                    </div>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div className="flex gap-4 pt-4 animate-fade-in-up stagger-5">
                {[
                  { icon: Github, href: "https://github.com", label: "GitHub" },
                  {
                    icon: Linkedin,
                    href: "https://linkedin.com/in/syed-aqeel-abbas-naqvi",
                    label: "LinkedIn",
                  },
                  {
                    icon: Mail,
                    href: "mailto:aqeeshah273@gmail.com",
                    label: "Email",
                  },
                ].map((social, idx) => (
                  <a
                    key={idx}
                    href={social.href}
                    target={social.label !== "Email" ? "_blank" : undefined}
                    rel={
                      social.label !== "Email"
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="p-3 rounded-lg bg-slate-800/50 hover:bg-blue-500/20 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 group"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5 text-slate-300 group-hover:text-blue-400 transition-colors" />
                  </a>
                ))}
              </div>
            </div>

            {/* Right Content - Tech Stack Grid */}
            <div className="grid grid-cols-2 gap-4 lg:gap-6 animate-slide-in-right">
              {/* Large Featured Card */}
              <div className="col-span-2 p-6 rounded-2xl bg-linear-to-br from-blue-600/30 to-cyan-600/30 border border-blue-500/30 backdrop-blur-sm hover:border-blue-500/60 transition-all duration-300 group cursor-pointer">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-blue-300 font-medium mb-2">
                      Core Expertise
                    </p>
                    <h3 className="text-2xl font-bold text-white">
                      AI & LLM Systems
                    </h3>
                    <p className="text-slate-300 text-sm mt-2">
                      RAG pipelines, vector databases, and production AI
                    </p>
                  </div>
                </div>
              </div>

              {/* Tech Stack Cards */}
              {[
                { name: "Next.js", color: "from-blue-600 to-blue-700" },
                { name: "React", color: "from-cyan-600 to-cyan-700" },
                { name: "Python", color: "from-indigo-600 to-indigo-700" },
                { name: "FastAPI", color: "from-emerald-600 to-emerald-700" },
              ].map((tech, idx) => (
                <div
                  key={tech.name}
                  className={`p-4 rounded-xl bg-linear-to-br ${tech.color} border border-white/10 hover:border-white/30 transition-all duration-300 cursor-pointer group animate-scale-in stagger-${idx + 1}`}
                >
                  <p className="text-white font-semibold group-hover:translate-x-1 transition-transform">
                    {tech.name}
                  </p>
                </div>
              ))}

              {/* Additional Tech Badge */}
              <div className="col-span-2 p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm animate-scale-in stagger-5">
                <p className="text-sm text-slate-400 mb-3">Additional Skills</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Supabase",
                    "TypeScript",
                    "Express.js",
                    "PostgreSQL",
                    "Nessus",
                    "OpenVAS",
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 text-xs font-medium rounded-full bg-slate-700/50 border border-slate-600/50 text-slate-300 hover:text-blue-400 hover:border-blue-500/50 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Projects Section */}
        <ScrollSection className="w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="space-y-16">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Star className="w-6 h-6 text-cyan-400" />
                  <h2 className="text-4xl font-bold">Featured Projects</h2>
                </div>
                <p className="text-slate-400 text-lg">
                  Showcasing expertise in AI, full-stack development, and system
                  architecture
                </p>
              </div>

              {/* Project Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    title: "Restaurant Management System",
                    subtitle: "The Octopus AI",
                    period: "2024 – Present",
                    company: "Quantylisis Consulting",
                    description:
                      "Scalable full-stack platform with POS integration, real-time order management, branch-specific dashboards, and role-based access control.",
                    tech: [
                      "Next.js",
                      "React",
                      "Express.js",
                      "Supabase",
                      "PostgreSQL",
                      "Shadcn UI",
                    ],
                    highlights: [
                      "RBAC",
                      "POS Integration",
                      "Real-time Dashboard",
                      "Multi-branch Support",
                    ],
                  },
                  {
                    title: "RAG-based AI Assistant",
                    subtitle: "Intelligent Information Retrieval",
                    period: "Recent",
                    company: "Personal Project",
                    description:
                      "Production AI assistant with intent detection, vector retrieval, and intelligent filtering. Integrated Supabase backend with FastAPI microservice.",
                    tech: [
                      "FastAPI",
                      "Supabase",
                      "Vector DB",
                      "LLM Integration",
                      "Python",
                    ],
                    highlights: [
                      "Intent Detection",
                      "Vector Search",
                      "Cost Optimization",
                      "Scalable Architecture",
                    ],
                  },
                  {
                    title: "News Analyzer",
                    subtitle: "Real-time Classification System",
                    period: "2023 (FYP)",
                    company: "COMSATS University",
                    description:
                      "Real-time news classification and monitoring system built with Laravel backend and Python/FastAPI microservices for intelligent analysis.",
                    tech: [
                      "Laravel",
                      "FastAPI",
                      "Python",
                      "Real-time Processing",
                      "Classification",
                    ],
                    highlights: [
                      "Real-time Analysis",
                      "Microservices",
                      "ML Pipeline",
                      "Data Processing",
                    ],
                  },
                  {
                    title: "Land Price Prediction",
                    subtitle: "ML-based Real Estate Analytics",
                    period: "2022",
                    company: "University Project",
                    description:
                      "Machine learning model trained on web-scraped real estate data from Zameen.com for accurate property price predictions.",
                    tech: [
                      "Python",
                      "Machine Learning",
                      "Data Scraping",
                      "Flask",
                      "Predictive Analytics",
                    ],
                    highlights: [
                      "Web Scraping",
                      "ML Model",
                      "Price Prediction",
                      "Data Analysis",
                    ],
                  },
                ].map((project, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-linear-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 group animate-fade-in-up"
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-cyan-400 font-medium">
                          {project.period}
                        </p>
                        <p className="text-xs text-slate-400 mb-2">
                          {project.company}
                        </p>
                        <h3 className="text-xl font-bold mt-2 group-hover:text-cyan-300 transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-sm text-slate-400 italic mt-1">
                          {project.subtitle}
                        </p>
                      </div>
                      <p className="text-slate-300 text-sm">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2 pt-2">
                        {project.highlights.map((highlight) => (
                          <span
                            key={highlight}
                            className="px-2 py-1 text-xs rounded bg-blue-500/20 text-blue-300 border border-blue-500/30"
                          >
                            {highlight}
                          </span>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 text-xs rounded-full bg-slate-700/50 text-slate-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollSection>

        {/* Experience Section */}
        <ScrollSection className="w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="space-y-16">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Briefcase className="w-6 h-6 text-cyan-400" />
                  <h2 className="text-4xl font-bold">Work Experience</h2>
                </div>
              </div>

              <div className="space-y-6">
                {[
                  {
                    role: "Full Stack Developer (AI Systems)",
                    company: "Quantylisis Consulting",
                    period: "2024 – Present",
                    responsibilities: [
                      "Developed and deployed scalable Restaurant Management System with RBAC and POS integration",
                      "Designed and implemented RAG pipeline using FastAPI, Supabase, and LLM services",
                      "Optimized database queries resulting in 40% performance improvement",
                    ],
                  },
                  {
                    role: "Software Developer",
                    company: "Alfajri.so (Somalia)",
                    period: "2023 – 2024",
                    responsibilities: [
                      "Integrated secure payment gateway systems for e-commerce platform",
                      "Maintained and optimized Laravel production systems serving 10K+ users",
                      "Implemented security best practices and vulnerability patches",
                    ],
                  },
                  {
                    role: "Freelance Developer",
                    company: "Fiverr",
                    period: "2020 – 2023",
                    responsibilities: [
                      "Developed 25+ Laravel applications for diverse clients globally",
                      "Built web scraping pipelines using Python, Scrapy, and Selenium",
                      "Maintained 4.9/5 star rating with 100+ successful projects",
                    ],
                  },
                ].map((exp, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-linear-to-r from-slate-800/30 to-slate-900/30 border border-slate-700/50 hover:border-blue-500/30 transition-all duration-300 animate-fade-in-up"
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-xl font-bold">{exp.role}</h3>
                          <p className="text-cyan-400 font-medium">
                            {exp.company}
                          </p>
                        </div>
                        <span className="text-sm text-slate-400">
                          {exp.period}
                        </span>
                      </div>
                      <ul className="space-y-2 ml-4">
                        {exp.responsibilities.map((resp, ridx) => (
                          <li
                            key={ridx}
                            className="text-slate-300 text-sm flex gap-3"
                          >
                            <span className="text-cyan-400 mt-1">•</span>
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollSection>

        {/* Education & Certifications */}
        <ScrollSection className="w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Education */}
              <div className="space-y-8">
                <div className="flex items-center gap-3">
                  <BookOpen className="w-6 h-6 text-cyan-400" />
                  <h2 className="text-3xl font-bold">Education</h2>
                </div>

                <div className="p-6 rounded-2xl bg-linear-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 animate-fade-in-up">
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold">B.S. Computer Science</h3>
                    <p className="text-cyan-400 font-medium">
                      COMSATS University Islamabad
                    </p>
                    <div className="space-y-1">
                      <p className="text-slate-300">2019 – 2023</p>
                      <p className="text-slate-400 text-sm">
                        Graduated February 2023
                      </p>
                      <p className="text-slate-300 pt-2">
                        CGPA:{" "}
                        <span className="text-white font-semibold">2.95</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Certifications */}
              <div className="space-y-8">
                <div className="flex items-center gap-3">
                  <Award className="w-6 h-6 text-cyan-400" />
                  <h2 className="text-3xl font-bold">Certifications</h2>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      title: "Certified Ethical Hacker (CEH)",
                      issuer: "EC-Council",
                      year: "2024",
                      skills:
                        "OSINT, Vulnerability Assessment, Malware Analysis",
                    },
                    {
                      title: "CCNA",
                      issuer: "Cisco/NAVTTC",
                      year: "2024",
                      skills: "Network Configuration, Device Simulation",
                    },
                    {
                      title: "Networking & OS Basics",
                      issuer: "Cisco",
                      year: "2024",
                      skills: "Network Fundamentals",
                    },
                  ].map((cert, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-linear-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/30 hover:border-blue-500/60 transition-all duration-300 animate-scale-in"
                      style={{ animationDelay: `${idx * 100}ms` }}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-bold text-white">{cert.title}</h4>
                          <p className="text-sm text-slate-300">
                            {cert.issuer}
                          </p>
                          <p className="text-xs text-slate-400 mt-1">
                            {cert.skills}
                          </p>
                        </div>
                        <span className="text-xs text-cyan-400 font-medium">
                          {cert.year}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </ScrollSection>

        {/* Skills Summary */}
        <ScrollSection className="w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="space-y-12">
              <h2 className="text-4xl font-bold">Technical Skills</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    category: "AI/ML & Databases",
                    skills: [
                      "RAG Pipelines",
                      "LLM Integration",
                      "Vector DBs",
                      "FastAPI",
                      "SLM Deployment",
                    ],
                  },
                  {
                    category: "Backend",
                    skills: [
                      "Python",
                      "Express.js",
                      "Node.js",
                      "Laravel",
                      "Database Design",
                    ],
                  },
                  {
                    category: "Frontend",
                    skills: [
                      "React",
                      "Next.js",
                      "TypeScript",
                      "Shadcn UI",
                      "Tailwind CSS",
                    ],
                  },
                  {
                    category: "Security & Tools",
                    skills: [
                      "CEH Certified",
                      "Vulnerability Assessment",
                      "OSINT",
                      "Nessus",
                      "Wireshark",
                    ],
                  },
                  {
                    category: "Databases & Infrastructure",
                    skills: [
                      "Supabase",
                      "PostgreSQL",
                      "SQL Optimization",
                      "Docker",
                      "AWS",
                    ],
                  },
                  {
                    category: "Collaboration",
                    skills: [
                      "Jira",
                      "Confluence",
                      "GitHub",
                      "Bitbucket",
                      "Slack",
                    ],
                  },
                ].map((skillGroup, idx) => (
                  <div
                    key={skillGroup.category}
                    className="p-6 rounded-2xl bg-linear-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 animate-fade-in-up"
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    <h3 className="text-lg font-bold mb-4 text-cyan-300">
                      {skillGroup.category}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {skillGroup.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 text-sm rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 hover:border-blue-500/60 transition-colors"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollSection>

        {/* Languages */}
        <ScrollSection className="w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="space-y-8">
              <h2 className="text-4xl font-bold">Languages</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    language: "Urdu",
                    proficiency: "Native Speaker",
                    level: "Excellent Command",
                  },
                  {
                    language: "English",
                    proficiency: "IELTS 7 Band",
                    level: "Professional Working Proficiency",
                  },
                ].map((lang, idx) => (
                  <div
                    key={lang.language}
                    className="p-6 rounded-2xl bg-linear-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 animate-fade-in-up"
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    <h3 className="text-2xl font-bold mb-2">{lang.language}</h3>
                    <p className="text-cyan-400 font-medium">
                      {lang.proficiency}
                    </p>
                    <p className="text-slate-400 text-sm mt-1">{lang.level}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollSection>

        {/* CTA Section */}
        <ScrollSection className="w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="rounded-3xl bg-linear-to-r from-blue-600/30 to-cyan-600/30 border border-blue-500/30 backdrop-blur-sm p-12 text-center space-y-6">
              <h2 className="text-4xl font-bold">Let&apos;s Collaborate</h2>
              <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                I&apos;m always open to discussing new projects, innovative
                ideas, and opportunities. Feel free to reach out!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
                <a href="mailto:aqeeshah273@gmail.com">
                  <Button className="bg-linear-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 py-6 text-base font-semibold rounded-xl shadow-lg shadow-blue-500/25 transition-all duration-300 gap-2">
                    Get In Touch <ArrowRight className="w-4 h-4" />
                  </Button>
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="outline"
                    className="border-slate-600 hover:border-blue-500/50 text-slate-300 hover:text-blue-400 px-8 py-6 text-base font-semibold rounded-xl transition-all duration-300 gap-2"
                  >
                    View My Work <ExternalLink className="w-4 h-4" />
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </ScrollSection>

        {/* Footer */}
        <div className="border-t border-slate-800/50 backdrop-blur-sm mt-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <p className="text-slate-400 text-sm">
                © {new Date().getFullYear()} Syed Aqeel Abbas. All rights
                reserved.
              </p>
              <div className="flex gap-8">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-cyan-400 transition-colors text-sm font-medium"
                >
                  GitHub
                </a>
                <a
                  href="https://linkedin.com/in/syed-aqeel-abbas-naqvi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-cyan-400 transition-colors text-sm font-medium"
                >
                  LinkedIn
                </a>
                <a
                  href="mailto:aqeeshah273@gmail.com"
                  className="text-slate-400 hover:text-cyan-400 transition-colors text-sm font-medium"
                >
                  Email
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
