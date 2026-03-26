export function Footer() {
  return (
    <footer className="bg-[#090f15] w-full py-12 border-t border-[#dde3ec]/10">
      <div className="flex flex-col md:flex-row justify-between items-center px-8 max-w-7xl mx-auto gap-6">
        <div className="flex items-center gap-3">
          <span className="text-[#dde3ec] font-bold font-headline tracking-tighter text-xl">Tuan Le PN</span>
          <span className="w-px h-6 bg-outline-variant/30 mx-2"></span>
          <p className="text-[#b9c7e4] font-body text-xs tracking-wide uppercase">AI Systems Builder</p>
        </div>
        
        <nav className="flex gap-8">
          <a className="text-[#dde3ec]/50 hover:text-[#ddfcff] underline-offset-4 hover:underline transition-all duration-200 text-xs font-body tracking-wide" href="#">LinkedIn</a>
          <a className="text-[#dde3ec]/50 hover:text-[#ddfcff] underline-offset-4 hover:underline transition-all duration-200 text-xs font-body tracking-wide" href="#">GitHub</a>
          <a className="text-[#dde3ec]/50 hover:text-[#ddfcff] underline-offset-4 hover:underline transition-all duration-200 text-xs font-body tracking-wide" href="#architecture">Expertise</a>
          <a className="text-[#dde3ec]/50 hover:text-[#ddfcff] underline-offset-4 hover:underline transition-all duration-200 text-xs font-body tracking-wide" href="#contact">Contact</a>
        </nav>
        
        <p className="text-[#dde3ec]/50 font-body text-xs tracking-wide">
          © 2024 Tuan Le PN. Engineered for Precision.
        </p>
      </div>
    </footer>
  );
}
