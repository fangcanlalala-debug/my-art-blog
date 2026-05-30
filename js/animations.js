/**
 * 动画控制器
 * 管理入场动画、交互动画和过渡效果
 */

class AnimationController {
  constructor() {
    this.animations = new Map();
    this.init();
  }

  init() {
    this.setupScrollAnimations();
    this.setupHoverAnimations();
    this.setupPageTransitions();
  }

  // 滚动动画
  setupScrollAnimations() {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          
          // 触发动画
          const animationType = entry.target.dataset.animation;
          if (animationType) {
            this.triggerAnimation(entry.target, animationType);
          }
        }
      });
    }, observerOptions);

    // 观察所有需要动画的元素
    document.querySelectorAll('.scroll-animate').forEach(el => {
      observer.observe(el);
    });
  }

  // 悬停动画
  setupHoverAnimations() {
    // 卡片悬停效果
    document.querySelectorAll('.card').forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) rotateX(5deg)';
        card.style.boxShadow = '0 20px 40px rgba(212, 165, 116, 0.2)';
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.boxShadow = '';
      });
    });

    // 按钮悬停效果
    document.querySelectorAll('.btn').forEach(btn => {
      btn.addEventListener('mouseenter', () => {
        this.animateButtonHover(btn, true);
      });

      btn.addEventListener('mouseleave', () => {
        this.animateButtonHover(btn, false);
      });
    });

    // 链接悬停效果
    document.querySelectorAll('a').forEach(link => {
      link.addEventListener('mouseenter', () => {
        link.style.color = '#7dd3c0';
      });

      link.addEventListener('mouseleave', () => {
        link.style.color = '';
      });
    });
  }

  animateButtonHover(btn, isHover) {
    if (isHover) {
      btn.style.transform = 'translateY(-2px)';
      btn.style.boxShadow = '0 10px 20px rgba(212, 165, 116, 0.3)';
    } else {
      btn.style.transform = '';
      btn.style.boxShadow = '';
    }
  }

  // 页面过渡
  setupPageTransitions() {
    document.querySelectorAll('a').forEach(link => {
      if (link.hostname === window.location.hostname) {
        link.addEventListener('click', (e) => {
          const href = link.getAttribute('href');
          if (href && !href.startsWith('#') && !href.startsWith('mailto:')) {
            e.preventDefault();
            
            // 添加淡出效果
            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 0.3s ease';

            setTimeout(() => {
              window.location.href = href;
            }, 300);
          }
        });
      }
    });

    // 页面加载时淡入
    window.addEventListener('load', () => {
      setTimeout(() => {
        document.body.style.opacity = '1';
      }, 100);
    });
  }

  // 触发特定动画
  triggerAnimation(element, type) {
    switch(type) {
      case 'fadeInUp':
        this.fadeInUp(element);
        break;
      case 'fadeInLeft':
        this.fadeInLeft(element);
        break;
      case 'fadeInRight':
        this.fadeInRight(element);
        break;
      case 'scaleIn':
        this.scaleIn(element);
        break;
      default:
        break;
    }
  }

  // 动画方法
  fadeInUp(element) {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    
    requestAnimationFrame(() => {
      element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    });
  }

  fadeInLeft(element) {
    element.style.opacity = '0';
    element.style.transform = 'translateX(-30px)';
    
    requestAnimationFrame(() => {
      element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      element.style.opacity = '1';
      element.style.transform = 'translateX(0)';
    });
  }

  fadeInRight(element) {
    element.style.opacity = '0';
    element.style.transform = 'translateX(30px)';
    
    requestAnimationFrame(() => {
      element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      element.style.opacity = '1';
      element.style.transform = 'translateX(0)';
    });
  }

  scaleIn(element) {
    element.style.opacity = '0';
    element.style.transform = 'scale(0.8)';
    
    requestAnimationFrame(() => {
      element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      element.style.opacity = '1';
      element.style.transform = 'scale(1)';
    });
  }

  // 打字机效果
  typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';

    function type() {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    }

    type();
  }

  // 数字递增动画
  animateNumber(element, target, duration = 2000) {
    const start = 0;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const current = Math.floor(progress * (target - start) + start);
      element.textContent = current;

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }
}

// 导出
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AnimationController;
}
