// Business config — single source of truth
export const BUSINESS = {
  name: 'Cuts by AK',
  city: 'Heerenveen',
  address: {
    street: 'Herenwal 72',
    postal: '8841 BB',
    city: 'Heerenveen',
  },
  phone: '+31630521857',
  phoneDisplay: '+31 6 30521857',
  email: 'info@cutsbyak.nl',
  instagram: 'https://instagram.com/cutsbyak',
  whatsapp: 'https://wa.me/31630521857',
} as const;

// Opening hours by weekday (0 = Sunday, 6 = Saturday)
// null = closed
export const OPENING_HOURS: Record<number, { open: string; close: string } | null> = {
  0: null, // Sunday closed
  1: { open: '12:00', close: '18:00' }, // Monday
  2: { open: '12:00', close: '18:00' }, // Tuesday
  3: { open: '12:00', close: '18:00' }, // Wednesday
  4: { open: '10:00', close: '18:00' }, // Thursday
  5: { open: '12:00', close: '18:00' }, // Friday
  6: null, // Saturday closed
};

export const DAY_NAMES_NL = [
  'Zondag', 'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag',
] as const;

export const DAY_NAMES_SHORT = ['ZO', 'MA', 'DI', 'WO', 'DO', 'VR', 'ZA'] as const;

export const MONTH_NAMES_SHORT = [
  'jan', 'feb', 'mrt', 'apr', 'mei', 'jun',
  'jul', 'aug', 'sep', 'okt', 'nov', 'dec',
] as const;

// Slot interval in minutes
export const SLOT_INTERVAL = 30;
