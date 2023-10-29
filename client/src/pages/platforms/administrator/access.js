import Dashboard from "./dashboard";
import Questionnaires from "./questionnaires";
import Exams from "./exams";
import Users from "./users";
import Results from "./results";

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
  {
    name: "Users",
    icon: "users",
    path: "/users",
    children: [
      {
        name: "Moderators",
        path: "/moderators",
        component: Users,
        props: {
          title: "Moderators",
          hide: "647dd2a5dced91b0b39444b5",
          action: "Demote",
        },
      },
      {
        name: "Candidates",
        path: "/candidates",
        component: Users,
        props: {
          title: "Candidates",
          hide: "647dd2a5dced91b0b39444b4",
          action: "Promote",
        },
      },
      {
        name: "Deactivated",
        path: "/deactivated",
        component: Users,
        props: {
          title: "Deactivated Users",
          inactive: true,
        },
      },
    ],
  },
];

export default access;
