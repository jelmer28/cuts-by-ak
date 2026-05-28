export default function Footer() {
  return (
    <footer className="bg-black text-white border-t border-neutral-900 px-6 py-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 pb-16">
          <div className="flex flex-col gap-7">
            <div className="text-6xl md:text-8xl italic font-light tracking-tight">
              Cuts by <span className="not-italic font-bold">AK</span>
            </div>

            <p className="text-neutral-500 text-sm leading-7 max-w-sm">
              Premium barber uit Heerenveen.
              <br />
              Moderne cuts, fades en echte kwaliteit.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 pt-4">
            <div className="flex flex-col gap-3">
              <div className="text-[10px] tracking-[0.35em] uppercase text-neutral-700 border-b border-neutral-900 pb-3 mb-2">
                Contact
              </div>

              <a
                href="tel:+31630521857"
                className="text-sm text-neutral-200 hover:text-white transition"
              >
                +31 6 30521857
              </a>

              <a
                href="https://wa.me/31630521857"
                className="text-sm text-neutral-200 hover:text-white transition"
              >
                WhatsApp
              </a>

              <div className="text-sm text-neutral-500 leading-6">
                Herenwal 72
                <br />
                8841 BB Heerenveen
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div className="text-[10px] tracking-[0.35em] uppercase text-neutral-700 border-b border-neutral-900 pb-3 mb-2">
                Openingstijden
              </div>

              <div className="text-sm text-neutral-500">
                Ma — Wo · 12:00 — 18:00
              </div>

              <div className="text-sm text-neutral-500">
                Do · 10:00 — 18:00
              </div>

              <div className="text-sm text-neutral-500">
                Vr · 12:00 — 18:00
              </div>

              <div className="text-sm text-neutral-500">
                Za — Zo · Gesloten
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-neutral-900 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] tracking-[0.25em] uppercase text-neutral-600">
          <div>© 2026 Cuts by AK</div>
          <div>Heerenveen · NL</div>
        </div>
      </div>
    </footer>
  );
}