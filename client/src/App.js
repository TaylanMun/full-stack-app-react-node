import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Header } from "./components/Header";
import {
  CoursesPage,
  CourseDetailsPage,
  CreateCoursePage,
  UpdateCoursePage,
  SignUpPage,
  SignInPage,
  ErrorPage,
  ForbiddenPage,
  NotFoundPage,
} from "./pages";
import { PrivateRoute } from "./routes/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={CoursesPage} />
          <PrivateRoute
            exact
            path="/courses/create"
            component={CreateCoursePage}
          />
          <Route exact path="/courses/:id" component={CourseDetailsPage} />
          <PrivateRoute
            exact
            path="/courses/:id/update"
            component={UpdateCoursePage}
          />
          <Route exact path="/sign-in" component={SignInPage} />
          <Route exact path="/sign-up" component={SignUpPage} />
          <Route path="/error" component={ErrorPage} />
          <Route path="/forbidden" component={ForbiddenPage} />
          <Route paht="/not-found" component={NotFoundPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
