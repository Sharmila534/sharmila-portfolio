/**
 * ==============================================================================
 * CENTRAL PORTFOLIO DATA CONFIGURATION
 * ==============================================================================
 * All links, project metadata, skill classifications, certifications, and
 * contact coordinates are managed in this single source of truth.
 * 
 * Instructions:
 * - Edit links below when your actual production URLs / repositories are ready.
 * - Credential links come from the supplied portfolio details.
 * - Reported results are labeled with their source protocol and limitations.
 * ==============================================================================
 */

export interface ProjectData {
  id: string;
  title: string;
  subtitle: string;
  status: 'In Active Development' | 'Learning Prototype' | 'Academic Coursework' | 'Prototype';
  tagline: string;
  category: 'Geospatial AI & Computer Vision' | 'Applied Generative AI' | 'Software Engineering' | 'Classical AI & Search';
  tags: string[];
  description: string;
  problem: string;
  approach: string;
  architecture: string[];
  implementation: string[];
  results: {
    metric: string;
    value: string;
    datasetOrProtocol: string;
    notes: string;
  }[];
  limitationsAndDisclaimers: string[];
  links: {
    label: string;
    url: string;
    isExternal: boolean;
    isPlaceholder: boolean;
  }[];
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: {
    name: string;
    level: 'Practical Project Experience' | 'Coursework & Academic';
    note?: string;
  }[];
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  platform: string;
  verificationUrl: string;
  skillsCovered: string[];
  description: string;
}

export const PORTFOLIO_DATA = {
  // --- Personal & Profile Metadata ---
  profile: {
    fullName: "Sai Sharmila Kinjarapu",
    preferredName: "Sai Sharmila",
    monogram: "SK",
    handle: "@sirix",
    headline: "Software Engineering | Applied AI & Machine Learning | Computer Vision",
    institution: "Vellore Institute of Technology - Andhra Pradesh (VIT-AP)",
    school: "School of Computer Science and Engineering (SCOPE)",
    degree: "Integrated M.Tech in Software Engineering",
    academicYears: "2023 – 2028",
    graduationYear: 2028,
    cgpa: "9.13 / 10.0",
    location: "Amaravati, Andhra Pradesh, India",
    shortBio: "Integrated M.Tech Software Engineering student at VIT-AP graduating in 2028 (CGPA 9.13/10). Exploring the intersection of software engineering, machine learning, computer vision, analytics, and practical AI systems. Currently in active development on TerraSeg AI and AquaGuard AI.",
    interests: [
      "Software Engineering & Architecture",
      "Applied AI & Machine Learning",
      "Computer Vision & Remote Sensing",
      "Data Analytics & Business Intelligence",
      "Practical Agentic Decision Systems"
    ]
  },

  // --- Central Link Registry (Edit all URLs here) ---
  links: {
    email: "saisharmilak2005@gmail.com",
    linkedin: "https://www.linkedin.com/in/sai-sharmila-kinjarapu-56366728a",
    github: "https://github.com/Sharmila534",
    resumePdfPath: "/portfolio/Sai_Sharmila_Kinjarapu_Resume.pdf",
    
    // Project Specific Link Placeholders
    terrasegRepo: "https://github.com/Sharmila534/terraseg-ai",
    terrasegDemo: "",
    aquaguardRepo: "https://github.com/Sharmila534/aquaguard-ai",
    aquaguardWalkthrough: "https://lnkd.in/gAFpMY5Y",
    aquaguardBuildStory: "https://aquaguard-ai.hashnode.dev",
    aquaguardLinkedInPost: "",
    hmsRepo: "https://github.com/Sharmila534/hospital-management-system",
    aiPlanningRepo: "https://github.com/Sharmila534/AI-Assignment"
  },

  // --- Research & Projects Registry ---
  projects: [
    {
      id: "terraseg-ai",
      title: "TerraSeg AI",
      subtitle: "Multi-Dataset Satellite Landslide Segmentation Research Prototype",
      status: "In Active Development",
      tagline: "An in-progress research prototype comparing satellite-image segmentation across multispectral and RGB datasets.",
      category: "Geospatial AI & Computer Vision",
      tags: ["Computer Vision", "Satellite Imagery", "14-Channel Segmentation", "ResNet34 U-Net", "YOLO11-seg", "Gradio"],
      description: "An in-progress landslide-segmentation research prototype spanning 3,799 14-channel Landslide4Sense patches and 770 Bijie landslide image-mask pairs. A Gradio interface for patch inspection is implemented; consolidating the broader research workflow into a reproducible interactive prototype remains in progress.",
      problem: "The project studies how segmentation models perform on satellite-image patches, how optical and terrain channels affect results, and how predictions can be inspected. The reported experiments use separate datasets and protocols.",
      approach: "Prepared and evaluated model workflows across Landslide4Sense and Bijie data. Compared Custom CNN, U-Net and ResNet34 U-Net, YOLO11-seg and a Random Forest baseline; tested loss functions, augmentation, attention modules and alternative input channels.",
      architecture: [
        "Landslide4Sense: 3,799 image-mask patches at 128 × 128 pixels, with 14 input channels (12 optical bands, slope and DEM).",
        "Bijie: 770 landslide image-mask pairs; the reported subset contains landslide-positive imagery only.",
        "Compared Custom CNN, U-Net / ResNet34 U-Net, YOLO11-seg and Random Forest, plus loss, augmentation, attention and channel variants.",
        "Implemented Grad-CAM, channel-permutation analysis, connected-component candidate-region extraction, JSON output and a Gradio patch-inspection demo."
      ],
      implementation: [
        "Implemented experimental workflows in Python and PyTorch, including data preprocessing, channel normalisation, split creation and model evaluation.",
        "The Gradio interface for inspecting image patches is implemented. Consolidating the wider research workflow into a reproducible interactive prototype remains in progress."
      ],
      results: [
        {
          metric: "Mean Test IoU / F1",
          value: "0.6079 / 0.7562",
          datasetOrProtocol: "Landslide4Sense • All14 U-Net • three-seed mean",
          notes: "Reported three-seed test mean: precision 0.7500, recall 0.7627, IoU standard deviation 0.0069. Separate from the Bijie protocol and not directly comparable."
        },
        {
          metric: "Mean Test IoU / F1",
          value: "0.7913 / 0.8835",
          datasetOrProtocol: "Bijie • ResNet34 U-Net • three-seed mean",
          notes: "Reported three-seed test mean; precision 0.8736 and recall 0.8935 are the arithmetic means of the saved seed-level outputs. The landslide-positive subset does not establish false-alarm performance."
        }
      ],
      limitationsAndDisclaimers: [
        "RESEARCH PROTOTYPE: TerraSeg is not a deployed early-warning service. The broader interactive workflow is still being consolidated.",
        "DATASET LIMITATION: The reported Bijie subset contains landslide-positive samples only; false-alarm performance on non-landslide imagery has not been established.",
        "GEOREFERENCE LIMITATION: DEM inputs are 8-bit image values, and precise geospatial alignment, calibrated areas and map-accurate polygons are not verified.",
        "PROTOCOL LIMITATION: Landslide4Sense and Bijie results come from different datasets and evaluation setups; treat them as separate experiments."
      ],
      links: [
        { label: "Code Repository", url: "https://github.com/Sharmila534/terraseg-ai", isExternal: true, isPlaceholder: false },
        
      ]
    },
    {
      id: "aquaguard-ai",
      title: "AquaGuard AI",
      subtitle: "Gemini / Google ADK Multi-Agent Aquaculture Decision-Support Prototype",
      status: "In Active Development",
      tagline: "A Gemini-powered multi-agent aquaculture prototype demonstrated with simulated farm context.",
      category: "Applied Generative AI",
      tags: ["Multi-Agent AI", "Google Gemini API", "Google ADK", "Python", "Decision Support Prototype"],
      description: "A hackathon-scale multi-agent aquaculture decision-support prototype. Water-quality, weather-risk, and market-intelligence agents contribute to a root assessment. The demonstrated farm context is simulated; no live IoT feed is connected.",
      problem: "Farm decisions can depend on changing water quality, weather, and market conditions. AquaGuard explores a multi-agent interface for bringing those signals into a single decision-support conversation.",
      approach: "A root agent coordinates water-quality, weather-risk, and market-intelligence agents, then synthesizes risk, evidence, recommended next steps, and uncertainty. The prototype uses simulated farm data rather than live sensor feeds.",
      architecture: [
        "Water-quality specialist considers dissolved oxygen, temperature, pH, and salinity; weather and market specialists contribute their respective context.",
        "A root agent combines the specialist perspectives into a risk assessment, evidence, next steps, and uncertainty.",
        "The documented prototype includes Firebase Authentication and Cloud Firestore for user-scoped farm context, assessments, and conversations.",
        "Farm inputs shown in the prototype are simulated; live IoT, weather, and market feeds are not claimed."
      ],
      implementation: [
        "A Gemini-powered multi-agent prototype built for the Gen AI Impact Edition hackathon.",
        "Firebase Authentication and Cloud Firestore support the documented identity and user-scoped data flow.",
        "Outputs are prototype decision support and require independent human judgment."
      ],
      results: [],
      limitationsAndDisclaimers: [
        "PROTOTYPE ONLY: This is a research/demo prototype using supplied or demo inputs, not a production system.",
        "SIMULATED INPUTS: The current demonstration uses simulated farm data, not live IoT sensors.",
        "NO LIVE FEEDS: Live forecast and market integrations are not claimed.",
        "NO VALIDATION CLAIM: No measured advisory accuracy or operational farm outcome is claimed."
      ],
      links: [
        { label: "Code Repository", url: "https://github.com/Sharmila534/aquaguard-ai", isExternal: true, isPlaceholder: false },
        { label: "Prototype Walkthrough", url: "https://lnkd.in/gAFpMY5Y", isExternal: true, isPlaceholder: false },
        { label: "Build Story on Hashnode", url: "https://aquaguard-ai.hashnode.dev", isExternal: true, isPlaceholder: false }
      ]
    },
    {
      id: "hospital-management-system",
      title: "Hospital Management System (HMS)",
      subtitle: "Learning Prototype & LLM Prompting Exploration",
      status: "Learning Prototype",
      tagline: "Academic learning prototype exploring full-stack healthcare administration workflows and AI prompt design.",
      category: "Software Engineering",
      tags: ["Flask", "MongoDB", "Python", "HTML/CSS", "Git", "Prompt Design", "Healthcare Workflow"],
      description: "A small hospital management learning prototype developed to explore core healthcare data workflows alongside practical LLM prompt engineering. Implemented patient records, doctor appointment scheduling, and basic admission workflows while using LLMs as an iterative engineering aid.",
      problem: "Understanding full-stack web architecture, database consistency, and how context and system instruction engineering affect LLM-assisted code generation in enterprise software workflows.",
      approach: "Built modular backend routes with Flask, connected a flexible document store with MongoDB, and used ChatGPT as an interactive learning aid to explore prompt design and understand how explicit constraints influence model outputs.",
      architecture: [
        "Backend API: Python Flask REST endpoints handling patient intake, appointment scheduling, and doctor records.",
        "Data Storage: MongoDB document collections for patient demographics, clinical notes, and appointment slots.",
        "Frontend Interface: Clean semantic HTML5, CSS, and lightweight JavaScript client views.",
        "Version Control: Git-based development workflow with feature branching and commit tracking."
      ],
      implementation: [
        "Built a Flask and MongoDB learning prototype with patient, doctor, appointment, and admission workflow scaffolding.",
        "Explored system prompt templates and constraint modeling during development."
      ],
      results: [],
      limitationsAndDisclaimers: [
        "LEARNING PROTOTYPE: This is an educational academic prototype created to learn full-stack development and prompt engineering.",
        "NOT FOR CLINICAL USE: Does not contain HIPAA/production clinical compliance certifications."
      ],
      links: [
        { label: "Code Repository", url: "https://github.com/Sharmila534/hospital-management-system", isExternal: true, isPlaceholder: false }
      ]
    },
    {
      id: "ai-planning-search",
      title: "AI Planning & Search",
      subtitle: "Classical AI Algorithms & Heuristic Search Coursework",
      status: "Academic Coursework",
      tagline: "Comprehensive coursework implementations of state-space search, heuristic algorithms, adversarial search, and PDDL planning.",
      category: "Classical AI & Search",
      tags: ["A* Search", "Minimax", "BFS", "PDDL", "Python"],
      description: "Coursework repository containing A* 8-puzzle search, Minimax Tic-Tac-Toe, BFS water-jug search, and planning exercises including goal-stack planning and PDDL.",
      problem: "Solving deterministic graph search, optimal pathfinding, multi-agent adversarial games, and automated task planning through mathematical formulations.",
      approach: "The repository presents separate Python exercises for search, game-tree reasoning, and classical planning.",
      architecture: [
        "A* search for the 8-puzzle.",
        "Minimax for Tic-Tac-Toe and BFS for the water-jug problem.",
        "Planning exercises include goal-stack planning and PDDL examples."
      ],
      implementation: [
        "Pure Python implementations focusing on algorithmic clarity, computational complexity, and space/time tradeoffs.",
        "Validation against benchmark grid-worlds and discrete planning domains."
      ],
      results: [],
      limitationsAndDisclaimers: [
        "ACADEMIC COURSEWORK: Created as part of core computer science and artificial intelligence curriculum at VIT-AP."
      ],
      links: [
        { label: "Code Repository", url: "https://github.com/Sharmila534/AI-Assignment", isExternal: true, isPlaceholder: false }
      ]
    }
  ],

  // --- Skills Registry (Strictly Calibrated) ---
  skills: [
    { title: "Programming", description: "Languages visible in the supplied project repositories.", skills: [
      { name: "Python", level: "Practical Project Experience", note: "TerraSeg, AquaGuard, Flask prototype, and coursework" },
      { name: "JavaScript", level: "Practical Project Experience", note: "Portfolio interface" },
      { name: "HTML / CSS", level: "Practical Project Experience", note: "Portfolio and project interfaces" },
      { name: "Java", level: "Coursework & Academic", note: "Listed in supplied academic/project information" }
    ] },
    { title: "Computer Vision", description: "Methods and models documented in the TerraSeg research prototype.", skills: [
      { name: "PyTorch", level: "Practical Project Experience", note: "TerraSeg implementation" },
      { name: "Custom CNN", level: "Practical Project Experience", note: "Satellite-image segmentation experiments" },
      { name: "U-Net", level: "Practical Project Experience", note: "RGB and multispectral experiments" },
      { name: "ResNet34 U-Net", level: "Practical Project Experience", note: "Landslide4Sense and Bijie studies" },
      { name: "Data Pairing & Segmentation Metrics", level: "Practical Project Experience", note: "HDF5, PNG and NetCDF workflows" }
    ] },
    { title: "Applied Generative AI", description: "A documented prompt-based multi-agent prototype.", skills: [
      { name: "Google ADK", level: "Practical Project Experience", note: "AquaGuard workflow prototype" },
      { name: "Gemini API", level: "Practical Project Experience", note: "AquaGuard prototype" },
      { name: "Multi-Agent Workflow Design", level: "Practical Project Experience", note: "Supplied/demo inputs only" }
    ] },
    { title: "Web & Backend", description: "Frameworks represented in the supplied project source.", skills: [
      { name: "Astro", level: "Practical Project Experience", note: "This portfolio" },
      { name: "Flask", level: "Practical Project Experience", note: "Hospital management learning prototype" },
      { name: "MongoDB", level: "Practical Project Experience", note: "Hospital management learning prototype" }
    ] },
    { title: "Classical AI Coursework", description: "Algorithms and planning exercises in the coursework repository.", skills: [
      { name: "A* Search", level: "Coursework & Academic", note: "8-puzzle" },
      { name: "Minimax", level: "Coursework & Academic", note: "Tic-Tac-Toe" },
      { name: "Breadth-First Search", level: "Coursework & Academic", note: "Water-jug problem" },
      { name: "Goal-Stack Planning & PDDL", level: "Coursework & Academic", note: "Planning exercises" }
    ] }
  ],

  // --- Certificates and Courses ---
  certifications: [
    {
      id: "google-advanced-data-analytics",
      title: "Google Advanced Data Analytics Professional Certificate",
      issuer: "Google",
      platform: "Coursera",
      verificationUrl: "https://coursera.org/share/2b09a4755ddd6e81dcd704223b826de5",
      skillsCovered: ["Python", "Statistical Analysis", "Regression Models", "Machine Learning", "Tableau"],
      description: "Professional program covering statistical methods, predictive regression modeling, machine learning techniques with Python, and data storytelling."
    },
    {
      id: "google-data-analytics",
      title: "Google Data Analytics Professional Certificate",
      issuer: "Google",
      platform: "Coursera",
      verificationUrl: "https://coursera.org/share/b56d75ec8eafde4a23a8c8c33ab29176",
      skillsCovered: ["Data Cleaning", "SQL Queries", "R Programming", "Spreadsheets", "Data Visualization"],
      description: "Comprehensive credential covering end-to-end data analysis workflows: cleaning, structuring, querying with SQL, statistical analysis in R, and visual reporting."
    },
    {
      id: "google-business-intelligence",
      title: "Google Business Intelligence Certificate",
      issuer: "Google",
      platform: "Coursera",
      verificationUrl: "https://coursera.org/share/b876126e8875218eafa322800298b9ce",
      skillsCovered: ["BI Architecture", "Data Modeling", "ETL Pipelines", "Tableau Dashboards", "KPI Tracking"],
      description: "Focused program on business intelligence fundamentals, data modeling, ETL concepts, and designing decision-maker dashboards in Tableau."
    },
    {
      id: "nvidia-prompt-engineering-data-analysis",
      title: "Prompt Engineering and Data Analysis",
      issuer: "NVIDIA",
      platform: "Coursera",
      verificationUrl: "https://coursera.org/share/d5c91fb1f2fbe7cc9114043da09212b4",
      skillsCovered: ["Prompt Engineering", "Data Analysis"],
      description: "Course covering prompt engineering and data analysis."
    },
    {
      id: "prompt-engineering-vanderbilt",
      title: "Prompt Engineering for ChatGPT",
      issuer: "Vanderbilt University",
      platform: "Coursera",
      verificationUrl: "https://coursera.org/share/08ff1045d4cd3b0f4e91baad9d9d7625",
      skillsCovered: ["Prompt Patterns", "Few-Shot Reasoning", "Constraint Modeling", "Chain of Thought", "LLM Reliability"],
      description: "Rigorous academic course on foundational and advanced prompt engineering patterns to control large language model behavior, structure outputs, and solve complex problems."
    }
  ],

  // --- Academic Horizon & Education ---
  education: {
    institution: "Vellore Institute of Technology - Andhra Pradesh (VIT-AP University)",
    degree: "Integrated Master of Technology (M.Tech) in Software Engineering",
    period: "2023 – 2028 (Expected Graduation: 2028)",
    cgpa: "9.13 / 10.0",
    coursework: [
      "Operating Systems",
      "Database Management Systems",
      "Computer Networks",
      "Machine Learning",
      "Data Science & Analytics",
      "Data Structures & Algorithms",
      "Object-Oriented Analysis & Design"
    ]
  }
};
