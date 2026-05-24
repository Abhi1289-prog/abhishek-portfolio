"use client";

import { ChatWidget } from "@/components/portfolio/ChatWidget";
import { CursorGlow } from "@/components/portfolio/CursorGlow";
import { Reveal } from "@/components/portfolio/Reveal";
import { SectionHeading } from "@/components/portfolio/SectionHeading";
import { ThemeToggle } from "@/components/portfolio/ThemeToggle";
import type { PortfolioData, Project } from "@/types/portfolio";
import { AnimatePresence, motion, useInView, useScroll, useTransform, useSpring } from "framer-motion";
import {
  Briefcase,
  Copy,
  ExternalLink,
  FileText,
  GitBranch,
  Link as LinkIcon,
  Mail,
  MapPin,
  Sparkles,
  X,
  Menu,
  Code,
  Laptop,
  Brain,
  Users,
  Globe,
  Cpu,
  Network,
  Cloud,
  Rocket,
  Target
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Certifications", href: "#certifications" },
  { label: "Journey", href: "#journey" },
  { label: "Contact", href: "#contact" },
];

function getJourneyIcon(iconKey: string) {
  switch (iconKey.toLowerCase()) {
    case "code":
      return <Code className="h-5 w-5 text-cyan-500 dark:text-cyan-400" />;
    case "laptop":
      return <Laptop className="h-5 w-5 text-cyan-500 dark:text-cyan-400" />;
    case "brain":
      return <Brain className="h-5 w-5 text-fuchsia-500 dark:text-fuchsia-400" />;
    case "users":
      return <Users className="h-5 w-5 text-emerald-500 dark:text-emerald-400" />;
    case "cpu":
      return <Cpu className="h-5 w-5 text-amber-500 dark:text-amber-400" />;
    case "rocket":
      return <Rocket className="h-5 w-5 text-violet-500 dark:text-violet-400" />;
    case "target":
      return <Target className="h-5 w-5 text-rose-500 dark:text-rose-400" />;
    default:
      return <Sparkles className="h-5 w-5 text-cyan-500 dark:text-cyan-400" />;
  }
}

function getJourneyTheme(iconKey: string) {
  switch (iconKey.toLowerCase()) {
    case "code":
    case "laptop":
      return {
        borderGlow: "group-hover:from-cyan-500 group-hover:to-cyan-400",
        shadowGlow: "group-hover:shadow-cyan-500/20",
        dotBg: "bg-cyan-500/10 border-cyan-500 dark:bg-cyan-950/80",
        dotGlow: "shadow-[0_0_15px_rgba(6,182,212,0.4)]",
        badge: "bg-cyan-500/10 text-cyan-600 dark:bg-cyan-500/20 dark:text-cyan-400 ring-cyan-500/20",
        bullet: "bg-cyan-500"
      };
    case "brain":
      return {
        borderGlow: "group-hover:from-fuchsia-500 group-hover:to-violet-500",
        shadowGlow: "group-hover:shadow-fuchsia-500/20",
        dotBg: "bg-fuchsia-500/10 border-fuchsia-500 dark:bg-fuchsia-950/80",
        dotGlow: "shadow-[0_0_15px_rgba(217,70,239,0.4)]",
        badge: "bg-fuchsia-500/10 text-fuchsia-600 dark:bg-fuchsia-500/20 dark:text-fuchsia-400 ring-fuchsia-500/20",
        bullet: "bg-fuchsia-500"
      };
    case "users":
      return {
        borderGlow: "group-hover:from-emerald-500 group-hover:to-teal-500",
        shadowGlow: "group-hover:shadow-emerald-500/20",
        dotBg: "bg-emerald-500/10 border-emerald-500 dark:bg-emerald-950/80",
        dotGlow: "shadow-[0_0_15px_rgba(16,185,129,0.4)]",
        badge: "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 ring-emerald-500/20",
        bullet: "bg-emerald-500"
      };
    case "cpu":
      return {
        borderGlow: "group-hover:from-amber-500 group-hover:to-orange-500",
        shadowGlow: "group-hover:shadow-amber-500/20",
        dotBg: "bg-amber-500/10 border-amber-500 dark:bg-amber-950/80",
        dotGlow: "shadow-[0_0_15px_rgba(245,158,11,0.4)]",
        badge: "bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400 ring-amber-500/20",
        bullet: "bg-amber-500"
      };
    case "rocket":
      return {
        borderGlow: "group-hover:from-violet-500 group-hover:to-indigo-500",
        shadowGlow: "group-hover:shadow-violet-500/20",
        dotBg: "bg-violet-500/10 border-violet-500 dark:bg-violet-950/80",
        dotGlow: "shadow-[0_0_15px_rgba(139,92,246,0.4)]",
        badge: "bg-violet-500/10 text-violet-600 dark:bg-violet-500/20 dark:text-violet-400 ring-violet-500/20",
        bullet: "bg-violet-500"
      };
    case "target":
      return {
        borderGlow: "group-hover:from-rose-500 group-hover:to-pink-500",
        shadowGlow: "group-hover:shadow-rose-500/20",
        dotBg: "bg-rose-500/10 border-rose-500 dark:bg-rose-950/80",
        dotGlow: "shadow-[0_0_15px_rgba(244,63,94,0.4)]",
        badge: "bg-rose-500/10 text-rose-600 dark:bg-rose-500/20 dark:text-rose-400 ring-rose-500/20",
        bullet: "bg-rose-500"
      };
    default:
      return {
        borderGlow: "group-hover:from-cyan-500 group-hover:to-indigo-500",
        shadowGlow: "group-hover:shadow-cyan-500/20",
        dotBg: "bg-cyan-500/10 border-cyan-500 dark:bg-slate-900/80",
        dotGlow: "shadow-[0_0_15px_rgba(6,182,212,0.4)]",
        badge: "bg-cyan-500/10 text-cyan-600 dark:bg-cyan-500/20 dark:text-cyan-400 ring-cyan-500/20",
        bullet: "bg-cyan-500"
      };
  }
}

function AnimatedCounter({ value, suffix = "", label }: { value: number; suffix?: string; label: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!inView) return;

    const duration = 1000;
    const steps = 40;
    const increment = value / steps;
    let count = 0;

    const timer = window.setInterval(() => {
      count += increment;
      if (count >= value) {
        setCurrent(value);
        window.clearInterval(timer);
      } else {
        setCurrent(Math.round(count));
      }
    }, duration / steps);

    return () => window.clearInterval(timer);
  }, [inView, value]);

  return (
    <div
      ref={ref}
      className="rounded-2xl border border-white/25 bg-white/70 p-5 text-center shadow-lg backdrop-blur dark:border-slate-700 dark:bg-slate-900/70"
    >
      <p className="text-3xl font-semibold text-slate-900 dark:text-white">
        {current}
        {suffix}
      </p>
      <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{label}</p>
    </div>
  );
}

export function PortfolioClient({ data }: { data: PortfolioData }) {
  const { scrollYProgress } = useScroll();
  const heroParallax = useTransform(scrollYProgress, [0, 1], [0, -120]);

  const timelineRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress: localScroll } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"],
  });
  const scaleY = useSpring(localScroll, { stiffness: 60, damping: 20 });

  const categories = useMemo(() => ["All", ...new Set(data.projects.map((project) => project.category))], [data.projects]);
  const [selectedCategory, setSelectedCategory] = useState<(typeof categories)[number]>("All");
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [expandedCertification, setExpandedCertification] = useState<number | null>(null);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [contactLoading, setContactLoading] = useState(false);
  const [contactError, setContactError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const filteredProjects = useMemo(
    () =>
      selectedCategory === "All"
        ? data.projects
        : data.projects.filter((project) => project.category === selectedCategory),
    [data.projects, selectedCategory],
  );

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTaglineIndex((current) => (current + 1) % data.profile.taglineOptions.length);
    }, 2600);

    return () => window.clearInterval(timer);
  }, [data.profile.taglineOptions.length]);

  async function copyEmail() {
    await navigator.clipboard.writeText(data.profile.email);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  }

  return (
    <>
      <CursorGlow />

      <header className="sticky top-0 z-40 border-b border-white/15 bg-white/65 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/70">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#top" className="inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-slate-900 dark:text-white">
            <Sparkles className="h-4 w-4 text-cyan-500" />
            {data.profile.name}
          </a>

          <div className="hidden items-center gap-5 md:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-slate-600 transition hover:text-cyan-500 dark:text-slate-300 dark:hover:text-cyan-400"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />

            <button
              type="button"
              onClick={() => setMobileNavOpen(true)}
              aria-label="Open navigation"
              className="inline-flex items-center rounded-md p-2 text-slate-700 hover:bg-slate-100 md:hidden dark:text-slate-200 dark:hover:bg-slate-800"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {mobileNavOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start justify-end bg-slate-950/60 p-4 backdrop-blur-sm"
          >
            <motion.nav
              initial={{ x: 200 }}
              animate={{ x: 0 }}
              exit={{ x: 200 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="w-full max-w-xs rounded-2xl bg-white/95 p-6 shadow-lg dark:bg-slate-900"
            >
              <div className="mb-6 flex items-center justify-between">
                <a href="#top" className="text-sm font-semibold text-slate-900 dark:text-white">
                  {data.profile.name}
                </a>
                <button
                  type="button"
                  onClick={() => setMobileNavOpen(false)}
                  aria-label="Close navigation"
                  className="rounded-md p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileNavOpen(false)}
                    className="rounded-lg px-4 py-3 text-base text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </motion.nav>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <main id="top" className="relative overflow-hidden">
        <section className="relative flex min-h-[70vh] md:min-h-[92vh] items-center px-6 py-20">
          <motion.div style={{ y: heroParallax }} className="absolute inset-0 -z-10">
            <div className="absolute top-20 left-1/3 h-64 w-64 rounded-full bg-cyan-500/20 blur-3xl" />
            <div className="absolute right-12 bottom-16 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />
          </motion.div>

          <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <p className="text-sm tracking-[0.22em] text-cyan-500 uppercase">Portfolio</p>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900 md:text-6xl dark:text-white">
                {data.profile.name}
              </h1>
              <p className="mt-4 text-xl text-slate-700 dark:text-slate-200">{data.profile.title}</p>

              <AnimatePresence mode="wait">
                <motion.p
                  key={data.profile.taglineOptions[taglineIndex]}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  className="mt-6 max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-300"
                >
                  {data.profile.taglineOptions[taglineIndex]}
                </motion.p>
              </AnimatePresence>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#projects"
                  className="rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-500 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:scale-[1.02]"
                >
                  View Projects
                </a>
                <a
                  href={data.profile.resumeUrl}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white/80 px-5 py-3 text-sm font-semibold text-slate-800 shadow-sm backdrop-blur transition hover:bg-white dark:border-slate-700 dark:bg-slate-900/70 dark:text-white dark:hover:bg-slate-800"
                >
                  <FileText className="h-4 w-4" />
                  Download Resume
                </a>
              </div>
            </motion.div>

            <Reveal>
              <div className="rounded-3xl border border-white/25 bg-white/70 p-6 shadow-2xl backdrop-blur dark:border-slate-700 dark:bg-slate-900/75">
                {data.profile.photoUrl ? (
                  <div className="mb-6 flex justify-center">
                    <img
                      src={data.profile.photoUrl}
                      alt={data.profile.photoAlt ?? `${data.profile.name} profile photo`}
                      className="h-32 w-32 md:h-40 md:w-40 rounded-3xl object-cover shadow-lg ring-4 ring-white/90 dark:ring-slate-900/80"
                    />
                  </div>
                ) : null}

                <p className="text-sm text-slate-500 dark:text-slate-400">Based in</p>
                <p className="mt-2 flex items-center gap-2 text-slate-900 dark:text-white">
                  <MapPin className="h-4 w-4 text-cyan-500" />
                  {data.profile.location}
                </p>

                <p className="mt-6 text-sm text-slate-500 dark:text-slate-400">Open for</p>
                <p className="mt-2 text-lg text-slate-800 dark:text-slate-100">Junior engineering roles & ML Devops</p>

                <div className="mt-8 grid gap-2">
                  {data.profile.socials.map((social) => (
                    <Link
                      key={social.label}
                      href={social.url}
                      target="_blank"
                      className="inline-flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 transition hover:border-cyan-400 hover:text-cyan-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                    >
                      {social.label}
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="about" className="mx-auto max-w-6xl px-6 py-20">
          <SectionHeading eyebrow="About" title="Full-stack & ML engineering with product focus" description={data.profile.summary} />

          <div className="grid gap-4 md:grid-cols-2">
            {data.skills.map((skill, index) => (
              <Reveal key={skill.name} delay={index * 0.05}>
                <div className="rounded-2xl border border-white/20 bg-white/70 p-5 shadow-md backdrop-blur dark:border-slate-700 dark:bg-slate-900/70">
                  <div className="mb-2 flex items-center justify-between">
                    <p className="font-medium text-slate-900 dark:text-white">{skill.name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-300">{skill.level}%</p>
                  </div>
                  <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-700">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.1 }}
                      className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500"
                    />
                  </div>
                  <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">{skill.category}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="projects" className="mx-auto max-w-6xl px-6 py-20">
          <SectionHeading
            eyebrow="Projects"
            title="Selected work with measurable impact"
            description="Filter by domain and open cards to explore architecture, metrics, and outcomes."
          />

          <div className="mb-8 flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full px-4 py-2 text-sm transition ${
                  selectedCategory === category
                    ? "bg-cyan-500 text-white"
                    : "bg-slate-200 text-slate-700 hover:bg-slate-300 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {filteredProjects.map((project, index) => (
              <Reveal key={project.title} delay={index * 0.07}>
                <motion.article
                  whileHover={{ y: -6 }}
                  className="group rounded-2xl border border-white/20 bg-white/75 p-6 shadow-lg backdrop-blur transition dark:border-slate-700 dark:bg-slate-900/70"
                >
                  <p className="text-xs tracking-[0.18em] text-cyan-500 uppercase">{project.category}</p>
                  <h3 className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">{project.title}</h3>
                  <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{project.description}</p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tech.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-slate-300 px-2.5 py-1 text-xs text-slate-600 dark:border-slate-700 dark:text-slate-300"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 flex items-center justify-between">
                    <div className="flex gap-3">
                      <Link href={project.liveUrl} target="_blank" className="text-sm text-cyan-500 hover:underline">
                        Live Demo
                      </Link>
                      <Link href={project.githubUrl} target="_blank" className="text-sm text-cyan-500 hover:underline">
                        GitHub
                      </Link>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveProject(project)}
                      className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs text-slate-700 transition group-hover:border-cyan-500 group-hover:text-cyan-600 dark:border-slate-700 dark:text-slate-200"
                    >
                      Preview
                    </button>
                  </div>
                </motion.article>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="certifications" className="mx-auto max-w-6xl px-6 py-20">
          <SectionHeading eyebrow="Certifications" title="Continuous learning and verified expertise" />

          <div className="grid gap-4 md:grid-cols-3">
            {data.certifications.map((certification, index) => {
              const expanded = expandedCertification === index;
              return (
                <Reveal key={certification.title} delay={index * 0.06}>
                  <button
                    type="button"
                    onClick={() => setExpandedCertification(expanded ? null : index)}
                    className="w-full rounded-2xl border border-white/20 bg-white/75 p-5 text-left shadow-md backdrop-blur transition hover:-translate-y-1 dark:border-slate-700 dark:bg-slate-900/70"
                  >
                    <p className="text-sm text-cyan-500">{certification.issuer}</p>
                    <h3 className="mt-2 font-semibold text-slate-900 dark:text-white">{certification.title}</h3>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{certification.date}</p>

                    <AnimatePresence>
                      {expanded ? (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{certification.details}</p>
                          <div className="mt-2 space-y-2 text-xs text-slate-500 dark:text-slate-400">
                            {certification.credentialId ? (
                              <p>Credential ID: {certification.credentialId}</p>
                            ) : null}

                            {certification.URL ? (
                              <Link href={certification.URL} target="_blank" rel="noreferrer" className="text-cyan-500 hover:underline">
                                View Certificate
                              </Link>
                            ) : null}
                          </div>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </button>
                </Reveal>
              );
            })}
          </div>
        </section>

        <section id="journey" className="mx-auto max-w-5xl px-6 py-24 relative">
          <SectionHeading
            eyebrow="Journey"
            title="My Technical Journey"
            description="From learning full stack development to building AI-powered real-world systems."
          />

          {/* Achievement Counters Grid */}
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-3 mb-16">
            <Reveal delay={0.05}>
              <div className="rounded-2xl border border-white/20 bg-white/70 p-5 dark:border-slate-800 dark:bg-slate-900/50 backdrop-blur-md text-center shadow-sm">
                <span className="text-3xl font-extrabold bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">3+ Years</span>
                <p className="mt-1 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Technical Evolution</p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="rounded-2xl border border-white/20 bg-white/70 p-5 dark:border-slate-800 dark:bg-slate-900/50 backdrop-blur-md text-center shadow-sm">
                <span className="text-3xl font-extrabold bg-gradient-to-r from-indigo-400 to-fuchsia-400 bg-clip-text text-transparent">7 Milestones</span>
                <p className="mt-1 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Progression Checkpoints</p>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="rounded-2xl border border-white/20 bg-white/70 p-5 dark:border-slate-800 dark:bg-slate-900/50 backdrop-blur-md text-center shadow-sm">
                <span className="text-3xl font-extrabold bg-gradient-to-r from-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">AI + Cloud</span>
                <p className="mt-1 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Primary Stack Focus</p>
              </div>
            </Reveal>
          </div>

          <div ref={timelineRef} className="relative space-y-12">
            {/* The main vertical track lines */}
            <div className="absolute left-8 top-4 bottom-4 w-0.5 -translate-x-1/2 bg-slate-200 dark:bg-slate-800/80 md:left-1/2 md:-translate-x-1/2" />
            <motion.div
              style={{ scaleY, originY: 0 }}
              className="absolute left-8 top-4 bottom-4 w-0.5 -translate-x-1/2 bg-gradient-to-b from-cyan-500 via-indigo-500 to-fuchsia-500 md:left-1/2 md:-translate-x-1/2"
            />

            {data.journey.map((item, index) => {
              const isEven = index % 2 === 0;
              const theme = getJourneyTheme(item.icon);
              return (
                <div key={index} className="relative flex flex-col md:flex-row md:items-center">
                  {/* Indicator / Dot */}
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className={`absolute left-8 z-10 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border-2 bg-white dark:bg-slate-950 md:left-1/2 ${theme.dotBg} ${theme.dotGlow}`}
                  >
                    {getJourneyIcon(item.icon)}
                  </motion.div>

                  {/* Horizontal connector line on desktop */}
                  <div
                    className={`absolute top-1/2 -translate-y-1/2 h-[1px] w-12 hidden md:block ${
                      isEven
                        ? "right-1/2 bg-gradient-to-l from-cyan-500/30 to-transparent"
                        : "left-1/2 bg-gradient-to-r from-cyan-500/30 to-transparent"
                    }`}
                  />

                  {/* Card Container */}
                  <div className={`w-full pl-16 md:w-1/2 md:pl-0 ${isEven ? "md:pr-12" : "md:ml-auto md:pl-12"}`}>
                    <Reveal delay={0.05} className="w-full">
                      <motion.div
                        whileHover={{ y: -4 }}
                        className={`group relative rounded-3xl p-[1px] bg-gradient-to-br from-slate-200/50 to-slate-200/10 dark:from-slate-800/50 dark:to-slate-950/20 ${theme.borderGlow} transition-all duration-500 shadow-md hover:shadow-xl ${theme.shadowGlow}`}
                      >
                        <div className="rounded-[23px] bg-white/95 dark:bg-slate-950/90 p-6 backdrop-blur-md">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <span className="text-sm font-bold tracking-wider bg-gradient-to-r from-cyan-500 to-indigo-500 bg-clip-text text-transparent uppercase">
                              {item.period}
                            </span>
                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${theme.badge}`}>
                              {item.badge}
                            </span>
                          </div>

                          <h3 className="mt-3 text-lg font-bold text-slate-900 dark:text-white transition-colors duration-300 group-hover:text-cyan-500 dark:group-hover:text-cyan-400">
                            {item.title}
                          </h3>

                          <ul className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                            {item.content.map((point, pIdx) => (
                              <li key={pIdx} className="flex items-start gap-2">
                                <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${theme.bullet}`} />
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>

                          {item.projects && (
                            <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-900">
                              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                                Projects Mentioned
                              </p>
                              <div className="mt-2 flex flex-wrap gap-2">
                                {item.projects.map((proj) => (
                                  <span
                                    key={proj}
                                    className="rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 px-2.5 py-1 text-xs font-medium text-slate-700 dark:text-slate-300 transition-colors duration-300 hover:border-cyan-500/50 hover:text-cyan-500"
                                  >
                                    {proj}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    </Reveal>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-20">
          <SectionHeading eyebrow="Analytics" title="Performance snapshot" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {data.stats.map((stat) => (
              <AnimatedCounter key={stat.label} value={stat.value} suffix={stat.suffix} label={stat.label} />
            ))}
          </div>
        </section>

        <section id="contact" className="mx-auto max-w-4xl px-6 pt-20 pb-28">
          <SectionHeading
            eyebrow="Contact"
            title="Let’s build something meaningful"
            description="Share your idea, challenge, or opportunity — I’ll respond with a practical strategy."
          />

          <Reveal>
            <div className="rounded-3xl border border-white/25 bg-white/75 p-6 shadow-xl backdrop-blur dark:border-slate-700 dark:bg-slate-900/70">
              <form
                onSubmit={async (event) => {
                  event.preventDefault();
                  setContactLoading(true);
                  setContactError(null);

                  try {
                    const response = await fetch("/api/contact", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        name: contactName,
                        email: contactEmail,
                        message: contactMessage,
                      }),
                    });

                    if (!response.ok) {
                      const errorData = await response.json();
                      throw new Error(errorData?.error ?? "Failed to send message.");
                    }

                    setContactSubmitted(true);
                    setContactName("");
                    setContactEmail("");
                    setContactMessage("");
                  } catch (error) {
                    setContactError(error instanceof Error ? error.message : "Something went wrong.");
                  } finally {
                    setContactLoading(false);
                  }
                }}
                className="grid gap-4 md:grid-cols-2"
              >
                <input
                  required
                  value={contactName}
                  onChange={(event) => setContactName(event.target.value)}
                  placeholder="Your name"
                  className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none ring-cyan-400 focus:ring-2 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                />
                <input
                  required
                  type="email"
                  value={contactEmail}
                  onChange={(event) => setContactEmail(event.target.value)}
                  placeholder="Your email"
                  className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none ring-cyan-400 focus:ring-2 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                />
                <textarea
                  required
                  value={contactMessage}
                  onChange={(event) => setContactMessage(event.target.value)}
                  placeholder="Tell me about your project"
                  className="min-h-32 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none ring-cyan-400 focus:ring-2 md:col-span-2 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                />
                <button
                  type="submit"
                  disabled={contactLoading}
                  className="rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-500 px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {contactLoading ? "Sending..." : "Send Message"}
                </button>

                <div className="md:justify-self-end">
                  <button
                    type="button"
                    onClick={copyEmail}
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-700 transition hover:border-cyan-500 hover:text-cyan-600 dark:border-slate-700 dark:text-slate-200"
                  >
                    <Copy className="h-4 w-4" />
                    {copied ? "Email Copied" : "Copy Email"}
                  </button>
                </div>
              </form>

              {contactError ? (
                <p className="mt-4 text-sm text-rose-500">{contactError}</p>
              ) : null}

              {contactSubmitted ? (
                <p className="mt-4 flex items-center gap-2 text-sm text-emerald-500">
                  <Mail className="h-4 w-4" />
                  Thanks! Your message has been sent.
                </p>
              ) : null}

              <div className="mt-5 flex flex-wrap gap-4 text-sm text-slate-600 dark:text-slate-300">
                <a href={`mailto:${data.profile.email}`} className="inline-flex items-center gap-2 hover:text-cyan-500">
                  <Mail className="h-4 w-4" />
                  {data.profile.email}
                </a>
                <a href="#projects" className="inline-flex items-center gap-2 hover:text-cyan-500">
                  <LinkIcon className="h-4 w-4" />
                  Jump to projects
                </a>
                <a href={data.profile.socials[0]?.url ?? "#"} className="inline-flex items-center gap-2 hover:text-cyan-500">
                  <GitBranch className="h-4 w-4" />
                  GitHub Profile
                </a>
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      <footer className="border-t border-white/20 px-6 py-8 text-center text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400">
        © {new Date().getFullYear()} {data.profile.name}. Crafted with detail and intent.
      </footer>

      <AnimatePresence>
        {activeProject ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              className="relative w-full max-w-2xl rounded-3xl border border-white/20 bg-white p-6 shadow-2xl dark:border-slate-700 dark:bg-slate-900"
            >
              <button
                type="button"
                onClick={() => setActiveProject(null)}
                aria-label="Close project preview"
                className="absolute top-4 right-4 rounded-md p-2 text-slate-500 transition hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="h-4 w-4" />
              </button>

              <p className="text-xs tracking-[0.18em] text-cyan-500 uppercase">{activeProject.category}</p>
              <h3 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">{activeProject.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{activeProject.longDescription}</p>

              <ul className="mt-5 space-y-2 text-sm text-slate-700 dark:text-slate-200">
                {activeProject.highlights.map((highlight) => (
                  <li key={highlight} className="rounded-lg bg-slate-100 px-3 py-2 dark:bg-slate-800">
                    {highlight}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex gap-3">
                <Link href={activeProject.liveUrl} target="_blank" className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-4 py-2 text-sm text-white hover:bg-cyan-400">
                  <ExternalLink className="h-4 w-4" />
                  Live Demo
                </Link>
                <Link
                  href={activeProject.githubUrl}
                  target="_blank"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-2 text-sm text-slate-700 dark:border-slate-700 dark:text-slate-200"
                >
                  <GitBranch className="h-4 w-4" />
                  Repository
                </Link>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <ChatWidget data={data} />
    </>
  );
}
