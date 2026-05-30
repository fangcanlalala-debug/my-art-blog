/**
 * 导航系统
 * 处理导航栏滚动效果和移动端菜单
 */

class NavigationController {
  constructor() {
    this.navbar = null;
    this.menuToggle = null;
    this.menu = null;
    this.lastScrollY = 0;
    this.isMenuOpen = false;
    
    this.init();
  }

  init() {
    this.navbar = document.querySelector('.navbar');
    this.menuToggle = document.querySelector('.navbar-toggle');
    this.menu = document.querySelector('.navbar-menu');

    if (!this.navbar) {
      console.warn('Navbar not found');
      return;
    }

    this.bindEvents();
    this.handleScroll();
  }

  bindEvents() {
    // 滚动事件
    window.addEventListener('scroll', () => {
      this.handleScroll();
    });

    // 移动端菜单切换
    if (this.menuToggle && this.menu) {
      this.menuToggle.addEventListener('click', () => {
        this.toggleMenu();
      });

      // 点击菜单项关闭菜单
      this.menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          if (this.isMenuOpen) {
            this.closeMenu();
          }
        });
      });

      // ESC 键关闭菜单
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.isMenuOpen) {
          this.closeMenu();
        }
      });

      // 点击菜单外部关闭
      document.addEventListener('click', (e) => {
        if (this.isMenuOpen && 
            !this.menu.contains(e.target) && 
            !this.menuToggle.contains(e.target)) {
          this.closeMenu();
        }
      });
    }

    // 平滑滚动到锚点
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (href !== '#') {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            this.smoothScrollTo(target);
          }
        }
      });
    });
  }

  handleScroll() {
    const scrollY = window.scrollY;

    // 添加/移除滚动类
    if (scrollY > 100) {
      this.navbar.classList.add('scrolled');
    } else {
      this.navbar.classList.remove('scrolled');
    }

    // 隐藏/显示导航栏
    if (scrollY > this.lastScrollY && scrollY > 200) {
      this.navbar.style.transform = 'translateY(-100%)';
    } else {
      this.navbar.style.transform = 'translateY(0)';
    }

    this.lastScrollY = scrollY;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    
    if (this.isMenuOpen) {
      this.openMenu();
    } else {
      this.closeMenu();
    }
  }

  openMenu() {
    this.menu.classList.add('active');
    this.menuToggle.classList.add('active');
    this.menuToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  closeMenu() {
    this.menu.classList.remove('active');
    this.menuToggle.classList.remove('active');
    this.menuToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    this.isMenuOpen = false;
  }

  smoothScrollTo(target) {
    const headerOffset = 80;
    const elementPosition = target.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }

  // 高亮当前页面导航项
  highlightCurrentPage() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.navbar-item a');

    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      
      if (currentPath.endsWith(href) || 
          (currentPath === '/' && href === 'index.html') ||
          (currentPath === href)) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      }
    });
  }
}

// 导出
if (typeof module !== 'undefined' && module.exports) {
  module.exports = NavigationController;
}
