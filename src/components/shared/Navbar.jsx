const Navbar = ({ children }) => {
  return (
    <div className="relative">
      <div className="h-[70px] font-PlaywritePl font-extrabold text-3xl bg-custom-gradient text-white sticky top-0 flex items-center justify-center z-50">
        PingPod
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          {children}
        </div>
      </div>
    </div>
  );
};
export default Navbar;
