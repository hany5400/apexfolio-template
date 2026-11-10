/**
 * ApexFolio — Minimalist Developer & Designer Portfolio Interactions
 */

document.addEventListener('DOMContentLoaded', () => {

  // 1. Live Local Time Display (Hallmark of elite engineer portfolios)
  const localTimeEl = document.getElementById('localTime');
  function updateTime() {
    if (!localTimeEl) return;
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
    localTimeEl.textContent = timeStr;
  }
  updateTime();
  setInterval(updateTime, 1000);

  // 2. Project Category Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-item');
  const projectCount = document.getElementById('projectCount');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.getAttribute('data-filter');

      // Update button styling
      filterBtns.forEach(b => {
        b.classList.remove('bg-white', 'text-black', 'border-white');
        b.classList.add('bg-transparent', 'text-zinc-400', 'border-zinc-800');
      });
      btn.classList.remove('bg-transparent', 'text-zinc-400', 'border-zinc-800');
      btn.classList.add('bg-white', 'text-black', 'border-white');

      // Filter projects
      let visibleCount = 0;
      projectCards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        if (category === 'all' || cardCat.includes(category)) {
          card.classList.remove('hidden');
          visibleCount++;
        } else {
          card.classList.add('hidden');
        }
      });

      if (projectCount) {
        projectCount.textContent = `${visibleCount} projects`;
      }
    });
  });

  // 3. Project Case Study Modal Data & Handlers
  const projectModal = document.getElementById('projectModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const modalTitle = document.getElementById('modalTitle');
  const modalTagline = document.getElementById('modalTagline');
  const modalYear = document.getElementById('modalYear');
  const modalRole = document.getElementById('modalRole');
  const modalOverview = document.getElementById('modalOverview');
  const modalMetrics = document.getElementById('modalMetrics');
  const modalStack = document.getElementById('modalStack');
  const modalLiveLink = document.getElementById('modalLiveLink');
  const modalGithubLink = document.getElementById('modalGithubLink');

  // Case Studies Database
  const caseStudies = {
    'hyperion': {
      title: 'Hyperion Cloud',
      tagline: 'High-throughput edge orchestration engine for microservices.',
      year: '2025',
      role: 'Lead Architect',
      overview: 'Engineered a decentralized gateway handling 40M+ daily events. Migrated existing monolithic state machines to distributed Raft consensus nodes, reducing single-point failures to zero.',
      metrics: ['-78% P99 Latency (down to 18ms)', 'Zero downtime across 14 deployments', 'Saved $45k/mo on AWS compute'],
      stack: ['Go', 'Rust', 'Raft Consensus', 'Docker', 'Prometheus'],
      live: 'https://example.com/hyperion',
      github: 'https://github.com/example/hyperion'
    },
    'canvas-os': {
      title: 'CanvasOS',
      tagline: 'Spatial infinite canvas for product design & engineering diagrams.',
      year: '2024',
      role: 'Founding Frontend Engineer',
      overview: 'Built a 60fps WebGL/Canvas rendering pipeline capable of displaying over 150,000 interactive nodes simultaneously without dropping frames. Designed custom CRDT multiplayer sync engine.',
      metrics: ['60fps smooth pan/zoom on 100k nodes', 'Sub-15ms collaborative websocket sync', 'Featured on Hacker News frontpage'],
      stack: ['TypeScript', 'WebGL', 'Pixi.js', 'CRDTs / Yjs', 'TailwindCSS'],
      live: 'https://example.com/canvas-os',
      github: 'https://github.com/example/canvas-os'
    },
    'strata-db': {
      title: 'StrataDB Explorer',
      tagline: 'Lightweight desktop GUI & query profiler for vector databases.',
      year: '2024',
      role: 'Creator & Maintainer',
      overview: 'An open-source desktop tool built for AI engineers to visualize high-dimensional vector embeddings, debug cosine distance anomalies, and profile HNSW indexing pipelines in real time.',
      metrics: ['8.4k GitHub Stars', 'Over 65,000 active monthly downloads', 'Adopted by engineering teams at 3 unicorn startups'],
      stack: ['Tauri', 'Rust', 'React', 'TailwindCSS', 'SQLite'],
      live: 'https://example.com/strata',
      github: 'https://github.com/example/strata-db'
    },
    'lumina-fin': {
      title: 'Lumina Treasury',
      tagline: 'Next-generation treasury and automated payout management platform.',
      year: '2023',
      role: 'Senior Full-Stack Engineer',
      overview: 'Re-architected payment reconciliation microservices connecting Stripe, Wise, and SWIFT rails. Implemented idempotent transactional guarantees with dual-ledger audit verification.',
      metrics: ['$180M+ processed without a ledger discrepancy', 'Audit pass with Big 4 compliance firm', 'Automated 92% of manual reconciliation'],
      stack: ['Next.js', 'Node.js', 'PostgreSQL', 'Stripe Connect', 'Redis'],
      live: 'https://example.com/lumina',
      github: 'https://github.com/example/lumina'
    }
  };

  document.querySelectorAll('.open-case-study').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const studyId = trigger.getAttribute('data-study');
      const data = caseStudies[studyId];
      if (!data) return;

      modalTitle.textContent = data.title;
      modalTagline.textContent = data.tagline;
      modalYear.textContent = data.year;
      modalRole.textContent = data.role;
      modalOverview.textContent = data.overview;
      
      // Render Metrics
      modalMetrics.innerHTML = '';
      data.metrics.forEach(m => {
        const li = document.createElement('li');
        li.className = 'flex items-center gap-2 text-zinc-300 text-sm';
        li.innerHTML = `<span class="text-emerald-400 font-mono text-xs">✔</span> ${m}`;
        modalMetrics.appendChild(li);
      });

      // Render Stack
      modalStack.innerHTML = '';
      data.stack.forEach(s => {
        const span = document.createElement('span');
        span.className = 'tag-badge';
        span.textContent = s;
        modalStack.appendChild(span);
      });

      if (modalLiveLink) modalLiveLink.href = data.live;
      if (modalGithubLink) modalGithubLink.href = data.github;

      projectModal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    if (projectModal) {
      projectModal.classList.add('hidden');
      document.body.style.overflow = 'auto';
    }
  }

  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) closeModal();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  // 4. Copy Email to Clipboard with Refined Feedback
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  const copyFeedback = document.getElementById('copyFeedback');
  const emailToCopy = 'ahmed.dev@example.com';

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(emailToCopy).then(() => {
        if (copyFeedback) {
          copyFeedback.textContent = 'Copied to clipboard!';
          copyFeedback.classList.remove('opacity-0');
          setTimeout(() => {
            copyFeedback.classList.add('opacity-0');
          }, 2500);
        }
      });
    });
  }
});
