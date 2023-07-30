import { Link } from "wouter";

export default function TheSidebar() {
  return (
    <aside>
      <ul className="menu bg-base-200 w-72 rounded-box">
        <li>
          <Link href="/async_contact_form_with_validation">
            AsyncContactFormWithValidation
          </Link>
        </li>
        <li>
          <Link href="/">2</Link>
        </li>
      </ul>
    </aside>
  );
}
