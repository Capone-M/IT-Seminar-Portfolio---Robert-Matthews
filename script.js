// ── SCROLL REVEAL ─────────────────────────────────────────────
const observer = new IntersectionObserver(
  entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
  { threshold: 0.12 }
);
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ── NAV SCROLL SHRINK ──────────────────────────────────────────
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  nav.style.padding = window.scrollY > 60 ? '0.7rem 3rem' : '1.1rem 3rem';
});

// ── STAGGERED CARD REVEALS ─────────────────────────────────────
document.querySelectorAll('.skills-grid, .certs-grid, .projects-grid').forEach(grid => {
  [...grid.children].forEach((child, i) => {
    child.style.transitionDelay = `${i * 0.07}s`;
  });
});

// ── FORMSPREE CONTACT FORM ─────────────────────────────────────
const sendBtn    = document.getElementById('send-btn');
const formStatus = document.getElementById('form-status');

sendBtn.addEventListener('click', async () => {
  const name    = document.getElementById('cf-name').value.trim();
  const email   = document.getElementById('cf-email').value.trim();
  const message = document.getElementById('cf-message').value.trim();

  if (!name || !email || !message) {
    formStatus.style.display = 'block';
    formStatus.style.color   = 'var(--amber)';
    formStatus.textContent   = '// Please fill in all fields.';
    return;
  }

  sendBtn.textContent = 'Sending…';
  sendBtn.disabled    = true;

  try {
    const res = await fetch('https://formspree.io/f/mnjwljbj', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body:    JSON.stringify({ name, email, message })
    });

    if (res.ok) {
      formStatus.style.display = 'block';
      formStatus.style.color   = 'var(--accent)';
      formStatus.textContent   = "// Message sent! I'll get back to you soon.";
      document.getElementById('cf-name').value    = '';
      document.getElementById('cf-email').value   = '';
      document.getElementById('cf-message').value = '';
      sendBtn.textContent = 'Sent ✓';
    } else {
      throw new Error('Server error');
    }
  } catch {
    formStatus.style.display = 'block';
    formStatus.style.color   = '#ff6b6b';
    formStatus.textContent   = '// Something went wrong. Try emailing directly.';
    sendBtn.textContent      = 'Send Message';
    sendBtn.disabled         = false;
  }
});
