/**
 * 主入口文件
 * 初始化所有模块和功能
 */

import { ParticleSystem } from './particles.js';
import { AnimationController } from './animations.js';
import { NavigationController } from './navigation.js';
import { ScrollEffectsController } from './scroll-effects.js';

class App {
  constructor() {
    this.particleSystem = null;
    this.animationController = null;
    this.navigationController = null;
    this.scrollEffectsController = null;
    
    this.init();
  }

  init() {
    document.addEventListener('DOMContentLoaded', () => {
      this.onDOMReady();
    });

    window.addEventListener('load', () => {
      this.onLoad();
    });
  }

  onDOMReady() {
    // 初始化粒子系统（仅在首页）
    this.initParticleSystem();
    
    // 初始化导航控制器
    this.navigationController = new NavigationController();
    
    // 初始化动画控制器
    this.animationController = new AnimationController();
    
    // 初始化滚动效果控制器
    this.scrollEffectsController = new ScrollEffectsController();
    
    // 设置页面过渡
    this.setupPageTransition();
    
    // 初始化懒加载
    this.initLazyLoading();
    
    console.log('App initialized');
  }

  onLoad() {
    // 页面完全加载后添加可见性
    document.body.classList.add('loaded');
    
    // 触发初始动画
    this.triggerInitialAnimations();
    
    // 移除加载状态
    setTimeout(() => {
      document.body.classList.remove('loading');
    }, 500);
  }

  initParticleSystem() {
    const canvas = document.getElementById('particles-canvas');
    if (canvas) {
      this.particleSystem = new ParticleSystem('particles-canvas', 80);
    }
  }

  setupPageTransition() {
    // 页面加载时淡入
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
      document.body.style.opacity = '1';
    }, 100);

    // 离开页面时淡出
    const links = document.querySelectorAll('a[href^="http"], a[href^="/"]');
    
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        
        // 排除外部链接、锚点和特殊协议
        if (href.startsWith('http') || 
            href.startsWith('mailto:') || 
            href.startsWith('#') ||
            href.startsWith('tel:')) {
          return;
        }

        e.preventDefault();
        
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.3s ease';
        
        setTimeout(() => {
          window.location.href = href;
        }, 300);
      });
    });
  }

  initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            img.classList.add('loaded');
            imageObserver.unobserve(img);
          }
        });
      });

      images.forEach(img => {
        img.classList.add('lazy');
        imageObserver.observe(img);
      });
    } else {
      // 回退方案
      images.forEach(img => {
        img.src = img.dataset.src;
      });
    }
  }

  triggerInitialAnimations() {
    // Hero 区域动画
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    
    if (heroTitle) {
      setTimeout(() => {
        heroTitle.style.opacity = '1';
        heroTitle.style.transform = 'translateY(0)';
      }, 200);
    }
    
    if (heroSubtitle) {
      setTimeout(() => {
        heroSubtitle.style.opacity = '1';
        heroSubtitle.style.transform = 'translateY(0)';
      }, 400);
    }

    // 导航项动画
    const navItems = document.querySelectorAll('.navbar-item');
    navItems.forEach((item, index) => {
      setTimeout(() => {
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
      }, 300 + (index * 100));
    });
  }

  // 公开方法供外部调用
  destroy() {
    if (this.particleSystem) {
      this.particleSystem.destroy();
    }
    
    if (this.scrollEffectsController) {
      window.removeEventListener('scroll', this.scrollEffectsController.handleScroll);
    }
  }
}

// 初始化应用
const app = new App();

// 导出应用实例
if (typeof module !== 'undefined' && module.exports) {
  module.exports = App;
}
