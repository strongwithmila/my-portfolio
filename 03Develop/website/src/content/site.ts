/**
 * ─────────────────────────────────────────────────────────────
 *  STRONG WITH MILA — EDITABLE SITE CONTENT
 * ─────────────────────────────────────────────────────────────
 *  This is the one file to edit for offer name, price, availability,
 *  About copy/photo, FAQ, CTAs and contact details.
 *
 *  Anything marked `TODO(Mila)` is a placeholder or an unconfirmed
 *  decision. Do not publish until each one is confirmed.
 */

export interface FaqItem {
  question: string;
  answer: string;
}

export const contact = {
  // TODO(Mila): verify the address before publication.
  email: 'strongwithmila@gmail.com',
  instagramHandle: 'strongwithmila',
  city: 'Berlin, Germany',
};

export const instagramUrl = `https://www.instagram.com/${contact.instagramHandle}/`;

export const seo = {
  title: 'Strong with Mila | Women’s Strength & Nutrition Coaching in Berlin',
  description:
    'Women-focused personal training, nutrition coaching and cycle-aware support in Berlin, in English. Build strength, structure and confidence without extremes.',
};

/**
 * Founding-client offer. Keep `enabled: false` until real availability,
 * pricing and terms are confirmed — the site then uses neutral
 * "Enquire about coaching" wording and never mentions limited spots.
 */
export const founding = {
  enabled: false,
  heading: 'Founding client spots',
  // TODO(Mila): only use "limited" when spots really are limited.
  body: 'I’m looking for a small number of women in Berlin who want to try the method and share honest feedback, at a reduced founding-client price.',
  ctaLabel: 'Apply for a founding client spot',
};

export const cta = {
  primary: founding.enabled ? founding.ctaLabel : 'Enquire about coaching',
  secondary: 'See how it works',
};

export const hero = {
  eyebrow: 'Women’s strength coaching · Berlin · in English',
  headline: 'Women’s strength & nutrition coaching in Berlin',
  headlineAccent: 'built around your body, your cycle and your real life.',
  subheadline:
    'Onsite personal training, realistic nutrition support and weekly check-ins for women who want to build strength, structure and confidence without extremes.',
  note: 'train · fuel · understand',
};

export const resonance = {
  heading: 'Health-conscious, but still stuck?',
  intro: 'This is for you if you care about your health, and the usual advice still hasn’t clicked.',
  cards: [
    { quote: 'I don’t know what to do at the gym.', detail: 'You want to train, but you’re unsure if your form is right.' },
    { quote: 'I want nutrition structure, not another diet.', detail: 'You want a way of eating that supports you, not one that restricts you.' },
    { quote: 'My energy changes across the month.', detail: 'You notice shifts in energy, cravings and motivation, and want to understand them.' },
  ],
  close: 'You don’t need more extremes. You need support, structure and a plan that fits your life.',
};

export const method = {
  heading: 'One method, three connected parts',
  intro: 'Training, food and body awareness affect each other. We work on them together, and we adjust the plan instead of blaming the person.',
  pillars: [
    {
      key: 'train',
      name: 'Train',
      summary: 'Build strength with confidence.',
      points: ['Onsite personal training', 'Technique and movement quality', 'Progressive strength', 'Confidence in the gym'],
    },
    {
      key: 'fuel',
      name: 'Fuel',
      summary: 'Structure without restriction.',
      points: ['Macro-informed meal structure', 'Realistic meal suggestions', 'Protein and energy guidance', 'Enough food to support training'],
    },
    {
      key: 'understand',
      name: 'Understand',
      summary: 'Patterns are information, not verdicts.',
      points: ['Energy, sleep, hunger and recovery', 'Optional cycle awareness', 'Adjusting expectations', 'Flexible, not dogmatic'],
    },
  ],
  close: 'The goal isn’t a perfect plan. It’s understanding your body well enough to build routines you can actually keep.',
};

/**
 * TODO(Mila): offer name is unconfirmed. The website brief proposes
 * "Strong Through Your Cycle"; the business facts suggest "Strong Foundations".
 * Set `name` once decided. Until then the package shows its descriptive title.
 */
export const offer = {
  name: '' as string,
  title: 'Your 4-week strength & nutrition foundation',
  summary: 'Onsite personal training in Berlin, a nutrition coaching session and weekly digital check-ins, over four weeks.',
  // TODO(Mila): price not confirmed. Leave '' to show `priceNote` instead.
  price: '' as string,
  priceNote: 'Pricing is shared personally after a short fit check.',
  // TODO(Mila): confirm the onsite location.
  location: 'Berlin (exact studio to be confirmed)',
  steps: [
    { week: 'Before you start', title: 'Digital intake & goal-setting call', detail: 'We talk through your goals, training and nutrition history, routine, and how you’d like to be supported.' },
    { week: 'Week 1', title: 'Nutrition coaching + first training session', detail: 'Realistic meal suggestions and protein and energy guidance, then your first guided strength session.' },
    { week: 'Week 1', title: 'Two more onsite sessions', detail: 'Technique, movement coaching and a strength foundation you understand, with exercises chosen for you.' },
    { week: 'Weeks 1–4', title: 'Weekly digital check-ins', detail: 'Training, food, energy, recovery and, if you like, cycle observations. We adjust as we go.' },
    { week: 'Week 4', title: 'Final onsite progress session', detail: 'Strength check, movement review, progress measurements you agree to, and recommended next steps.' },
  ],
  includes: [
    '1 digital intake call',
    '3 onsite personal training sessions',
    '1 nutrition coaching session',
    'Macro-informed meal suggestions',
    'Weekly digital check-ins',
    '1 final onsite strength & progress review',
    'Next-step recommendations',
  ],
};

export const fit = {
  heading: 'Is this coaching for you?',
  forYou: [
    'You’re a woman in Berlin who prefers coaching in English',
    'You want to start or return to strength training safely',
    'You want personal guidance with technique',
    'You want realistic nutrition support',
    'You’re tired of all-or-nothing dieting',
    'You want to understand your cycle without obsessing over it',
    'You want structure and accountability',
  ],
  notForYou: [
    'You want a quick-fix transformation',
    'You want a restrictive diet plan',
    'You need medical nutrition therapy',
    'You’re looking for diagnosis or treatment of a hormonal condition',
    'You’re not open to strength training',
  ],
  scopeNote:
    'This is personal training and general nutrition coaching. It does not replace medical care, dietetic treatment or therapy.',
};

/**
 * TODO(Mila): this story is the draft from the website brief. Edit freely;
 * add credentials only once they are real and confirmed.
 * Set `photo` to an image path in /public (e.g. '/images/mila.jpg') with honest alt text.
 */
export const about = {
  heading: 'Hi, I’m Mila',
  paragraphs: [
    'For most of my life, I was health-conscious, but still struggling.',
    'I cared about eating well, building routines and feeling good in my body, but weight management and consistency never felt simple. After years of dieting, I reached a point where I knew I needed real support.',
    'Working with a personal trainer and a nutritionist helped me build structure, strength and confidence in a way motivation alone never could.',
    'Now I’m building Strong with Mila to help other women feel supported in that same process, with training, nutrition and body literacy that feel realistic, not extreme.',
  ],
  note: 'support changed everything',
  photo: '' as string,
  photoAlt: '',
  credentials: [] as string[],
};

export const cycle = {
  heading: 'Cycle-aware, not cycle-obsessed',
  paragraphs: [
    'Cycle-aware coaching doesn’t mean changing your entire workout and food routine every week.',
    'It means noticing patterns in your energy, appetite, recovery, sleep and motivation, then using that information to make sensible adjustments.',
    'Tracking is always optional. It works with irregular cycles, hormonal contraception, or no tracking at all.',
  ],
  tagline: 'Your cycle is data, not a rulebook.',
  labels: ['energy', 'appetite', 'sleep', 'recovery', 'motivation', 'mood'],
};

export const faq: FaqItem[] = [
  {
    question: 'Do I need experience with strength training?',
    answer: 'No. This coaching is especially suited to beginners and women returning to training. We start where you are.',
  },
  {
    question: 'Where do the onsite sessions happen?',
    answer: 'In Berlin. The exact studio or gym will be confirmed and shared with you before you start.',
  },
  {
    question: 'Is this a weight-loss programme?',
    answer: 'Not specifically. The focus is strength, structure, nutrition habits and confidence. Body composition goals can be discussed, but the approach is never extreme or restrictive.',
  },
  {
    question: 'Do you provide meal plans?',
    answer: 'I provide realistic meal suggestions, food priorities and macro-informed meal structure rather than a strict meal plan. I don’t provide medical diet plans.',
  },
  {
    question: 'Can you help with PCOS, endometriosis, thyroid issues or fertility?',
    answer: 'I can support general training and lifestyle habits, but I don’t diagnose or treat medical conditions. For clinical concerns, I’ll recommend working with a doctor or registered dietitian alongside coaching.',
  },
  {
    question: 'Is this only for women with regular cycles?',
    answer: 'No. Cycle-aware support can include noticing energy, appetite, recovery and symptoms, and tracking is optional. It works with irregular cycles, hormonal contraception or no period at all.',
  },
  {
    question: 'How much does it cost?',
    // TODO(Mila): update once pricing is confirmed.
    answer: 'Pricing is shared personally after a short fit check, so you know exactly what’s included before you decide.',
  },
  {
    question: 'How can I get in touch?',
    answer: `Use the enquiry form below, email ${contact.email}, or send a message on Instagram at @${contact.instagramHandle}.`,
  },
];

export const enquiry = {
  heading: 'Start with a conversation',
  intro: 'Tell me a little about you. I’ll reply personally to see whether the coaching is a good fit. There’s no commitment at this stage.',
  goals: [
    'Build strength & confidence in the gym',
    'Return to training after a break',
    'Find nutrition structure without dieting',
    'Understand my energy & cycle patterns',
    'Not sure yet, I’d like to talk',
  ],
  nextStep: 'I usually reply within a few working days.', // TODO(Mila): confirm response time.
};

export const footer = {
  disclaimer: 'Coaching does not replace medical advice, diagnosis or treatment. In an emergency in Germany, call 112.',
};
