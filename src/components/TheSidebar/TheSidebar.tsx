import { Link } from "wouter";
import { links } from "../../constants";

export default function TheSidebar() {
  return (
    <aside>
      <ul className="menu bg-base-200 w-72 rounded-box">
        {Object.entries(links).map(([label, href]) => (
          <li key={label}>
            <Link href={href}>{label}</Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
