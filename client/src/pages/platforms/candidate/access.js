import Dashboard from "./dashboard";
import Exams from "./exams";
import Results from "./results";

const access = [
  {
    name: "Dashboard",
    icon: "tachometer-alt",
    path: "/dashboard",
    component: Dashboard,
  },
  {
    name: "Exams",
    icon: "chalkboard",
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
