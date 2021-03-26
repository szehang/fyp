import React, { useEffect, useState } from "react";
import { Title } from "./Utility"; //DropDown
import * as iso3166code from "./iso3166code"
import { AddressProfile } from "./AddressProfile";
import { Alignment, AnchorButton, Checkbox, Icon, InputGroup } from "@blueprintjs/core";
import log from "electron-log"

Object.assign(console, log);


export class AddressProfilePanel extends React.Component<any, any> {

  constructor(props:any) {
    super(props);
    this.state = {
      isParserWindowOpen: false,
    }
  }

  render() {
    const divStyle = {
      backgroundColor: "rgb(226, 226, 226)",
      height: "100%",
      width: "25.5%",
      float: "left",
    } as React.CSSProperties;

    const contentStyle = {
      fontSize: "16px",
      margin: "0 5px",
      padding: "11px",
    } as React.CSSProperties;

    const backDivStyle = {
      position: "absolute",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      backgroundColor: "black",
      opacity: "50%",
      zIndex: "998",
    }

    const handleParserOpen = () => {
      this.setState({
        isParserWindowOpen: !this.state.isParserWindowOpen,
      })
    }

    return (
      <div style={divStyle}>
        <Title name="Profile Setting" />
        <div style={contentStyle}>
          <span style={{fontWeight: "bold"}}>Set Address Profile Country:</span>
          <br />
          <AddressProfileSelect 
              currentAddressProfileCode={this.props.currentAddressProfileCode}
              changeAddressProfile={this.props.changeAddressProfile}
              currentAddressProfile={this.props.currentAddressProfile}
              handleTogglePanel = {this.props.handleTogglePanel}
          />
          <div>{this.props.currentAddressProfileCode!="null"?this.props.currentAddressProfileCode:""}</div>
        </div>

      </div>
    );
  }
}

class AddressProfileSelect extends React.Component<AddressProfileSelectProps> {
  handleSelectOnChange = (event) => {
    this.props.changeAddressProfile(event.target.value);
    this.props.handleTogglePanel();
  }

  render() {
      const selectStyle = {
        width: "100%",
        borderRadius: "5px",
        border: "0",
        background: "#FFFFFF",
        padding: "10px",
        marginTop: "10px",
      } as React.CSSProperties;

    return(
        <select style={selectStyle} onChange={ (event) => this.handleSelectOnChange(event) } value={this.props.currentAddressProfileCode}>
            <option value={"null"}>{"Select Address Profile"}</option>
            {
                iso3166code.Countries.map((country)=>(
                    <option key={country["alpha-3"]} value={country["alpha-3"]}>
                        {country.name}
                        {" "}
                        {country["alpha-3"]}
                    </option>
                ))
            }
        </select>
    );
  }
}

export interface AddressProfileSelectProps {
  currentAddressProfileCode: string
  changeAddressProfile: any
  currentAddressProfile: AddressProfile
  handleTogglePanel: any
}