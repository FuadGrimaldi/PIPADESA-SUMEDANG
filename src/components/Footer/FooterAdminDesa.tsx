"use client";

export default function AdminDesaFooter() {
  return (
    <footer className="border-t border-gray-200 bg-white shadow-sm mt-6">
      <div className="max-w-(--breakpoint-2xl) mx-auto px-4 py-3 md:flex md:items-center md:justify-between text-sm text-gray-500">
        <p className="text-center md:text-left">
          &copy; {new Date().getFullYear()} Diskominfosanditik Kabupaten
          Sumedang. All rights reserved.
        </p>
        <div className="flex justify-center md:justify-end space-x-4 mt-2 md:mt-0">
          <a
            href="#"
            className="hover:text-gray-700 transition-colors duration-200"
          >
            Privacy
          </a>
          <a
            href="#"
            className="hover:text-gray-700 transition-colors duration-200"
          >
            Terms
          </a>
          <a
            href="#"
            className="hover:text-gray-700 transition-colors duration-200"
          >
            Help
          </a>
        </div>
      </div>
    </footer>
  );
}
