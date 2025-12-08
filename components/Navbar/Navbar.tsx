import Link from "next/link";

const navbarContent = [
  { id: 1, title: "فروشگاه", url: "/shop" },
  { id: 2, title: "پرفروش‌ترین‌ها", url: "/best-sellers" },
  { id: 3, title: "تخفیف‌ها", url: "/discounts" },
  { id: 4, title: "برند‌ها", url: "/brands" },
  { id: 5, title: "مقالات", url: "/blogs" },
  { id: 6, title: "درباره‌ما", url: "/about-us" },
  { id: 7, title: "تماس‌با‌ما", url: "/contact-us" },
];

const Navbar = () => {
  return (
    <div className="flex justify-start items-center gap-4">
      {navbarContent.map(({ id, title, url }) => (
        <Link
          className="py-2 px-4 hover:bg-primary-50 rounded transition-colors duration-300"
          href={url}
          key={id}
        >
          {title}
        </Link>
      ))}
    </div>
  );
};

export default Navbar;
