// All site copy that is shared between pages lives here.
// Facts come from the practice; nothing here may be invented.

export const CONTACT = {
  email: 'penny@patch-a-mumma.co.uk',
  phone: '07561 702 154',
  phoneHref: 'tel:07561702154',
  location: 'Chelmsford, Essex',
  price: '£60',
  // TODO: replace with Penny's real Calendly link once the account exists
  calendly: 'https://calendly.com/penny-theophanous',
}

export const SERVICES = {
  mfr: {
    key: 'mfr',
    element: 'earth',
    elementName: 'Earth',
    name: 'Myofascial Release',
    short: 'MFR · MER',
    to: '/myofascial-release',
    line: 'Grounded, hands-on release for the body.',
    summary:
      'A gentle, hands-on therapy targeting the fascia, the connective tissue that surrounds every muscle, bone, nerve and organ.',
    body: [
      'Fascia is the web of connective tissue that surrounds and supports every muscle, bone, nerve and organ. When it becomes tight or restricted, it can cause pain and limit how freely you move.',
      'Using sustained, gentle pressure, Myofascial Release eases these restrictions, restoring freedom of movement and addressing the underlying cause of pain rather than just its symptoms.',
    ],
    idealFor: [
      'Chronic pain & fibromyalgia',
      'Sports injuries & recovery',
      'Postural issues & stiffness',
      'Stress-related tension',
      'Headaches & migraines',
    ],
  },
  shamanic: {
    key: 'shamanic',
    element: 'air',
    elementName: 'Wind',
    name: 'Shamanic Healing',
    short: 'Shamanic',
    to: '/shamanic-healing',
    line: 'Breath, rhythm and spirit, brought back into balance.',
    summary:
      "Drawing on humanity's oldest healing traditions, shamanic healing recognises that illness often has a spiritual dimension alongside the physical.",
    body: [
      'Shamanic practice works with the spiritual side of wellbeing: the part of us that can feel lost, depleted or disconnected, even when the body is well.',
      'Through rhythmic sound, sacred practice and intuitive guidance, this work helps restore balance and wholeness, reconnecting you with your inner wisdom and the healing power of the natural world.',
    ],
    idealFor: [
      'Spiritual disconnection',
      'Emotional trauma & grief',
      'Life transitions & crossroads',
      'Anxiety & low mood',
      'A search for deeper meaning',
    ],
  },
}

export const STEPS = [
  {
    title: 'Book your session',
    text: 'Choose a time that suits you using the online booking calendar. All sessions take place in Chelmsford, Essex.',
  },
  {
    title: 'Your first conversation',
    text: 'We begin with a relaxed conversation about what brings you here, your health history and what you hope to gain from our time together.',
  },
  {
    title: 'The session',
    text: 'You remain fully clothed throughout. I work with sensitivity and care, guided by what your body is telling me.',
  },
  {
    title: 'Integration & aftercare',
    text: 'Afterwards, we talk through what came up and how best to support your healing from here. You are never alone in this process.',
  },
]

// PLACEHOLDER TESTIMONIALS — these are NOT real client words.
// Replace every entry with genuine, permission-given testimonials before launch.
export const TESTIMONIALS = [
  {
    placeholder: true,
    quote:
      'I had suffered from chronic back pain for years. After just three sessions with Penny, the relief was remarkable. Her intuitive touch and healing presence made me feel completely safe and understood.',
    name: 'Sarah M.',
    place: 'Chelmsford',
    service: 'Myofascial Release',
  },
  {
    placeholder: true,
    quote:
      'The shamanic healing session with Penny was profound and transformative. I walked in feeling scattered and disconnected, and left feeling whole again.',
    name: 'James T.',
    place: 'Essex',
    service: 'Shamanic Healing',
  },
  {
    placeholder: true,
    quote:
      "Penny's myofascial release work is unlike anything I've experienced. Gentle, deep, and incredibly effective. My tension headaches have almost completely gone.",
    name: 'Rachel H.',
    place: 'Braintree',
    service: 'Myofascial Release',
  },
  {
    placeholder: true,
    quote:
      'The combination of bodywork and energetic healing she offers is extraordinary. I feel like a completely different person.',
    name: 'Louise K.',
    place: 'Chelmsford',
    service: 'Both',
  },
]
