import * as React from "react";

function Title(props: any) {
  const divStyle = {
    backgroundColor: "rgb(69, 156, 145)",
    color: "rgb(255, 255, 255)",
    height: "17px",
    fontSize: "16px",
    width: "100%",
  }

  return (<div style={divStyle}>{props.name}</div>);
}

class ProfileSettingDiv extends React.Component {
  render() {
    const divStyle = {
      backgroundColor: "rgb(255, 255, 255)",
      height: "100%",
      width: "25.4%",
      border: "1px solid black",
      float: "left",
    }

    return (
      <div style={divStyle}>
        <Title name="Profile Setting" />
        Profile Setting
      </div>
    );
  }
}

class AddressProfileDiv extends React.Component {
  render() {
    const divStyle = {
      backgroundColor: "rgb(255, 255, 255)",
      height: "100%",
      width: "74.5%",
      border: "1px solid black",
      float: "right",
    }

    return (
      <div style={divStyle}>
        <Title name="Address Profile" />
        Address Profile
      </div>
    );
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
    }

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