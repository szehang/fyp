import * as React from "react";
import { ProfilesPanel } from "./ProfilesPanel";
import { AddressProfilePanel } from "./AddressProfilePanel";


class Container extends React.Component {
  constructor(props:any) {
    super(props);
    this.state = {
      currentAddressProfile: null,
    };
  }

  changeAddressProfile = (addressProfile) => {
    this.setState({currentAddressProfile: addressProfile});
  }

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
        <AddressProfilePanel changeAddressProfile={this.changeAddressProfile} data={this.state}/>
        <ProfilesPanel />
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