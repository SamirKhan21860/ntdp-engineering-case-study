# NTDP — Frontend Engineering Case Study

An editorial, interactive case study documenting frontend engineering on the National Talent Discovery Program (NTDP), an AI-powered mentorship and talent-development platform.

## Run locally

\`\`\`bash
npm install
npm run dev
\`\`\`

Open http://localhost:3000.

## Assets

The current showcase uses the supplied NTDP design exports hosted in ImageKit. Their URLs and the gallery metadata are centralized in \`lib/ntdp-assets.ts\`; update the manifest there rather than duplicating asset URLs in page components.

The displayed interface images are supplied design exports, not screenshots captured from a live production application.

## Accuracy notes

- The product was under active development during the documented contribution period; this case study does not claim a public launch or production deployment.
- 150+ reusable components were built across six product surfaces over a two-month period.
- The frontend effort involved two frontend engineers.
- The AI mentor illustration is an original conceptual portfolio visualization, not the proprietary NTDP avatar or 3D model.
- The architecture explorer is an explanatory frontend model, not a representation of the complete internal system architecture.
- No live AI service, backend, private endpoint, credential, or proprietary implementation code is represented by the interactive portfolio demonstrations.

## Experience

- Responsive editorial case-study layout.
- Product interface gallery using the supplied design exports.
- Interactive frontend architecture explorer.
- Illustrative mentor and conversational UI concepts.
- Scroll-triggered reveals with GSAP ScrollTrigger.
- Reduced-motion support and responsive navigation.

## Stack

Next.js 15, React 19, TypeScript, Tailwind CSS, GSAP + ScrollTrigger, Lucide React.
