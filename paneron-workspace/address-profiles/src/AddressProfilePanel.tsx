import React from "react";
import { AddressProfileSelect } from "./AddressProfileSelect";
import { DropDown, Title } from "./Utility";

export class AddressProfilePanel extends React.Component {
    render() {
      const divStyle = {
        backgroundColor: "rgb(226, 226, 226)",
        height: "100%",
        width: "25.4%",
        border: "1px solid black",
        float: "left",
      } as React.CSSProperties;
  
      const contentStyle = {
        fontSize: "16px",
        margin: "0 5px",
      } as React.CSSProperties;
  
      return (
        <div style={divStyle}>
          <Title name="Profile Setting" />
          <div style={contentStyle}>
            Set Address Profile Country:
            <br />
            <AddressProfileSelect 
                changeAddressProfile={this.props.changeAddressProfile}
                data={this.props.data}
            />
            <div>{this.props.data.currentAddressProfile}</div>
          </div>
        </div>
      );
    }
  }