// @flow
import React, { Component } from "react";
import type { Element } from 'react';
import { View, ScrollView } from "react-native";

// Import the module you are testing
import Module from './presentational/CAHeader'

type PlaygroundProps = {}
type Playgroundstate = { content: Array<Element<any>> };

/* =============================================================================
<Playground />
Use in App.js swapp in to load instead of the actual app
--------------------------------------------------------------------------------
Playground View used for visual debuging
Allows you to visualise a component under different conditions.
For example, a button component might have a default style, but also styles for
tapped, busy doing a task, completed a task, etc.
============================================================================= */
class Playground extends Component<PlaygroundProps, Playgroundstate> {

  constructor() {
    super();
    const content = [];
    const define = (name: string, render: Function) => {
      content.push(<Example key={name} render={render} />);
    };

    Module.__cards__(define);
    this.state = { content };
  }

  render() {
    return (
      <ScrollView style={{ flex: 1 }}>
        {this.state.content}
      </ScrollView>
    );
  }
}


type ExampleProps = { render: Function }
type ExampleState = { inner: any };

class Example extends Component<ExampleProps, ExampleState> {
  state = {
    inner: null
  };

  render() {
    const content = this.props.render(this.state.inner, inner =>
      this.setState({ inner })
    );
    return <View>{content}</View>;
  }
}

/* Export
============================================================================= */
export default Playground;
