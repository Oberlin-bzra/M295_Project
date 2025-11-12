declare global {
  interface Window { __apex_darkmode_initialized?: boolean; }
}

if (!window.__apex_darkmode_initialized) {
  window.__apex_darkmode_initialized = true;

  function qs<T extends HTMLElement = HTMLElement>(sel: string): T | null {
    return document.querySelector(sel) as T | null;
  }

  const darkModeBtn = qs<HTMLButtonElement>('#darkmode-btn');
  const bodyEl = document.body;

  const saved = (() => {
    try { return localStorage.getItem('theme'); } catch { return null; }
  })();

  const prefersDark = typeof window !== 'undefined' && !!window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

  const applyTheme = (theme: 'dark' | 'light') => {
    if (theme === 'dark') {
      bodyEl.classList.add('dark-mode');
      if (darkModeBtn) darkModeBtn.textContent = '🌞';
    } else {
      bodyEl.classList.remove('dark-mode');
      if (darkModeBtn) darkModeBtn.textContent = '🌙';
    }
  };

  if (saved === 'dark') applyTheme('dark');
  else if (saved === 'light') applyTheme('light');
  else applyTheme(prefersDark ? 'dark' : 'light');

  if (darkModeBtn) {
    darkModeBtn.addEventListener('click', () => {
      const isDark = bodyEl.classList.toggle('dark-mode');
      if (isDark) {
        darkModeBtn.textContent = '🌞';
        try { localStorage.setItem('theme', 'dark'); } catch {}
      } else {
        darkModeBtn.textContent = '🌙';
        try { localStorage.setItem('theme', 'light'); } catch {}
      }
    });
  }

  if (window.matchMedia) {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onPrefChange = (e: MediaQueryListEvent) => {
      try {
        const currentSaved = localStorage.getItem('theme');
        if (currentSaved === null) applyTheme(e.matches ? 'dark' : 'light');
      } catch {

       }
    };
    if (mq.addEventListener) mq.addEventListener('change', onPrefChange);
    else if ((mq as any).addListener) (mq as any).addListener(onPrefChange);
  }

  const setHeaderPadding = () => {
    const header = qs('header');
    if (!header) return;
    const h = Math.ceil(header.getBoundingClientRect().height || 72);
    document.documentElement.style.setProperty('--header-height', `${h}px`);
  };
  setHeaderPadding();
  window.addEventListener('resize', setHeaderPadding);

  const injected = qs('#__apex_darkmode_styles');
  if (!injected) {
    const style = document.createElement('style');
    style.id = '__apex_darkmode_styles';
    style.textContent = `
      body.dark-mode { background: #111; color: #f8f9fa; }
      body.dark-mode header { background: #222; color: #f8f9fa; }
      body.dark-mode footer { background: #222; color: #f8f9fa; }
      body.dark-mode #darkmode-btn { background: #ddd; color: #111; }
      body.dark-mode a, body.dark-mode p, body.dark-mode label { color: #f8f9fa !important; }
    `;
    document.head.appendChild(style);
  }
}
export {}; 
