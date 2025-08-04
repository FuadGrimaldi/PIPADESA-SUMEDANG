import Link from "next/link";

type BreadcrumbType = {
  to: string;
  label: string;
};

interface BreadcrumbProps {
  links: Array<BreadcrumbType>;
}

function Breadcrumb({ links }: BreadcrumbProps) {
  return (
    <nav
      className="relative py-2 text-gray-500 text-sm font-medium flex bg-white border border-gray-200 px-5 rounded-lg mb-4"
      aria-label="Breadcrumb"
    >
      <ol className="list-none p-0 inline-flex items-center">
        {links.map((link, index) => (
          <li key={link.to}>
            <span className={`${index === 0 ? "hidden" : "px-2"} `}>/</span>
            <Link
              href={link.to}
              className={
                index === links.length - 1
                  ? "text-gray-900 font-semibold"
                  : "text-gray-500 hover:text-gray-700"
              }
            >
              {link.label}
              {links.length === 1 && <span className={`px-2`}>/</span>}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export default Breadcrumb;
