import { Route } from "wouter";
import TheNavbar from "./components/TheNavbar/TheNavbar.tsx";
import Example from "./components/AsyncContactFormWithValidation.tsx";

export default function App() {
  return (
    <>
      <TheNavbar />
      <div className="flex">
        <aside>
          <ul className="menu bg-base-200 w-24 rounded-box">
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Item 2</a>
            </li>
          </ul>
        </aside>
        <Route path="/">
          <Example />
        </Route>
      </div>
    </>
  );
}
