/**
 * 主脚本 - 合并所有功能
 */

// 全局对象
window.ArtBlog = {};

/**
 * 粒子系统
 */
class Particle {
  constructor(canvas) {
    this.canvas = canvas;
    this.reset();
  }

  reset() {
    this.x = Math.random() * this.canvas.width;
    this.y = Math.random() * this.canvas.height;
    this.size = Math.random() * 3 + 1;
    this.speedX = (Math.random() - 0.5) * 0.5;
    this.speedY = (Math.random() - 0.5) * 0.5;
    this.opacity = Math.random() * 0.5 + 0.2;
    this.color = this.getRandomColor();
  }

  getRandomColor() {
    const colors = ['#d4a574', '#7dd3c0', '#e8e6e3'];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0 || this.x > this.canvas.width) {
      this.speedX *= -1;
    }
    if (this.y < 0 || this.y > this.canvas.height) {
      this.speedY *= -1;
    }

    this.opacity += (Math.random() - 0.5) * 0.02;
    this.opacity = Math.max(0.1, Math.min(0.7, this.opacity));
  }

  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

window.ArtBlog.ParticleSystem = class {
  constructor(canvasId, particleCount = 80) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.particleCount = particleCount;
    this.mouse = { x: null, y: null };

    this.init();
    this.bindEvents();
    this.animate();
  }

  init() {
    this.resize();
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push(new Particle(this.canvas));
    }
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  bindEvents() {
    window.addEventListener('resize', () => this.resize());
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });
    window.addEventListener('mouseleave', () => {
      this.mouse.x = null;
      this.mouse.y = null;
    });
  }

  updateParticles() {
    this.particles.forEach(particle => particle.update());
  }

  drawConnections() {
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 120) {
          this.ctx.save();
          this.ctx.globalAlpha = (120 - distance) / 120 * 0.2;
          this.ctx.strokeStyle = '#d4a574';
          this.ctx.lineWidth = 0.5;
          this.ctx.beginPath();
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          this.ctx.stroke();
          this.ctx.restore();
        }
      }
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.updateParticles();
    this.drawConnections();
    this.particles.forEach(particle => particle.draw(this.ctx));
    requestAnimationFrame(() => this.animate());
  }
};

/**
 * 导航系统
 */
window.ArtBlog.Navigation = class {
  constructor() {
    this.navbar = document.querySelector('.navbar');
    this.menuToggle = document.querySelector('.navbar-toggle');
    this.menu = document.querySelector('.navbar-menu');
    this.lastScrollY = 0;
    this.isMenuOpen = false;

    if (!this.navbar) return;
    this.bindEvents();
    this.handleScroll();
  }

  bindEvents() {
    window.addEventListener('scroll', () => this.handleScroll());
    
    if (this.menuToggle && this.menu) {
      this.menuToggle.addEventListener('click', () => this.toggleMenu());
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (href !== '#') {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });
    });
  }

  handleScroll() {
    const scrollY = window.scrollY;
    if (scrollY > 100) {
      this.navbar.classList.add('scrolled');
    } else {
      this.navbar.classList.remove('scrolled');
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    if (this.menu && this.menuToggle) {
      if (this.isMenuOpen) {
        this.menu.classList.add('active');
        this.menuToggle.classList.add('active');
      } else {
        this.menu.classList.remove('active');
        this.menuToggle.classList.remove('active');
      }
    }
  }
};

/**
 * 滚动动画
 */
window.ArtBlog.ScrollAnimations = class {
  constructor() {
    this.init();
  }

  init() {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.scroll-animate').forEach(el => observer.observe(el));
    document.querySelectorAll('.timeline-item').forEach(el => observer.observe(el));
  }
};

/**
 * 初始化
 */
document.addEventListener('DOMContentLoaded', function() {
  // 初始化导航
  new window.ArtBlog.Navigation();
  
  // 初始化滚动动画
  new window.ArtBlog.ScrollAnimations();

  // 初始化粒子系统（仅在有 canvas 时）
  if (document.getElementById('particles-canvas')) {
    new window.ArtBlog.ParticleSystem('particles-canvas', 80);
  }

  // 页面加载动画
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '1';
  }, 100);

  // 作品集筛选功能
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const filter = this.dataset.filter;
      
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      portfolioItems.forEach(item => {
        const category = item.dataset.category;
        if (filter === 'all' || category === filter) {
          item.style.display = 'block';
          item.style.opacity = '1';
          item.style.transform = 'scale(1)';
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.8)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // 技能条动画
  const skillBars = document.querySelectorAll('.skill-progress');
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const progress = entry.target.dataset.progress;
        entry.target.style.transition = 'width 1.5s ease';
        entry.target.style.width = `${progress}%`;
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  skillBars.forEach(bar => skillObserver.observe(bar));
});
