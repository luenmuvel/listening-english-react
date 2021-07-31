import { BrowserRouter as Router, Route } from "react-router-dom";
import Footer from "./components/footer/footer.component";
import Header from "./components/header/header.component";
import Register from "./components/register/register.component";
import Dashboard from "./components/dashboard/dashboard";
import Sound from "./components/sound/sound";
import Playground from "./components/playground/Playground";
import Dictionary from "./components/dictionary/Dictionary";
import Grammar from "./components/grammar/Grammar";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import "./styles.css";

export const App = () => {
  return (
    <>
      <Router>
        <Header />
        <div className="container">
          <Route exact path="/" component={Dashboard} />
          <Route path="/register" component={Register} />
          <Route path="/grammar" component={Grammar} />
          <Route path="/sound/:id" component={Sound} />
          <Route path="/playground/:id" component={Playground} />
          <Route path="/dictionary/:id" component={Dictionary} />
        </div>
        <Footer />
      </Router>
    </>
  );
};
