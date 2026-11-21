// 首页：在大标题下方插入「头像 + 简介」卡片
var AVATAR = '/images/avatar.jpg';
var TAGLINE = '玄灯绯';

(function () {
  function build() {
    var path = location.pathname;
    if (path !== '/' && path !== '/index.html') return;
    if (document.querySelector('.profile-hero')) return;

    var banner = document.querySelector('.banner');
    if (!banner) return;

    var meta = document.querySelector('meta[name="description"]');
    var intro = meta ? (meta.getAttribute('content') || '') : '';

    var box = document.createElement('div');
    box.className = 'profile-hero';

    var img = document.createElement('img');
    img.src = AVATAR;
    img.alt = 'avatar';
    box.appendChild(img);

    if (TAGLINE) {
      var tag = document.createElement('p');
      tag.className = 'tagline';
      tag.textContent = TAGLINE;
      box.appendChild(tag);
    }

    if (intro) {
      var p = document.createElement('p');
      p.className = 'bio';
      p.textContent = intro;
      box.appendChild(p);
    }

    var links = document.createElement('p');
    links.className = 'links';
    var gh = document.createElement('a');
    gh.href = 'https://github.com/06Hazel';
    gh.target = '_blank';
    gh.rel = 'noopener';
    gh.textContent = 'GitHub';
    links.appendChild(gh);
    box.appendChild(links);

    var board = document.querySelector('#board');
    var container = board ? board.querySelector('.container') : null;
    if (container) {
      container.insertBefore(box, container.firstChild);
    } else {
      banner.parentNode.insertBefore(box, banner.nextSibling);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', build);
  } else {
    build();
  }
})();
