<script setup>
import { ref } from 'vue'
import { CONTACT } from '../content/site.js'
import GlassPlant from './glass/GlassPlant.vue'

const form = ref({ name: '', email: '', phone: '', service: '', message: '' })
const submitted = ref(false)
const submitting = ref(false)

// TODO: connect to a real form service (Formspree, EmailJS…) before launch.
// Until then this only simulates sending.
async function handleSubmit() {
  submitting.value = true
  await new Promise((r) => setTimeout(r, 900))
  submitting.value = false
  submitted.value = true
}
</script>

<template>
  <section id="contact" class="section" aria-labelledby="contact-title">
    <div class="wrap">
      <header class="section-head">
        <h2 id="contact-title">Contact Penny</h2>
        <p>Have a question before booking? I'd love to hear from you. No question is too small.</p>
      </header>

      <div class="came grid">
        <div class="pane-dim info">
          <GlassPlant kind="monstera" element="fire" :seed="33" class="vine" />
          <GlassPlant kind="fern" element="fire" :seed="35" class="vine2" flip />
          <ul>
            <li>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 8l7.9 5.3a2 2 0 002.2 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              <span>Email<a :href="`mailto:${CONTACT.email}`">{{ CONTACT.email }}</a></span>
            </li>
            <li>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5a2 2 0 012-2h3.3a1 1 0 01.9.7l1.5 4.5a1 1 0 01-.5 1.2l-2.3 1.1a11 11 0 005.5 5.5l1.1-2.3a1 1 0 011.2-.5l4.5 1.5a1 1 0 01.7.9V19a2 2 0 01-2 2h-1C9.7 21 3 14.3 3 6V5z" /></svg>
              <span>Phone<a :href="CONTACT.phoneHref">{{ CONTACT.phone }}</a></span>
            </li>
            <li>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17.7 16.7l-4.3 4.2a2 2 0 01-2.8 0l-4.3-4.2a8 8 0 1111.4 0z" /><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              <span>Location<em>{{ CONTACT.location }}</em></span>
            </li>
          </ul>
        </div>

        <div class="pane-clear form-pane">
          <div v-if="submitted" class="sent" role="status">
            <h3>Message sent</h3>
            <p>Thank you for getting in touch. I'll reply as soon as I can.</p>
          </div>

          <form v-else @submit.prevent="handleSubmit">
            <div class="row">
              <label>Your name
                <input v-model="form.name" type="text" name="name" autocomplete="name" required />
              </label>
              <label>Email address
                <input v-model="form.email" type="email" name="email" autocomplete="email" required />
              </label>
            </div>
            <div class="row">
              <label>Phone <small>(optional)</small>
                <input v-model="form.phone" type="tel" name="phone" autocomplete="tel" />
              </label>
              <label>Interested in
                <select v-model="form.service" name="service">
                  <option value="">Not sure yet</option>
                  <option value="mfr">Myofascial Release</option>
                  <option value="shamanic">Shamanic Healing</option>
                  <option value="both">Both</option>
                </select>
              </label>
            </div>
            <label>Your message
              <textarea v-model="form.message" name="message" rows="5" required placeholder="Tell me a little about what brings you here…" />
            </label>
            <button type="submit" class="pane-amber btn-glass send" :disabled="submitting">
              {{ submitting ? 'Sending…' : 'Send message' }}
            </button>
            <p class="consent">By sending this you agree to Penny contacting you about your enquiry.</p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: minmax(0, 0.75fr) minmax(0, 1.25fr);
}
.info {
  position: relative;
  overflow: hidden;
  padding: clamp(2rem, 4vw, 3rem);
  padding-bottom: 14rem;
}
.vine { position: absolute; right: -8%; bottom: -12%; width: 62%; transform: rotate(-8deg); }
.vine2 { position: absolute; left: -6%; bottom: -8%; height: 13rem; }
.info ul { display: grid; gap: 1.8rem; margin: 0; padding: 0; list-style: none; }
.info li { display: flex; gap: 1rem; align-items: flex-start; }
.info svg {
  flex: none;
  width: 2.75rem;
  height: 2.75rem;
  padding: 0.6rem;
  border: 3px solid #17110e;
  border-radius: 50%;
  background: var(--seeds), radial-gradient(circle at 35% 30%, #5a2c16, #2a140b 70%);
  box-shadow: 0 0 0 1px rgb(246 193 67 / 0.25);
  fill: none;
  stroke: var(--color-marigold);
  stroke-width: 1.7;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.info span {
  display: grid;
  font-size: 0.95rem;
  color: var(--text-on-room-soft);
}
.info a,
.info em {
  font-style: normal;
  font-size: 1.2rem;
  color: var(--text-on-room);
  text-decoration: none;
  overflow-wrap: anywhere;
}
.info a:hover { color: var(--color-marigold); text-decoration: underline; text-underline-offset: 0.2em; }

.form-pane { padding: clamp(1.6rem, 4vw, 3rem); }
form { display: grid; gap: 1.2rem; }
.row { display: grid; grid-template-columns: 1fr 1fr; gap: 1.2rem; }
label {
  display: grid;
  gap: 0.4rem;
  font-weight: 700;
  font-size: 1rem;
  color: var(--color-ink);
}
label small { font-weight: 400; color: var(--color-ink-soft); }
input,
select,
textarea {
  width: 100%;
  box-sizing: border-box;
  padding: 0.8rem 0.9rem;
  font: inherit;
  font-weight: 400;
  font-size: 1.05rem;
  color: var(--color-ink);
  background: rgb(255 252 244 / 0.85);
  border: 3px solid #17110e;
  border-radius: 2px;
  transition: box-shadow 0.4s, background-color 0.4s;
}
textarea { resize: vertical; min-height: 8rem; }
::placeholder { color: #8a6e58; }
input:focus-visible,
select:focus-visible,
textarea:focus-visible {
  outline: none;
  background: #fffaf0;
  box-shadow: 0 0 0 4px var(--color-amber), 0 0 24px rgb(240 145 42 / 0.5);
}
input:user-invalid,
textarea:user-invalid { border-color: var(--color-ember); }
.send {
  justify-self: start;
  min-width: 14rem;
  padding: 1.05rem 1.8rem;
  border: 4px solid #17110e;
}
.send:disabled { filter: grayscale(0.5) brightness(0.9); cursor: progress; }
.consent { font-size: 0.95rem; color: var(--color-ink-soft); }
.sent { display: grid; gap: 0.8rem; padding: 3rem 0; text-align: center; }
.sent h3 { font-size: 2rem; color: var(--color-ruby); }

@media (max-width: 860px) {
  .grid { grid-template-columns: 1fr; }
  .info { padding-bottom: 2rem; }
  .info ul { gap: 1.3rem; }
  .info a, .info em { font-size: 1.05rem; overflow-wrap: normal; white-space: nowrap; }
  .vine, .vine2 { display: none; }
}
@media (max-width: 560px) {
  .row { grid-template-columns: 1fr; }
  .send { justify-self: stretch; }
}
</style>
