import React, { useEffect, useState } from "react";
import { Title } from "./Utility"; //DropDown
import * as iso3166code from "./iso3166code"
import { AddressProfile } from "./AddressProfile";
import { AnchorButton, InputGroup } from "@blueprintjs/core";
import log from "electron-log"

Object.assign(console, log);


export class AddressProfilePanel extends React.Component<any, any> {

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
          <div>{this.props.currentAddressProfileCode}</div>

          <br/>

          <span style={{fontWeight: "bold"}}>A.I. Address Parser</span>
          <br/>
          <AddressParser />

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

class AddressParser extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      parserInput: "casa del gelato, 10A 24-26 high street road mount waverley vic 3183",
      parserResult: {},
    }
  }

  componentDidMount() {

  }

  async getParsedAddress(address:string) {
    console.log(`Sending ${address} to Server...`);

    // Simple POST request with a JSON body using fetch
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({ address: address })
    };
    const url = "http://34.92.169.157:8080/"

    const response = await fetch(url, requestOptions);
    const data =await response.json();
    this.setState({parserResult: data});

    console.log("Finish")

  }
  
  
  render() {
    const handleParserSubmit = (ev:any) => {      
      this.getParsedAddress(this.state.parserInput);
    }


    return(
      <>
      <InputGroup 
        placeholder="Enter your address..."
        onChange={(event:any)=>{this.setState({parserInput: event.target.value})}}
        fill={true}
        type="text"
        value={this.state.parserInput}
      />
      <AnchorButton text="GO"  intent="primary" icon="comment" fill={true} onClick={handleParserSubmit} />

        {JSON.stringify(this.state.parserResult, null, 2)}

      <br/>
      </>
    )
  }
}

export interface AddressProfileSelectProps {
  currentAddressProfileCode: string
  changeAddressProfile: any
  currentAddressProfile: AddressProfile
  handleTogglePanel: any
}