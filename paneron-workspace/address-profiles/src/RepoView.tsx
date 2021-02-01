import * as React from "react";
import { ProfilesPanel } from "./ProfilesPanel";
import { AddressProfilePanel } from "./AddressProfilePanel";


class Container extends React.Component<any, any> {
  constructor(props:any) {
    super(props);
    this.state = {
      currentAddressProfileCode: null,
      // addressProfiles: ,
    };
  }

  changeAddressProfile = (addressProfileCode:any) => {
    this.setState({currentAddressProfileCode: addressProfileCode});
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
        <ProfilesPanel data={this.state}/>
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