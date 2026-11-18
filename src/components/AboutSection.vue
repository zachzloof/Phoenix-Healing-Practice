<script setup>
import GlassPlant from './glass/GlassPlant.vue'
import ChakraJewel from './glass/ChakraJewel.vue'

const roles = [
  { label: 'Certified MFR Practitioner', chakra: 3 },
  { label: 'Shamanic Healer', chakra: 5 },
  { label: 'Chelmsford, Essex', chakra: 0 },
]
</script>

<template>
  <section id="about" class="section" aria-labelledby="about-title">
    <div class="wrap came about">
      <!--
        Portrait window. When Penny's own photo arrives, place it inside .portrait
        as an <img> (object-fit: cover) and keep the leaded arch around it.
      -->
      <div class="portrait" aria-hidden="true">
        <div class="arch">
          <GlassPlant kind="pothos" element="fire" :seed="21" class="pothos" />
          <GlassPlant kind="monstera" element="fire" :seed="9" class="mon" />
          <GlassPlant kind="fern" element="fire" :seed="14" class="fern" flip />
        </div>
      </div>

      <div class="pane-clear words">
        <h2 id="about-title">Meet Penny Theophanous</h2>
        <p>
          My name is Penny Theophanous, and I am a certified practitioner in Myofascial Release and
          Shamanic Healing, based in the heart of Chelmsford, Essex.
        </p>
        <p>
          My journey into healing began through my own experience of chronic pain and disconnection.
          Through the transformative power of myofascial release and shamanic practice, I found not
          just relief, but a profound reconnection with my body, mind, and spirit.
        </p>
        <p>
          I believe true healing works on every level. Whether you come to me with physical tension,
          emotional blocks, or a sense of feeling lost, my approach is always gentle, intuitive, and
          deeply respectful of your individual journey.
        </p>
        <blockquote>
          “Each session is a sacred space where you are truly seen, heard, and held.”
        </blockquote>
        <ul class="roles">
          <li v-for="r in roles" :key="r.label"><ChakraJewel :chakra="r.chakra" :size="18" />{{ r.label }}</li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about {
  display: grid;
  grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr);
}
.portrait {
  position: relative;
  min-height: 34rem;
  padding: clamp(1rem, 2.5vw, 2rem);
  background:
    repeating-linear-gradient(90deg, #17110e 0 3px, transparent 3px 72px),
    repeating-linear-gradient(0deg, #17110e 0 3px, transparent 3px 72px),
    var(--seeds),
    linear-gradient(170deg, #4a1d0f, #2a120a);
}
.arch {
  position: relative;
  height: 100%;
  overflow: hidden;
  border: 8px solid #17110e;
  border-radius: 999px 999px 0 0;
  background:
    var(--seeds),
    radial-gradient(90% 60% at 50% 30%, #fbe39a, #f0912a 45%, #b8341b 100%);
  box-shadow: inset 0 0 60px rgb(90 20 0 / 0.5), 0 0 60px rgb(240 145 42 / 0.25);
}
.pothos { position: absolute; top: -2%; left: 4%; height: 82%; }
.mon { position: absolute; bottom: -6%; right: -10%; width: 78%; transform: rotate(10deg); }
.fern { position: absolute; bottom: -4%; left: -12%; height: 70%; }

.words {
  display: grid;
  align-content: center;
  gap: 1.15rem;
  padding: clamp(2rem, 5vw, 4.5rem);
  font-size: 1.15rem;
}
.words h2 {
  font-size: clamp(2.3rem, 4.4vw, 3.6rem);
  color: var(--color-ruby);
  margin-bottom: 0.4rem;
}
.words p { max-width: 62ch; color: var(--color-ink-soft); }
blockquote {
  margin: 0.6rem 0;
  font-family: var(--font-display);
  font-size: clamp(1.35rem, 2.2vw, 1.75rem);
  line-height: 1.25;
  color: var(--color-ember);
}
.roles {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin: 0.4rem 0 0;
  padding: 0;
  list-style: none;
}
.roles li {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.45rem 0.9rem 0.45rem 0.55rem;
  border: 3px solid #17110e;
  background: rgb(255 255 255 / 0.4);
  font-weight: 500;
  color: var(--color-ink);
}

@media (max-width: 860px) {
  .about { grid-template-columns: 1fr; }
  .portrait { min-height: 24rem; }
}
</style>
