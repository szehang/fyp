import React from "react";
import { AddressProfileSelect } from "./AddressProfileSelect";
import { DropDown, Title } from "./Utility";

export class ProfileSettingDiv extends React.Component {
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
            {/* <DropDown data={["HKG", "ABW", "AFG", "GLP", "IDN", "USA"]} /> */}
            <AddressProfileSelect 
                changeAddressProfile={this.props.changeAddressProfile}
                data={this.props.data}
            />
            </div>
            <div>{this.props.data.currentAddressProfile}</div>
            {/* <button onClick={ () => this.props.changeAddressProfile("HK") }>{this.props.currentAddressProfile}</button> */}   
        </div>
      );
    }
  }