'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDownRight, ArrowUpRight, AudioLines, Check, ChevronRight, Code2, Layers3, Menu, MessageCircle, Mic, Network, Send, Sparkles, X } from 'lucide-react';
import { ntdpAssets, ntdpScreens as screens } from '../lib/ntdp-assets';

const architecture = [
  { id: 'experience', number: '01', title: 'Experience layer', label: 'React · Next.js', description: 'Learner-facing product surfaces, responsive interaction states, and the reusable component system that keeps the experience coherent.', details: ['Reusable interface components', 'Responsive product surfaces', 'Streaming conversation UI'], color: 'violet' },
  { id: 'state', number: '02', title: 'State & forms', label: 'Effector · RHF · Zod', description: 'Structured frontend state and form workflows, with validation close to the interaction that depends on it.', details: ['Effector state management', 'React Hook Form workflows', 'Zod schema validation'], color: 'blue' },
  { id: 'services', number: '03', title: 'Service integration', label: 'REST · OAuth', description: 'The frontend integration boundary connecting product experiences to REST APIs and external identity providers.', details: ['REST API integration', 'Google OAuth', 'Microsoft OAuth'], color: 'amber' },
];

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return <div className={'eyebrow ' + (light ? 'text-[#c9b4ff]' : 'text-[#8b63d4]')}>{children}</div>;
}

export default function Home() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [activeLayer, setActiveLayer] = useState('experience');
  const [menu, setMenu] = useState(false);
  const [voiceMode, setVoiceMode] = useState(false);
  const [question, setQuestion] = useState('How do I turn an idea into a project?');
  const [answer, setAnswer] = useState('A useful project begins with a problem worth solving. Start by describing who experiences the problem, what makes it difficult today, and what a better outcome would look like. Then reduce your first version to one small feature you can build, test, and learn from.'); 
  const [visibleAnswer, setVisibleAnswer] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [responseVersion, setResponseVersion] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((element) => {
        gsap.fromTo(element, { y: 34, autoAlpha: 0 }, {
          y: 0, autoAlpha: 1, duration: 0.85, ease: 'power3.out',
          scrollTrigger: { trigger: element, start: 'top 88%', once: true }
        });
      });
      gsap.utils.toArray<HTMLElement>('[data-stagger]').forEach((group) => {
        gsap.fromTo(group.children, { y: 28, autoAlpha: 0 }, {
          y: 0, autoAlpha: 1, duration: 0.7, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: group, start: 'top 84%', once: true }
        });
      });
    }, root.current);
    return () => ctx.revert();
  }, []);

  const selectedLayer = architecture.find((layer) => layer.id === activeLayer) ?? architecture[0];

  useEffect(() => {
    if (!answer) return;
    setVisibleAnswer('');
    setIsStreaming(true);
    let cursor = 0;
    const timer = window.setInterval(() => {
      cursor = Math.min(cursor + 3, answer.length);
      setVisibleAnswer(answer.slice(0, cursor));
      if (cursor >= answer.length) {
        window.clearInterval(timer);
        setIsStreaming(false);
      }
    }, 18);
    return () => window.clearInterval(timer);
  }, [answer, responseVersion]);

  const runPrompt = (value: string) => {
    const normalized = value.toLowerCase();
    const nextAnswer = normalized.includes('skill')
      ? 'Choose one skill that supports a goal you care about. Break it into smaller capabilities, find a practical exercise for each, and build something that makes your progress visible. Learning becomes more durable when knowledge is applied.'
      : normalized.includes('learning') || normalized.includes('path')
      ? 'Start with your current level and the outcome you want to reach. Map the concepts between those two points, then sequence them from foundational to advanced. Pair each stage with a small project so the path produces evidence of what you can do.'
      : normalized.includes('project') || normalized.includes('idea')
      ? 'A useful project begins with a problem worth solving. Start by describing who experiences the problem, what makes it difficult today, and what a better outcome would look like. Then reduce your first version to one small feature you can build, test, and learn from.'
      : 'That is a thoughtful place to begin. Clarify the outcome you want, identify what you already know, and turn the gap into one practical next step. A small experiment will teach you more than trying to plan every detail upfront.';
    setQuestion(value);
    setAnswer(nextAnswer);
    setResponseVersion((version) => version + 1);
  };

  return <main ref={root}>
    <nav className="site-nav">
      <a href="#top" className="brand-mark">NTDP<span>/ CASE STUDY</span></a>
      <div className="hidden items-center gap-8 md:flex">
        {[['Story','#story'],['Experience','#experience'],['Engineering','#deep-dive'],['Architecture','#architecture'],['Delivery','#contribution']].map(([name, href]) => <a className="eyebrow nav-link" href={href} key={name}>{name}</a>)}
      </div>
      <button className="nav-toggle md:hidden" onClick={() => setMenu(!menu)} aria-label="Toggle navigation" aria-expanded={menu}>{menu ? <X /> : <Menu />}</button>
    </nav>
    {menu && <div className="mobile-menu">{[['Story','#story'],['Experience','#experience'],['Engineering','#deep-dive'],['Architecture','#architecture'],['Delivery','#contribution']].map(([name,href])=><a key={name} href={href} onClick={()=>setMenu(false)}>{name}<ArrowUpRight size={20}/></a>)}</div>}

    <section id="top" className="hero-section">
      <div className="hero-orbit orbit-one"/><div className="hero-orbit orbit-two"/>
      <div className="hero-content">
        <div className="hero-kicker"><span className="status-dot"/> FRONTEND ENGINEERING <span className="kicker-divider"/> CONVO · PRODUCT CASE STUDY</div>
        <h1 className="hero-title">Mentorship,<br/><em>made more</em><br/>human<span className="hero-period">.</span></h1>
        <div className="hero-bottom"><p>An AI-powered talent-development experience connecting conversational guidance, structured learning, and project-based growth.</p><a href="#story" className="text-link">EXPLORE THE EXPERIENCE <ArrowDownRight size={17}/></a></div>
      </div>
      <div className="hero-index"><span>01 — 06</span><span>SCROLL TO EXPLORE</span></div>
    </section>

    <section id="story" className="section section-dark story-section">
      <div className="story-grid">
        <div data-reveal>
          <Eyebrow light>01 / THE PRODUCT</Eyebrow>
          <div className="brand-board"><img src={ntdpAssets.branding} alt="Original NTDP brand identity and visual direction board" loading="lazy"/><span>ORIGINAL PRODUCT BRANDING</span></div>
        </div>
        <div data-reveal>
          <div className="story-overline">NATIONAL TALENT DISCOVERY PROGRAM</div>
          <h2 className="story-heading">A connected journey from <em>curiosity</em> to capability.</h2>
          <p className="story-copy">NTDP brings together AI mentorship, structured learning, project work, and feedback in a single learner-facing experience. The product was under active development during the contribution period.</p>
          <div className="stat-row">
            <div><strong>150<span>+</span></strong><small>REUSABLE COMPONENTS BUILT</small></div>
            <div><strong>06</strong><small>PRODUCT SURFACES</small></div>
            <div><strong>02</strong><small>MONTHS</small></div>
          </div>
          <p className="stat-footnote">Frontend delivery across a two-engineer collaboration.</p>
        </div>
      </div>
    </section>

    <section id="experience" className="section experience-section">
      <div className="experience-top" data-reveal><div><Eyebrow>02 / PRODUCT EXPERIENCE</Eyebrow><h2 className="section-heading mt-7">Explore the<br/><em>ecosystem.</em></h2></div><p>A selection of original design exports from the product. Move through the key learner experiences and see how the parts connect.</p></div>
      <div className="product-explorer">
        <div className="screen-list" role="group" aria-label="Choose an NTDP product screen">{screens.map((screen,i)=><button key={screen.name} type="button" aria-pressed={active===i} onClick={()=>setActive(i)} className={'screen-tab '+(active===i?'active':'')}><span className="screen-tab-index">0{i+1}</span><span>{screen.name}</span><ArrowUpRight size={17}/></button>)}</div>
        <div className="screen-preview" data-reveal>
          <div className="screen-image-wrap">{screens[active].img ? <img key={screens[active].img} src={screens[active].img} alt={screens[active].name+' original NTDP interface design export'} loading="lazy" decoding="async"/> : <div className="image-pending"><span>IMAGE PENDING</span><p>The original interface export is being prepared for this gallery.</p></div>}</div>
          <div className="screen-caption"><div><span className="eyebrow">PRODUCT SURFACE</span><h3>{screens[active].name}</h3><p>{screens[active].desc}</p></div><span className="screen-count">0{active+1} <i>/</i> 06</span></div>
        </div>
      </div>
      <div className="gallery-note"><span className="note-mark">i</span> These are supplied design exports, not screenshots captured from a live production application.</div>
    </section>

    <section className="ai-section">
      <div className="ai-copy" data-reveal>
        <Eyebrow>03 / THE AI EXPERIENCE</Eyebrow>
        <h2 className="ai-heading">A presence<br/>beyond the<br/><em>prompt.</em></h2>
        <p>The AI experience brought together streaming conversations, voice interaction, and a 3D mentor with live lip-sync. This portfolio concept visualizes the interaction direction without reproducing the proprietary NTDP avatar.</p>
        <div className="tech-chips"><span>STREAMING CHAT</span><span>STT / TTS</span><span>THREE.JS</span><span>REACT THREE FIBER</span></div>
      </div>
      <div className="mentor-stage" data-reveal>
        <div className="stage-grid"/>
        <div className="mentor-glow"/>
        <div className="mentor-orb"><div className="orb-shine"/><div className="orb-eyes"><i/><i/></div><div className="orb-mouth"/></div>
        <div className="mentor-ring ring-a"/><div className="mentor-ring ring-b"/>
        <div className="stage-label stage-label-top"><span className="pulse-dot"/> CONCEPTUAL VISUALIZATION</div>
        <div className="stage-caption"><span>MENTOR INTERFACE / 01</span><span>PORTFOLIO CONCEPT</span></div>
      </div>
    </section>

    <section id="deep-dive" className="section section-dark deep-section">
      <div className="deep-intro" data-reveal><Eyebrow light>04 / UNDER THE INTERFACE</Eyebrow><h2 className="section-heading mt-7 text-[#f5f1eb]">Designed for<br/><em>conversation.</em></h2><p>The AI experience was not a static chat window. It had to support an ongoing exchange, remain usable as conversations grew, and connect text with voice and an expressive visual mentor.</p></div>
      <div className="capability-list" data-stagger>
        <article><span className="cap-number">01</span><div><span className="cap-label">STREAMING</span><h3>Responses as they arrive.</h3><p>Implemented the streaming chatbot experience so responses could appear progressively, rather than making learners wait for a complete answer before the interface responded.</p></div><MessageCircle className="cap-icon"/></article>
        <article><span className="cap-number">02</span><div><span className="cap-label">VIRTUALIZATION</span><h3>Long conversations, considered.</h3><p>Built conversation virtualization to keep long chat sessions manageable in the interface, avoiding the assumption that every message needs to remain mounted at once.</p></div><Layers3 className="cap-icon"/></article>
        <article><span className="cap-number">03</span><div><span className="cap-label">VOICE + 3D</span><h3>A more embodied interaction.</h3><p>Integrated speech-to-text and text-to-speech experiences, alongside a frontend 3D mentor built with Three.js and React Three Fiber, including live lip-sync.</p></div><AudioLines className="cap-icon"/></article>
      </div>
      <div className="chat-demo">
        <div className="chat-demo-header"><div><span className="live-indicator"/> INTERACTION STUDY</div><span>SIMULATED RESPONSE · NO AI SERVICE CONNECTED</span></div>
        <div className="chat-demo-body">
          <div className="chat-avatar"><Sparkles size={18}/></div>
          <div className="chat-content"><span className="chat-speaker">NTDP MENTOR <i>· CONCEPT</i></span><p>Every meaningful project starts with a question. What would you like to explore today?</p><div className="chat-suggestions"><button onClick={()=>runPrompt('Explore a skill')}>Explore a skill</button><button onClick={()=>runPrompt('Plan a project')}>Plan a project</button><button onClick={()=>runPrompt('Find a learning path')}>Find a learning path</button></div></div>
        </div>
        <div className="chat-user-message"><span>YOU</span><p>{question}</p></div>
        <div className="chat-response" aria-live="polite" aria-busy={isStreaming}>
          <div className="chat-avatar"><Sparkles size={16}/></div>
          <div className="chat-content"><span className="chat-speaker">MENTOR RESPONSE <i>· STREAMING PREVIEW</i></span><p>{visibleAnswer}{isStreaming && <span className="stream-caret" aria-label="Response streaming"/>}</p></div>
        </div>
        {voiceMode && <div className="voice-concept"><div className="voice-bars" aria-hidden="true">{Array.from({length:24},(_,i)=><i key={i}/>)}</div><span>VOICE MODE CONCEPT · SPEECH INPUT / SPOKEN RESPONSE</span><small>Visual demonstration only. No microphone or audio is activated.</small></div>}
        <form className="chat-input-row" onSubmit={(event)=>{event.preventDefault();if(question.trim())runPrompt(question.trim())}}>
          <label className="sr-only" htmlFor="mentor-question">Ask the mentor a question</label>
          <input id="mentor-question" value={question} onChange={(event)=>setQuestion(event.target.value)} placeholder="Ask the mentor something…" />
          <button type="submit" aria-label="Send question" disabled={!question.trim() || isStreaming}><Send size={17}/></button>
        </form>
        <div className="chat-demo-footer"><span>{voiceMode ? <><AudioLines size={15}/> VOICE INTERACTION CONCEPT</> : <><MessageCircle size={15}/> CONVERSATIONAL INTERFACE</>}</span><button onClick={()=>setVoiceMode(!voiceMode)}><Mic size={15}/>{voiceMode?'SHOW TEXT MODE':'EXPLORE VOICE MODE'}<ChevronRight size={14}/></button></div>
      </div>
    </section>

    <section id="architecture" className="section architecture-section">
      <div data-reveal><Eyebrow>05 / FRONTEND ARCHITECTURE</Eyebrow><h2 className="section-heading mt-7">The system behind<br/><em>the surface.</em></h2><p className="architecture-lede">A frontend view of the product: how interface composition, state, forms, and service integrations fit together. This is an explanatory frontend model, not a claim about the complete internal system architecture.</p></div>
      <div className="architecture-explorer">
        <div className="architecture-map" role="group" aria-label="Choose a frontend architecture layer">
          {architecture.map((layer,i)=><button key={layer.id} type="button" aria-pressed={activeLayer===layer.id} onClick={()=>setActiveLayer(layer.id)} className={'architecture-node '+(activeLayer===layer.id?'selected':'')}><span className="node-number">{layer.number}</span><span className="node-main"><strong>{layer.title}</strong><small>{layer.label}</small></span><ChevronRight size={18}/></button>)}
          <div className="architecture-flow"><span/><span/><span/></div>
          <div className="architecture-foundation"><Code2 size={16}/> LEARNER-FACING PRODUCT</div>
        </div>
        <div className="architecture-detail" key={selectedLayer.id}>
          <div className="detail-index">LAYER {selectedLayer.number}</div><h3>{selectedLayer.title}</h3><span className="detail-stack">{selectedLayer.label}</span><p>{selectedLayer.description}</p>
          <ul>{selectedLayer.details.map(item=><li key={item}><Check size={15}/>{item}</li>)}</ul>
          <div className="detail-foot"><Network size={15}/> FRONTEND RESPONSIBILITY</div>
        </div>
      </div>
      <div className="architecture-stack"><span>CORE TOOLING</span>{['Next.js','React','TypeScript','Effector','React Hook Form','Zod','REST APIs','OAuth'].map(item=><i key={item}>{item}</i>)}</div>
    </section>

    <section id="contribution" className="section contribution-section">
      <div className="contribution-top" data-reveal><Eyebrow>06 / DELIVERY & SCOPE</Eyebrow><h2 className="section-heading mt-7">From reusable<br/><em>systems to moments.</em></h2><p>A broad frontend engineering scope across the product: building the component foundation, shaping learner-facing experiences, and integrating the interactions that make the platform feel connected.</p></div>
      <div className="delivery-grid" data-stagger>
        <article className="delivery-card delivery-feature"><span className="delivery-index">01 / COMPONENT SYSTEM</span><strong>150<span>+</span></strong><h3>Reusable components built.</h3><p>A substantial interface foundation supporting consistency and repeatable patterns across the product experience.</p><div className="component-motif"><i/><i/><i/><i/><i/><i/><i/><i/><i/></div></article>
        <article className="delivery-card"><span className="delivery-index">02 / PRODUCT SURFACES</span><strong>06</strong><h3>Connected product areas.</h3><p>From onboarding and mentorship to learning, projects, feedback, and profile experiences.</p><div className="surface-tags"><i>ONBOARDING</i><i>MENTORSHIP</i><i>LEARNING</i><i>PROJECTS</i><i>FEEDBACK</i><i>PROFILE</i></div></article>
        <article className="delivery-card"><span className="delivery-index">03 / COLLABORATION</span><strong>02</strong><h3>Frontend engineers.</h3><p>A two-engineer frontend effort delivered over a focused two-month contribution period.</p><div className="collab-mark"><span/><span/></div></article>
      </div>
      <div className="scope-strip"><div><span className="eyebrow">ENGINEERING SCOPE</span><p>Component architecture · Streaming UI · Conversation virtualization · Voice integration · 3D mentor interface · State management · Forms & validation · OAuth · REST API integration</p></div><a href="#top" className="back-top">BACK TO TOP <ArrowUpRight size={16}/></a></div>
    </section>

    <footer className="site-footer">
      <div className="footer-kicker"><Eyebrow light>NTDP / FRONTEND ENGINEERING</Eyebrow><span>CONVO · ISLAMABAD, PAKISTAN</span></div>
      <h2>Technology should<br/>feel <em>human.</em></h2>
      <div className="footer-bottom"><p>Building meaningful product experiences takes more than interfaces. It takes architecture, collaboration, and care for every interaction.</p><a href="#top">RETURN TO THE BEGINNING <ArrowUpRight size={16}/></a></div>
      <p className="disclaimer">This case study documents frontend contributions to a product that was under development. Displayed interface images are supplied design exports. The mentor visual is a conceptual portfolio mockup; no original proprietary 3D model or live backend is represented.</p>
    </footer>
  </main>;
}
