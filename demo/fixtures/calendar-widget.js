// DEMO STAND-IN for the booking calendar.
//
// The site loads Calendly's widget.js and calls Calendly.initInlineWidget(). Penny's
// Calendly account does not exist yet (the placeholder URL is a 404), so during
// recording record.ts answers the widget.js request with this file instead.
// It renders an unbranded calendar straight into the site's own embed element
// (no iframe, so the demo cursor keeps working over it), styled with the site's
// CSS variables. Availability comes from window.__DEMO_AVAILABILITY__ (seed.ts).
// The app's own code is untouched; this never ships.
;(() => {
  const A = window.__DEMO_AVAILABILITY__
  const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const pad = (n) => String(n).padStart(2, '0')
  const key = (y, m, d) => `${y}-${pad(m + 1)}-${pad(d)}`
  const longDate = (k) => {
    const [y, m, d] = k.split('-').map(Number)
    const dt = new Date(y, m - 1, d)
    return `${DAYS[dt.getDay()]} ${d} ${MONTHS[m - 1]}`
  }
  const endTime = (t) => {
    const [h, m] = t.split(':').map(Number)
    return `${pad(h + 1)}:${pad(m)}`
  }

  // Tailwind (in the app's build) scans this folder for class names, so avoid tokens it
  // would turn into CSS: '@' + 'container' is split and colours are literal or core vars.
  const css = `
  .dc { container-type: inline-size; height: 100%; overflow: auto; color: var(--color-ink); font-family: var(--font-body); }
  .dc * { box-sizing: border-box; }
  .dc-grid { display: grid; grid-template-columns: 15rem minmax(0, 1fr) 13rem; gap: 2.4rem; min-height: 100%; padding: 2.6rem 2.6rem 2rem; }
  .dc-info { display: grid; align-content: start; gap: .9rem; padding-right: 2rem; border-right: 3px solid rgb(23 17 14 / .14); }
  .dc-who { font-size: .9rem; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: var(--color-ink-soft); }
  .dc-svc { margin: 0; font-family: var(--font-display); font-size: 2rem; line-height: 1.05; color: var(--color-ruby); }
  .dc-meta { display: grid; gap: .55rem; margin: .4rem 0 0; padding: 0; list-style: none; font-size: 1.05rem; }
  .dc-meta li { display: flex; gap: .6rem; align-items: center; }
  .dc-meta svg { flex: none; width: 1.2rem; height: 1.2rem; fill: none; stroke: var(--color-amber-deep); stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
  .dc-note { margin-top: .8rem; font-size: .95rem; color: var(--color-ink-soft); }
  .dc-h { margin: 0 0 1.1rem; font-family: var(--font-display); font-size: 1.45rem; color: var(--color-ink); }
  .dc-month { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem; }
  .dc-month .dc-h { margin: 0; }
  .dc-nav { display: flex; gap: .4rem; }
  .dc-nav span { display: grid; place-items: center; width: 2.2rem; height: 2.2rem; border-radius: 50%; color: var(--color-ink-soft); opacity: .45; font-size: 1.2rem; }
  .dc-nav span + span { opacity: 1; background: rgb(240 145 42 / .16); color: var(--color-amber-deep); }
  .dc-week, .dc-days { display: grid; grid-template-columns: repeat(7, minmax(0, 1fr)); gap: .35rem; }
  .dc-week span { padding-bottom: .5rem; text-align: center; font-size: .82rem; font-weight: 700; letter-spacing: .06em; color: var(--color-ink-soft); }
  .dc-day { position: relative; display: grid; place-items: center; aspect-ratio: 1; max-height: 3.4rem; border: 0; border-radius: 50%; background: none; font: inherit; font-size: 1.1rem; color: rgb(42 26 18 / .38); }
  button.dc-day { cursor: pointer; font-weight: 700; color: var(--color-ruby); background: rgb(240 145 42 / .2); transition: background-color .35s, color .35s, transform .35s cubic-bezier(.16,1,.3,1); }
  button.dc-day:hover { background: rgb(240 145 42 / .38); }
  .dc-day.today::after { content: ''; position: absolute; bottom: 14%; width: 5px; height: 5px; border-radius: 50%; background: currentColor; }
  button.dc-day[aria-pressed='true'] { background: var(--color-ruby); color: var(--color-clear-hi); transform: scale(1.06); }
  .dc-times { display: grid; align-content: start; }
  .dc-empty { margin-top: .2rem; font-size: 1.05rem; line-height: 1.45; color: var(--color-ink-soft); }
  .dc-slots { display: grid; gap: .6rem; }
  .dc-slot { padding: .85rem 1rem; border: 3px solid var(--color-lead); border-radius: 2px; background: rgb(255 252 244 / .7); font: inherit; font-size: 1.15rem; font-weight: 700; color: var(--color-ink); cursor: pointer; opacity: 0; transform: translateY(8px); animation: dc-in .5s cubic-bezier(.16,1,.3,1) forwards; transition: background-color .3s, color .3s; }
  .dc-slot:hover { background: #fffaf0; box-shadow: 0 0 0 3px var(--color-amber); }
  .dc-slot[aria-pressed='true'] { background: var(--color-lead); color: var(--color-marigold); }
  .dc-confirm { margin-top: 1.1rem; padding: 1rem 1.2rem; border: 4px solid var(--color-lead); border-radius: 2px; background: linear-gradient(160deg, #f8b54a, var(--color-amber-deep)); font-family: var(--font-display); font-size: 1.2rem; color: var(--color-lead); cursor: pointer; opacity: 0; animation: dc-in .5s cubic-bezier(.16,1,.3,1) forwards; }
  .dc-done { display: grid; place-content: center; justify-items: center; gap: 1rem; height: 100%; padding: 2rem; text-align: center; opacity: 0; animation: dc-in .7s cubic-bezier(.16,1,.3,1) forwards; }
  .dc-jewel { width: 4.4rem; height: 4.4rem; border: 5px solid var(--color-lead); border-radius: 50%; background: radial-gradient(circle at 36% 32%, #fff8 0 12%, transparent 40%), radial-gradient(circle, #e2621f, #7a1420); display: grid; place-items: center; box-shadow: 0 0 40px rgb(240 145 42 / .55); }
  .dc-jewel svg { width: 2rem; height: 2rem; fill: none; stroke: #fff3d6; stroke-width: 3; stroke-linecap: round; stroke-linejoin: round; }
  .dc-done h3 { margin: 0; font-family: var(--font-display); font-size: 2.4rem; color: var(--color-ruby); }
  .dc-done p { margin: 0; font-size: 1.2rem; color: var(--color-ink-soft); }
  .dc-done strong { color: var(--color-ink); font-size: 1.3rem; }
  @keyframes dc-in { to { opacity: 1; transform: none; } }
  ${'@'}container (max-width: 760px) {
    .dc-grid { grid-template-columns: 1fr; gap: 1.1rem; padding: 1.3rem 1.1rem; }
    .dc-info { padding: 0 0 1rem; border-right: 0; border-bottom: 3px solid rgb(23 17 14 / .14); gap: .4rem; }
    .dc-svc { font-size: 1.6rem; }
    .dc-meta { display: flex; flex-wrap: wrap; gap: .3rem 1rem; font-size: .98rem; }
    .dc-note { display: none; }
    .dc-h { font-size: 1.2rem; margin-bottom: .6rem; }
    .dc-month { margin-bottom: .5rem; }
    .dc-day { font-size: 1rem; max-height: 2.6rem; }
    .dc-week span { padding-bottom: .3rem; }
    .dc-slots { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: .45rem; }
    .dc-slot { padding: .6rem .3rem; font-size: 1.05rem; }
    .dc-confirm { margin-top: .7rem; }
    .dc-done h3 { font-size: 2rem; }
  }
  @media (prefers-reduced-motion: reduce) { .dc * { animation-duration: .01ms !important; transition-duration: .01ms !important; } }
  `

  const icon = {
    clock: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    coin: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M14.5 8.5a2.5 2.5 0 00-4.5 1.5v5.5M8.5 13h4M8.5 16h7"/></svg>',
    pin: '<svg viewBox="0 0 24 24"><path d="M17.7 16.7l-4.3 4.2a2 2 0 01-2.8 0l-4.3-4.2a8 8 0 1111.4 0z"/><circle cx="12" cy="11" r="3"/></svg>',
    tick: '<svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
  }

  function render(root) {
    const state = { date: null, time: null }
    const today = new Date()
    const todayKey = key(today.getFullYear(), today.getMonth(), today.getDate())

    const shell = document.createElement('div')
    shell.className = 'dc'
    shell.dataset.demoCal = ''
    root.appendChild(shell)

    const draw = () => {
      const first = new Date(A.year, A.month, 1)
      const lead = (first.getDay() + 6) % 7 // Monday-first weeks, as in the UK
      const len = new Date(A.year, A.month + 1, 0).getDate()
      let cells = ''
      for (let i = 0; i < lead; i++) cells += '<span></span>'
      for (let d = 1; d <= len; d++) {
        const k = key(A.year, A.month, d)
        const cls = `dc-day${k === todayKey ? ' today' : ''}`
        cells += A.days[k]
          ? `<button type="button" class="${cls}" data-date="${k}" aria-pressed="${state.date === k}" aria-label="${longDate(k)}">${d}</button>`
          : `<span class="${cls}">${d}</span>`
      }

      let times = `<p class="dc-empty">Pick a highlighted day to see Penny's open times.</p>`
      if (state.date) {
        times =
          `<h4 class="dc-h">${longDate(state.date)}</h4><div class="dc-slots">` +
          A.days[state.date]
            .map((t, i) => `<button type="button" class="dc-slot" data-time="${t}" aria-pressed="${state.time === t}" style="animation-delay:${i * 70}ms">${t}</button>`)
            .join('') +
          '</div>' +
          (state.time ? `<button type="button" class="dc-confirm" data-confirm>Confirm ${state.time}</button>` : '')
      }

      shell.innerHTML = `
        <div class="dc-grid">
          <div class="dc-info">
            <span class="dc-who">${A.practitioner}</span>
            <h3 class="dc-svc">${A.service}</h3>
            <ul class="dc-meta">
              <li>${icon.clock}${A.duration}</li>
              <li>${icon.coin}${A.price} per session</li>
              <li>${icon.pin}${A.location}</li>
            </ul>
            <p class="dc-note">Times shown are UK time.</p>
          </div>
          <div class="dc-cal">
            <div class="dc-month"><h4 class="dc-h">${MONTHS[A.month]} ${A.year}</h4><div class="dc-nav" aria-hidden="true"><span>&#8249;</span><span>&#8250;</span></div></div>
            <div class="dc-week">${['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((w) => `<span>${w}</span>`).join('')}</div>
            <div class="dc-days">${cells}</div>
          </div>
          <div class="dc-times" aria-live="polite">${times}</div>
        </div>`
    }

    const done = () => {
      shell.innerHTML = `
        <div class="dc-done" data-demo-booked role="status">
          <div class="dc-jewel">${icon.tick}</div>
          <h3>You're booked in</h3>
          <p><strong>${longDate(state.date)}, <span style="white-space:nowrap">${state.time} – ${endTime(state.time)}</span></strong></p>
          <p>${A.service} with ${A.practitioner} · ${A.location}</p>
        </div>`
    }

    shell.addEventListener('click', (e) => {
      const b = e.target.closest('button')
      if (!b) return
      if (b.dataset.date) {
        state.date = b.dataset.date
        state.time = null
        draw()
      } else if (b.dataset.time) {
        state.time = b.dataset.time
        // redraw without replaying the slot entrance
        shell.querySelectorAll('.dc-slot').forEach((s) => {
          s.style.animation = 'none'
          s.style.opacity = 1
          s.style.transform = 'none'
          s.setAttribute('aria-pressed', String(s.dataset.time === state.time))
        })
        let c = shell.querySelector('[data-confirm]')
        if (!c) {
          c = document.createElement('button')
          c.type = 'button'
          c.className = 'dc-confirm'
          c.dataset.confirm = ''
          shell.querySelector('.dc-times').appendChild(c)
        }
        c.textContent = `Confirm ${state.time}`
      } else if ('confirm' in b.dataset) {
        done()
      }
    })
    draw()
  }

  if (!document.getElementById('dc-style')) {
    const s = document.createElement('style')
    s.id = 'dc-style'
    s.textContent = css
    document.head.appendChild(s)
  }

  window.Calendly = {
    initInlineWidget({ parentElement }) {
      if (!A) throw new Error('demo calendar: no availability (run demo/seed.ts)')
      parentElement.innerHTML = ''
      render(parentElement)
    },
  }
})()
