/* =====================================================
   bon Ashmawy — Coffee Shop Template
   script.js — Interactions & Animations
   ===================================================== */

/* ── Newsletter form handler ── */
function handleNewsletter(e) {
  e.preventDefault();
  const input   = e.target.querySelector('.newsletter-input');
  const success = document.getElementById('newsletterSuccess');

  if (!input.value) return;

  /* Simulate submit */
  input.value = '';
  success.classList.add('visible');

  setTimeout(() => success.classList.remove('visible'), 4000);
}


/* ── Navbar: transparent → solid on scroll ── */
(function initNavbar() {
  const nav = document.querySelector('.navbar');
  if (!nav) return;

  function updateNav() {
    if (window.scrollY > 60) {
      nav.classList.add('nav--solid');
    } else {
      nav.classList.remove('nav--solid');
    }
  }

  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  /* Inject dynamic style for solid state */
  const style = document.createElement('style');
  style.textContent = `
    .navbar {
      transition: background 0.35s ease, backdrop-filter 0.35s ease;
    }
    .nav--solid {
      background: rgba(26, 17, 10, 0.82);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
    }
  `;
  document.head.appendChild(style);
})();


/* ── Scroll-reveal animation ── */
(function initReveal() {
  const style = document.createElement('style');
  style.textContent = `
    .reveal {
      opacity: 0;
      transform: translateY(28px);
      transition: opacity 0.65s ease, transform 0.65s ease;
    }
    .reveal.visible {
      opacity: 1;
      transform: translateY(0);
    }
  `;
  document.head.appendChild(style);

  /* Elements to animate on scroll */
  const targets = [
    '.split-heading',
    '.split-panel--left',
    '.split-panel--right',
    '.collection-heading',
    '.collection-card',
    '.newsletter-heading',
    '.newsletter-form',
  ];

  targets.forEach(sel => {
    document.querySelectorAll(sel).forEach((el, i) => {
      el.classList.add('reveal');
      el.style.transitionDelay = `${i * 0.08}s`;
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
})();


/* ── Collection card: subtle parallax on hover ── */
/* ── Menu Data ── */ 
const menuData = {
  coffee: [
    { 
      name: 'امريكانو',        // product name
      desc: 'بلاك & بولد',           // short description
      price: '50 جنيه',              // price
      img: 'media/coffee-americano.jpg'    // image file name from your folder
    },
    { 
      name: 'كابتشينو',
      desc: 'كريمي وغني',
      price: '60 جنيه',
      img: 'media/coffee-cappuccino.jpg'
    },
    { 
      name: 'فلات وايت',
      desc: 'ناعم ومخملي',
      price: '50 جنيه',
      img: 'media/coffee-flatwhite.jpg'
    },
    { 
      name: 'لاتيه',
      desc: 'حليب وإسبريسو',
      price: '50 جنيه',
      img: 'media/coffee-latte.jpg'
    },
    { 
      name: 'اسبانيش لاتيه',
      desc: 'حليب وإسبريسو',
      price: '60 جنيه',
      img: 'media/spanish-latte.jpg'
    },
    { 
      name: 'قهوة تركي',
      desc: 'قهوة تعدل',
      price: '20 جنيه',
      img: 'media/coffee-turkish.jpg'
    },
    { 
      name: 'قهوة اسبيشيال',
      desc: 'قهوة مخصوص',
      price: '25 جنيه',
      img: 'media/spicial-coffee.jpg'
    },
    { 
      name: 'قهوة فرنساوي',
      desc: 'قهوة وحليب',
      price: '30 جنيه',
      img: 'media/coffee-french.jpg'
    },
    { 
      name: 'قهوة بندق',
      desc: 'فهوة وبندق',
      price: '30 جنيه',
      img: 'media/bondoq-coffee.jpg'
    },
  ],
   
 
    
  
  

  tea: [
    { 
      name: 'شاي عادي',
      desc: 'طازج وخفيف',
      price: '15 جنيه',
      img: 'media/tea-normal.jpg'
    },
    { 
      name: 'شاي كرك',
      desc: 'منعش وغني',
      price: '30 جنيه',
      img: 'media/tea-karak.jpg'
    },
    { 
      name: 'شاي كرك باللبن',
      desc: 'منعش وغني',
      price: '50 جنيه',
      img: 'media/tea-karak-milk.jpg'
    },
  ],

  espresso: [
    { 
      name: 'إسبريسو سنجل',
      desc: 'نقي ومكثف',
      price: '30 جنيه',
      img: 'media/espresso-single.jpg'
    },
    { 
      name: 'اسبريسو دبل',
      desc: 'شوت مزدوج',
      price: '40 جنيه',
      img: 'media/espresso-double.jpg'
    },
    { 
      name: 'هوت شوكليت',
      desc: 'شوت مليئ بالكاكاو',
      price: '50 جنيه',
      img: 'media/hot-choclate.jpg'
    },
    { 
      name: 'ماكياتو',
      desc: 'قهوة ايطاليا',
      price: '40 جنيه',
      img: 'media/macchiato-coffee.jpg'
    },
    { 
      name: 'كورتادو',
      desc: 'قهوة ايطاليا',
      price: '40 جنيه',
      img: 'media/cortado-coffee.jpg'
    },
    
  ],

  'fresh-drinks': [
    { 
      name: 'ايطاليا صودا',
      desc: 'حامض ومثلج',
      price: '50 جنيه',
      img: 'media/italic-soda.jpg'
    },
    { 
      name: 'سموزي',
      desc: 'خفيف ومنعش',
      price: '50 جنيه',
      img: 'media/smoth-beverage.jpg'
    },
    { 
      name: 'فرابيه',
      desc: 'باردو رغوي',
      price: '70 جنيه',
      img: 'media/farabieh-drink.jpg'
    },
    { 
      name: 'فرابيتشينو',
      desc: 'كريمي ولذيذ',
      price: '85 جنيه',
      img: 'media/frabbuccino-drink.jpg'
    },
    { 
      name: 'زجاجة مياه',
      desc: 'مياه باردة',
      price: '10 جنيه',
      img: 'media/water-bottele.jpg'
    },
  ],
   coffeepackets:[

    {
      name: 'بن بندق',
      desc: 'باكو قهوة',
      price: '850 جنيه',
      img: 'media/bon-bondoq.jpg'
    },
     { 
      name: ' فواكه',
      desc: 'باكو قهوة',
      price: 'جنيه 750',
      img: 'media/bon-fruits.jpg'
    },
    { 
      name: 'بن اسبيشيال',
      desc: 'باكو قهوة',
      price: 'جنيه750',
      img: 'media/bon-spicial.jpg'
    },
    { 
      name: 'اسبريسو 1',
      desc: 'باكو قهوة',
      price: 'جنيه 1600',
      img: 'media/espresso-one.jpg'
    },

    { 
      name: 'اسبريسو 2',
      desc: 'باكو قهوة',
      price: 'جنيه 1200',
      img: 'media/espresso-two.jpg'
    },
    { 
      name: 'اسبريسو 3',
      desc: 'باكو قهوة',
      price: 'جنيه 950',
      img: 'media/espresso-three.jpg'
    },
   
    { 
      name: 'بن سادة فاتح',
      desc: 'باكو قهوة',
      price: 'جنيه 800',
      img: 'media/bon-plain-fateh.jpg'
    },

     { 
      name: 'بن سادة وسط',
      desc: 'باكو قهوة',
      price: 'جنيه 800',
      img: 'media/bon-plain-wasat.jpg'
    },

    
    { 
      name: 'بن سادة غامق',
      desc: 'باكو قهوة',
      price: 'جنيه 900',
      img: 'media/bon-plain-ghameq.jpg'
    },
    { 
      name: 'بن محوج وسط',
      desc: 'باكو قهوة',
      price: 'جنيه 860',
      img: 'media/m7wag-wasat.jpg'
    },
    { 
      name: 'بن محوج فاتح',
      desc: 'باكو قهوة',
      price: 'جنيه 860',
      img: 'media/m7wag-fateh.jpg'
    },
    { 
      name: 'بن محوج غامق',
      desc: 'باكو قهوة',
      price: 'جنيه 960',
      img: 'media/m7wag-ghameq.jpg'
    },
   { 
      name: 'توباكو او اي فواكه',
      desc: 'باكو قهوة',
      price: 'جنيه 25',
      img: 'media/tobacko-fruits.jpg'
    },


  ] 
};

/* ── Slider Logic ── */
(function initSlider() {
  const track     = document.getElementById('sliderTrack');
  const arrowL    = document.getElementById('arrowLeft');
  const arrowR    = document.getElementById('arrowRight');
  const dotsWrap  = document.getElementById('sliderDots');
  const cards     = document.querySelectorAll('.slider-card');

  if (!track || cards.length === 0) return;

  // How many cards visible at once
  const visibleCount = () => window.innerWidth <= 640 ? 1 : 2;
  let current = 0;

  // Build dots
  const totalSteps = () => cards.length - visibleCount() + 1;

  function buildDots() {
    dotsWrap.innerHTML = '';
    for (let i = 0; i < totalSteps(); i++) {
      const dot = document.createElement('button');
      dot.className = 'slider-dot' + (i === current ? ' active' : '');
      dot.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(dot);
    }
  }

  function updateDots() {
    document.querySelectorAll('.slider-dot').forEach((d, i) => {
      d.classList.toggle('active', i === current);
    });
  }

  function goTo(index) {
    const max = totalSteps() - 1;
    current = Math.max(0, Math.min(index, max));

    const cardWidth = cards[0].offsetWidth + 16; // width + gap
    track.scrollLeft = current * cardWidth;

    arrowL.disabled = current === 0;
    arrowR.disabled = current >= max;
    updateDots();
  }

  arrowL.addEventListener('click', () => goTo(current - 1));
  arrowR.addEventListener('click', () => goTo(current + 1));

  // Init
  buildDots();
  goTo(0);

  // Rebuild on resize
  window.addEventListener('resize', () => { buildDots(); goTo(0); });

  // Open modal on card click
  cards.forEach(card => {
    card.addEventListener('click', (e) => {
      // e.preventDefault();
      const category = card.dataset.category;
      const items    = menuData[category] || [];
      const title    = card.querySelector('.collection-label').textContent.trim();

      document.getElementById('modalTitle').textContent = title;

      const grid = document.getElementById('modalGrid');
      grid.innerHTML = items.map(item => `
        <div class="product-card">
          <img class="product-card-img" src="${item.img}" alt="${item.name}" />
          <div class="product-card-body">
            <p class="product-card-name">${item.name}</p>
            <p class="product-card-desc">${item.desc}</p>
            <p class="product-card-price">${item.price}</p>
            <button class="product-card-btn">اطلب الان</button>
          </div>
        </div>
      `).join('');

      document.getElementById('modalOverlay').classList.add('open');
    });
  });
})();
/* ── Close modal ── */
document.addEventListener('DOMContentLoaded', () => {
  const modalClose   = document.getElementById('modalClose');
  const modalOverlay = document.getElementById('modalOverlay');

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === e.currentTarget) closeModal();
    });
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

function closeModal() {
  const overlay = document.getElementById('modalOverlay');
  if (overlay) overlay.classList.remove('open');
}


/* ── Mobile nav toggle (hamburger) ── */
(function initMobileNav() {
  const nav   = document.querySelector('.navbar');
  const links = document.querySelector('.nav-links');
  if (!nav || !links) return;

  /* Only inject hamburger on narrow screens */
  if (window.innerWidth > 560) return;

  const btn = document.createElement('button');
  btn.className = 'nav-hamburger';
  btn.setAttribute('aria-label', 'Toggle menu');
  btn.innerHTML = `
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.8">
      <line x1="3" y1="7"  x2="21" y2="7"/>
      <line x1="3" y1="12" x2="21" y2="12"/>
      <line x1="3" y1="17" x2="21" y2="17"/>
    </svg>`;

  nav.appendChild(btn);

  /* Style injection */
  const style = document.createElement('style');
  style.textContent = `
    .nav-hamburger {
      display: flex;
      align-items: center;
      background: none;
      border: none;
      cursor: pointer;
      padding: 4px;
      z-index: 50;
    }
    .nav-links.open {
      display: flex !important;
      flex-direction: column;
      position: fixed;
      top: 0; left: 0; right: 0;
      background: rgba(26,17,10,0.96);
      backdrop-filter: blur(8px);
      padding: 80px 32px 40px;
      gap: 28px;
      z-index: 40;
    }
    .nav-links.open a {
      font-size: 1.4rem;
    }
  `;
  document.head.appendChild(style);

  btn.addEventListener('click', () => {
    links.classList.toggle('open');
  });

  /* Close on link click */
  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => links.classList.remove('open'));
  });

});
// })();
// /* ── Collection card dropdowns ── */
// document.querySelectorAll('.collection-card').forEach(card => {
//   card.addEventListener('click', (e) => {
//     e.preventDefault();
//     const isOpen = card.classList.contains('open');

//     // Close all cards first
//     document.querySelectorAll('.collection-card').forEach(c => {
//       c.classList.remove('open');
//     });

//     // Toggle clicked card
//     if (!isOpen) card.classList.add('open');
//   });
// });

// // Click outside to close
// document.addEventListener('click', (e) => {
//   if (!e.target.closest('.collection-card')) {
//     document.querySelectorAll('.collection-card').forEach(c => {
//       c.classList.remove('open');
//     });
//   }