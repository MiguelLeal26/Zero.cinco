/* ==========================================================================
   ZERO.CINCO CREATIVE STUDIO - PORTFOLIO & GALLERY MODULE (CLEAN IMAGE VIEW)
   ========================================================================== */

const portfolioData = [
  {
    id: 1,
    title: "Casamento Contemporâneo • Mariana & Lucas",
    category: "weddings",
    categoryName: "Casamento & Storymaker",
    image: "assets/images/wedding.jpg",
    client: "Mariana & Lucas",
    desc: "Cobertura cinematográfica e Storymaker em tempo real. Os noivos e convidados puderam reviver e repostar os momentos mais emocionantes da cerimônia e festa."
  },
  {
    id: 2,
    title: "Ensaio Pré-Wedding Sunset • Luiza & Gabriel",
    category: "weddings",
    categoryName: "Ensaio Pré-Wedding",
    image: "assets/images/prewedding.jpg",
    client: "Luiza & Gabriel",
    desc: "Ensaio de casal autoral ao entardecer com luz dourada, clima intimista e direção leve e espontânea para o vídeo Save the Date e fotos do convite."
  },
  {
    id: 3,
    title: "15 Anos Neon & Gold • Debutante Bia",
    category: "social_events",
    categoryName: "15 Anos & Formaturas",
    image: "assets/images/debutante.jpg",
    client: "Família Medeiros",
    desc: "Energia pura na pista de dança! Cobertura com drops ao vivo nos stories, reels sincronizado com o beat do DJ e fotos espontâneas cheias de emoção."
  },
  {
    id: 4,
    title: "Inauguração Grand Opening • Aurora Boutique & Café",
    category: "commercial_openings",
    categoryName: "Inauguração de Lojas & Comércios",
    image: "assets/images/inauguration.jpg",
    client: "Aurora Group",
    desc: "Produção visual completa para o corte de fita, bastidores da preparação, convidados vips e reels dinâmico para anúncios locais."
  },
  {
    id: 5,
    title: "Chá Revelação Emocionante • Céu Azul",
    category: "celebrations",
    categoryName: "Chá Revelação & Família",
    image: "assets/images/reveal.jpg",
    client: "Camila & Rafael",
    desc: "Registro cinematográfico ao pôr do sol com fumaça colorida e captando a reação genuína de toda a família."
  },
  {
    id: 6,
    title: "Editorial Fashion Noir & Crimson",
    category: "commercial_openings",
    categoryName: "Fotografia Editorial / Moda",
    image: "assets/images/editorial.jpg",
    client: "Moda Streetwear SP",
    desc: "Direção de arte, iluminação e fotografia editorial com atmosfera contemporânea em tons de vermelho neon e sombras profundas."
  },
  {
    id: 7,
    title: "Vibrance Festival Live Experience",
    category: "social_events",
    categoryName: "Storymaker de Grandes Eventos",
    image: "assets/images/storymaker.jpg",
    client: "Vibrance Festival",
    desc: "Cobertura completa em tempo real para os Stories e Reels, captando a energia do backstage, camarins e palco principal."
  },
  {
    id: 8,
    title: "Gastronomia Autoral & Mixologia",
    category: "commercial_openings",
    categoryName: "Fotografia Comercial / Gastro",
    image: "assets/images/commercial.jpg",
    client: "Velvet Cocktail Bar",
    desc: "Fotografia de alta velocidade capturando o movimento líquido e frescor de drinks autorais para campanhas de lançamento e cardápio digital."
  }
];

function initGallery() {
  const grid = document.getElementById('portfolioGrid');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const modal = document.getElementById('portfolioModal');
  const modalClose = document.getElementById('modalClose');

  if (!grid) return;

  function renderItems(filter = 'all') {
    grid.innerHTML = '';
    const filtered = filter === 'all' 
      ? portfolioData 
      : portfolioData.filter(item => item.category === filter);

    filtered.forEach(item => {
      const card = document.createElement('div');
      card.className = 'portfolio-item';
      card.innerHTML = `
        <img src="${item.image}" alt="${item.title}" class="portfolio-img" loading="lazy">
        <div class="portfolio-hover-indicator">
          <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"/></svg>
        </div>
      `;

      card.addEventListener('click', () => openModal(item));
      grid.appendChild(card);
    });
  }

  // Filter Buttons Click
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filterValue = btn.getAttribute('data-filter');
      renderItems(filterValue);
    });
  });

  // Modal Handler
  function openModal(item) {
    if (!modal) return;
    document.getElementById('modalImage').src = item.image;
    document.getElementById('modalCategory').textContent = item.categoryName;
    document.getElementById('modalTitle').textContent = item.title;
    document.getElementById('modalClient').textContent = item.client;
    document.getElementById('modalDesc').textContent = item.desc;

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('open');
    document.body.style.overflow = 'auto';
  }

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  // Initial Render
  renderItems('all');
}

document.addEventListener('DOMContentLoaded', initGallery);
