import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Header } from "./components/Header";
import {
  Courses,
  CourseDetail,
  CreateCourse,
  UpdateCourse,
  UserSignUp,
  UserSignIn,
  UserSignOut,
  Error,
  Forbidden,
  NotFound,
} from "./pages";
import { PrivateRoute } from "./routes/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={Courses} />
          <PrivateRoute
            exact
            path="/courses/create"
            component={CreateCourse}
          />
          <Route exact path="/courses/:id" component={CourseDetail} />
          <PrivateRoute
            exact
            path="/courses/:id/update"
            component={UpdateCourse}
          />
          <Route exact path="/signin" component={UserSignIn} />
          <Route exact path="/signup" component={UserSignUp} />
          <Route exact path="/signout" component={UserSignOut} />
          <Route path="/error" component={Error} />
          <Route path="/forbidden" component={Forbidden} />
          <Route paht="/notfound" component={NotFound} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
