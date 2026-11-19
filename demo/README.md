# Walkthrough video

A repeatable Playwright recording of the site for the portfolio.

```sh
npm run demo:record          # from the repo root: seed, build, serve, record, post-process
node demo/check.ts 3         # optional: dump a frame every 3s (+ one per step) to demo/frames/
```

It needs Node 24+ (it runs the `.ts` files directly) and `ffmpeg`/`ffprobe` on PATH.

## Output (`demo/output/`)

| File | What it is |
| --- | --- |
| `phoenix-healing-desktop.mp4` | 1920×1080 walkthrough with a 3s title card |
| `phoenix-healing-mobile.mp4` | 390×844 phone walkthrough with a 3s title card |
| `phoenix-healing-loop.mp4` | ~16s, 1280×720, muted, loops without a seam (for a portfolio grid) |
| `phoenix-healing-poster.jpg` | Still image to show before the loop plays |

## The flow

1. **Home.** The rose window lights up, and the firelight follows the cursor (desktop only).
2. **Services.** "Explore the services" opens the two elemental windows.
3. **Earth window.** It leads to the Myofascial Release page and its "Ideal for" list.
4. **Wind window.** "Or step through the wind window" opens the Shamanic Healing page.
5. **Contact.** "Ask Penny a question" leads to the form (on the phone, via the menu).
6. **Enquiry.** Claire fills in the form at typing speed and sends it, showing "Message sent".
7. **Booking.** "Book a session" leads to the calendar, where she picks a day and a time, confirms, and sees "You're booked in".

## Files

- `seed.ts` creates the demo data:
  - It checks `fixtures/visitor.json`, the invented enquiry.
  - It writes `fixtures/generated/availability.json`, which holds Penny's open slots. These are dated relative to today, so the calendar never shows past dates.
- `record.ts` is the recorder. It injects the cursor and click ripple (`fixtures/cursor.js`), glides the mouse, and types at a human pace. It waits on selectors, URLs and scroll position rather than fixed sleeps. The pauses that do exist are deliberate holds for the viewer, plus one still pre-roll before the take that keeps the opening cut easy to detect. It writes `raw/<variant>.webm` plus a `marks.json` of timestamps for each step.
- `postprocess.ts` handles the rest:
  - It finds the exact opening cut in the video.
  - It removes the app router's half-second flash of the home hero on the way to the contact form, replacing it with a 0.4s dissolve.
  - It renders `title-card.html`, trims, encodes H.264 (`-preset veryfast`), and makes the loop and poster.
- `run.ts` runs the whole thing in order.

## Demo-only stand-ins

The app's own code is unchanged, but two things are faked:

- **Booking calendar.** Penny's Calendly account doesn't exist yet; the placeholder link is a 404. While recording, the request for Calendly's `widget.js` is answered with `fixtures/calendar-widget.js`, an unbranded calendar. **The calendar and the open times in the video are invented.**
- **Contact form.** The site's form already only simulates sending.

The visitor uses a phone number from Ofcom's reserved drama range and a `@example.com` email address.

## Notes

- Recording asks Chromium to use the GPU. Software rendering manages about 15fps on this SVG-heavy site, which makes the video judder. If the log line `record: renderer …` mentions SwiftShader, expect choppier motion. Set `DEMO_NO_GPU=1` to force software rendering.
- Playwright records at CSS-pixel size, so the phone video is a native 390×844, not retina.
- To record against an app that is already running, set `DEMO_URL=http://localhost:5173 node demo/run.ts`. To re-run only post-processing, use `node demo/run.ts --skip-record`. To record one version, add `desktop` or `mobile`.
