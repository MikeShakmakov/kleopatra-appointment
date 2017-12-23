import React from "react"
import {Header} from "./Header"
import styles from "./App.scss"
import {Container} from "../../components/layout/Container"
import "../../assets/styles/_global.scss"

export default class App extends React.Component {
  render() {
    return [
      <Header key="1"/>,
      <Container key="2">
        <div className="content">
            {this.props.children}
        </div>
      </Container>
    ]
  }
}