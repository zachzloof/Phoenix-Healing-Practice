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
      'A gentle, hands-on therapy targeting the fascia — the connective tissue that surrounds every muscle, bone, nerve and organ.',
      'Through sustained, gentle pressure, MFR releases restrictions, restoring freedom of movement and addressing the root cause of pain rather than just the symptoms.',
    ],
    idealFor: [
      'Chronic pain & fibromyalgia',
      'Sports injuries & recovery',
      'Postural problems & stiffness',
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
    line: 'Breath, rhythm and spirit, carried home.',
    summary:
      "Drawing on humanity's oldest healing traditions, shamanic healing recognises that illness often has a spiritual dimension alongside the physical.",
    body: [
      "Drawing on humanity's oldest healing traditions, shamanic healing recognises that illness often has a spiritual dimension alongside the physical.",
      'Using rhythmic sound, sacred practices, and deep intuitive guidance, this work restores balance and wholeness — reconnecting you to your inner wisdom and the healing power of the natural world.',
    ],
    idealFor: [
      'Spiritual disconnection',
      'Emotional trauma & grief',
      'Life transitions & crossroads',
      'Anxiety & low mood',
      'Seeking deeper meaning',
    ],
  },
}

export const STEPS = [
  {
    title: 'Book your session',
    text: 'Choose a time that works for you through the online booking calendar. Sessions take place in Chelmsford, Essex.',
  },
  {
    title: 'Your first conversation',
    text: 'We begin with a gentle conversation about what brings you here, your health history, and what you hope to experience.',
  },
  {
    title: 'The session',
    text: "You remain fully clothed throughout. Penny works with sensitivity and presence, listening to your body's own wisdom.",
  },
  {
    title: 'Integration & aftercare',
    text: 'Afterwards we talk about what arose and how to support your ongoing healing journey. You are never alone in this process.',
  },
]

// PLACEHOLDER TESTIMONIALS — these are NOT real client words.
// Replace every entry with genuine, permission-given testimonials before launch.
export const TESTIMONIALS = [
  {
    placeholder: true,
    quote:
      'I was suffering from chronic back pain for years. After just three sessions with Penny, the relief was remarkable. Her intuitive touch and healing presence made me feel completely safe and understood.',
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
