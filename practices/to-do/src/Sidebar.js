import React, { Component } from 'react';

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }
  render() {
    return <nav>
      <ul className="sidebar__cont">
        {
          this.props.tabs.map((tab, i) => <li className="sidebar__item" key={i}>
            <a onClick={_ => this.props.goto(i)} href={tab.href}>{tab.content}</a>
          </li>)
        }
      </ul>
    </nav>;
  }
}

export default Sidebar;