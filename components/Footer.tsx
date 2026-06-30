export default function Footer() {
  return (
    <footer className="w-full py-12 border-t border-white/5 bg-[#121212] relative z-10 flex flex-col md:flex-row items-center justify-between px-6 md:px-12">
      <div className="text-white/40 text-sm font-medium tracking-wide mb-4 md:mb-0">
        &copy; {new Date().getFullYear()}
      </div>
      
      <div className="text-white/40 text-sm flex items-center gap-2">
        <span>Designed & Developed by</span>
        <span className="text-white font-bold tracking-widest uppercase">Surender S</span>
      </div>
    </footer>
  );
}
