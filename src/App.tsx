import { Route } from "wouter";
import TheNavbar from "./components/TheNavbar/TheNavbar.tsx";
import TheSidebar from "./components/TheSidebar/TheSidebar.tsx";
import ValtioBasics from "./pages/ValtioBasics/ValtioBasics.tsx";
import { links } from "./constants.ts";
import CopyTextarea from "./pages/CopyTextarea/CopyTextarea.tsx";
import ReactHookForm from "./pages/ReactHookForm/ReactHookForm.tsx";

export default function App() {
  return (
    <>
      <TheNavbar />
      <div className="flex">
        <TheSidebar />
        <div className="px-4 flex-1">
          <Route path={links["React Hook Form"]}>
            <ReactHookForm />
          </Route>
          <Route path={links["Valtio Basics"]}>
            <ValtioBasics />
          </Route>
          <Route path={links.Copy}>
            <CopyTextarea />
          </Route>
        </div>
      </div>
    </>
  );
}
