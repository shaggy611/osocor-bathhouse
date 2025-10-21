document.addEventListener('DOMContentLoaded', function () {
  const menuBtn = document.querySelector('.menu-btn');
  const sideMenu = document.querySelector('.side-menu');
  const closeBtn = document.querySelector('.side-menu-close');
  const menuBackdrop = document.querySelector('.menu-backdrop');

  menuBtn.addEventListener('click', () => {
    sideMenu.classList.add('active');
    menuBackdrop.classList.add('active');
    document.body.classList.add('menu-open');
  });

  closeBtn.addEventListener('click', () => {
    sideMenu.classList.remove('active');
    menuBackdrop.classList.remove('active');
    document.body.classList.remove('menu-open');
  });


  // Call back form
  const callbackButtons = document.querySelectorAll('.call-back-btn');
  const callbackForm = document.querySelector('.callback-form');
  const callbackClose = document.querySelector('.callback-close');

  if (callbackButtons && callbackForm && callbackClose) {
    callbackButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        sideMenu.classList.remove('active');
        menuBackdrop.classList.remove('active');
        document.body.classList.remove('menu-open');
        document.querySelectorAll('.popup-overlay').forEach(popup => popup.classList.remove('active'));
        callbackForm.classList.add('active');
        document.body.style.overflow = 'hidden';
        menuBackdrop.classList.add('active');
      });
    });

    callbackClose.addEventListener('click', () => {
      callbackForm.classList.remove('active');
      menuBackdrop.classList.remove('active');
      document.body.style.overflow = '';
    });

    callbackForm.addEventListener('click', (e) => {
      if (e.target === callbackForm) {
        callbackForm.classList.remove('active');
        menuBackdrop.classList.remove('active');
        document.body.style.overflow = '';
      }
    });

    // Form submission
    const form = document.querySelector('.callback-form-content');
    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();

        try {

          await fetch('/send.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: document.querySelector('#name').value,
              email: document.querySelector('#email').value,
              phone: document.querySelector('#phone').value,
              communication: document.querySelector('input[name="contact"]:checked')?.value || ''
            })
          });

          alert('✅ Відправлено!');
          document.querySelector('.menu-backdrop').classList.remove('active');
          document.querySelectorAll('.callback-form-content input').forEach(input => input.value = '');
        } catch (error) {
          console.log('Error:', error);
          alert('❌ Помилка відправлення. Спробуйте ще раз.');
          document.querySelector('.menu-backdrop').classList.remove('active');
        }


        callbackForm.classList.remove('active');
        document.body.style.overflow = '';
      });
    }
  }

  menuBackdrop.addEventListener('click', () => {
    sideMenu.classList.remove('active');
    menuBackdrop.classList.remove('active');
    document.body.classList.remove('menu-open');
    callbackForm.classList.remove('active');
  });


  // Popups for program cards
  const popupMap = {
    'details-program1': 'program1Popup',
    'details-program2': 'program2Popup',
    'details-osocorChurn': 'osocorChurnPopup',
    'details-mediumWell': 'mediumWellPopup',
    'details-wellDone': 'wellDonePopup',
    'details-doubleSizzle': 'doubleSizzlePopup',
    'details-perfectlySteamed': 'perfectlySteamedPopup',
    'details-womenSpaRetreat': 'womenSpaRetreatPopup',
    'details-hamam-relax': 'hamamRelaxPopup',
    'details-hamam-premium': 'hamamPremiumPopup',
    'details-hamam-light': 'hamamLightPopup'
  };

  document.querySelectorAll('.btn.details').forEach(btn => {
    btn.addEventListener('click', function (e) {
      const id = btn.id;
      const popupId = popupMap[id];
      if (popupId) {
        document.getElementById(popupId).classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  document.querySelectorAll('.popup-close').forEach(btn => {
    btn.addEventListener('click', function (e) {
      btn.closest('.popup-overlay').classList.remove('active');
      document.body.style.overflow = '';
    });
  });


  document.querySelectorAll('.popup-overlay').forEach(overlay => {
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });


  const loadMoreBtn = document.querySelector('.programs-load-more-btn');
  const expandable = document.querySelector('.expandable-cards');
  if (loadMoreBtn && expandable) {
    loadMoreBtn.addEventListener('click', function () {
      expandable.classList.add('expanded');
      loadMoreBtn.style.display = 'none';
    });
  }


  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      sideMenu.classList.remove('active');
      menuBackdrop.classList.remove('active');
      document.body.classList.remove('menu-open');
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  }
  );

});

// Rituals Swiper

const ritualsSwiper = new Swiper('.rituals-swiper', {
  slidesPerView: 1.15,
  spaceBetween: 32,
  centeredSlides: false,
  grabCursor: true,
  loop: false,

  breakpoints: {
    1600: { slidesPerView: 1.75, spaceBetween: 48 },
    1400: { slidesPerView: 1.75, spaceBetween: 38 },
    1300: { slidesPerView: 1.65, spaceBetween: 38 },
    1200: { slidesPerView: 1.45, spaceBetween: 38 },
    1100: { slidesPerView: 1.35, spaceBetween: 38 },
    900: { slidesPerView: 1.05, spaceBetween: 10 },
    800: { slidesPerView: 1, spaceBetween: 10 },
    600: { slidesPerView: 1, spaceBetween: 24 },
    0: { slidesPerView: 1, spaceBetween: 16 }
  },

  on: {
    slideChange(swiper) {
      const current = swiper.realIndex + 1;
      const total = swiper.slides.length;
      document.querySelector('.rituals-current').textContent = current;
      document.querySelector('.rituals-current-total').textContent = `/${total}`;
    }
  }
});

document.addEventListener('DOMContentLoaded', function () {
  const total = document.querySelectorAll('.rituals-swiper .swiper-slide').length;
  document.querySelector('.rituals-current-total').textContent = '/' + total;
});

// Hamam Feature Swiper
const hamamSwiper = new Swiper('.feature-hamam-swiper', {
  loop: false,
  direction: 'vertical',
  effect: 'slide',
  slidesPerView: 1.1,
  spaceBetween: 22,
  freeMode: true,
  autoplay: {
    delay: 3500,
    disableOnInteraction: false,
  },
  breakpoints: {
    320: { slidesPerView: 1, spaceBetween: 16 },
    768: { slidesPerView: 1.05, spaceBetween: 20 },
    1024: { slidesPerView: 1.1, spaceBetween: 22 },
  },
  on: {
    slideChange: function () {
      document.querySelector('.feature-hamam-current').textContent = this.realIndex + 1;
    },
    init: function () {
      document.querySelector('.feature-hamam-total').textContent = this.slides.length;
    }
  }
});

// Coords Osocor Residence
const lat = 50.35284278290874;
const lng = 30.636442753211586;

const map = L.map('osocor-map', {
  center: [lat, lng],
  zoom: 17,
  zoomControl: false
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Marker
L.marker([lat, lng]).addTo(map).bindPopup('Osocor Residence').openPopup();

const satellite = L.tileLayer(
  'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
  {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, NASA, USGS',
    maxZoom: 19
  }
);

satellite.addTo(map);

const CustomZoomControl = L.Control.extend({
  options: { position: 'topright' },

  onAdd: function (map) {
    const container = L.DomUtil.create('div');

    const zoomIn = L.DomUtil.create('div', 'custom-zoom', container);
    zoomIn.innerHTML = '+';
    zoomIn.onclick = () => map.zoomIn();

    const zoomOut = L.DomUtil.create('div', 'custom-zoom', container);
    zoomOut.innerHTML = '-';
    zoomOut.onclick = () => map.zoomOut();

    const fullScreen = L.DomUtil.create('div', 'custom-full', container);
    fullScreen.innerHTML = '⛶';
    fullScreen.onclick = () => {
      if (!document.fullscreenElement) {
        document.getElementById('osocor-map').requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    };

    L.DomEvent.disableClickPropagation(container);
    L.DomEvent.disableScrollPropagation(container);

    return container;
  }
});

map.addControl(new CustomZoomControl());