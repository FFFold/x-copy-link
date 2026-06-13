// ==UserScript==
// @name         X.com 一键复制帖子链接
// @namespace    https://github.com/FFFold/x-copy-link
// @version      1.1
// @description  在首页推荐流等每条帖子的操作栏添加一键复制链接按钮，无需点进详情页
// @author       FFFold
// @homepageURL  https://github.com/FFFold/x-copy-link
// @updateURL    https://raw.githubusercontent.com/FFFold/x-copy-link/master/x-copy-link.user.js
// @downloadURL  https://raw.githubusercontent.com/FFFold/x-copy-link/master/x-copy-link.user.js
// @match        https://x.com/*
// @match        https://twitter.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=x.com
// @grant        GM_setClipboard
// @grant        GM_addStyle
// @license      MIT
// ==/UserScript==

(function () {
  'use strict';

  GM_addStyle(`
    .x-copy-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 34px;
      height: 34px;
      border: none;
      background: transparent;
      cursor: pointer;
      border-radius: 9999px;
      padding: 0;
      color: rgb(83, 100, 113);
      transition: all 0.15s;
      flex-shrink: 0;
    }
    .x-copy-btn:hover {
      background-color: rgba(29, 155, 240, 0.1);
      color: rgb(29, 155, 240);
    }
    .x-copy-btn svg {
      width: 18px;
      height: 18px;
    }
    .x-copy-toast {
      position: fixed;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%);
      background: rgb(29, 155, 240);
      color: #fff;
      padding: 8px 20px;
      border-radius: 9999px;
      font-size: 14px;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      z-index: 99999;
      pointer-events: none;
      animation: x-toast-in 0.2s ease-out;
    }
    @keyframes x-toast-in {
      from { opacity: 0; transform: translateX(-50%) translateY(8px); }
      to   { opacity: 1; transform: translateX(-50%) translateY(0); }
    }
  `);

  function showToast(msg) {
    const old = document.querySelector('.x-copy-toast');
    if (old) old.remove();
    const el = document.createElement('div');
    el.className = 'x-copy-toast';
    el.textContent = msg;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1800);
  }

  async function copy(text) {
    if (typeof GM_setClipboard !== 'undefined') {
      GM_setClipboard(text);
      return true;
    }
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.cssText = 'position:fixed;left:-9999px;top:0';
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand('copy');
      ta.remove();
      return ok;
    }
  }

  function getTweetUrl(article) {
    const link = article.querySelector('a[href*="/status/"]');
    if (!link) return null;
    try {
      const u = new URL(link.href);
      return u.origin + u.pathname;
    } catch {
      return null;
    }
  }

  function install(article) {
    if (article.hasAttribute('data-x-copy')) return;
    article.setAttribute('data-x-copy', '1');

    const url = getTweetUrl(article);
    if (!url) return;

    const group = article.querySelector('div[role="group"]');
    if (!group) return;

    const btn = document.createElement('div');
    btn.className = 'x-copy-btn';
    btn.setAttribute('role', 'button');
    btn.setAttribute('tabindex', '0');
    btn.setAttribute('aria-label', '复制帖子链接');
    btn.innerHTML =
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
        '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>' +
        '<path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>' +
      '</svg>';

    btn.addEventListener('click', async (e) => {
      e.stopPropagation();
      e.preventDefault();
      const ok = await copy(url);
      showToast(ok ? '链接已复制!' : '复制失败');
    });
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        btn.click();
      }
    });

    group.appendChild(btn);
  }

  function scan() {
    document.querySelectorAll('article[data-testid="tweet"]').forEach(install);
  }

  scan();
  new MutationObserver(scan).observe(document.body, { childList: true, subtree: true });
})();
