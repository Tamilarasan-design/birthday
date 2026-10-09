/* ===== EDIT ME: add more photos by adding more lines here ===== */
const PHOTOS = [
  {src:'images/friend1.jpg', cap:'my favorite human 💗'},
  {src:'images/friend2.jpg', cap:'pure sunshine ☀️'},
  {src:'images/friend3.jpg', cap:'chaos & cuteness 🎀'},
  {src:'images/friend4.jpg', cap:'forever bestie 🦋'},
  {src:'images/friend5.jpg', cap:'that smile tho ✨'},
  {src:'images/friend6.jpg', cap:'unique & talented 🌸'}
];
const CARD_MSG = "Happy Birthday to that *childish*, *unique*, and *talented* girl I met! I’m truly grateful to have you as my *best friend*. 💗";
const FINAL = [
  "Okayyy, I knew you would say YES! 😌💖",
  "Jokes apart, I genuinely wish that you *find your passion*, *discover your purpose* in life, and achieve even more than the little girl you once dreamed of becoming.",
  "I hope you grow into the person you have always wanted to be, explore the things that make your heart happy, and never stop believing in your own talent.",
  "You deserve a life full of happiness, success, love, and beautiful opportunities. No matter where life takes you, I hope you always remember how special and capable you are.",
  "And one more thing, girl… 👀✨",
  "~I REALLY WANT YOU TO TRY THE *MISS INDIA* COMPETITION! 👑💖",
  "You are talented, unique, and beautiful in your own way. I want you to believe in yourself, take that chance, and explore what you are capable of. Don't let fear stop you from trying something amazing.",
  "This is just my little birthday wish for you. I want to see you *chase your dreams*, discover yourself, and achieve everything you are capable of.",
  "Happy Birthday once again, my favorite human! Love you, bestie! 💗🫂"
];
const NO_TEASES = ["Nice try 😜","Too slow! 💨","Nope nope nope 🙈","You can’t catch me 🏃‍♀️","Just say YES 😌","Hehe 🎀"];

const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
let cur = 0, timers = [], muted = false, ac;
const later = (f, t) => timers.push(setTimeout(f, t));

/* ---------- scenes ---------- */
function go(n){
  cur = n;
  $$('.scene').forEach((s,i)=>s.classList.toggle('active', i===n));
  $$('.dots i').forEach((d,i)=>d.classList.toggle('on', i<=n));
  $('#no').style.display = 'none';
  n===1 ? startGal() : stopGal();
  if(n===2) later(placeNo, 800);
  $$('.scene')[n].scrollTop = 0;
}

/* ---------- floating hearts background ---------- */
setInterval(()=>{
  if(document.hidden) return;
  const e = document.createElement('span');
  e.className = 'fl';
  e.textContent = ['💗','💖','✨','🦋','🌸','⭐','💜'][Math.random()*7|0];
  e.style.cssText = `left:${Math.random()*100}%;font-size:${14+Math.random()*22}px;animation-duration:${7+Math.random()*7}s`;
  $('#bg').appendChild(e); setTimeout(()=>e.remove(), 15000);
}, RM ? 1800 : 600);
function emit(x, y, n=14){
  for(let i=0;i<n;i++){
    const e = document.createElement('span');
    e.textContent = ['💗','✨','💖','🦋','⭐'][Math.random()*5|0];
    e.style.cssText = `position:fixed;left:${x}px;top:${y}px;z-index:61;pointer-events:none;font-size:${16+Math.random()*16}px;transition:all 1.4s ease-out`;
    document.body.appendChild(e);
    requestAnimationFrame(()=>requestAnimationFrame(()=>{
      e.style.transform = `translate(${(Math.random()-.5)*300}px,${-80-Math.random()*220}px) rotate(${Math.random()*80-40}deg)`;
      e.style.opacity = 0;
    }));
    setTimeout(()=>e.remove(), 1500);
  }
}

/* ---------- confetti ---------- */
const cv = $('#cf'), cx = cv.getContext('2d'); let ps = [];
const fit = () => { cv.width = innerWidth; cv.height = innerHeight; }; fit(); addEventListener('resize', fit);
function burst(n=150, x=innerWidth/2, y=innerHeight*.45){
  const cols = ['#ff8fb8','#c9a7ff','#ffd6e8','#fff1a8','#9fe3ff','#e0407f'];
  for(let i=0;i<n;i++) ps.push({x,y,vx:(Math.random()-.5)*18,vy:-Math.random()*15-3,s:5+Math.random()*7,c:cols[i%6],r:Math.random()*6,vr:(Math.random()-.5)*.4});
}
(function tick(){
  cx.clearRect(0,0,cv.width,cv.height);
  ps = ps.filter(p=>p.y<innerHeight+30);
  ps.forEach(p=>{p.vy+=.35;p.x+=p.vx;p.y+=p.vy;p.vx*=.99;p.r+=p.vr;
    cx.save();cx.translate(p.x,p.y);cx.rotate(p.r);cx.fillStyle=p.c;cx.fillRect(-p.s/2,-p.s/3,p.s,p.s*.6);cx.restore();});
  requestAnimationFrame(tick);
})();

/* ---------- sound (WebAudio, no files needed) ---------- */
function tone(){
  if(muted) return;
  try{
    ac = ac || new (window.AudioContext || window.webkitAudioContext)();
    [523,659,784,1047,1319].forEach((f,i)=>{
      const o = ac.createOscillator(), g = ac.createGain(), t = ac.currentTime + i*.12;
      o.type = 'triangle'; o.frequency.value = f; o.connect(g); g.connect(ac.destination);
      g.gain.setValueAtTime(.15,t); g.gain.exponentialRampToValueAtTime(.001,t+.35); o.start(t); o.stop(t+.4);
    });
  }catch(e){}
}
$('#mute').onclick = e => { muted = !muted; e.currentTarget.textContent = muted ? '🔇' : '🔊'; };
$('#again').onclick = () => { tone(); burst(80); };

/* ---------- stickers: use images/sticker.gif if it exists, else emoji ---------- */
$$('.stk').forEach(s=>{
  s.textContent = s.dataset.emoji;
  if(s.dataset.gif){ const im = new Image(); im.alt = ''; im.onload = () => { s.textContent = ''; s.appendChild(im); }; im.src = s.dataset.gif; }
});

/* ---------- Scene 1: card ---------- */
function type(el, txt, step, done){
  el.innerHTML = ''; let n = 0;
  txt.split(/(\*[^*]+\*)/).forEach(p=>{
    if(!p) return;
    const em = p[0]==='*', wrap = em ? document.createElement('b') : el;
    (em ? p.slice(1,-1) : p).split('').forEach(c=>{
      const s = document.createElement('span'); s.className = 'ch'; s.textContent = c;
      s.style.animationDelay = (n++*step)+'ms'; wrap.appendChild(s);
    });
    if(em){ el.appendChild(wrap); later(()=>wrap.classList.add('on'), n*step+200); }
  });
  later(done, n*step+500);
}
$('#openBtn').onclick = e => {
  e.currentTarget.classList.add('hide');
  $('#card').classList.add('open');
  const r = $('#card').getBoundingClientRect(); emit(r.left+r.width/2, r.top+r.height/2, 22); burst(70, innerWidth/2, r.top+60);
  later(()=>type($('#msg'), CARD_MSG, RM?5:42, ()=>{ $('#sub').classList.add('show'); $('#next1').classList.add('show'); emit(innerWidth/2, innerHeight*.6, 10); }), 900);
};
$('#next1').onclick = () => go(1);

/* ---------- Scene 2: gallery ---------- */
let gi = 0, gt = null, userPaused = false;
const frame = $('#frame'), gimg = $('#gimg');
PHOTOS.forEach((_,i)=>{ const b = document.createElement('button'); b.setAttribute('aria-label','Photo '+(i+1)); b.onclick = () => { show(i); restart(); }; $('#gdots').appendChild(b); });
gimg.onerror = () => frame.classList.add('missing');
gimg.onload = () => frame.classList.remove('missing');
function show(i){
  gi = (i + PHOTOS.length) % PHOTOS.length;
  const p = PHOTOS[gi];
  frame.className = 'polaroid'; void frame.offsetWidth; frame.classList.add('fx'+(gi%4));
  frame.style.setProperty('--r', (gi%2 ? 3 : -3)+'deg');
  $('.ph', frame).dataset.name = p.src;
  gimg.src = p.src; $('#cap').textContent = p.cap;
  $$('#gdots button').forEach((b,k)=>b.classList.toggle('on', k===gi));
}
function startGal(){ show(gi); restart(); }
function restart(){ clearInterval(gt); if(!userPaused) gt = setInterval(()=>show(gi+1), 4500); }
function stopGal(){ clearInterval(gt); }
$('#prev').onclick = () => { show(gi-1); restart(); };
$('#nextP').onclick = () => { show(gi+1); restart(); };
$('#pause').onclick = e => { userPaused = !userPaused; e.currentTarget.textContent = userPaused ? '▶' : '⏸'; restart(); };
const lb = $('#lb'), lbimg = $('#lbimg');
frame.onclick = () => {
  const p = PHOTOS[gi]; lbimg.src = p.src; $('#lbcap').textContent = p.cap;
  lbimg.onerror = () => { lbimg.src = ''; $('#lbf .ph').classList.add('missing'); $('#lbf .ph').dataset.name = p.src; };
  $('#lbf .ph').classList.remove('missing'); $('#lbf .ph').dataset.name = p.src;
  lb.classList.add('on'); stopGal();
};
const closeLb = () => { if(lb.classList.contains('on')){ lb.classList.remove('on'); if(cur===1) restart(); } };
lb.onclick = closeLb; addEventListener('keydown', e => e.key==='Escape' && closeLb());
$('#next2').onclick = () => go(2);

/* ---------- Scene 3: the escaping NO button ---------- */
const no = $('#no'), yes = $('#yes'), sp = $('#sp'), q = $('#q');
function placeNo(){
  if(cur!==2) return;
  no.style.transform = 'none'; no.style.display = 'block';
  const r = sp.getBoundingClientRect(); no.style.left = r.left+'px'; no.style.top = r.top+'px';
}
let lastFlee = 0;
function flee(e){
  if(e && e.cancelable) e.preventDefault();
  const now = Date.now(); if(now - lastFlee < 180) return; lastFlee = now;
  const w = no.offsetWidth, h = no.offsetHeight, pad = 10, g = 14;
  const bad = [yes, q, $('.stk',$('#s2'))].map(el => el.getBoundingClientRect());
  let x, y, k = 0;
  do{
    x = pad + Math.random()*Math.max(1, innerWidth - w - 2*pad);
    y = Math.max(pad+24, pad + Math.random()*(innerHeight - h - 2*pad));
    y = Math.min(y, innerHeight - h - pad);
    k++;
  }while(k<60 && bad.some(b => x < b.right+g && x+w > b.left-g && y < b.bottom+g && y+h > b.top-g));
  no.style.left = x+'px'; no.style.top = y+'px';
  no.style.transform = `rotate(${Math.random()*40-20}deg) scale(${.85+Math.random()*.3})`;
  $('#hint').textContent = NO_TEASES[Math.random()*NO_TEASES.length|0];
}
['pointerenter','mouseenter','pointerdown','touchstart','mousedown','click','focus'].forEach(ev => no.addEventListener(ev, flee, {passive:false}));
addEventListener('pointermove', e => {           // flee before the cursor even arrives
  if(cur!==2 || no.style.display!=='block' || e.pointerType==='touch') return;
  const r = no.getBoundingClientRect();
  if(Math.hypot(e.clientX-(r.left+r.width/2), e.clientY-(r.top+r.height/2)) < Math.max(r.width,70)) flee();
});
addEventListener('resize', () => { if(cur===2){ no.style.transform='none'; placeNo(); } });

/* ---------- Scene 4: YES ---------- */
$('#yes').onclick = () => {
  no.style.display = 'none';
  $('#modal').classList.add('on');
  burst(220); setTimeout(()=>burst(120, innerWidth*.2, innerHeight*.6), 300); setTimeout(()=>burst(120, innerWidth*.8, innerHeight*.6), 500);
  emit(innerWidth/2, innerHeight/2, 30); tone();
  const box = $('#final'), mc = $('.mcard'); box.innerHTML = '';
  FINAL.forEach((t,i)=>{
    const big = t[0]==='~', p = document.createElement('p'); if(big) p.className = 'big';
    p.innerHTML = (big ? t.slice(1) : t).replace(/\*([^*]+)\*/g, '<mark>$1</mark>');
    p.style.animationDelay = (1.2 + i*(RM?.1:1.9))+'s'; box.appendChild(p);
    later(()=>{ p.scrollIntoView({behavior:'smooth', block:'center'}); if(big){ burst(80, innerWidth/2, innerHeight*.5); emit(innerWidth/2, innerHeight*.5, 14);} }, (1.2 + i*(RM?.1:1.9))*1000 + 150);
  });
  const end = (1.2 + FINAL.length*(RM?.1:1.9))*1000;
  later(()=>{ $('#keep').classList.add('show'); $('#keep').scrollIntoView({behavior:'smooth', block:'center'}); emit(innerWidth/2, innerHeight*.6, 16); }, end);
  later(()=>{ $('#replay').classList.add('show'); mc.scrollTo({top: mc.scrollHeight, behavior:'smooth'}); }, end + 1200);
};

/* ---------- Replay: reset everything ---------- */
$('#replay').onclick = () => {
  timers.forEach(clearTimeout); timers = []; ps = [];
  $('#modal').classList.remove('on'); $('#final').innerHTML = '';
  $('#keep').classList.remove('show'); $('#replay').classList.remove('show');
  $('#card').classList.remove('open'); $('#msg').innerHTML = ''; $('#sub').classList.remove('show');
  $('#next1').classList.remove('show'); $('#openBtn').classList.remove('hide');
  $('#hint').textContent = 'Take your time… 😏'; no.style.display = 'none';
  gi = 0; userPaused = false; $('#pause').textContent = '⏸'; closeLb();
  go(0);
};
