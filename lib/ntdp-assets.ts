export const ntdpAssets = {
  onboarding:
    "https://ik.imagekit.io/msameerrafiq3/ntdp-prjt-pblc-assets/public/Sign%20up%20-%20Start-7.webp?updatedAt=1794245344550",
  chat:
    "https://ik.imagekit.io/msameerrafiq3/ntdp-prjt-pblc-assets/public/Chat-4.webp?updatedAt=1794245341708",
  courses:
    "https://ik.imagekit.io/msameerrafiq3/ntdp-prjt-pblc-assets/public/Courses-1.webp?updatedAt=1794245344752",
  project:
    "https://ik.imagekit.io/msameerrafiq3/ntdp-prjt-pblc-assets/public/Project%20Detail-1.webp?updatedAt=1794245322026",
  feedback:
    "https://ik.imagekit.io/msameerrafiq3/ntdp-prjt-pblc-assets/public/Feedback-1.webp?updatedAt=1794245335258",
  profile:
    "https://ik.imagekit.io/msameerrafiq3/ntdp-prjt-pblc-assets/public/Profile.webp?updatedAt=1794245322158",
  branding:
    "https://ik.imagekit.io/msameerrafiq3/ntdp-prjt-pblc-assets/public/NTDP-%20National%20Talent%20Discovery%20Platform%20-%20branding%20image.webp?updatedAt=1794245319836",
} as const;

export const ntdpScreens = [
  {
    name: "Onboarding",
    tag: "01 / ENTRY",
    desc: "A guided introduction to the mentorship experience.",
    img: ntdpAssets.onboarding,
  },
  {
    name: "AI conversations",
    tag: "02 / MENTORSHIP",
    desc: "A conversational interface designed around ongoing guidance.",
    img: ntdpAssets.chat,
  },
  {
    name: "Learning",
    tag: "03 / DEVELOPMENT",
    desc: "Course discovery and learning progress in one experience.",
    img: ntdpAssets.courses,
  },
  {
    name: "Projects",
    tag: "04 / APPLICATION",
    desc: "Project assignments, details, and deliverable workflows.",
    img: ntdpAssets.project,
  },
  {
    name: "Feedback",
    tag: "05 / EVALUATION",
    desc: "Structured feedback to support continuous improvement.",
    img: ntdpAssets.feedback,
  },
  {
    name: "Profile",
    tag: "06 / IDENTITY",
    desc: "A place for a learner’s professional information.",
    img: ntdpAssets.profile,
  },
] as const;
