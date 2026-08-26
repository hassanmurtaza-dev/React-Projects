const REPO = "https://github.com/hassanmurtaza-dev/React-Projects";

export const profile = {
  name: "Muhammad Hassan Murtaza",
  short: "Hassan",
  initials: "MH",
  role: "Front-End Developer",
  location: "Multan, Pakistan",
  email: "cout.hassan0@gmail.com",
  github: "https://github.com/hassanmurtaza-dev",
  linkedin: "https://www.linkedin.com/in/hassan-murtaza-0b8531321/",
  resume: "",
  photo: "/profile.png",
  availability: "Open to work",
  languages: "English, Urdu",
  response: "Usually within 24 hours",
};

export const heroIntro =
  "Front-End Developer from Multan, Pakistan. I turn designs into production-ready React and Next.js interfaces — typed with TypeScript, wired to real REST APIs, secured with Firebase Authentication, and responsive on every screen.";

export const heroStats = [
  { value: "10+", label: "Projects shipped" },
  { value: "100%", label: "Responsive builds" },
  { value: "< 24h", label: "Reply time" },
];

export const heroFloats = ["React", "Next.js", "TypeScript", "Firebase"];

export const marquee = [
  "Next.js",
  "TypeScript",
  "Redux Toolkit",
  "Firebase Auth",
  "REST APIs",
  "Tailwind CSS",
  "Laravel",
  "MySQL",
  "Git",
  "React",
];

export const about = {
  heading: ["Developer who cares about", "how it feels", ", not just how it looks."],
  paragraphs: [
    "a Front-End Developer based in Multan, Pakistan. I started out writing PHP, Laravel and CodeIgniter backends, which taught me how data actually moves through an application — and that perspective now shapes every interface I build.",
    "Today I work mainly in React and Next.js with TypeScript. I integrate REST APIs with proper loading, empty and error states, secure apps with Firebase Authentication, and manage state with Redux Toolkit. Every build ships responsive, keyboard-accessible and with a dark/light theme — because those aren't extras, they're the baseline.",
    "I'm currently completing my BS in Computer Science (graduating 2026) and taking on freelance and remote front-end work.",
  ],
  stats: [
    { target: 1, suffix: "+", label: "Years Experience" },
    { target: 10, suffix: "+", label: "Projects Built" },
    { target: 5, suffix: "+", label: "Core Technologies" },
    { target: 2026, suffix: "", label: "Graduating" },
  ],
  focus: [
    "React & Next.js development",
    "TypeScript-first codebases",
    "REST API integration",
    "Firebase Auth & Firestore",
    "Responsive, accessible UI",
    "Performance & clean code",
  ],
};

export const services = [
  {
    title: "React & Next.js Development",
    description:
      "Single-page apps and server-rendered Next.js sites built from reusable components, with routing, SEO metadata and clean, typed code.",
    tags: ["React", "Next.js", "TypeScript"],
  },
  {
    title: "API Integration",
    description:
      "Connecting the frontend to any REST API — auth headers, pagination, caching, loading and error states handled properly, not as an afterthought.",
    tags: ["REST", "Axios", "React Query"],
  },
  {
    title: "Firebase Authentication",
    description:
      "Full auth flows: email/password and Google sign-in, protected routes, session persistence and per-user data rules in Firestore.",
    tags: ["Firebase Auth", "Firestore", "Rules"],
  },
  {
    title: "Responsive UI Engineering",
    description:
      "Interfaces that hold up from a 320px phone to an ultrawide monitor, with accessible markup, dark/light theming and smooth motion.",
    tags: ["CSS", "Tailwind", "a11y"],
  },
];

export const skillGroups = [
  {
    name: "Frontend Engineering",
    note: "Component architecture, state management and pixel-accurate UI.",
    tone: "blue",
    items: [
      { name: "React", level: 90 },
      { name: "Next.js", level: 82 },
      { name: "TypeScript", level: 78 },
      { name: "JavaScript (ES6+)", level: 88 },
      { name: "Redux Toolkit", level: 75 },
      { name: "HTML5 & CSS3", level: 95 },
    ],
  },
  {
    name: "Backend & Data",
    note: "APIs, authentication and the database layer behind the interface.",
    tone: "violet",
    items: [
      { name: "REST API Integration", level: 85 },
      { name: "Firebase Auth", level: 85 },
      { name: "Cloud Firestore", level: 80 },
      { name: "Laravel", level: 80 },
      { name: "PHP", level: 78 },
      { name: "MySQL", level: 78 },
    ],
  },
  {
    name: "Tooling & Workflow",
    note: "The everyday stack that keeps shipping fast and predictable.",
    tone: "pink",
    items: [
      { name: "Git & GitHub", level: 88 },
      { name: "Vite", level: 85 },
      { name: "Firebase Hosting", level: 82 },
      { name: "Tailwind & Bootstrap", level: 85 },
      { name: "Postman", level: 80 },
      { name: "Figma to Code", level: 75 },
    ],
  },
];

export const projects = [
  {
    title: "Admin Dashboard",
    category: "React",
    featured: true,
    description:
      "A multi-page analytics dashboard with routed pages, charts drawn by hand in SVG, sortable and paginated tables, and a light/dark theme that is remembered.",
    tags: ["React Router", "Context", "SVG"],
    gradient: "linear-gradient(135deg, #7c5cff, #38dfff)",
    demo: "",
    code: `${REPO}/tree/main/04-admin-dashboard`,
  },
  {
    title: "Invoice Generator",
    category: "Tools",
    featured: true,
    description:
      "Fill in an invoice and print it or save it as a PDF. Live totals, discount and tax, five currencies, and a real print stylesheet — no PDF library.",
    tags: ["React", "Intl API", "Print CSS"],
    gradient: "linear-gradient(135deg, #ff5cad, #7c5cff)",
    demo: "",
    code: `${REPO}/tree/main/05-invoice-generator`,
  },
  {
    title: "Weather App",
    category: "API",
    featured: false,
    description:
      "Search any city for current conditions and a five-day forecast. The background gradient follows the weather and the time of day at that location.",
    tags: ["REST API", "useEffect", "async"],
    gradient: "linear-gradient(135deg, #38dfff, #35e8c3)",
    demo: "",
    code: `${REPO}/tree/main/02-weather-app`,
  },
  {
    title: "Calculator",
    category: "Tools",
    featured: false,
    description:
      "Chained operations, full keyboard support, and the arithmetic kept in its own module so it can be tested without React.",
    tags: ["React", "State machine"],
    gradient: "linear-gradient(135deg, #7c5cff, #ff5cad)",
    demo: "",
    code: `${REPO}/tree/main/03-calculator`,
  },
  {
    title: "Todo & Task Manager",
    category: "React",
    featured: false,
    description:
      "Add, complete and filter tasks with all / active / completed views. Everything is saved to localStorage, so the list survives a refresh.",
    tags: ["React", "useState", "localStorage"],
    gradient: "linear-gradient(135deg, #35e8c3, #38dfff)",
    demo: "",
    code: `${REPO}/tree/main/01-todo-app`,
  },
];

export const navLinks = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export const socials = [
  { label: "Email", href: `mailto:${profile.email}` },
  { label: "GitHub", href: profile.github },
  { label: "LinkedIn", href: profile.linkedin },
].filter((link) => link.href);
