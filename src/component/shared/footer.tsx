const FoterPage = () => {
  return (
    <footer className="w-full bg-[#0B0D10] border-t border-[#20242A] text-[#8D949E] px-6 py-6">

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">

        {/* ========================LEFT */}
        <div className="flex items-center gap-3">

          <div className="w-8 h-8 rounded-lg bg-[#B7FF00] flex items-center justify-center">
            <span className="text-[#0B0D10] font-bold text-xs">
              F
            </span>
          </div>

          <p className="text-xs">
            Copyright © {new Date().getFullYear()} - All rights reserved
          </p>

        </div>

        {/* ========================RIGHT */}
        <div className="flex items-center gap-5">

          <a
            href="#"
            className="text-xs hover:text-[#B7FF00] transition"
          >
            Twitter
          </a>

          <a
            href="#"
            className="text-xs hover:text-[#B7FF00] transition"
          >
            YouTube
          </a>

          <a
            href="#"
            className="text-xs hover:text-[#B7FF00] transition"
          >
            Facebook
          </a>

        </div>

      </div>

    </footer>
  );
};

export default FoterPage;