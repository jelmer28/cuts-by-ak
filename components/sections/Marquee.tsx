'use client';

const items = ['Skin Fades', 'Beard Trims', 'Sharp Lines', 'Hot Towel', 'Modern Cuts', 'Kids Cuts'];

export function Marquee() {
  // Duplicate for seamless loop
  const all = [...items, ...items];

  return (
    <div className="bg-bg border-t border-b border-line py-6 overflow-hidden">
      <div className="flex gap-16 animate-marquee whitespace-nowrap font-display italic text-2xl font-normal text-muted">
        {all.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-16">
            {item}
            <span className="text-muted-dim not-italic text-[0.6rem]">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
