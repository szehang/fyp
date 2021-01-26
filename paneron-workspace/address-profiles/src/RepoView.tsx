import * as React from "react";
import { AddressProfileDiv } from "./AddressProfileDiv";
import { ProfileSettingDiv } from "./ProfileSettingDiv";


class Container extends React.Component {
  constructor(props:any) {
    super(props);
    this.state = {
      currentAddressProfile: null,
    }
  }

  changeAddressProfile = (addressProfile) => {
    this.setState({currentAddressProfile: addressProfile});
  }

  changeText = (text:string) => {
    this.setState({text:text});
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
        <ProfileSettingDiv changeAddressProfile={this.changeAddressProfile} data={this.state}/>
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