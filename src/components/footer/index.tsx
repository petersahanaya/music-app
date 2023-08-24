"use client";

import { twMerge } from "tailwind-merge";

const Footer = ({ className }: { className?: string }) => {
  return (
    <footer
      className={twMerge(`w-full mt-6 pt-8 h-max bg-black p-3 ${className}`)}
    >
      <article className="w-full grid xs:grid-cols-2 grid-cols-1 justify-items-center">
        <section className="flex flex-col items-start gap-3">
          <header className="text-xl font-[700] text-white capitalize mb-1">
            <h3>Company</h3>
          </header>
          <nav className="text-stone-500 cursor-pointer flex flex-col gap-3">
            <p className="hover:underline">About</p>
            <p className="hover:underline">Jobs</p>
            <p className="hover:underline">For the Record</p>
          </nav>
        </section>
        <section className="flex flex-col items-start gap-3">
          <header className="text-xl font-[700] text-white capitalize mb-1">
            <h3>Communities</h3>
          </header>
          <nav className="text-stone-500 cursor-pointer flex flex-col gap-3">
            <p className="hover:underline">For Artists</p>
            <p className="hover:underline">Developers</p>
            <p className="hover:underline">Advertising</p>
            <p className="hover:underline">Invertors</p>
          </nav>
        </section>
      </article>

      <article className="w-full border-t-[1px] border-t-stone-700 mt-8 pt-5 pb-8">
        <nav className="text-stone-400 cursor-pointer text-sm flex justify-around items-start">
          <p className="hover:underline">Legal</p>
          <p className="hover:underline">Privacy Center</p>
          <p className="hover:underline">Privacy Policy</p>
          <p className="hover:underline">Cookies</p>
        </nav>

        <nav className="text-stone-400 cursor-pointer text-sm hover:underline mt-6">
          <p>© {new Date(Date.now()).getFullYear()} P3Music</p>
        </nav>
      </article>
    </footer>
  );
};

export default Footer;
