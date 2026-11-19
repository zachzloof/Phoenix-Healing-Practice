// Seeds the demo data for the walkthrough.
//
// The site has no database or login, so "demo data" here means:
//   - fixtures/visitor.json            the enquiry typed into the contact form (checked here)
//   - fixtures/generated/availability.json
//                                      Penny's open booking slots for the stand-in calendar,
//                                      generated relative to today so the video never shows
//                                      past dates or an empty month.
//
// Deterministic for a given date: same day, same calendar.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))

type Visitor = {
  name: string
  email: string
  phone: string
  service: string
  message: string
  booking: { service: string; preferredTime: string; minDaysAhead: number }
}

export type Availability = {
  generatedOn: string
  practitioner: string
  service: string
  duration: string
  price: string
  location: string
  year: number
  month: number // 0-11
  days: Record<string, string[]>
  pick: { date: string; time: string }
}

const WEEKDAY_SLOTS = ['09:30', '11:00', '13:30', '15:00', '17:30']
const SATURDAY_SLOTS = ['10:00', '11:00', '12:30']
// Penny's working days: Tue, Wed, Thu, Sat
const WORKING = new Set([2, 3, 4, 6])

const pad = (n: number) => String(n).padStart(2, '0')
const key = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`

// small stable hash so a given date always gets the same booked-out slots
function hash(s: string) {
  let h = 2166136261
  for (const c of s) h = Math.imul(h ^ c.charCodeAt(0), 16777619)
  return h >>> 0
}

function slotsFor(d: Date): string[] {
  if (!WORKING.has(d.getDay())) return []
  const h = hash(key(d))
  if (h % 9 === 0) return [] // fully booked
  const base = d.getDay() === 6 ? SATURDAY_SLOTS : WEEKDAY_SLOTS
  // knock out one or two slots so the calendar looks lived-in
  return base.filter((_, i) => ((h >> (i * 3)) & 7) > 1)
}

export function seed(today = new Date()): Availability {
  const visitor: Visitor = JSON.parse(readFileSync(join(here, 'fixtures/visitor.json'), 'utf8'))
  for (const f of ['name', 'email', 'phone', 'service', 'message'] as const) {
    if (!visitor[f]?.trim()) throw new Error(`fixtures/visitor.json is missing "${f}"`)
  }

  const start = new Date(today.getFullYear(), today.getMonth(), today.getDate())
  const earliest = new Date(start)
  earliest.setDate(earliest.getDate() + visitor.booking.minDaysAhead)

  // show the month holding the earliest bookable day; if it has no slot at the
  // preferred time, move to the next month
  for (let shift = 0; shift < 3; shift++) {
    const year = earliest.getFullYear()
    const month = earliest.getMonth() + shift
    const first = new Date(year, month, 1)
    const days: Record<string, string[]> = {}
    let pick: Availability['pick'] | null = null
    for (let d = new Date(first); d.getMonth() === first.getMonth(); d.setDate(d.getDate() + 1)) {
      if (d <= start) continue
      const slots = slotsFor(d)
      if (!slots.length) continue
      days[key(d)] = slots
      if (!pick && d >= earliest && slots.includes(visitor.booking.preferredTime)) {
        pick = { date: key(d), time: visitor.booking.preferredTime }
      }
    }
    if (pick && Object.keys(days).length >= 6) {
      return {
        generatedOn: key(start),
        practitioner: 'Penny Theophanous',
        service: visitor.booking.service,
        duration: '60 minutes',
        price: '£60',
        location: 'Chelmsford, Essex',
        year: first.getFullYear(),
        month: first.getMonth(),
        days,
        pick,
      }
    }
  }
  throw new Error('Could not find a bookable demo slot in the next three months')
}

// run directly: write the fixture
const isMain = process.argv[1] && resolve(fileURLToPath(import.meta.url)).toLowerCase() === resolve(process.argv[1]).toLowerCase()
if (isMain) {
  const data = seed()
  const out = join(here, 'fixtures/generated/availability.json')
  mkdirSync(dirname(out), { recursive: true })
  writeFileSync(out, JSON.stringify(data, null, 2))
  console.log(`seed: ${Object.keys(data.days).length} open days in ${data.year}-${pad(data.month + 1)}, demo books ${data.pick.date} ${data.pick.time}`)
}
