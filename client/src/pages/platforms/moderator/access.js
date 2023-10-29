import Dashboard from "./dashboard";
import Questionnaires from "../administrator/questionnaires";
import Exams from "../administrator/exams";
import Results from "../administrator/results";

const access = [
  {
    name: "Dashboard",
    icon: "tachometer-alt",
    path: "/dashboard",
    component: Dashboard,
  },
  {
    name: "Questionnaires",
    icon: "chalkboard",
    path: "/questionnaires",
    component: Questionnaires,
  },
  {
    name: "Exams",
    icon: "book-open",
    path: "/exams",
    component: Exams,
  },
  {
    name: "Results",
    icon: "poll",
    path: "/results",
    component: Results,
  },
];

export default access;
