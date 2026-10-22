// Three read-only design directions. No production routes, CMS data, or mutations.
// Question: which composition elevates the existing cream/navy portfolio?
const params = new URLSearchParams(location.search);
const variants = ['signature', 'portrait', 'journal'];
let variant = variants.includes(params.get('variant')) ? params.get('variant') : 'signature';
let view = params.get('view') === 'writing' ? 'writing' : 'home';
const publications = await fetch('/publications.json').then(r => r.json());
const essays = publications.filter(p => p.kind === 'essay' && p.status === 'published');
const arrow = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6"/></svg>';
const diagonal = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 18 18 6M6 6h12v12"/></svg>';
const menu = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 8h16M4 16h16"/></svg>';
const search = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4 4"/></svg>';
const names = { signature: 'Signature', portrait: 'Portrait', journal: 'Journal' };
const description = 'A Bangladeshi physician and columnist whose work connects medical service, women’s health, and community life.';
const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const url = (page = 'home', hash = '') => `?variant=${variant}${page === 'writing' ? '&view=writing' : ''}${hash}`;
const image = (file, alt, cls = '', lazy = true) => `<img src="/media/${file}" alt="${esc(alt)}" class="${cls}" ${lazy ? '' : 'fetchpriority="high"'}>`;
const heading = (text, link = 'Explore the archive', target = url('writing')) => `<div class="section-title"><h2>${text}</h2><a class="text-link" href="${target}">${link}${arrow}</a></div>`;
const roleLine = '<p class="roles"><span class="role-word">Physician</span><i aria-hidden="true"></i><span class="role-word">Columnist</span><i aria-hidden="true"></i><span class="role-word">Community leadership</span></p>';

function header() {
  return `<header class="site-header wrap">
    <a class="brand" href="${url()}" aria-label="Dr Umma Hani home"><span class="monogram" aria-hidden="true">uh</span><span>Dr Umma Hani</span></a>
    <nav class="desktop-nav" aria-label="Main navigation"><a href="${url('home','#journey')}">About</a><a href="${url('writing')}" ${view === 'writing' ? 'aria-current="page"' : ''}>Writing</a><a href="${url('home','#medical-work')}">Medical work</a><a href="${url('home','#media')}">Public life</a></nav>
    <a class="header-contact" href="${url('home','#contact')}">Get in touch ${diagonal}</a>
    <button class="menu-toggle icon-button" aria-label="Open navigation" aria-expanded="false" aria-controls="mobile-nav">${menu}</button>
    <nav id="mobile-nav" class="mobile-nav" hidden aria-label="Mobile navigation"><a href="${url('home','#journey')}">About Dr Hani</a><a href="${url('writing')}">Published writing</a><a href="${url('home','#medical-work')}">Medical work</a><a href="${url('home','#media')}">Public life & photographs</a><a href="${url('home','#contact')}">Get in touch</a></nav>
  </header>`;
}
function actions() {
  return `<div class="hero-actions"><a class="button primary" href="${url('home','#journey')}">Discover her story ${arrow}</a><a class="button secondary" href="${url('writing')}">Read her writing ${diagonal}</a></div>`;
}
function proof() {
  return `<div class="professional-record"><div><span>Medical education</span><strong>MBBS · TMSS Medical College</strong></div><div><span>Areas of experience</span><strong>Women’s health & hospital service</strong></div></div>`;
}
function signatureHero() {
  return `<section class="signature-hero wrap" id="profile"><div class="signature-panel">
    <div class="signature-copy"><h1>Dr Umma Hani</h1>${roleLine}<p class="hero-intro">${description}</p>${actions()}${proof()}</div>
    <figure class="hero-photo">${image('homepage-hero-seated.jpg','Dr Umma Hani seated at a public event','',false)}<figcaption>Medicine. Perspective. Public life.</figcaption></figure>
  </div></section>`;
}
function portraitHero() {
  return `<section class="portrait-hero" id="profile"><div class="portrait-stage wrap"><div class="portrait-copy"><h1>Dr Umma<br>Hani</h1>${roleLine}<p class="hero-intro">${description}</p>${actions()}<a class="portrait-down" href="#writing">Explore her work ${arrow}</a></div><figure class="portrait-image">${image('homepage-hero-seated.jpg','Dr Umma Hani seated at a public event','',false)}</figure></div></section><div class="portrait-record wrap">${proof()}<span>Based in Bangladesh</span></div>`;
}
function journalHero() {
  return `<section class="journal-hero wrap" id="profile"><div class="journal-title"><h1>Dr Umma Hani</h1>${roleLine}</div><div class="journal-composition"><figure class="journal-photo">${image('homepage-hero-seated.jpg','Dr Umma Hani seated at a public event','',false)}</figure><div class="journal-introduction"><h2>Care in practice.<br>A voice in public life.</h2><p class="hero-intro">${description}</p>${actions()}<div class="journal-latest"><span>Latest published essay · Daily Sun</span><a href="${essays[0].sources[0].url}" target="_blank" rel="noopener noreferrer"><h3 lang="bn">${esc(essays[0].title)}</h3>${diagonal}</a><time datetime="2026-10-17">17 October 2026</time></div></div></div></section>`;
}
function metadata(item) {
  const source = item.sources[0];
  const date = source.publishedAt ? new Date(`${source.publishedAt}T12:00:00Z`).toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric',timeZone:'UTC'}) : source.dateLabel;
  return `<div class="article-meta"><span>${esc(source.publisher)}</span>${date ? `<time ${source.publishedAt ? `datetime="${source.publishedAt}"` : ''}>${esc(date)}</time>` : ''}</div>`;
}
function essayCard(item, featured = false) {
  return `<article class="essay ${featured ? 'essay-featured' : ''}">${metadata(item)}<h3 lang="bn"><a href="${esc(item.sources[0].url)}" target="_blank" rel="noopener noreferrer">${esc(item.title)}</a></h3><p>${esc(item.summary)}</p><div class="essay-bottom"><span>${esc(item.topics.join(' / '))}</span><a href="${esc(item.sources[0].url)}" target="_blank" rel="noopener noreferrer" aria-label="Read ${esc(item.title)} at ${esc(item.sources[0].publisher)}">${diagonal}</a></div></article>`;
}
function writingPreview() {
  const titles = { signature: 'Writing & perspectives', portrait: 'Words with a wider purpose.', journal: 'The latest perspectives' };
  return `<section class="writing-section wrap section" id="writing">${heading(titles[variant], 'All writing')}<div class="selected-essays ${variant === 'signature' ? 'feature-layout' : ''}">${essays.slice(0,3).map((e,i)=>essayCard(e,variant === 'signature' && i===0)).join('')}</div></section>`;
}
function biography() {
  return `<section class="biography-section section wrap" id="journey"><div class="biography-feature"><figure>${image('about-doctor-portrait.jpg','Dr Umma Hani in a clinical setting')}</figure><div class="biography-text"><h2>A foundation in medicine.<br>A connection to people.</h2><p>Dr Umma Hani’s professional journey began with medical education at TMSS Medical College under Rajshahi University. Her experience brings together hospital service, women’s health, and community healthcare.</p><div class="bio-milestones"><div><strong>Medical education</strong><span>TMSS Medical College<br>Rajshahi University</span></div><div><strong>Clinical experience</strong><span>Women’s health<br>Hospital & emergency service</span></div></div><a class="text-link" href="#medical-work">Explore her medical work ${arrow}</a></div></div></section>`;
}
function clinical() {
  return `<section class="clinical-section" id="medical-work"><div class="clinical-layout wrap"><div class="clinical-copy"><h2>Care beyond<br>the consultation.</h2><p>Hospital service and community health programmes are part of her work as a physician, alongside writing on health, women, and public life.</p><a class="text-link" href="https://www.kalbela.com/dainikshiksha/campus/226197" target="_blank" rel="noopener noreferrer">Read the medical-camp coverage ${diagonal}</a><div class="clinical-note"><strong>Community healthcare</strong><span>Medical camps, health awareness, and public service.</span></div></div><figure>${image('bedside-review.jpg','Dr Umma Hani with colleagues in a hospital setting')}</figure></div></section>`;
}
const photos = [
  {file:'new/dhaka-dialogue-backdrop.webp',title:'Dhaka Dialogue',caption:'At the Dhaka Dialogue on ending digital and AI-facilitated violence against women.',label:'Dialogue',cls:'dialogue'},
  {file:'new/bay-of-bengal-2026.webp',title:'Bay of Bengal Conversation',caption:'At Bay of Bengal Conversation 2026, organised by the Centre for Governance Studies.',label:'2026 · Public conversation',cls:'bay'},
  {file:'new/doctors-gathering.webp',title:'Doctors’ gathering',caption:'At a Doctors Association of Bangladesh gathering.',label:'Medical community',cls:'doctors'}
];
function moments() {
  return `<section class="moments-section section wrap" id="media">${heading('In conversation. In community.','View photographs','#photographs')}<div class="moments-grid" id="photographs">${photos.map((p,i)=>`<button class="moment ${p.cls}" data-photo="${i}" aria-label="View photograph: ${esc(p.title)}"><figure>${image(p.file,p.caption)}</figure><div class="moment-caption"><span>${p.label}</span><h3>${p.title}</h3>${diagonal}</div></button>`).join('')}</div></section>`;
}
function press() {
  return `<section class="press-section wrap" aria-label="Selected press coverage"><h2>In the news</h2><a href="https://www.daily-sun.com/index.php/bangladesh/899625/bytt-calls-for-35-yr-age-limit-in-bangladesh-bank-s-loan-scheme" target="_blank" rel="noopener noreferrer"><span>Daily Sun</span><p>Youth entrepreneurship and access to finance</p>${diagonal}</a><a href="https://rtvonline.com/capital/346004" target="_blank" rel="noopener noreferrer"><span>RTV</span><p>Community healthcare in Rayerbazar</p>${diagonal}</a></section>`;
}
function footer() {
  return `<footer id="contact"><div class="footer-main wrap"><div><h2>Let’s connect.</h2><p>For professional correspondence, media requests,<br>and community-service communication.</p></div><a class="contact-email" href="mailto:honeyhaque1078@gmail.com">honeyhaque1078@gmail.com ${diagonal}</a></div><div class="footer-bottom wrap"><a class="footer-brand" href="${url()}">Dr Umma Hani</a><div><a href="https://www.facebook.com/honey.haque.37" target="_blank" rel="noopener noreferrer">Facebook ${diagonal}</a><a href="https://www.linkedin.com/in/dr-umme-hani-a60b561a4/" target="_blank" rel="noopener noreferrer">LinkedIn ${diagonal}</a><a href="https://www.instagram.com/priethy13/" target="_blank" rel="noopener noreferrer">Instagram ${diagonal}</a></div><span>Physician · Columnist</span></div></footer>`;
}
function home() {
  const hero = {signature:signatureHero,portrait:portraitHero,journal:journalHero}[variant];
  return `${hero()}${writingPreview()}${biography()}${clinical()}${moments()}${press()}`;
}
function archive() {
  const topics = [...new Set(essays.flatMap(p=>p.topics))].sort();
  const publishers = [...new Set(essays.flatMap(p=>p.sources.map(s=>s.publisher)))].sort();
  return `<section class="archive-heading wrap"><div><a class="back-link" href="${url()}">Home</a><h1>Writing &<br>perspectives.</h1></div><p>Essays on health, women, leadership, and public life.<br> Original Bengali writing, with English summaries and links to the publishers.</p></section><section class="archive-content wrap"><form class="archive-controls" role="search"><label class="search-control">${search}<span class="sr-only">Search essays</span><input type="search" name="q" placeholder="Search titles, themes, or keywords"></label><label><span>Topic</span><select name="topic"><option value="">All topics</option>${topics.map(t=>`<option>${esc(t)}</option>`).join('')}</select></label><label><span>Publisher</span><select name="publisher"><option value="">All publishers</option>${publishers.map(t=>`<option>${esc(t)}</option>`).join('')}</select></label></form><div class="archive-status"><p id="result-count" aria-live="polite">6 essays</p><span>Most recent first</span></div><div id="archive-results" class="archive-results">${essays.map(e=>archiveCard(e)).join('')}</div><p id="empty-results" hidden>No essays match these filters. Try another topic or clear your search.</p></section>`;
}
function archiveCard(item) {
  return `<article class="archive-essay">${metadata(item)}<div><h2 lang="bn">${esc(item.title)}</h2><p>${esc(item.summary)}</p><div class="publication-links">${item.sources.map(s=>`<a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">Read in ${esc(s.publisher)} ${diagonal}</a>`).join('')}</div></div><span class="archive-topics">${esc(item.topics.join(' / '))}</span></article>`;
}
function render() {
  document.body.dataset.variant = variant;
  document.body.dataset.view = view;
  document.querySelector('#app').innerHTML = `${header()}<main id="main">${view==='home'?home():archive()}</main>${footer()}`;
  document.querySelector('#direction-name').textContent = names[variant];
  document.querySelectorAll('[data-direction]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.direction===variant)));
  document.querySelectorAll('[data-view]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.view===view)));
  document.title = `${names[variant]} · ${view==='home'?'Homepage':'Writing archive'} · Design study`;
  document.querySelector('.menu-toggle').addEventListener('click', e=>{
    const button=e.currentTarget;
    const open=button.getAttribute('aria-expanded')!=='true';
    button.setAttribute('aria-expanded',String(open));
    button.setAttribute('aria-label',open?'Close navigation':'Open navigation');
    document.querySelector('#mobile-nav').hidden=!open;
  });
  document.querySelectorAll('[data-photo]').forEach(button=>button.addEventListener('click',()=>{
    const photo=photos[Number(button.dataset.photo)];
    document.querySelector('#full-photo').src=`/media/${photo.file}`;
    document.querySelector('#full-photo').alt=photo.caption;
    document.querySelector('#photo-caption').textContent=photo.caption;
    document.querySelector('#photo-viewer').showModal();
  }));
  document.querySelectorAll('.mobile-nav a').forEach(a=>a.addEventListener('click',()=>{
    document.querySelector('#mobile-nav').hidden=true;
    document.querySelector('.menu-toggle').setAttribute('aria-expanded','false');
  }));
  if(view==='writing'){
    const form=document.querySelector('.archive-controls');
    form.addEventListener('submit',e=>e.preventDefault());
    const filter=()=>{
      const query=form.elements.q.value.toLocaleLowerCase().trim();
      const topic=form.elements.topic.value;
      const publisher=form.elements.publisher.value;
      const matches=essays.filter(p=>(!query||`${p.title} ${p.summary} ${p.topics.join(' ')}`.toLocaleLowerCase().includes(query))&&(!topic||p.topics.includes(topic))&&(!publisher||p.sources.some(s=>s.publisher===publisher)));
      document.querySelector('#archive-results').innerHTML=matches.map(archiveCard).join('');
      document.querySelector('#result-count').textContent=`${matches.length} ${matches.length===1?'essay':'essays'}`;
      document.querySelector('#empty-results').hidden=matches.length>0;
    };
    form.addEventListener('input',filter);form.addEventListener('change',filter);
  }
}
function switchView(nextVariant,nextView){
  variant=nextVariant;view=nextView;
  history.replaceState(null,'',url(view));
  render();window.scrollTo({top:0,behavior:'instant'});
}
document.querySelectorAll('[data-direction]').forEach(b=>b.addEventListener('click',()=>switchView(b.dataset.direction,view)));
document.querySelectorAll('[data-view]').forEach(b=>b.addEventListener('click',()=>switchView(variant,b.dataset.view)));
document.addEventListener('keydown',e=>{
  if(e.target.closest('input,textarea,select,[contenteditable]')||document.querySelector('dialog[open]'))return;
  if(e.key==='ArrowLeft'||e.key==='ArrowRight'){
    e.preventDefault();switchView(variants[(variants.indexOf(variant)+(e.key==='ArrowRight'?1:2))%3],view);
  }
});
document.querySelector('.close-viewer').addEventListener('click',()=>document.querySelector('#photo-viewer').close());
document.querySelector('#photo-viewer').addEventListener('click',e=>{if(e.target===e.currentTarget)e.currentTarget.close();});
render();
