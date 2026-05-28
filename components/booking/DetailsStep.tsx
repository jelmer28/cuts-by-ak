'use client';

interface Props {
  name: string;
  phone: string;
  email: string;
  onChange: (field: 'name' | 'phone' | 'email', value: string) => void;
}

export function DetailsStep({ name, phone, email, onChange }: Props) {
  return (
    <div>
      <div className="text-[0.65rem] tracking-[0.3em] uppercase text-muted mb-5">
        Stap 03 · Jouw gegevens
      </div>
      <div className="space-y-5">
        <div>
          <label className="block text-[0.65rem] tracking-[0.25em] uppercase text-muted mb-2">
            Naam
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => onChange('name', e.target.value)}
            placeholder="Voor- en achternaam"
            className="w-full bg-transparent border-0 border-b border-line-soft text-ink py-3 text-base focus:outline-none focus:border-ink transition-colors placeholder:text-muted-dim"
          />
        </div>
        <div>
          <label className="block text-[0.65rem] tracking-[0.25em] uppercase text-muted mb-2">
            Telefoon
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => onChange('phone', e.target.value)}
            placeholder="+31 6 ..."
            className="w-full bg-transparent border-0 border-b border-line-soft text-ink py-3 text-base focus:outline-none focus:border-ink transition-colors placeholder:text-muted-dim"
          />
        </div>
        <div>
          <label className="block text-[0.65rem] tracking-[0.25em] uppercase text-muted mb-2">
            Email (optioneel)
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => onChange('email', e.target.value)}
            placeholder="je@email.nl"
            className="w-full bg-transparent border-0 border-b border-line-soft text-ink py-3 text-base focus:outline-none focus:border-ink transition-colors placeholder:text-muted-dim"
          />
        </div>
      </div>
    </div>
  );
}
