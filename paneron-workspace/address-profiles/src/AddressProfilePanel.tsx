import React from "react";
import { Title } from "./Utility"; //DropDown
import * as iso3166code from "./iso3166code"
import { AddressProfile } from "./AddressProfile";


export class AddressProfilePanel extends React.Component<any, any> {
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
      padding: "11px",
    } as React.CSSProperties;

    return (
      <div style={divStyle}>
        <Title name="Profile Setting" />
        <div style={contentStyle}>
          Set Address Profile Country:
          <br />
          <AddressProfileSelect 
              currentAddressProfileCode={this.props.currentAddressProfileCode}
              changeAddressProfile={this.props.changeAddressProfile}
              currentAddressProfile={this.props.currentAddressProfile}
          />
        </div>
      </div>
    );
  }
}

class AddressProfileSelect extends React.Component<AddressProfileSelectProps> {
constructor(props){
  super(props)
  this.state={
    
  }
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
          <select style={selectStyle} onChange={ (event) => this.props.changeAddressProfile(event.target.value) } value={this.props.currentAddressProfileCode}>
              <option value={null}>{"Select Address Profile"}</option>
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
}