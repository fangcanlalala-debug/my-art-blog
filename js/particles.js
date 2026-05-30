/**
 * 粒子系统 - Canvas 粒子动画
 * 实现首页背景动态粒子效果
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

    // 边界检测
    if (this.x < 0 || this.x > this.canvas.width) {
      this.speedX *= -1;
    }
    if (this.y < 0 || this.y > this.canvas.height) {
      this.speedY *= -1;
    }

    // 透明度波动
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

class ParticleSystem {
  constructor(canvasId, particleCount = 80) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) {
      console.warn('Particle canvas not found');
      return;
    }

    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.particleCount = particleCount;
    this.animationId = null;
    this.mouse = { x: null, y: null };

    this.init();
    this.bindEvents();
    this.animate();
  }

  init() {
    this.resize();
    
    // 初始化粒子
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push(new Particle(this.canvas));
    }
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  bindEvents() {
    // 窗口大小改变
    window.addEventListener('resize', () => {
      this.resize();
    });

    // 鼠标移动
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });

    // 鼠标离开
    window.addEventListener('mouseleave', () => {
      this.mouse.x = null;
      this.mouse.y = null;
    });

    // 降低性能设备检测
    if (this.isLowPerformanceDevice()) {
      this.particleCount = 30;
      this.particles = this.particles.slice(0, this.particleCount);
    }
  }

  isLowPerformanceDevice() {
    return navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;
  }

  updateParticles() {
    this.particles.forEach(particle => {
      particle.update();

      // 鼠标交互
      if (this.mouse.x !== null && this.mouse.y !== null) {
        const dx = particle.x - this.mouse.x;
        const dy = particle.y - this.mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 150) {
          const force = (150 - distance) / 150;
          particle.x += dx * force * 0.02;
          particle.y += dy * force * 0.02;
        }
      }
    });
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
    // 清空画布
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // 更新和绘制粒子
    this.updateParticles();
    this.drawConnections();
    this.particles.forEach(particle => particle.draw(this.ctx));

    // 递归动画循环
    this.animationId = requestAnimationFrame(() => this.animate());
  }

  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }
}

// 导出类
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ParticleSystem, Particle };
}
