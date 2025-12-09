import {
  Factory,
  Flame,
  MessageSquareQuote,
  Rss,
  SquarePercent,
  Store,
  Users,
} from "lucide-react";
import Link from "next/link";

const navbarContent = [
  { id: 1, title: "فروشگاه", url: "/shop", icon: Store },
  { id: 2, title: "پرفروش‌ترین‌ها", url: "/best-sellers", icon: Flame },
  { id: 3, title: "تخفیف‌ها", url: "/discounts", icon: SquarePercent },
  { id: 4, title: "برند‌ها", url: "/brands", icon: Factory },
  { id: 5, title: "مقالات", url: "/blogs", icon: Rss },
  { id: 6, title: "درباره‌ما", url: "/about-us", icon: Users },
  {
    id: 7,
    title: "تماس‌با‌ما",
    url: "/contact-us",
    icon: MessageSquareQuote,
  },
];

const Navbar = () => {
  return (
    <div className="inline-flex justify-start items-center gap-4 border-t border-l rounded-tl-lg py-2 px-4 max-w-full overflow-scroll">
      {navbarContent.map(({ id, title, url, icon: Icon }) => (
        <Link
          className="flex justify-center items-center gap-2 py-2 px-4 text-primary hover:bg-secondary hover:text-secondary-foreground rounded transition-colors duration-300 group text-xs md:text-sm"
          href={url}
          key={id}
        >
          <Icon className="group-hover:scale-105 duration-300" />
          {title}
        </Link>
      ))}
    </div>
  );
};

export default Navbar;
