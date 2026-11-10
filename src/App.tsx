import {
  ArrowRight,
  ArrowUpRight,
  Award,
  BarChart3,
  Check,
  Code2,
  Database,
  Download,
  GraduationCap,
  Layers3,
  Lightbulb,
  Mail,
  MapPin,
  Menu,
  Moon,
  PanelsTopLeft,
  Phone,
  Sun,
  X,
} from "lucide-react";
import { useLayoutEffect, useRef, useState } from "react";
import type { CSSProperties, KeyboardEvent as ReactKeyboardEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const email = "meghangowdru@gmail.com";
const resumeUrl = `${import.meta.env.BASE_URL}resume/Meghan_Gowda_B_Y_Resume.pdf`;
const sections = [
  ["home", "Home"],
  ["about", "About"],
  ["skills", "Skills"],
  ["experience", "Experience"],
  ["projects", "Projects"],
  ["resume", "Resume"],
  ["education", "Education"],
  ["credentials", "Credentials"],
  ["contact", "Contact"],
] as const;

const skillGroups = [
  {
    title: "Data & SQL",
    icon: Database,
    items: ["SQL", "MySQL", "JOINs", "CTEs", "Window Functions", "Indexing"],
  },
  {
    title: "BI & Reporting",
    icon: BarChart3,
    items: ["Power BI", "Dashboards", "DAX", "Excel", "PivotTables", "XLOOKUP", "SUMIFS", "KPI Reporting"],
  },
  {
    title: "Python",
    icon: Code2,
    items: ["Pandas", "NumPy", "Matplotlib", "Seaborn", "Scikit-learn"],
  },
  {
    title: "Data Quality",
    icon: Layers3,
    items: ["Data Cleaning", "Data Validation", "EDA", "Statistical Analysis"],
  },
  {
    title: "AI",
    icon: Lightbulb,
    items: ["Generative AI", "Gemini API", "LLMs", "Prompt Engineering"],
  },
  {
    title: "Also",
    icon: PanelsTopLeft,
    items: ["Kotlin", "Jetpack Compose", "React", "Git", "GitHub", "AWS (basics)"],
  },
];

const projectDetails = {
  commerce: {
    kicker: "01 / SALES ANALYTICS",
    title: "CommerceIQ: Sales & Revenue Analytics",
    stack: ["MySQL", "Python", "Power BI", "Gemini AI"],
    summary: "E-commerce intelligence across sales, customer behavior, delivery experience and executive reporting.",
    details: [
      "Analyzed 96,461 orders and 99,441 customers; the top 10% of customers drive ~37% of revenue.",
      "Found ~3% repeat purchase rate; late deliveries (~8%) cut review scores from 4.29 to 2.57.",
      "Built a SQL layer with CTEs, window functions, 2 analytical views and 5 indexes; created a 2-page Power BI dashboard (DAX).",
      "Automated executive summaries with Python and Gemini 2.5 Flash-Lite.",
    ],
    metrics: [
      ["Orders analyzed", "96,461", 96],
      ["Top 10% customer revenue share", "~37%", 37],
      ["Repeat purchase rate", "~3%", 3],
    ],
    url: "https://github.com/meghangowdru-debug/CommerceIQ-AI-Powered-E-Commerce-Intelligence-Platform",
  },
  churn: {
    kicker: "02 / CUSTOMER RETENTION",
    title: "Customer Churn Analysis",
    stack: ["Python", "Pandas", "Scikit-learn", "Power BI"],
    summary: "Customer churn analysis using validated records, contract comparisons, risk segments and an interactive dashboard.",
    details: [
      "Cleaned and validated 7,043 records.",
      "Month-to-month contracts churn at 42.71% vs 2.83% on two-year contracts.",
      "Segmented 1,039 high-risk and 49 critical accounts.",
      "Created a six-page Power BI dashboard.",
    ],
    metrics: [
      ["Records cleaned", "7,043", 70],
      ["Month-to-month churn", "42.71%", 43],
      ["Two-year contract churn", "2.83%", 3],
    ],
    url: "https://github.com/meghangowdru-debug/customer-churn-prediction-retention-analytics",
  },
  aml: {
    kicker: "03 / RISK INVESTIGATION",
    title: "AML Fraud Detection & Investigation Dashboard",
    stack: ["Python", "MySQL", "Scikit-learn", "Excel", "Power BI"],
    summary: "Transaction screening and risk investigation to surface activity and customer segments for review.",
    details: [
      "Analyzed 10K transactions.",
      "Surfaced 472 SAR cases and 858 high-risk customers.",
      "Flagged the top 5% (500) anomalous transactions.",
      "Built a three-page dashboard for executive overview, ML and anomaly analytics, and risk investigation.",
    ],
    metrics: [
      ["Transactions reviewed", "10K", 80],
      ["SAR cases surfaced", "472", 47],
      ["High-risk customers", "858", 70],
    ],
    url: "https://github.com/meghangowdru-debug/AML-Fraud-Detection-and-Investigation-Dashboard",
  },
  fuel: {
    kicker: "04 / ENVIRONMENTAL DATA",
    title: "Fuel Economy & Environmental Data Analysis",
    stack: ["Python", "Pandas", "Matplotlib"],
    summary: "A comparison of EPA vehicle records from 2008 and 2018 to examine fuel economy changes.",
    details: [
      "Cleaned 4,015 EPA vehicle records.",
      "Compared vehicle records from 2008 and 2018.",
      "Midsize vehicles improved 6.28 MPG.",
    ],
    metrics: [
      ["EPA records cleaned", "4,015", 80],
      ["Midsize vehicle improvement", "6.28 MPG", 63],
    ],
    url: "https://github.com/meghangowdru-debug/Fuel-Economy-Data-Analysis",
  },
} as const;

type ProjectId = keyof typeof projectDetails;
type Project = (typeof projectDetails)[ProjectId];
type Theme = "dark" | "light";

function getInitialTheme(): Theme {
  try {
    const savedTheme = window.localStorage.getItem("portfolio-theme");
    if (savedTheme === "light" || savedTheme === "dark") return savedTheme;
  } catch {
    // Storage can be unavailable in private browsing contexts.
  }
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

function SectionHeading({
  label,
  title,
  titleId,
  intro,
}: {
  label: string;
  title: string;
  titleId: string;
  intro?: string;
}) {
  return (
    <div className="section-head reveal">
      <span className="eyebrow section-label">{label}</span>
      <h2 className="section-title" id={titleId}>{title}</h2>
      {intro && <p className="section-intro">{intro}</p>}
    </div>
  );
}

function App() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [copied, setCopied] = useState(false);
  const [tilt, setTilt] = useState<{ x: number; y: number } | null>(null);
  const appRef = useRef<HTMLDivElement>(null);
  const modalPanelRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme;
    const themeColor = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
    if (themeColor) themeColor.content = theme === "light" ? "#F8FAFC" : "#0B1220";
    try {
      window.localStorage.setItem("portfolio-theme", theme);
    } catch {
      // The selected theme still works for the current page when storage is disabled.
    }
  }, [theme]);

  useLayoutEffect(() => {
    document.documentElement.classList.add("js-ready");
    const context = gsap.context(() => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const revealItems = gsap.utils.toArray<HTMLElement>(
        ".reveal, .reveal-left, .reveal-right, .reveal-scale",
      );

      if (reduceMotion) {
        gsap.set(revealItems, { autoAlpha: 1, x: 0, y: 0, scale: 1, clearProps: "transform" });
        gsap.utils.toArray<HTMLElement>(".stat-value[data-count]").forEach((counter) => {
          const value = Number(counter.dataset.count ?? 0);
          const prefix = counter.dataset.prefix ?? "";
          const suffix = counter.dataset.suffix ?? "";
          counter.textContent = `${prefix}${Math.round(value).toLocaleString("en-US")}${suffix}`;
        });
        return;
      }

      revealItems.forEach((element) => {
        const fromX = element.classList.contains("reveal-left")
          ? -28
          : element.classList.contains("reveal-right")
            ? 28
            : 0;
        const fromY = element.classList.contains("reveal") ? 22 : 0;
        const fromScale = element.classList.contains("reveal-scale") ? 0.95 : 1;
        gsap.fromTo(
          element,
          { autoAlpha: 0, x: fromX, y: fromY, scale: fromScale },
          {
            autoAlpha: 1,
            x: 0,
            y: 0,
            scale: 1,
            duration: 0.72,
            ease: "power2.out",
            scrollTrigger: { trigger: element, start: "top 88%", once: true },
          },
        );
      });

      gsap.fromTo(
        ".hero-copy",
        { autoAlpha: 0, y: 18 },
        { autoAlpha: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.12 },
      );

      gsap.utils.toArray<HTMLElement>(".stat-value[data-count]").forEach((counter) => {
        const value = Number(counter.dataset.count ?? 0);
        const prefix = counter.dataset.prefix ?? "";
        const suffix = counter.dataset.suffix ?? "";
        const count = { value: 0 };
        gsap.to(count, {
          value,
          duration: 1.25,
          ease: "power1.out",
          scrollTrigger: { trigger: counter, start: "top 90%", once: true },
          onUpdate: () => {
            counter.textContent = `${prefix}${Math.round(count.value).toLocaleString("en-US")}${suffix}`;
          },
        });
      });
    }, appRef);

    return () => {
      context.revert();
      document.documentElement.classList.remove("js-ready");
    };
  }, []);

  useLayoutEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((left, right) => right.intersectionRatio - left.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-25% 0px -60% 0px", threshold: [0, 0.2, 0.5, 0.8] },
    );
    sections.forEach(([id]) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);

  useLayoutEffect(() => {
    if (!selectedProject) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const panel = modalPanelRef.current;
    const closeButton = panel?.querySelector<HTMLElement>(".modal-close");
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButton?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedProject(null);
        return;
      }
      if (event.key !== "Tab" || !panel) return;
      const focusable = Array.from(
        panel.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, [selectedProject]);

  const openProject = (project: Project) => setSelectedProject(project);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      const temporaryInput = document.createElement("textarea");
      temporaryInput.value = email;
      temporaryInput.setAttribute("readonly", "");
      temporaryInput.style.position = "fixed";
      temporaryInput.style.opacity = "0";
      document.body.append(temporaryInput);
      temporaryInput.select();
      const didCopy = document.execCommand("copy");
      temporaryInput.remove();
      setCopied(didCopy);
      window.setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleCardKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      setTilt((current) => {
        const direction = event.key === "ArrowRight" ? 1 : -1;
        return { x: current?.x ?? 0, y: (current?.y ?? 0) + direction * 5 };
      });
    } else if (event.key === "Escape") {
      setTilt(null);
    }
  };

  return (
    <div ref={appRef} className="min-h-screen">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-[var(--surface)] focus:p-3 focus:text-[var(--text)]"
      >
        Skip to content
      </a>
      <header className="site-header" id="top">
        <nav className="nav container" aria-label="Main navigation">
          <a className="brand" href="#home" aria-label="Meghan Gowda B Y, home">
            <span className="brand-mark">MG</span>
            <span>Meghan Gowda B Y</span>
          </a>
          <ul className={`nav-menu${menuOpen ? " open" : ""}`} id="nav-menu">
            {sections.map(([id, label]) => (
              <li key={id}>
                <a
                  className={`nav-link${activeSection === id ? " active" : ""}`}
                  href={`#${id}`}
                  aria-current={activeSection === id ? "location" : undefined}
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <div className="nav-actions">
            <button
              className="theme-toggle"
              type="button"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
              aria-pressed={theme === "light"}
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
            </button>
            <button
              className="menu-toggle"
              type="button"
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-controls="nav-menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
            </button>
          </div>
        </nav>
      </header>

      <main id="main-content" className="min-h-screen">
        <section className="hero" id="home" aria-labelledby="hero-title">
          <div className="container hero-grid">
            <div className="hero-copy">
              <div className="hero-location">
                <MapPin aria-hidden="true" />
                Bengaluru, India
              </div>
              <h1 id="hero-title">
                <span className="line"><span>Meghan Gowda</span></span>
                <span className="line"><span>B Y</span></span>
              </h1>
              <p className="hero-role">
                Data Analyst <span className="accent">|</span> SQL · Python · Power BI · Excel
              </p>
              <svg className="hero-underline" viewBox="0 0 350 18" aria-hidden="true">
                <path d="M3 12C73 3 159 3 222 10c41 5 82 3 124-3" />
              </svg>
              <p className="hero-sub">Turning raw data into clear insights, dashboards and decisions.</p>
              <div className="hero-buttons">
                <a className="button button-primary" href="#projects">
                  View Projects <ArrowRight aria-hidden="true" />
                </a>
                <a className="button button-quiet" href="#contact">Contact</a>
              </div>
            </div>
            <div className="portrait-wrap reveal-scale">
              <div className="portrait-frame" aria-hidden="true" />
              <div
                className="portrait-card"
                role="group"
                tabIndex={0}
                aria-label="Interactive profile ID card for Meghan Gowda B Y. Use the left and right arrow keys to tilt."
                aria-keyshortcuts="ArrowLeft ArrowRight"
                onPointerMove={(event) => {
                  if (event.pointerType === "touch") return;
                  const bounds = event.currentTarget.getBoundingClientRect();
                  const x = (event.clientY - bounds.top) / bounds.height - 0.5;
                  const y = (event.clientX - bounds.left) / bounds.width - 0.5;
                  setTilt({ x: -x * 12, y: y * 14 });
                }}
                onPointerLeave={() => setTilt(null)}
                onKeyDown={handleCardKeyDown}
                onBlur={() => setTilt(null)}
                style={
                  tilt
                    ? ({
                        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                      } as CSSProperties)
                    : undefined
                }
              >
                <div className="portrait-id-header">
                  <span className="portrait-id-mark">Portfolio profile</span>
                  <span className="portrait-id-label">Bengaluru</span>
                </div>
                <div className="portrait-photo">
                  <img
                    src={`${import.meta.env.BASE_URL}images/meghan-portrait.jpg`}
                    alt="Portrait of Meghan Gowda B Y"
                  />
                </div>
                <div className="portrait-id-details">
                  <span className="portrait-id-initials" aria-hidden="true">MG</span>
                  <span className="portrait-id-copy">
                    <strong>Meghan Gowda B Y</strong>
                    <span>Data Analyst · Bengaluru, India</span>
                  </span>
                </div>
              </div>
              <div className="identity-card" aria-hidden="true">
                <span className="identity-tag">Data Analyst</span>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="about" aria-labelledby="about-title">
          <div className="container about-grid">
            <div>
              <div className="section-head">
                <span className="eyebrow section-label">A little about me</span>
                <h2 className="section-title" id="about-title">Curiosity, meet clarity.</h2>
              </div>
              <div className="about-copy reveal">
                <p>
                  <span className="about-line">Electronics and Communication Engineering graduate (2026)</span>
                  <span className="about-line">and Data Analytics Intern with SQL, Python, Excel and Power BI</span>
                  <span className="about-line">experience in data cleaning, validation, dashboards and reporting.</span>
                </p>
                <p><span className="about-line">Also builds Android apps and AI features.</span></p>
              </div>
            </div>
            <div className="stats-grid" aria-label="Data analytics highlights">
              <article className="stat-card reveal">
                <strong className="stat-value" data-count="15" data-suffix="%">0%</strong>
                <span className="stat-label">data accuracy improvement</span>
              </article>
              <article className="stat-card reveal">
                <strong className="stat-value" data-count="50" data-suffix="K+">0K+</strong>
                <span className="stat-label">rows cleaned</span>
              </article>
              <article className="stat-card reveal">
                <strong className="stat-value" data-count="4" data-suffix=" hrs">0 hrs</strong>
                <span className="stat-label">reporting time saved / week</span>
              </article>
              <article className="stat-card reveal">
                <strong className="stat-value" data-count="96" data-suffix="K+">0K+</strong>
                <span className="stat-label">orders analyzed</span>
              </article>
            </div>
          </div>
        </section>

        <section className="section section-alt" id="skills" aria-labelledby="skills-title">
          <div className="container">
            <SectionHeading
              label="What I work with"
              title="Skills & toolkit"
              titleId="skills-title"
              intro="A practical toolkit for reliable data, useful reporting and thoughtful products."
            />
            <div className="skills-grid">
              {skillGroups.map(({ title, icon: Icon, items }) => (
                <article className="skill-card surface-card reveal" key={title}>
                  <div className="skill-icon"><Icon aria-hidden="true" /></div>
                  <h3 className="card-title">{title}</h3>
                  <div className="chips">{items.map((item) => <span className="chip" key={item}>{item}</span>)}</div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="experience" aria-labelledby="experience-title">
          <div className="container">
            <SectionHeading
              label="Where I’ve contributed"
              title="Experience"
              titleId="experience-title"
              intro="Learning by building, validating and sharing work that makes information more useful."
            />
            <div className="timeline">
              <div className="timeline-rail" aria-hidden="true"><span className="timeline-progress" /></div>
              <article className="timeline-item reveal-left">
                <span className="timeline-dot" aria-hidden="true" />
                <div className="experience-card surface-card">
                  <div className="experience-top">
                    <h3 className="experience-title">Data Analytics Intern</h3>
                    <span className="date-tag">Jul 2026 – Sep 2026</span>
                  </div>
                  <p className="experience-org">TechMiya · Bengaluru</p>
                  <ul>
                    <li>Improved data accuracy by 15% (fewer duplicate and missing records across 50K+ rows) by cleaning and validating data from 3 sources with SQL, Python (Pandas) and Excel.</li>
                    <li>Cut manual reporting by 4 hours/week with 3 interactive Power BI dashboards tracking 8 KPIs.</li>
                    <li>Explained trends and findings in weekly insight reviews using clear summaries and visuals.</li>
                    <li>Documented data sources, validation rules and cleaning workflows.</li>
                  </ul>
                </div>
              </article>
              <article className="timeline-item reveal-right">
                <span className="timeline-dot" aria-hidden="true" />
                <div className="experience-card surface-card">
                  <div className="experience-top">
                    <h3 className="experience-title">Android App Development Using Generative AI Intern</h3>
                    <span className="date-tag">Feb 2026 – May 2026</span>
                  </div>
                  <p className="experience-org">MindMatrix</p>
                  <ul>
                    <li>Delivered 2 Android apps with 3 Generative AI use cases in Kotlin and Jetpack Compose.</li>
                  </ul>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="section section-alt" id="projects" aria-labelledby="projects-title">
          <div className="container">
            <SectionHeading
              label="Selected work"
              title="Projects with a point of view."
              titleId="projects-title"
              intro="Explore how analysis, visualization and automation can turn raw records into decisions."
            />
            <div className="projects-grid">
              <ProjectCard
                id="commerce"
                number="01"
                category="SALES ANALYTICS"
                title="CommerceIQ: Sales & Revenue Analytics"
                summary="A full-stack look at e-commerce performance, customer value, delivery experience and executive reporting."
                stack={["MySQL", "Python", "Power BI", "Gemini AI"]}
                metrics={["96,461 orders", "99,441 customers"]}
                onOpen={openProject}
              />
              <ProjectCard
                id="churn"
                number="02"
                category="CUSTOMER RETENTION"
                title="Customer Churn Analysis"
                summary="Customer segmentation and contract analysis to help reveal churn patterns and retention priorities."
                stack={["Python", "Pandas", "Scikit-learn", "Power BI"]}
                metrics={["7,043 records", "6-page dashboard"]}
                onOpen={openProject}
              />
              <ProjectCard
                id="aml"
                number="03"
                category="RISK INVESTIGATION"
                title="AML Fraud Detection & Investigation Dashboard"
                summary="Transaction analysis and risk investigation dashboard built to surface suspicious activity and support review."
                stack={["Python", "MySQL", "Scikit-learn", "Excel", "Power BI"]}
                metrics={["10K transactions", "472 SAR cases"]}
                onOpen={openProject}
              />
              <ProjectCard
                id="fuel"
                number="04"
                category="ENVIRONMENTAL DATA"
                title="Fuel Economy & Environmental Data Analysis"
                summary="A comparison of EPA vehicle records to explore changes in fuel economy across a decade."
                stack={["Python", "Pandas", "Matplotlib"]}
                metrics={["4,015 EPA records", "6.28 MPG gain"]}
                onOpen={openProject}
              />
            </div>
          </div>
        </section>

        <section className="section section-alt" id="resume" aria-labelledby="resume-title">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow section-label">Resume</span>
              <h2 className="section-title" id="resume-title">Resume &amp; experience</h2>
            </div>
            <article className="resume-card surface-card">
              <div>
                <span className="eyebrow">Meghan Gowda B Y · Data Analyst</span>
                <p className="resume-description">Explore my experience in data analytics, project work, education and certifications in the full resume.</p>
                <div className="resume-highlights" aria-label="Resume highlights">
                  <span className="chip">SQL &amp; Python</span>
                  <span className="chip">Power BI &amp; Excel</span>
                  <span className="chip">Data quality &amp; reporting</span>
                </div>
              </div>
              <div className="resume-actions">
                <a
                  className="button button-primary"
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open Meghan Gowda B Y's resume in a new tab"
                >
                  Preview / open PDF <ArrowUpRight aria-hidden="true" />
                </a>
                <a className="button button-quiet" href={resumeUrl} download="Meghan_Gowda_B_Y_Resume.pdf">
                  Download PDF <Download aria-hidden="true" />
                </a>
                <p className="resume-caption">PDF · Opens in a new tab or downloads to your device</p>
              </div>
            </article>
          </div>
        </section>

        <section className="section" id="education" aria-labelledby="education-title">
          <div className="container">
            <SectionHeading label="Learning & sharing" title="Education & publication" titleId="education-title" />
            <div className="edu-grid">
              <article className="education-card surface-card reveal">
                <h3 className="card-title">Education</h3>
                <div className="education-item">
                  <h4 className="education-degree">B.E. Electronics &amp; Communication Engineering</h4>
                  <p className="education-school">Cambridge Institute of Technology</p>
                  <div className="education-meta"><span>2022 – 2026</span><span>CGPA 7.79</span></div>
                </div>
                <div className="education-item">
                  <h4 className="education-degree">XII (PUC)</h4>
                  <p className="education-school">Sri Ranganatha PU College</p>
                  <div className="education-meta"><span>2019 – 2021</span><span>95.66%</span></div>
                </div>
              </article>
              <article className="publication-card surface-card reveal">
                <span className="eyebrow">IEEE Xplore · 2026</span>
                <h3 className="publication-name">“Embedded Based Auto-SOS Network Using IoT”</h3>
                <p className="muted">Publication</p>
                <a
                  className="publication-link"
                  href="https://ieeexplore.ieee.org/document/11492805"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read publication <ArrowUpRight aria-hidden="true" />
                </a>
              </article>
            </div>
          </div>
        </section>

        <section className="section section-alt" id="credentials" aria-labelledby="credentials-title">
          <div className="container">
            <SectionHeading label="Milestones" title="Certifications & achievements" titleId="credentials-title" />
            <div className="credentials-grid">
              <div className="credential-list" aria-label="Certifications">
                <Credential title="Oracle Cloud Infrastructure (OCI) Generative AI Professional" />
                <Credential title="Oracle Cloud Infrastructure (OCI) AI Foundations Associate" />
              </div>
              <div className="credential-list" aria-label="Achievements">
                <Credential
                  title="Finalist, Electrolython National Hackathon"
                  description="CMRIT, 2025 · SignSpeak (ASL interpreter using CNN, OpenCV and TensorFlow)"
                  achievement
                />
              </div>
            </div>
          </div>
        </section>

        <section className="section contact-section" id="contact" aria-labelledby="contact-title">
          <div className="container contact-grid">
            <div className="reveal">
              <span className="eyebrow section-label">Let’s connect</span>
              <h2 className="contact-title" id="contact-title">
                Let’s make data <span className="accent">make sense.</span>
              </h2>
              <p className="contact-copy">Have a question or want to connect? Reach me through any of the links here.</p>
              <button
                className={`button button-quiet copy-button${copied ? " copied" : ""}`}
                type="button"
                aria-label="Copy email address"
                onClick={copyEmail}
              >
                {copied ? <Check aria-hidden="true" /> : <Mail aria-hidden="true" />}
                <span className="copy-label">Copy email</span>
                <span className="copied-label" aria-live="polite">{copied ? "Copied!" : ""}</span>
              </button>
            </div>
            <div className="contact-details reveal">
              <div className="contact-row">
                <Mail aria-hidden="true" />
                <a className="link-underline" href={`mailto:${email}`}>{email}</a>
              </div>
              <div className="contact-row">
                <Phone aria-hidden="true" />
                <a className="link-underline" href="tel:+917975295551">+91 7975295551</a>
              </div>
              <div className="contact-row social-row">
                <a className="social-link" href="https://www.linkedin.com/in/meghan-22ec095/" target="_blank" rel="noopener noreferrer">LinkedIn <ArrowUpRight aria-hidden="true" /></a>
                <a className="social-link" href="https://github.com/meghangowdru-debug" target="_blank" rel="noopener noreferrer">GitHub <ArrowUpRight aria-hidden="true" /></a>
                <a className="social-link" href="https://leetcode.com/u/4dVSNovab5/" target="_blank" rel="noopener noreferrer">LeetCode <ArrowUpRight aria-hidden="true" /></a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <span>Meghan Gowda B Y · Data Analyst · Bengaluru, India</span>
          <a className="back-top" href="#home">Back to top ↑</a>
        </div>
      </footer>

      <div
        className={`modal${selectedProject ? " is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-summary"
        aria-hidden={!selectedProject}
        onMouseDown={(event) => {
          if (event.target === event.currentTarget) setSelectedProject(null);
        }}
      >
        <div
          className="modal-backdrop"
          aria-hidden="true"
          onClick={() => setSelectedProject(null)}
        />
        <div className="modal-panel" ref={modalPanelRef} tabIndex={-1}>
          <button
            className="modal-close"
            type="button"
            aria-label="Close project details"
            onClick={() => setSelectedProject(null)}
          >
            <X aria-hidden="true" />
          </button>
          {selectedProject && (
            <>
              <span className="eyebrow">{selectedProject.kicker}</span>
              <h2 className="modal-title" id="modal-title">{selectedProject.title}</h2>
              <p className="modal-summary" id="modal-summary">{selectedProject.summary}</p>
              <div className="chips">
                {selectedProject.stack.map((item) => <span className="chip" key={item}>{item}</span>)}
              </div>
              <ul className="modal-details">
                {selectedProject.details.map((detail) => <li key={detail}>{detail}</li>)}
              </ul>
              <div className="modal-metrics">
                {selectedProject.metrics.map(([label, value, scale]) => (
                  <div className="modal-metric" key={label}>
                    <div className="modal-metric-head"><span>{label}</span><strong>{value}</strong></div>
                    <div className="metric-track">
                      <div
                        className="metric-fill"
                        style={{ "--metric-scale": `${scale / 100}` } as CSSProperties}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="modal-actions">
                <a
                  className="button button-primary"
                  href={selectedProject.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on GitHub ↗
                </a>
                <button className="button button-quiet" type="button" onClick={() => setSelectedProject(null)}>
                  Close
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function ProjectCard({
  id,
  number,
  category,
  title,
  summary,
  stack,
  metrics,
  onOpen,
}: {
  id: ProjectId;
  number: string;
  category: string;
  title: string;
  summary: string;
  stack: string[];
  metrics: string[];
  onOpen: (project: Project) => void;
}) {
  return (
    <article className="project-card surface-card reveal">
      <div className="project-top">
        <span className="project-index">{number} / {category}</span>
        <ArrowUpRight className="project-arrow" aria-hidden="true" />
      </div>
      <h3 className="project-title">
        <button className="project-title-button" type="button" aria-haspopup="dialog" onClick={() => onOpen(projectDetails[id])}>
          {title}
        </button>
      </h3>
      <p className="project-summary">{summary}</p>
      <div className="chips">{stack.map((item) => <span className="chip" key={item}>{item}</span>)}</div>
      <div className="project-metrics">{metrics.map((metric) => <span className="metric-pill" key={metric}>{metric}</span>)}</div>
      <div className="project-footer">
        <span className="project-stack">Open for analysis details</span>
        <a
          className="github-link"
          href={projectDetails[id].url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View ${title} on GitHub`}
        >
          View on GitHub <ArrowUpRight aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}

function Credential({
  title,
  description,
  achievement = false,
}: {
  title: string;
  description?: string;
  achievement?: boolean;
}) {
  const Icon = achievement ? Award : GraduationCap;
  return (
    <article className="credential-card surface-card reveal">
      <span className="credential-mark"><Icon aria-hidden="true" /></span>
      <div>
        <h3 className="credential-title">{title}</h3>
        {description && <p className="credential-sub">{description}</p>}
      </div>
    </article>
  );
}

export default App;
