import { configureStore } from "@reduxjs/toolkit";
import auth from "./slices/auth";
import users from "./slices/users";
import roles from "./slices/roles";
import questionnaires from "./slices/questionnaires";
import exams from "./slices/exams";
import results from "./slices/results";

const store = configureStore({
  reducer: {
    results,
    exams,
    questionnaires,
    auth,
    users,
    roles,
  },
});

export default store;
