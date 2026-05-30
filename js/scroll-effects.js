/**
 * 滚动效果控制器
 * 实现视差滚动、元素渐入和滚动触发事件
 */

class ScrollEffectsController {
  constructor() {
    this.scrollY = 0;
    this.ticking = false;
    this.elements = [];
    
    this.init();
  }

  init() {
    this.setupParallaxElements();
    this.setupIntersectionObserver();
    this.setupScrollListener();
  }

  // 设置视差元素
  setupParallaxElements() {
    this.elements = Array.from(document.querySelectorAll('[data-parallax]'));
    
    this.elements.forEach(el => {
      const speed = parseFloat(el.dataset.parallax) || 0.5;
      el.dataset.speed = speed;
    });
  }

  // Intersection Observer 设置
  setupIntersectionObserver() {
    const options = {
      root: null,
      rootMargin: '0px 0px -100px 0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          
          // 触发回调
          const callback = entry.target.dataset.callback;
          if (callback && typeof window[callback] === 'function') {
            window[callback](entry.target);
          }
        }
      });
    }, options);

    // 观察所有带 scroll-animate 类的元素
    document.querySelectorAll('.scroll-animate').forEach(el => {
      observer.observe(el);
    });

    // 观察所有带 animate-on-scroll 类的元素
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      observer.observe(el);
    });
  }

  // 滚动监听
  setupScrollListener() {
    window.addEventListener('scroll', () => {
      this.scrollY = window.scrollY;
      
      if (!this.ticking) {
        window.requestAnimationFrame(() => {
          this.update();
          this.ticking = false;
        });
        this.ticking = true;
      }
    });
  }

  // 更新视差效果
  update() {
    this.updateParallax();
    this.updateScrollProgress();
  }

  updateParallax() {
    this.elements.forEach(el => {
      const speed = parseFloat(el.dataset.speed);
      const rect = el.getBoundingClientRect();
      const scrolled = window.scrollY;
      
      // 计算视差偏移
      const yPos = -(scrolled * speed);
      
      // 只在视口内时更新
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.style.transform = `translateY(${yPos}px)`;
      }
    });
  }

  updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;

    // 更新进度条
    const progressBar = document.querySelector('.scroll-progress-bar');
    if (progressBar) {
      progressBar.style.width = `${progress}%`;
    }

    // 触发滚动事件
    this.emitScrollEvents(progress);
  }

  emitScrollEvents(progress) {
    // 25% 进度
    if (progress >= 25 && !this.emitted25) {
      this.emitted25 = true;
      window.dispatchEvent(new CustomEvent('scrollProgress25'));
    }

    // 50% 进度
    if (progress >= 50 && !this.emitted50) {
      this.emitted50 = true;
      window.dispatchEvent(new CustomEvent('scrollProgress50'));
    }

    // 75% 进度
    if (progress >= 75 && !this.emitted75) {
      this.emitted75 = true;
      window.dispatchEvent(new CustomEvent('scrollProgress75'));
    }

    // 100% 进度
    if (progress >= 95 && !this.emitted95) {
      this.emitted95 = true;
      window.dispatchEvent(new CustomEvent('scrollProgress100'));
    }
  }

  // 滚动到元素
  scrollToElement(selector) {
    const element = document.querySelector(selector);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  }

  // 滚动到顶部
  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  // 滚动到底部
  scrollToBottom() {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    });
  }
}

// 导出
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ScrollEffectsController;
}
