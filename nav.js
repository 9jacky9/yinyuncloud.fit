/**
 * 隐云机场 (yinyuncloud.fit) 移动端响应式导航交互脚本
 * 轻量原生无依赖，支持汉堡菜单展开/收起、点击遮罩或外部自动闭合、跳转锚点闭合
 */
document.addEventListener('DOMContentLoaded', function () {
  var header = document.querySelector('.mach-header');
  if (!header) return;

  var container = header.querySelector('.nav-container');
  var menu = header.querySelector('.nav-menu');
  if (!container || !menu) return;

  var toggle = header.querySelector('.nav-toggle');
  if (!toggle) {
    toggle = document.createElement('button');
    toggle.className = 'nav-toggle';
    toggle.setAttribute('aria-label', '切换导航菜单');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.innerHTML = '<span class="bar"></span><span class="bar"></span><span class="bar"></span>';

    var cta = container.querySelector('.btn-header');
    if (cta) {
      var actions = container.querySelector('.header-actions');
      if (!actions) {
        actions = document.createElement('div');
        actions.className = 'header-actions';
        cta.parentNode.insertBefore(actions, cta);
        actions.appendChild(cta);
      }
      actions.appendChild(toggle);
    } else {
      container.appendChild(toggle);
    }
  }

  function openMenu() {
    menu.classList.add('is-open');
    toggle.classList.add('is-active');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    menu.classList.remove('is-open');
    toggle.classList.remove('is-active');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  toggle.addEventListener('click', function (e) {
    e.stopPropagation();
    if (menu.classList.contains('is-open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  menu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      closeMenu();
    });
  });

  document.addEventListener('click', function (e) {
    if (!menu.contains(e.target) && !toggle.contains(e.target)) {
      closeMenu();
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menu.classList.contains('is-open')) {
      closeMenu();
    }
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth > 992 && menu.classList.contains('is-open')) {
      closeMenu();
    }
  });
});
