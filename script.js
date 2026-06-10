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
    { 
      name: 'قهوة موز',
      desc: 'فهوة بالموز',
      price: 'جنيه 25',
      img: 'media/banana-coffee.jpg'
    },
    { 
      name: 'قهوة توت',
      desc: 'فهوة بالتوت',
      price: 'جنيه 25',
      img: 'media/coffee-berries.jpg'
    },

    { 
      name: 'قهوة توباكو',
      desc: 'فهوة توباكو',
      price: 'جنيه 25',
      img: 'media/tobacko-coffee.jpg'
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
    { 
      name: 'زجاجة مياه',
      desc: 'مياه باردة',
      price: '10 جنيه',
      img: 'media/water-bottele.jpg'
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
      price: '50 جنيه',
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
      price: '50 جنيه',
      img: 'media/cortado-coffee.jpg'
    },
    { 
      name: 'امريكانو',        // product name
      desc: 'بلاك & بولد',           // short description
      price: '60 جنيه',              // price
      img: 'media/coffee-americano.jpg'    // image file name from your folder
    },

    { 
      name: 'امريكانو تونك',
      desc: 'اسبريسو',
      price: '70 جنيه',
      img: 'media/amrecano-tonk.jpg'
    },
  
    { 
      name: 'كابتشينو',
      desc: 'كريمي وغني',
      price: '70 جنيه',
      img: 'media/coffee-cappuccino.jpg'
    },
    { 
      name: 'فلات وايت',
      desc: 'ناعم ومخملي',
      price: '65 جنيه',
      img: 'media/coffee-flatwhite.jpg'
    },
    { 
      name: 'لاتيه',
      desc: 'حليب وإسبريسو',
      price: '65 جنيه',
      img: 'media/coffee-latte.jpg'
    },

    { 
      name: 'ايس لاتيه',
      desc: 'اسبريسو',
      price: '75 جنيه',
      img: 'media/ice-latte.jpg'
    },

    { 
      name: 'اسبانيش لاتيه',
      desc: 'حليب وإسبريسو',
      price: '80 جنيه',
      img: 'media/spanich-latte.jpg'
    },
    
    { 
      name: 'ايس اسبانيش لاتيه',
      desc: 'حليب وإسبريسو',
      price: '85 جنيه',
      img: 'media/ice-spanich-latte.jpg'
    },
   
    { 
      name: 'ايس موكا',
      desc: 'اسبريسو',
      price: '85 جنيه',
      img: 'media/ice-moka.jpg'
    },
   { 
      name: 'موكا',
      desc: 'اسبريسو',
      price: '80 جنيه',
      img: 'media/moka-coffee.jpg'
    },
  ],

  
   coffeepackets:[

    {
      name: 'بن بندق',
      desc: 'كيلو',
      price: '850 جنيه',
      img: 'media/bon-bondoq.jpg'
    },
     { 
      name: ' فواكه',
      desc: 'كيلو ',
      price: 'جنيه 750',
      img: 'media/bon-fruits.jpg'
    },
    { 
      name: 'بن اسبيشيال',
      desc: 'كيلو ',
      price: 'جنيه750',
      img: 'media/bon-spicial.jpg'
    },
    { 
      name: 'اسبريسو 1',
      desc: 'كيلو ',
      price: 'جنيه 1600',
      img: 'media/espresso-one.jpg'
    },

    { 
      name: 'اسبريسو 2',
      desc: 'كيلو ',
      price: 'جنيه 1200',
      img: 'media/espresso-two.jpg'
    },
    { 
      name: 'اسبريسو 3',
      desc: 'كيلو ',
      price: 'جنيه 950',
      img: 'media/espresso-three.jpg'
    },
   
    { 
      name: 'بن سادة فاتح',
      desc: 'كيلو ',
      price: 'جنيه 800',
      img: 'media/bon-plain-fateh.jpg'
    },

     { 
      name: 'بن سادة وسط',
      desc: 'كيلو ',
      price: 'جنيه 800',
      img: 'media/bon-plain-wasat.jpg'
    },

    
    { 
      name: 'بن سادة غامق',
      desc: 'كيلو ',
      price: 'جنيه 900',
      img: 'media/bon-plain-ghameq.jpg'
    },
    { 
      name: 'بن محوج وسط',
      desc: 'كيلو ',
      price: 'جنيه 860',
      img: 'media/m7wag-wasat.jpg'
    },
    { 
      name: 'بن محوج فاتح',
      desc: 'كيلو ',
      price: 'جنيه 860',
      img: 'media/m7wag-fateh.jpg'
    },
    { 
      name: 'بن محوج غامق',
      desc: 'كيلو ',
      price: 'جنيه 960',
      img: 'media/m7wag-ghameq.jpg'
    },
   { 
      name: 'بن توباكو تفاح',
      desc: 'كيلو ',
      price: 'جنيه 750',
      img: 'media/bon-tobacko-apple.jpg'
    },

    { 
      name: 'بن توت',
      desc: 'كيلو ',
      price: 'جنيه 750',
      img: 'media/bon-berries.jpg'
    },

    { 
      name: 'بن موز',
      desc: 'كيلو ',
      price: 'جنيه 750',
      img: 'media/bon-banana.jpg'
    },

    { 
      name: 'بن محوج فاتح سوبر',
      desc: 'كيلو ',
      price: 'جنيه 990',
      img: 'media/m7wag-fateh-super.jpg'
    },

    { 
      name: 'بن سادة فاتح سوبر',
      desc: 'كيلو ',
      price: 'جنيه 900',
      img: 'media/bon-sada-fateh-super.jpg'
    },

     { 
      name: 'بن محوج وسط سوبر',
      desc: 'كيلو ',
      price: 'جنيه 1050',
      img: 'media/bon-m7wag-wasat-super.jpg'
    },
  
    { 
      name: 'بن سادة وسط سوبر',
      desc: 'كيلو ',
      price: 'جنيه 950',
      img: 'media/bon-sada-wasat-super.jpg'
    },
    
  ],

  v60:[
   { 
      name: 'Ethiopian',
      desc: 'قهوة اثيوبيا ',
      price: '120',
      img: 'media/ethiopia-flag.jpg'
    },
    { 
      name: 'Colombian',
      desc: 'قهوة كولمبي',
      price: '100',
      img: 'media/colombia-flag.jpg'
    },
    { 
      name: 'Panamanian',
      desc: 'قهوة بنما',
      price: '190',
      img: 'media/panamp-flag.jpg'
    },
    { 
      name: 'Honduran',
      desc: 'قهوة هندوراسي',
      price: '170',
      img: 'media/hundoras-flag.jpg'
    },

    { 
      name: 'Salvadoran',
      desc: 'قهوة سلفادو',
      price: '140',
      img: 'media/slvador-flag.jpg'
    },

    { 
      name: 'Chinese',
      desc: 'قهوة صينيية',
      price: '180',
      img: 'media/chiness-flag.jpg'
    },
  ],
  easy: [
    {
    name: 'ايزي توت',
    desc: 'مشروب منعش',
    price: '60 جنيه',
    img: 'media/easy-berries.jpg'
  },
    
  {
    name: 'ايزي فراوله',
    desc: 'مشروب منعش',
    price: '60 جنيه',
    img: 'media/easy-strawberry.jpg'
  },

   {
    name: 'ايزي كيوي',
    desc: 'مشروب منعش',
    price: '60 جنيه',
    img: 'media/easy-kiwi.jpg'
  },
   {
    name: 'ايزي باشن فروت',
    desc: 'مشروب منعش',
    price: '60 جنيه',
    img: 'media/easy-passion-fruit.jpg'
  },
 {
    name: 'ايزي اناناس',
    desc: 'مشروب منعش',
    price: '60 جنيه',
    img: 'media/easy-pinable.jpg'
  },
{
    name: 'ايزي خوخ',
    desc: 'مشروب منعش',
    price: '60 جنيه',
    img: 'media/easy-peach.jpg'
  },

  {
    name: 'ايزي ميكس',
    desc: 'مشروب منعش',
    price: '70 جنيه',
    img: 'media/easy-mix.jpg'
  },
  { 
      name: 'ايطاليا صودا',
      desc: 'حامض ومثلج',
      price: '50 جنيه',
      img: 'media/italic-soda.jpg'
    },
  
  ],
  
  matcha: [
    {
    name: 'ماتشا عادي',
    desc: 'مشروب منعش',
    price: '70 جنيه',
    img: 'media/match-cover.jpg'
  },
 {
    name: 'ماتشا لاتيه',
    desc: 'مشروب منعش',
    price: '80 جنيه',
    img: 'media/match-latte.jpg'
  },
  {
    name: 'ماتشا اسبانيش لاتيه',
    desc: 'مشروب منعش',
    price: '90 جنيه',
    img: 'media/match-spanich-latte.jpg'
  },

 {
    name: 'ماتشا مانجو',
    desc: 'مشروب منعش',
    price: '90 جنيه',
    img: 'media/match-mango.jpg'
  },
  {
    name: 'ماتشا فراوله',
    desc: 'مشروب منعش',
    price: '90 جنيه',
    img: 'media/match-strawberry.jpg'
  },

{
    name: 'ماتشا باشن فروت',
    desc: 'مشروب منعش',
    price: '90 جنيه',
    img: 'media/matcha-passion-fruit.jpg'
  },
  


  ],
  smothy:[
    { 
      name: 'سموزي',
      desc: 'خفيف ومنعش',
      price: '50 جنيه',
      img: 'media/smoth-beverage.jpg'
    },
   {
    name: 'سموزي توت',
    desc: 'مشروب منعش',
    price: '60 جنيه',
    img: 'media/smothy-berries.jpg'
  },

{
    name: 'سموزي فراوله',
    desc: 'مشروب منعش',
    price: '60 جنيه',
    img: 'media/smothy-strawberry.jpg'
  },
{
    name: 'سموزي مانجو',
    desc: 'مشروب منعش',
    price: '60 جنيه',
    img: 'media/smothy-mango.jpg'
  },

  {
    name: 'سموزي باشن فروت',
    desc: 'مشروب منعش',
    price: '60 جنيه',
    img: 'media/smothy-passion-fruit.jpg'
  },
  

  {
    name: 'سموزي خوخ',
    desc: 'مشروب منعش',
    price: '60 جنيه',
    img: 'media/smothy-peach.jpg'
  },

  {
    name: 'سموزي كيوي',
    desc: 'مشروب منعش',
    price: '60 جنيه',
    img: 'media/smothy-kiwi.jpg'
  },
{
    name: 'سموزي لمون نعناع',
    desc: 'مشروب منعش',
    price: '50 جنيه',
    img: 'media/smothy-lemon-ment.jpg'
  },
{
    name: 'سموزي ميكس',
    desc: 'مشروب منعش',
    price: '70 جنيه',
    img: 'media/smothy-mix.jpg'
  },


  ],

milkshake:[
  { 
      name: 'فرابيتشينو',
      desc: 'كريمي ولذيذ',
      price: '85 جنيه',
      img: 'media/frabbuccino-drink.jpg'
    },
  {
    name: 'فرابيه',
    desc: 'مشروب منعش',
    price: '70 جنيه',
    img: 'media/farabieh-drink.jpg'
  },
  {
    name: 'ميلك تشيك فراوله',
    desc: 'مشروب منعش',
    price: '85 جنيه',
    img: 'media/milk-shake-strawberry.jpg'
  },

{
    name: 'ميلك تشيك توت',
    desc: 'مشروب منعش',
    price: '85 جنيه',
    img: 'media/milk-shake-berries.jpg'
  },

  {
    name: 'ميلك تشيك مانجو',
    desc: 'مشروب منعش',
    price: '85 جنيه',
    img: 'media/milk-shake-mango.jpg'
  },

  {
    name: 'ميلك تشيك كيوي',
    desc: 'مشروب منعش',
    price: '85 جنيه',
    img: 'media/milk-shake-kiwi.jpg'
  },
  {
    name: 'ميلك تشيك فانيليا',
    desc: 'مشروب منعش',
    price: '75 جنيه',
    img: 'media/milk-shake-vanilia.jpg'
  },

  {
    name: 'ميلك تشيك شوكلاته',
    desc: 'مشروب منعش',
    price: '75 جنيه',
    img: 'media/milk-shake-choclate.jpg'
  },
  {
    name: 'ميلك تشيك كراميل',
    desc: 'مشروب منعش',
    price: '85 جنيه',
    img: 'media/milk-shake-carmel.jpg'
  },
  {
    name: 'ميلك تشيك باشن فروت',
    desc: 'مشروب منعش',
    price: '85 جنيه',
    img: 'media/milk-shake-passion-fruit.jpg'
  },
{
    name: 'ميلك تشيك ميكس',
    desc: 'مشروب منعش',
    price: '95 جنيه',
    img: 'media/milk-shake-mix.jpg'
  },
]



};

/* ── Slider Logic ── */
(function initSlider() {
  const track     = document.getElementById('sliderTrack');
  const arrowL    = document.getElementById('arrowLeft');
  const arrowR    = document.getElementById('arrowRight');
  const dotsWrap  = document.getElementById('sliderDots');
 const cards = document.querySelectorAll('#sliderTrack .slider-card');
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
/* ── Slider 2 Logic ── */
(function initSlider2() {
  const track    = document.getElementById('sliderTrack2');
  const arrowL   = document.getElementById('arrowLeft2');
  const arrowR   = document.getElementById('arrowRight2');
  const dotsWrap = document.getElementById('sliderDots2');
  const cards    = document.querySelectorAll('#sliderTrack2 .slider-card');

  if (!track || cards.length === 0) return;

  const visibleCount = () => window.innerWidth <= 640 ? 1 : 2;
  let current = 0;

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
    document.querySelectorAll('#sliderDots2 .slider-dot').forEach((d, i) => {
      d.classList.toggle('active', i === current);
    });
  }

  function goTo(index) {
    const max = totalSteps() - 1;
    current = Math.max(0, Math.min(index, max));
    const cardWidth = cards[0].offsetWidth + 16;
    track.scrollLeft = current * cardWidth;
    arrowL.disabled = current === 0;
    arrowR.disabled = current >= max;
    updateDots();
  }

  arrowL.addEventListener('click', () => goTo(current - 1));
  arrowR.addEventListener('click', () => goTo(current + 1));

  buildDots();
  goTo(0);

  window.addEventListener('resize', () => { buildDots(); goTo(0); });

  /* Open modal on card click */
  cards.forEach(card => {
    card.addEventListener('click', () => {
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