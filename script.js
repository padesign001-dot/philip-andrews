(function () {
  const catLabels = {
    product: 'Digital Product',
    identity: 'Brand & Identity',
    web: 'Web',
    print: 'Print & Campaign'
  };

  const grid = document.getElementById('grid');
  const filterBtns = document.querySelectorAll('.filter-btn');

  function renderGrid() {
    grid.innerHTML = '';
    PROJECTS.forEach((p, idx) => {
      const card = document.createElement('div');
      card.className = 'card';
      card.dataset.cat = p.cat;
      card.dataset.index = idx;

      const imgWrap = document.createElement('div');
      imgWrap.className = 'card-img-wrap';
      const img = document.createElement('img');
      img.src = p.images[0].src;
      img.alt = p.name;
      img.loading = 'lazy';
      imgWrap.appendChild(img);

      if (p.images.length > 1) {
        const count = document.createElement('span');
        count.className = 'card-count';
        count.textContent = p.images.length + ' images';
        imgWrap.appendChild(count);
      }

      const meta = document.createElement('div');
      meta.className = 'card-meta';
      meta.innerHTML = `<span class="card-name">${p.name}</span><span class="card-cat">${catLabels[p.cat] || ''}</span>`;

      card.appendChild(imgWrap);
      card.appendChild(meta);
      card.addEventListener('click', () => openLightbox(idx, 0));
      grid.appendChild(card);
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      const f = btn.dataset.filter;
      document.querySelectorAll('.card').forEach(card => {
        card.classList.toggle('hidden', f !== 'all' && card.dataset.cat !== f);
      });
    });
  });

  // Lightbox
  const lb = document.getElementById('lightbox');
  const lbImg = document.getElementById('lbImg');
  const lbTitle = document.getElementById('lbTitle');
  const lbDesc = document.getElementById('lbDesc');
  const lbCount = document.getElementById('lbCount');
  let currentProject = 0, currentImage = 0;

  function openLightbox(projIdx, imgIdx) {
    currentProject = projIdx;
    currentImage = imgIdx;
    updateLightbox();
    lb.classList.add('is-open');
    lb.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function updateLightbox() {
    const p = PROJECTS[currentProject];
    const img = p.images[currentImage];
    lbImg.src = img.src;
    lbImg.alt = p.name;
    lbTitle.textContent = p.name;
    lbDesc.textContent = p.desc || '';
    lbCount.textContent = p.images.length > 1 ? (currentImage + 1) + ' / ' + p.images.length : '';
    document.getElementById('lbPrev').style.visibility = p.images.length > 1 ? 'visible' : 'hidden';
    document.getElementById('lbNext').style.visibility = p.images.length > 1 ? 'visible' : 'hidden';
  }

  function closeLightbox() {
    lb.classList.remove('is-open');
    lb.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function nextImage() {
    const p = PROJECTS[currentProject];
    currentImage = (currentImage + 1) % p.images.length;
    updateLightbox();
  }
  function prevImage() {
    const p = PROJECTS[currentProject];
    currentImage = (currentImage - 1 + p.images.length) % p.images.length;
    updateLightbox();
  }

  document.getElementById('lbClose').addEventListener('click', closeLightbox);
  document.getElementById('lbNext').addEventListener('click', nextImage);
  document.getElementById('lbPrev').addEventListener('click', prevImage);
  lb.addEventListener('click', (e) => { if (e.target === lb) closeLightbox(); });

  document.addEventListener('keydown', (e) => {
    if (!lb.classList.contains('is-open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
  });

  renderGrid();
})();
