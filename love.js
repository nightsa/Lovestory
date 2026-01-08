// Button logic for lovestory page
const loveBtn = document.getElementById('loveBtn');
const noBtn = document.getElementById('noBtn');
const stage = document.getElementById('stage');
const msg = document.getElementById('message');
const closeMsg = document.getElementById('closeMsg');

function showMessage(){
  msg.classList.remove('hidden');
  // disable buttons to avoid weird behavior
  loveBtn.disabled = true;
  noBtn.disabled = true;
}

function hideMessage(){
  msg.classList.add('hidden');
}

function randomPositionWithin(container, el){
  const cRect = container.getBoundingClientRect();
  const eRect = el.getBoundingClientRect();

  const padding = 8; // small padding from edges
  const maxX = Math.max(0, cRect.width - eRect.width - padding*2);
  const maxY = Math.max(0, cRect.height - eRect.height - padding*2);

  const x = Math.floor(Math.random() * maxX) + padding;
  const y = Math.floor(Math.random() * maxY) + padding;

  return {x,y};
}

function moveNoBtn(){
  // ensure button is positioned absolute inside stage
  noBtn.style.position = 'absolute';
  const pos = randomPositionWithin(stage, noBtn);
  noBtn.style.left = pos.x + 'px';
  noBtn.style.top = pos.y + 'px';
}

loveBtn.addEventListener('click', (e)=>{
  showMessage();
});

// Move on click
noBtn.addEventListener('click', (e)=>{
  // move away whenever clicked
  moveNoBtn();
});

// also move when mouse approaches (optional playful behavior)
noBtn.addEventListener('mouseenter', ()=>{
  moveNoBtn();
});

closeMsg.addEventListener('click', ()=>{
  hideMessage();
});

// initialize position to center-right-ish
window.addEventListener('load', ()=>{
  // put noBtn somewhere initial
  moveNoBtn();
});

// keep button inside on resize
window.addEventListener('resize', ()=>{
  // clamp position if overshoot
  const cRect = stage.getBoundingClientRect();
  const eRect = noBtn.getBoundingClientRect();
  let left = parseFloat(noBtn.style.left || 0);
  let top = parseFloat(noBtn.style.top || 0);
  const padding = 8;
  const maxX = Math.max(0, cRect.width - eRect.width - padding*2);
  const maxY = Math.max(0, cRect.height - eRect.height - padding*2);
  if(left > maxX) left = maxX;
  if(top > maxY) top = maxY;
  noBtn.style.left = left + 'px';
  noBtn.style.top = top + 'px';
});
