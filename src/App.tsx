import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, Box, Check, Code2, Copy, Globe2, Layers3, Mail, Moon, MousePointer2, RotateCw, Sun, Terminal, X } from 'lucide-react';
import World from './World';

type Project = { name: string; category: string; description: string; tags: string[]; kind: 'garden' | 'focus' | 'atlas'; year: string; detail: string };
function Github({ size = 16 }: { size?: number }) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 19c-4.3 1.3-4.3-2.2-6-2.7m12 5v-3.4c0-1 .1-1.4-.5-2 3.3-.4 6.7-1.6 6.7-7.3 0-1.6-.6-2.9-1.6-3.9.2-.5.7-1.8-.1-3.8 0 0-1.3-.4-4.2 1.6a14 14 0 0 0-7.6 0C4.8.5 3.5.9 3.5.9c-.8 2-.3 3.3-.1 3.8A5.7 5.7 0 0 0 1.8 8.6c0 5.7 3.4 6.9 6.7 7.3-.5.5-.6 1.2-.5 2v3.4" transform="translate(1 1) scale(.92)"/></svg>; }
const projects: Project[] = [
  { name: 'Voxel Garden', category: 'Experiments', description: 'A small world. A big space to play.', tags: ['Three.js', 'React', 'Creative coding'], kind: 'garden', year: '2026', detail: 'A browser-based playground exploring procedural landscapes, lighting, and the joy of building. This portfolio’s little island is an early look at the same world-building approach.' },
  { name: 'Focus OS', category: 'Web apps', description: 'A calmer home for your daily workflow.', tags: ['Next.js', 'TypeScript', 'Design systems'], kind: 'focus', year: '2026', detail: 'A workspace concept that brings tasks, notes, and deep work into one quiet interface. Built around thoughtful keyboard interactions, reusable components, and fewer distractions.' },
  { name: 'Dev Atlas', category: 'Web apps', description: 'Your next favorite developer companion.', tags: ['React', 'Node.js', 'Open source'], kind: 'atlas', year: '2025', detail: 'A developer tool concept for collecting useful snippets and navigating project knowledge. A place for the little discoveries that make the next build better.' },
];

function CubeMark({ small = false }: { small?: boolean }) {
  return <svg className={small ? 'cube-mark small' : 'cube-mark'} viewBox="0 0 40 44" fill="none" aria-hidden="true"><path d="M20 2 38 12.5 20 23 2 12.5Z" fill="#8da770"/><path d="M2 12.5 20 23 20 43 2 32.5Z" fill="#48633d"/><path d="M38 12.5 20 23 20 43 38 32.5Z" fill="#678451"/><path d="m8 16 7 4v7l-7-4z" fill="#557345"/><path d="m25 25 7-4v7l-7 4z" fill="#78925d"/></svg>;
}
function PixelAvatar() {
  return <svg viewBox="0 0 24 24" className="pixel-avatar" shapeRendering="crispEdges" aria-hidden="true"><path fill="#dbe3c6" d="M0 0h24v24H0z"/><path fill="#596341" d="M6 4h12v5H6zM4 6h16v3H4z"/><path fill="#cfaa85" d="M6 9h12v8H6zM4 9h2v5H4zM18 9h2v5h-2z"/><path fill="#343e34" d="M7 10h2v2H7zM15 10h2v2h-2z"/><path fill="#9d7357" d="M10 14h4v1h-4z"/><path fill="#6d8550" d="M6 17h12v2H6zM3 19h18v5H3z"/><path fill="#e1c39b" d="M10 17h4v3h-4z"/></svg>;
}
function IsometricBlock({ x, y, size = 40, top = '#93b66d', left = '#66884a', right = '#77994f' }: { x:number; y:number; size?:number; top?:string; left?:string; right?:string }) {
  const h = size*.48;
  return <g><path d={`M${x} ${y}l${size} ${-h} ${size} ${h}-${size} ${h}Z`} fill={top}/><path d={`M${x} ${y}l${size} ${h}v${size}l-${size} ${-h}Z`} fill={left}/><path d={`M${x+size} ${y+h}l${size} ${-h}v${size}l-${size} ${h}Z`} fill={right}/></g>;
}
function ProjectArt({ kind }: { kind: Project['kind'] }) {
  if (kind === 'garden') return <div className="project-art garden-art"><span className="art-label"><Box size={12}/> a little sandbox</span><svg viewBox="0 0 400 238" aria-hidden="true"><ellipse cx="202" cy="201" rx="110" ry="15" fill="#9ea887" opacity=".19"/>{[0,1,2].flatMap(z=>[0,1,2].map(x=><IsometricBlock key={`${x}-${z}`} x={105+x*36-z*36} y={112+x*17+z*17} size={36} top={(x+z)%3===0?'#a2b978':'#8fa966'} left="#a58c66" right="#bca57a"/>))}<IsometricBlock x={131} y={92} size={18} top="#a5c17b"/><IsometricBlock x={139} y={54} size={10} top="#aa8f69" left="#876c4d" right="#977951"/><IsometricBlock x={116} y={30} size={33} top="#b0c87d" left="#749554" right="#93b16a"/><IsometricBlock x={127} y={16} size={26} top="#c0d492" left="#8eac65" right="#a4bf76"/><IsometricBlock x={204} y={136} size={22} top="#92b6bd" left="#739eaa" right="#86adb5"/><IsometricBlock x={228} y={148} size={22} top="#a4c5c7" left="#739eaa" right="#86adb5"/><IsometricBlock x={199} y={95} size={25} top="#ecd299" left="#d4b379" right="#e2c38c"/><IsometricBlock x={196} y={84} size={28} top="#bb7a58" left="#985c43" right="#a56b49"/><path d="M304 73h28v8h-28zM313 66h12v8h-12zM59 62h28v8H59zM66 55h12v8H66z" fill="#f3f4e6"/></svg><span className="art-footer">Small blocks, endless possibilities.</span></div>;
  if (kind === 'focus') return <div className="project-art focus-art"><div className="mini-app"><div className="mini-sidebar"><span className="mini-brand"><span/> focus</span><i>⌂ &nbsp; Overview</i><i>☷ &nbsp; My tasks</i><i>▤ &nbsp; Notes</i><i>◷ &nbsp; Deep work</i><div className="mini-profile">A <span>Alex’s workspace</span></div></div><div className="mini-main"><div className="mini-bar"><span>My workspace</span><span>⌕ &nbsp; ⊙</span></div><h4>A little focus goes a long way.</h4><p>Let’s make room for your best work.</p><div className="mini-grid"><div className="mini-stat">In your flow<strong>02:45</strong><span>Time well spent</span></div><div className="mini-tasks">Today’s little wins<span><b>✓</b> Sketch something new</span><span><b>✓</b> Ship the good stuff</span><span><b>○</b> Take a proper break</span></div></div><div className="mini-note">✦ &nbsp; One thing at a time. You’ve got this.</div></div></div></div>;
  return <div className="project-art atlas-art"><div className="code-window"><div className="code-bar"><span className="window-dots"><i/><i/><i/></span><span>hello-world.ts</span><Code2 size={12}/></div><div className="code-content"><span><i>1</i><b>import</b> {'{ curiosity }'} <b>from</b> <em>'life'</em>;</span><span><i>2</i></span><span><i>3</i><b>const</b> developer = {'{'}</span><span><i>4</i>&nbsp; name: <em>'Alex'</em>,</span><span><i>5</i>&nbsp; fuel: [<em>'coffee'</em>, <em>'ideas'</em>],</span><span><i>6</i>&nbsp; alwaysLearning: <b>true</b>,</span><span><i>7</i>{'}'};</span><span><i>8</i></span><span><i>9</i><strong>buildSomethingGood</strong>(developer);</span></div></div><span className="snippet-badge"><Terminal size={12}/> made for the makers</span></div>;
}

export default function App() {
  const [night, setNight] = useState(false);
  const [rotate, setRotate] = useState(false);
  const [filter, setFilter] = useState('All builds');
  const [selected, setSelected] = useState<Project | null>(null);
  const [contact, setContact] = useState(false);
  const [copied, setCopied] = useState(false);
  const [menu, setMenu] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isDialogOpen = Boolean(selected || contact);
  useEffect(() => {
    if (isDialogOpen) dialog.current?.showModal(); else dialog.current?.close();
    document.body.style.overflow = isDialogOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isDialogOpen]);
  useEffect(() => () => { if (copyTimer.current) clearTimeout(copyTimer.current); }, []);
  function closeDialog() { setSelected(null); setContact(false); setCopied(false); }
  async function copyEmail() {
    try { await navigator.clipboard.writeText('alex@example.com'); setCopied(true); if(copyTimer.current) clearTimeout(copyTimer.current); copyTimer.current = setTimeout(()=>setCopied(false), 2500); }
    catch { window.location.href = 'mailto:alex@example.com'; }
  }

  return <div className={`site ${night ? 'night' : ''}`}>
    <header className="site-header wrap">
      <a href="#home" className="brand" aria-label="Alex Morgan home"><CubeMark/><span>alex.morgan<span className="brand-sub">developer & world builder</span></span></a>
      <button className="menu-toggle" aria-label="Toggle navigation" aria-expanded={menu} onClick={()=>setMenu(!menu)}>{menu ? <X/> : <span>☰</span>}</button>
      <nav className={menu ? 'navigation open' : 'navigation'} aria-label="Main navigation"><a href="#work" onClick={()=>setMenu(false)}>Work</a><a href="#about" onClick={()=>setMenu(false)}>About</a><a href="#toolbox" onClick={()=>setMenu(false)}>Toolbox</a><button className="header-contact" onClick={()=>{setContact(true);setMenu(false);}}>Let’s talk <ArrowUpRight size={15}/></button></nav>
    </header>

    <main>
      <section className="hero wrap" id="home">
        <div className="hero-copy">
          <div className="intro"><PixelAvatar/><span>Hey there, I’m Alex <span className="wave">✳</span></span></div>
          <h1>I build things.<br/>One block<br/>at a time<span className="period">.</span></h1>
          <p className="hero-description">Creative developer. Curious by nature.<br/>Crafting thoughtful digital experiences with a little<br className="desktop-break"/> imagination and a lot of care.</p>
          <div className="hero-actions"><a className="button primary" href="#work"><Layers3 size={17}/> Explore my work <ArrowDown size={17}/></a><a href="#about" className="text-link">A bit about me <ArrowUpRight size={17}/></a></div>
          <div className="hero-location"><Globe2 size={14}/><span>Based in Portland, OR</span><span className="location-dot">·</span><span>Building for everywhere</span></div>
        </div>
        <div className="world-container">
          <div className="available"><span className="status-dot"/> Available for good projects</div>
          <World night={night} rotate={rotate}/>
          <div className="world-caption"><span className="tiny-cross">✦</span> A little corner of my imagination.</div>
          <div className="world-controls"><span className="world-mode"><span/> Creative mode</span><div className="control-buttons"><button onClick={()=>setRotate(!rotate)} aria-label={rotate ? 'Pause island rotation' : 'Rotate island'} aria-pressed={rotate} title={rotate ? 'Pause rotation' : 'Rotate island'} className={rotate ? 'active' : ''}><RotateCw size={15}/></button><span className="control-divider"/><button onClick={()=>setNight(!night)} aria-label={night ? 'Switch to day' : 'Switch to night'} title={night ? 'Switch to day' : 'Switch to night'}>{night ? <Moon size={17}/> : <Sun size={17}/>}</button></div></div>
          <span className="world-hint"><MousePointer2 size={12}/> Move your mouse. Look around.</span>
        </div>
      </section>

      <div className="craft-strip wrap"><span className="craft-label"><Code2 size={16}/> Good ideas. Thoughtfully built.</span><span>React</span><span>TypeScript</span><span>Next.js</span><span>Three.js</span><span>Figma</span><span className="craft-extra">A healthy dose of curiosity <span>↗</span></span></div>

      <section className="work-section wrap" id="work">
        <div className="section-heading"><div><div className="section-kicker"><span className="tiny-block"/> From my inventory</div><h2>Selected builds<span className="heading-dot">.</span></h2><p>A few things I’ve put out into the world.</p></div><a className="text-link github-link" href="https://github.com" target="_blank" rel="noreferrer"><Github size={16}/> Find me on GitHub <ArrowUpRight size={15}/></a></div>
        <div className="project-filters" role="group" aria-label="Filter projects">{['All builds','Web apps','Experiments'].map(f=><button key={f} className={filter===f?'selected':''} aria-pressed={filter===f} onClick={()=>setFilter(f)}>{f}{filter===f&&<span>{f==='All builds'?3:projects.filter(p=>p.category===f).length}</span>}</button>)}</div>
        <div className="project-grid">{projects.filter(p=>filter==='All builds'||p.category===filter).map(project=><button key={project.name} className="project-card" onClick={()=>setSelected(project)} aria-label={`View ${project.name}`}><div className="project-image"><ProjectArt kind={project.kind}/><span className="project-open"><ArrowUpRight size={19}/></span></div><div className="project-title"><h3>{project.name}</h3><span>{project.year}</span></div><p>{project.description}</p><div className="project-tags">{project.tags.map(tag=><span key={tag}>{tag}</span>)}</div></button>)}</div>
      </section>

      <section className="about-section wrap" id="about"><div className="about-visual"><div className="about-avatar"><PixelAvatar/></div><span className="avatar-caption">Player 01 · Alex</span><div className="player-stats"><span>Curiosity <i><b style={{width:'96%'}}/></i></span><span>Creativity <i><b style={{width:'88%'}}/></i></span><span>Coffee level <i><b style={{width:'74%'}}/></i></span></div><div className="player-status"><span className="status-dot"/> Always in creative mode</div></div><div className="about-copy"><div className="section-kicker"><span className="tiny-block"/> The person behind the pixels</div><h2>A builder at heart.</h2><p>I’m Alex, a creative developer who loves the space where design meets code. I turn little “what ifs” into useful, playful things for the web.</p><p>My love for making things started with blocky worlds and endless possibilities. These days, my building blocks are components, thoughtful interactions, and the occasional late-night idea.</p><p>When I’m away from the keyboard, you’ll find me exploring a new trail, sketching something, or making room for one more side project.</p><span className="about-note">Stay curious. Keep building. <span>✳</span></span></div></section>

      <section className="toolbox-section wrap" id="toolbox"><div className="section-heading"><div><div className="section-kicker"><span className="tiny-block"/> Tools of the trade</div><h2>My everyday inventory.</h2><p>The right tools make room for better ideas.</p></div><span className="toolbox-note">Always making room for something new.</span></div><div className="toolbox-grid"><div><Code2/><h3>Interface crafting</h3><p>React, Next.js, TypeScript<br/>CSS, Tailwind CSS</p></div><div><Box/><h3>World building</h3><p>Three.js, WebGL<br/>Creative coding, motion</p></div><div><Layers3/><h3>Thoughtful design</h3><p>Figma, design systems<br/>Prototyping, accessibility</p></div><div><Terminal/><h3>Behind the scenes</h3><p>Node.js, PostgreSQL<br/>Git, Vercel</p></div></div></section>

      <section className="contact-section wrap"><div><div className="section-kicker"><span className="status-dot"/> Open to new adventures</div><h2>Got a world in mind?<br/>Let’s build it together.</h2><p>An interesting idea, a collaboration, or just a hello.<br/>There’s always room for a good conversation.</p><button className="button primary" onClick={()=>setContact(true)}>Say hello <ArrowUpRight size={18}/></button></div><div className="contact-cube"><CubeMark/><span>Great things start<br/>with a small block.</span></div></section>
    </main>
    <footer className="site-footer wrap"><a href="#home" className="footer-brand"><CubeMark small/> Crafted by Alex. With care, and a few pixels.</a><span>© {new Date().getFullYear()} Alex Morgan</span><a href="#home">Back to the surface <ArrowUpRight size={14}/></a></footer>

    <dialog ref={dialog} className={`detail-dialog ${contact?'contact-dialog':''}`} onCancel={closeDialog} onClick={e=>{if(e.target===e.currentTarget)closeDialog();}} aria-labelledby="dialog-title"><button className="dialog-close" onClick={closeDialog} aria-label="Close dialog"><X size={20}/></button>{selected&&<><ProjectArt kind={selected.kind}/><div className="dialog-content"><div className="section-kicker">{selected.category} · {selected.year}</div><h2 id="dialog-title">{selected.name}</h2><p>{selected.detail}</p><div className="project-tags">{selected.tags.map(tag=><span key={tag}>{tag}</span>)}</div><div className="project-concept"><Box size={16}/><span>Personal project concept · A work in progress</span></div><button className="button primary" onClick={()=>{setSelected(null);setContact(true);}}>Let’s talk about a build <ArrowRight size={16}/></button></div></>}{contact&&<div className="dialog-content"><div className="dialog-avatar"><PixelAvatar/><span className="status-dot"/></div><div className="section-kicker">A new adventure starts here</div><h2 id="dialog-title">Hey, let’s talk.</h2><p>Tell me what you’re working on, what you’re dreaming up, or just say hello.</p><a className="email-link" href="mailto:alex@example.com">alex@example.com <ArrowUpRight size={20}/></a><div className="contact-dialog-actions"><a className="button primary" href="mailto:alex@example.com"><Mail size={17}/> Open email</a><button className="button secondary" onClick={copyEmail}>{copied?<Check size={16}/>:<Copy size={16}/>} {copied?'Email copied':'Copy email'}</button></div><span className="contact-placeholder">Demo contact address — replace with your own before sharing.</span><span className="copy-status" role="status">{copied?'Email address copied to clipboard.':''}</span></div>}</dialog>
  </div>;
}
