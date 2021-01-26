import * as React from "react";
import {
  Tab,
  TabId,
  Tabs,
} from "@blueprintjs/core";

//small components
function Title(props: any) {
  const divStyle = {
    backgroundColor: "rgb(69, 156, 145)",
    color: "rgb(255, 255, 255)",
    height: "19px",
    fontSize: "16px",
    width: "100%",
    paddingLeft: "5px",
  } as React.CSSProperties;

  return (<div style={divStyle}>{props.name}</div>);
}

function DropDown(props: any) {
  const divStyle = {
    height: "24px",
    fontSize: "18px",
    width: "90%",
  } as React.CSSProperties;

  const makeItem = function (x: string) {
    return <option value={x}>{x}</option>
  }
  return <select style={divStyle}>{props.data.map(makeItem)}</select>
}

class ProfileSettingDiv extends React.Component {
  render() {
    const divStyle = {
      backgroundColor: "rgb(226, 226, 226)",
      height: "100%",
      width: "25.4%",
      border: "1px solid black",
      float: "left",
    } as React.CSSProperties;

    const textStyle = {
      fontSize: "16px",
      padding: "5px",
    } as React.CSSProperties;

    return (
      <div style={divStyle}>
        <Title name="Profile Setting" />
        <div style={textStyle}>
          Set Address Profile Country:
        <br />
          <DropDown data={["HKG", "ABW", "AFG", "GLP", "IDN", "USA"]} />
        </div>
      </div>
    );
  }
}

//main components
class AddressProfileDiv extends React.Component {
  state = {
    tabBarTabId: "addressClass",
    currentAddressProfile: null
  }

  render() {
    const divStyle = {
      backgroundColor: "rgb(226, 226, 226)",
      height: "100%",
      width: "74.5%",
      border: "1px solid black",
      float: "right",
    } as React.CSSProperties;

    const textStyle = {
      fontSize: "16px",
      padding: "5px",
    } as React.CSSProperties;

    return (
      <div style={divStyle}>
        <Title name="Address Profile" />
        <Tabs
          id="TabsExample"
          animate={true}
          onChange={this.handleTabChange}
          selectedTabId={this.state.tabBarTabId}
        >
          <Tab id="addressClass" title="Address Class Profiles" panel={<div style={textStyle}>1</div>} />
          <Tab id="addressComponent" title="Address Component Profiles" panel={<div style={textStyle}>2</div>} />
          <Tab id="attribute" title="Attribute Profiles" panel={<div style={textStyle}>3</div>} />
          <Tabs.Expander />
        </Tabs>
      </div>
    );

  }

  private handleTabChange = (tabId: TabId) => {
    this.setState({ tabbarTabId: tabId });
    console.log("tabId: " + tabId);
  }
}

class Container extends React.Component {
  render() {
    const divStyle = {
      backgroundColor: "rgb(0, 0, 0)",
      width: "100%",
      height: "100%",
      top: "10px",
      margin: "auto",
      verticalAlign: "middle",
    } as React.CSSProperties;

    return (
      <div style={divStyle}>
        <ProfileSettingDiv />
        <AddressProfileDiv />
      </div>
    );
  }
}

export default function () {
  return (
    <>
      <Container />
    </>
  );
}