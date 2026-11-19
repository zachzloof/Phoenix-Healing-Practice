// Visible cursor + click ripple for headless recordings (injected with addInitScript).
// Headless video has no mouse, so this draws one that follows real mouse events.
// Mode comes from window.__DEMO_CURSOR_MODE__: 'arrow' (desktop) or 'touch' (phone:
// a soft fingertip that fades in on approach and out after the tap).
;(() => {
  if (window.top !== window) return // top frame only
  const mode = window.__DEMO_CURSOR_MODE__ || 'arrow'

  const css = `
  #demo-cursor { position: fixed; left: 0; top: 0; z-index: 2147483647; pointer-events: none; will-change: transform; opacity: 0; transition: opacity .25s; }
  #demo-cursor.on { opacity: 1; }
  #demo-cursor.arrow svg { display: block; width: 30px; height: 30px; filter: drop-shadow(0 3px 5px rgb(0 0 0 / .55)); transform-origin: 3px 2px; transition: transform .12s; }
  #demo-cursor.arrow.down svg { transform: scale(.86); }
  #demo-cursor.touch { width: 44px; height: 44px; margin: -22px 0 0 -22px; border-radius: 50%; background: rgb(255 248 230 / .38); border: 2px solid rgb(255 248 230 / .9); box-shadow: 0 2px 10px rgb(0 0 0 / .45); transition: opacity .35s, scale .15s; }
  #demo-cursor.touch.down { scale: .82; background: rgb(255 248 230 / .6); }
  .demo-ripple { position: fixed; z-index: 2147483646; pointer-events: none; width: 16px; height: 16px; margin: -8px 0 0 -8px; border-radius: 50%; border: 3px solid #f8b54a; box-shadow: 0 0 0 2px rgb(23 17 14 / .55), 0 0 18px rgb(240 145 42 / .8); animation: demo-ripple .65s cubic-bezier(.2,.7,.3,1) forwards; }
  @keyframes demo-ripple { from { transform: scale(1); opacity: 1; } to { transform: scale(4.2); opacity: 0; } }
  `

  let el
  let x = -100
  let y = -100
  let hideTimer

  const place = (nx, ny) => {
    x = nx
    y = ny
    if (!el) return
    el.style.transform = `translate(${x}px, ${y}px)`
    el.classList.add('on')
    if (mode === 'touch') {
      clearTimeout(hideTimer)
      hideTimer = setTimeout(() => el.classList.remove('on'), 900)
    }
  }

  const ripple = (rx = x, ry = y) => {
    const r = document.createElement('div')
    r.className = 'demo-ripple'
    r.style.left = `${rx}px`
    r.style.top = `${ry}px`
    document.documentElement.appendChild(r)
    setTimeout(() => r.remove(), 700)
  }

  const install = () => {
    if (document.getElementById('demo-cursor')) return
    const s = document.createElement('style')
    s.textContent = css
    document.head.appendChild(s)
    el = document.createElement('div')
    el.id = 'demo-cursor'
    el.className = mode
    if (mode === 'arrow') {
      el.innerHTML =
        '<svg viewBox="0 0 24 24"><path d="M3 2l15.5 11.2-6.6 1.1 3.9 7.3-3 1.6-3.9-7.4L3.6 20z" fill="#fff8ec" stroke="#17110e" stroke-width="1.6" stroke-linejoin="round"/></svg>'
    }
    document.documentElement.appendChild(el)
    if (x > -100) place(x, y)
  }

  window.addEventListener('mousemove', (e) => place(e.clientX, e.clientY), { capture: true, passive: true })
  window.addEventListener('mousedown', (e) => { el?.classList.add('down'); ripple(e.clientX, e.clientY) }, true)
  window.addEventListener('mouseup', () => el?.classList.remove('down'), true)

  // hooks for record.ts: show the cursor at a spot without moving the mouse,
  // and ripple for actions that don't click (e.g. a native <select>)
  window.__demoCursor = { place, ripple }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', install)
  else install()
})()
