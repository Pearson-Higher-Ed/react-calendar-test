/* eslint react/no-danger: 0 */
import React, { Component } from "react";

import { createHistory } from "history";

import Prism from "./vendors/prism";
import "./vendors/prism.css";


import SimpleCalendar from "./examples/SimpleCalendar";


const history = createHistory();

const EXAMPLES = {
  simple: {
    title: "Calendar",
    description: "This calendar shows the clicked day in an alert dialog.",
    Component: SimpleCalendar
  }
};


export default class Examples extends Component {

  state = {
    currentExample: "simple",
    showNavBar: false
  };

  componentDidMount() {
    this.unlistenHistory = history.listen(::this.handleHistoryChange);
  }

  componentDidUpdate() {
    Prism.highlightAll();
  }

  componentWillUnmount() {
    this.unlistenHistory();
  }

  handleHistoryChange({ hash }) {
    const currentExample = hash.replace("#", "");
    if (currentExample in EXAMPLES) {

      this.setState({ currentExample, showNavBar: false }, () => window.scrollTo(0, 0));
    }
  }

  renderNavBarExamples() {
    const links = [];
    const { currentExample } = this.state;
    for (const exampleName in EXAMPLES) {
      links.push(
        <a
          href={`#${exampleName}`}
          key={ exampleName }
          className={currentExample === exampleName ? "selected" : ""}>
          { EXAMPLES[exampleName].title }
        </a>
      );
    }

    return <div className="NavBar-links">{ links }</div>;
  }

  render() {
    const { currentExample, showNavBar } = this.state;

    const ExampleComponent = EXAMPLES[currentExample].Component;

    return (
      <div>
        <div className="NavBar-toggle" onClick={ () => { this.setState({ showNavBar: !showNavBar })}} />
        <div className="Header">
        
        </div>
        <div className={ `Content${showNavBar ? " navbar-is-visible" : ""}` }>



          <div className="Examples">
            <h2>
                { EXAMPLES[currentExample].title }
            </h2>

            <div className="Example">

              <div className="Example-Result">
                <ExampleComponent />
              </div>

            </div>
          </div>
        </div>
      </div>

    );
  }

}
