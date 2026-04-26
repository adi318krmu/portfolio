const portfolioData = {
  meta: {
    name: "Aditya  Singh",
    title: "",
    roleLine: "CSE student building practical web products with strong fundamentals in JavaScript, C++, and modern frontend development.",
    location: "India",
    availability: "Open to internships and interview opportunities",
    image: "interview-photo.jpeg",
    resume: "resume.pdf",
  },
  hero: {
    badge: "Interview Portfolio",
    intro:
      "I am focused on turning academic learning into real products. I enjoy building clean web experiences, learning by shipping projects, and explaining my work clearly during interviews.",
    focusAreas: [
      "Frontend Development",
      "Problem Solving",
      "JavaScript Projects",
      "C++ Foundations",
    ],
    callouts: [
      {
        value: "3+",
        label: "portfolio-ready projects",
      },
      {
        value: "1",
        label: "single file to edit all content",
      },
      {
        value: "100%",
        label: "interview-oriented storytelling",
      },
      {
        value: "24/7",
        label: "ready to keep improving",
      },
    ],
    photoNoteTitle: "Quick Introduction",
    photoNote:
      "This portfolio highlights what I can discuss confidently in an interview: my current skills, projects, learning mindset, and the value I can bring as a growing developer.",
  },
  interviewSnapshot: {
    title: "What You Can Ask Me In An Interview",
    subtitle:
      "",
    items: [
      {
        title: "How I Build",
        text: "I prefer breaking features into small components, building a clean structure first, then refining the UI and interactions.",
      },
      {
        title: "How I Learn",
        text: "I learn fast by building, debugging, and revisiting fundamentals until I can explain concepts simply.",
      },
      {
        title: "Why I Am A Good Hire",
        text: "I bring consistency, curiosity, and the willingness to take ownership of tasks while continuously improving my technical depth.",
      },
    ],
  },
  about: {
    title: "About Me",
    summary:
      "I am a Computer Science student with a strong interest in web development and software engineering. I enjoy creating useful interfaces, improving my programming fundamentals, and working on projects that solve practical problems.",
    details: [
      "Currently exploring frontend and full-stack web development.",
      "Comfortable with learning new tools quickly when a project needs them.",
      "Interested in roles where I can contribute, learn from experienced teams, and grow into a strong software engineer.",
    ],
    strengths: [
      "Clear communication",
      "Fast learner",
      "Ownership mindset",
      "Structured problem solving",
      "Continuous improvement",
      "Team collaboration",
    ],
  },
  skills: {
    title: "Skills And Tools",
    subtitle:
      "",
    items: [
      "C++",
      "JavaScript",
      "HTML",
      "CSS",
      "Python",
      "Node.js",
      "MongoDB",
      "Git",
      "Responsive Design",
      "UI Development",
      "Problem Solving",
      "Cybersecurity Basics",
    ],
  },
  projects: {
  title: "Selected Projects",
  subtitle: "",
  items: [
    {
      name: "AI GitHub Analyzer",
      summary:
        "A backend system that analyzes GitHub repositories using AI and custom scoring logic to evaluate code quality, structure, and best practices.",
      impact: [
        "Integrated GitHub API to fetch repository data (README, file structure), processing 100+ repositories during testing.",
        "Designed a weighted scoring engine generating an interview readiness score, improving evaluation consistency by 40%.",
        "Implemented secure authentication using JWT and bcrypt with multi-user analysis tracking stored in MongoDB.",
        "Optimized API performance with rate limiting, handling 100+ requests/min without failure."
      ],
      stack: ["Node.js", "Express", "MongoDB", "JWT", "AI"],
      link: "https://github.com/adi318krmu/RepoLens"
    },
    {
      name: "VendorSetu",
      summary:
        "A platform enabling vendors to purchase affordable and verified food supplies with efficient backend architecture.",
      impact: [
        "Onboarded 20+ test users during initial deployment.",
        "Built backend using Node.js, Express, and MongoDB supporting 50+ product listings.",
        "Implemented JWT-based authentication and optimized REST APIs reducing response time by 25%."
      ],
      stack: ["Node.js", "Express", "MongoDB"],
      link: "https://vendor-setu.vercel.app"
    },
    {
      name: "Campus Learn",
      summary:
        "A Hybrid RAG-based academic assistant that provides syllabus-based answers from faculty-uploaded notes.",
      impact: [
        "Tested with 30+ users for real academic use cases.",
        "Processed and indexed 100+ academic documents using vector embeddings.",
        "Improved answer relevance by 35% using retrieval-augmented generation."
      ],
      stack: ["RAG", "Vector DB", "AI", "Node.js"],
      link: "https://campus-learn-lms-zqft.vercel.app"
    }
  ]
},
  timeline: {
    title: "Education And Growth",
    subtitle:
      "",
    items: [
      {
        title: "Bachelors in Technology in Computer Science Engineering",
        meta: "",
        points: [
          "K.R.Mangalam University",
          "2023 - 2027",
          "CGPA 8",
        ],
        tags: [],
      },
      {
        title: "Certifications And Learning",
        meta: "Optional but interview-useful",
        points: [
          "Add online certifications, workshops, hackathons, or coding profiles.",
          "Mention what you learned, not just the certificate name.",
          "Keep only the strongest items to maintain a clean story.",
        ],
        tags: ["Courses", "Achievements"],
      },
    ],
  },
  contact: {
    title: "Reach Out",
    subtitle:
      "",
    items: [
      {
        label: "Email",
        value: "adityaks0604@gmail.com",
        href: "mailto:your.adityaks0604@gmail.com",
      },
      {
        label: "LinkedIn",
        value: "Aditya Singh",
        href: "https://www.linkedin.com/in/aditya-singh-59578934b/",
      },
      {
        label: "GitHub",
        value: "adi318krmu",
        href: "https://github.com/adi318krmu",
      },
    ],
    footerNote:
      "",
  },
};

const app = document.querySelector("#app");
const themeToggle = document.querySelector(".theme-toggle");
const themeLabel = document.querySelector(".theme-toggle__icon");

function renderPortfolio(data) {
  app.innerHTML = `
    <div class="portfolio">
      <section class="hero glass-card reveal">
        <div class="hero-copy">
          <div class="eyebrow">${data.hero.badge}</div>
          <div>
            <p class="meta">${data.meta.availability}</p>
            <h1>${data.meta.name}</h1>
            <p class="meta">${data.meta.title}</p>
          </div>
          <p class="hero-intro">${data.meta.roleLine} ${data.hero.intro}</p>
          <div class="hero-actions">
            <a class="button button--primary" href="#projects">View Projects</a>
            <a class="button button--secondary" href="#contact">Contact Me</a>
          </div>
          <div class="hero-links">
            ${data.hero.focusAreas.map((item) => `<span class="link-chip">${item}</span>`).join("")}
          </div>
          <div class="stats-strip">
            ${data.hero.callouts
              .map(
                (item) => `
                  <article class="stat-card">
                    <strong>${item.value}</strong>
                    <span>${item.label}</span>
                  </article>
                `
              )
              .join("")}
          </div>
        </div>
        <div class="hero-photo-wrap">
          <img class="hero-photo" src="${data.meta.image}" alt="${data.meta.name} portrait">
          <div class="photo-badge">
            <strong>${data.hero.photoNoteTitle}</strong>
            <span>${data.hero.photoNote}</span>
          </div>
        </div>
      </section>

      <section class="section-card glass-card reveal">
        <div class="section-head">
          <div>
            <p class="meta">Interview Snapshot</p>
            <h2 class="section-title">${data.interviewSnapshot.title}</h2>
          </div>
          <p class="section-subtitle">${data.interviewSnapshot.subtitle}</p>
        </div>
        <div class="highlights-grid">
          ${data.interviewSnapshot.items
            .map(
              (item) => `
                <article class="highlight-card">
                  <h3>${item.title}</h3>
                  <p>${item.text}</p>
                </article>
              `
            )
            .join("")}
        </div>
      </section>

      <section class="section-card glass-card reveal">
        <div class="section-head">
          <div>
            <p class="meta">Profile</p>
            <h2 class="section-title">${data.about.title}</h2>
          </div>
        </div>
        <div class="info-layout">
          <article class="info-card">
            <p>${data.about.summary}</p>
            <ul>
              ${data.about.details.map((item) => `<li>${item}</li>`).join("")}
            </ul>
          </article>
          <article class="info-card">
            <p class="meta">Strengths</p>
            <div class="pill-list">
              ${data.about.strengths.map((item) => `<span class="pill">${item}</span>`).join("")}
            </div>
          </article>
        </div>
      </section>

      <section class="section-card glass-card reveal">
        <div class="section-head">
          <div>
            <p class="meta">Stack</p>
            <h2 class="section-title">${data.skills.title}</h2>
          </div>
          <p class="section-subtitle">${data.skills.subtitle}</p>
        </div>
        <div class="pill-list">
          ${data.skills.items.map((item) => `<span class="pill">${item}</span>`).join("")}
        </div>
      </section>

      <section class="section-card glass-card reveal" id="projects">
        <div class="section-head">
          <div>
            <p class="meta">Work</p>
            <h2 class="section-title">${data.projects.title}</h2>
          </div>
          <p class="section-subtitle">${data.projects.subtitle}</p>
        </div>
        <div class="highlights-grid">
          ${data.projects.items
            .map(
              (project) => `
                <article class="project-card">
                  <div>
                    <p class="meta">Project</p>
                    <h3>${project.name}</h3>
                  </div>
                  <p class="project-meta">${project.summary}</p>
                  <ul>
                    ${project.impact.map((point) => `<li>${point}</li>`).join("")}
                  </ul>
                  <div class="project-tags">
                    ${project.stack.map((tag) => `<span class="tag">${tag}</span>`).join("")}
                  </div>
                  <a class="button button--secondary" href="${project.link}">Project Link</a>
                </article>
              `
            )
            .join("")}
        </div>
      </section>

      <section class="section-card glass-card reveal">
        <div class="section-head">
          <div>
            <p class="meta">Timeline</p>
            <h2 class="section-title">${data.timeline.title}</h2>
          </div>
          <p class="section-subtitle">${data.timeline.subtitle}</p>
        </div>
        <div class="timeline">
          ${data.timeline.items
            .map(
              (item) => `
                <article class="timeline-card">
                  <h3>${item.title}</h3>
                  <p>${item.meta}</p>
                  <ul>
                    ${item.points.map((point) => `<li>${point}</li>`).join("")}
                  </ul>
                  <div class="timeline-tags">
                    ${item.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
                  </div>
                </article>
              `
            )
            .join("")}
        </div>
      </section>

      <section class="section-card glass-card reveal" id="contact">
        <div class="section-head">
          <div>
            <p class="meta">Contact</p>
            <h2 class="section-title">${data.contact.title}</h2>
          </div>
          <p class="section-subtitle">${data.contact.subtitle}</p>
        </div>
        <div class="contact-grid">
          ${data.contact.items
            .map(
              (item) => `
                <a class="contact-card" href="${item.href}" target="_blank" rel="noreferrer">
                  <p class="meta">${item.label}</p>
                  <strong>${item.value}</strong>
                </a>
              `
            )
            .join("")}
        </div>
      </section>

      <footer class="footer glass-card reveal">
        <p class="footer-note">${data.contact.footerNote}</p>
        <div class="footer-links">
          <a class="button button--secondary" href="#top">Back To Top</a>
          <a class="button button--primary" href="${data.meta.resume}">Resume Link</a>
        </div>
      </footer>
    </div>
  `;
}

function applyTheme(theme) {
  const dark = theme === "dark";
  document.body.classList.toggle("dark", dark);
  themeLabel.textContent = dark ? "Light" : "Dark";
}

themeToggle.addEventListener("click", () => {
  const nextTheme = document.body.classList.contains("dark") ? "light" : "dark";
  localStorage.setItem("portfolio-theme", nextTheme);
  applyTheme(nextTheme);
});

renderPortfolio(portfolioData);
applyTheme(localStorage.getItem("portfolio-theme") || "light");
