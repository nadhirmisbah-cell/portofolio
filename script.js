// script.js — final production-ready version
(function () {
  // ===== Footer year =====
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // ===== Mobile menu toggle (accessible) =====
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('active');
    });

    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ===== Contact form (Netlify) =====
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  const whatsappBtn = document.getElementById('whatsappBtn');
  const mailtoBtn = document.getElementById('mailtoBtn');

  function setStatus(message, isError = false) {
    if (!status) return;
    status.textContent = message;
    status.className = isError
      ? 'form-status error'
      : 'form-status success';
  }

  function encodeFormData(formElement) {
    return new URLSearchParams(new FormData(formElement)).toString();
  }

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      setStatus('Mengirim...');

      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) submitBtn.disabled = true;

      try {
        const response = await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: encodeFormData(form)
        });

        if (response.ok) {
          setStatus('Terima kasih — pesan terkirim.');
          form.reset();
        } else {
          setStatus('Gagal mengirim lewat server. Coba via Email.', true);
        }
      } catch {
        setStatus('Gagal mengirim: masalah jaringan.', true);
      } finally {
        if (submitBtn) submitBtn.disabled = false;
      }
    });
  }

  // ===== Mailto fallback =====
  if (mailtoBtn) {
    mailtoBtn.addEventListener('click', () => {
      const name = document.getElementById('name')?.value || '—';
      const email = document.getElementById('email')?.value || '—';
      const whatsapp = document.getElementById('whatsapp')?.value || '—';
      const message = document.getElementById('message')?.value || '—';

      const body = encodeURIComponent(
        `Nama: ${name}\nWhatsApp: ${whatsapp}\nEmail: ${email}\n\nPesan:\n${message}`
      );

      window.location.href =
        `mailto:nadhirmisbah@gmail.com?subject=Kontak dari ${encodeURIComponent(name)}&body=${body}`;
    });
  }

  // ===== WhatsApp fallback =====
  if (whatsappBtn) {
    whatsappBtn.addEventListener('click', () => {
      const name = document.getElementById('name')?.value || '—';
      const email = document.getElementById('email')?.value || '—';
      const whatsapp = document.getElementById('whatsapp')?.value || '—';
      const message = document.getElementById('message')?.value || '—';

      const targetNumber = '6281318937891';
      const text = encodeURIComponent(
        `Nama: ${name}\nWhatsApp: ${whatsapp}\nEmail: ${email}\n\nPesan:\n${message}`
      );

      window.open(`https://wa.me/${targetNumber}?text=${text}`, '_blank');
    });
  }
})();
