import { Link } from "wouter";

export default function TheNavbar() {
  return (
    <div className="navbar bg-base-100">
      <Link href="/" className="btn btn-ghost normal-case text-xl">
        daisyUI
      </Link>
    </div>
  );
}
