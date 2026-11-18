import { onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * The light source behind a window of glass.
 * Writes --lx / --ly (light position, % of the element), --lr (radius %) and
 * --li (intensity 0–1) onto the element. Glass styles read those to brighten
 * where the light falls and fall back to dim glass elsewhere.
 *
 *  - fine pointer: the light follows the cursor, smoothed
 *  - touch: the light rises through the window as it scrolls past
 *  - always: a slow, low-amplitude breathing like a hearth fire (never a strobe)
 *  - reduced motion: one still, generous light, no movement at all
 */
export function useFirelight(elRef, { ignite = false, rest = { x: 50, y: 46 }, radius = 46, breathe = true } = {}) {
  const state = { x: rest.x, y: ignite ? 96 : rest.y, r: ignite ? 6 : radius, i: ignite ? 0.2 : 1 }
  let mm
  let onMove

  const paint = () => {
    const el = elRef.value
    if (!el) return
    el.style.setProperty('--lx', `${state.x.toFixed(2)}%`)
    el.style.setProperty('--ly', `${state.y.toFixed(2)}%`)
    el.style.setProperty('--lr', `${state.r.toFixed(2)}%`)
    el.style.setProperty('--li', state.i.toFixed(3))
  }

  onMounted(() => {
    const el = elRef.value
    if (!el) return
    paint()
    mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: reduce)', () => {
      Object.assign(state, { x: rest.x, y: rest.y, r: radius + 6, i: 1 })
      paint()
    })

    mm.add(
      {
        motion: '(prefers-reduced-motion: no-preference)',
        fine: '(hover: hover) and (pointer: fine)',
      },
      (ctx) => {
        const { motion, fine } = ctx.conditions
        if (!motion) return

        const tl = gsap.timeline({ onUpdate: paint })
        if (ignite) {
          // an ember at the foot of the window catches, then the fire rises
          tl.to(state, { i: 1, r: radius, duration: 2.6, ease: 'expo.out' }, 0.15)
            .to(state, { y: rest.y, duration: 2.8, ease: 'expo.out' }, 0.15)
        }

        if (breathe) {
          const flicker = () =>
            gsap.to(state, {
              r: radius + gsap.utils.random(-4, 4),
              i: gsap.utils.random(0.86, 1),
              duration: gsap.utils.random(1.4, 2.8),
              ease: 'sine.inOut',
              onUpdate: paint,
              onComplete: flicker,
            })
          tl.call(flicker)
        }

        if (fine) {
          const qx = gsap.quickTo(state, 'x', { duration: 1.1, ease: 'power3.out', onUpdate: paint })
          const qy = gsap.quickTo(state, 'y', { duration: 1.1, ease: 'power3.out', onUpdate: paint })
          onMove = (e) => {
            const b = el.getBoundingClientRect()
            if (b.bottom < 0 || b.top > innerHeight) return
            const x = ((e.clientX - b.left) / b.width) * 100
            const y = ((e.clientY - b.top) / b.height) * 100
            // pull toward the pointer, but never so far the window goes dark
            qx(gsap.utils.clamp(-10, 110, rest.x + (x - rest.x) * 0.5))
            qy(gsap.utils.clamp(-10, 110, rest.y + (y - rest.y) * 0.5))
          }
          window.addEventListener('pointermove', onMove, { passive: true })
        } else {
          ScrollTrigger.create({
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            onUpdate: (st) => {
              const p = st.progress
              state.y = 80 - p * 55
              state.x = rest.x + Math.sin(p * Math.PI * 2) * 14
              paint()
            },
          })
        }

        return () => {
          if (onMove) window.removeEventListener('pointermove', onMove)
          onMove = null
        }
      },
      el,
    )
  })

  onBeforeUnmount(() => {
    mm?.revert()
    gsap.killTweensOf(state)
  })
}
