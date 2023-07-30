import { Route } from "wouter";
import TheNavbar from "./components/TheNavbar/TheNavbar.tsx";
import AsyncContactFormWithValidation from "./components/AsyncContactFormWithValidation/AsyncContactFormWithValidation.tsx";
import TheSidebar from "./components/TheSidebar/TheSidebar.tsx";

export default function App() {
  return (
    <>
      <TheNavbar />
      <div className="flex">
        <TheSidebar />
        <div className="px-4 flex-1">
          <Route path="/async_contact_form_with_validation">
            <AsyncContactFormWithValidation />
          </Route>
          <Route path="/2">
            <div>2</div>
          </Route>
        </div>
      </div>
    </>
  );
}
