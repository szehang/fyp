import React, { useEffect, useState } from "react";
import { Title } from "./Utility"; //DropDown
import * as iso3166code from "./iso3166code"
import { AddressProfile } from "./AddressProfile";
import { Alignment, AnchorButton, Checkbox, Icon, InputGroup } from "@blueprintjs/core";
import log from "electron-log"

Object.assign(console, log);


export class AddressProfilePanel extends React.Component<any, any> {

  constructor(props) {
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
          <div>{this.props.currentAddressProfileCode}</div>

          <br/>

          <span style={{fontWeight: "bold"}}>Utilities</span>
          <br/>
          {/* <AddressParser /> */}
          <AnchorButton text="A.I. Address Parser"  intent="primary" icon="comment" fill={true} onClick={handleParserOpen} />
          {this.state.isParserWindowOpen
            ? <>
              <div style={backDivStyle}></div>
              <AddressParserWindow parserOpenHandler={handleParserOpen} />
              </>
            : <></>
          }
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

class AddressParserWindow extends React.Component<any> {
  constructor(props) {
    super(props);
    this.state = {
      parserInput: "casa del gelato, 10A 24-26 high street road mount waverley vic 3183",
      parserResult: {},
      selectedAttribute: [],
      isSpinning: false,
    }
  }

  async getParsedAddress(address:string) {
    console.log(`Sending ${address} to Server for parsing...`);

    // Simple POST request with a JSON body using fetch
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({ address: address })
    };
    const url = "http://34.92.169.157:8080/"

    const response = await fetch(url, requestOptions);
    const data =await response.json();
    this.setState({parserResult: data, isSpinning: false});
  }

  render() {
    const mainDivStyle = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "white",
        width: "60%",
        borderRadius: "20px",
        padding: "15px 25px",
        zIndex: "999",
    };

    const parserTable = {
      textAlign: "left",
      width: "100%",
    }

    const parserFormStyle = {
      
    } as React.CSSProperties;

    const handleParserSubmit = (ev:any) => {      
      this.setState({isSpinning: true}); // Start the spinner
      this.setState({selectedAttribute: []}) // Clear the array in case of re-search

      this.getParsedAddress(this.state.parserInput);
    }

    const handleCloseWindow = (ev:any) => {
      this.props.parserOpenHandler();
    }

    const handleCreateSelected = () => {
      // to be done
      console.log(this.state.selectedAttribute)

    }

    const handleSelectAttribute = (ev:any) => {
      const index = this.state.selectedAttribute.indexOf(ev.target.value);

      // if the selected is not yet in the state
      if (index === -1) {
        this.setState({
          selectedAttribute: [...this.state.selectedAttribute, ev.target.value]
        })
      }else {
        let copy = [...this.state.selectedAttribute];
        copy.splice(index, 1);
        this.setState({selectedAttribute: copy});
      }
    }

    return(
      <div style={mainDivStyle}>
        <div>
          <span style={{fontWeight: "bold", fontSize: "1.3rem"}}>A.I. Address Parser</span>
          <span style={{float: "right", cursor: "pointer"}}><Icon icon="cross" intent="danger" iconSize={25} onClick={handleCloseWindow} /></span>
        </div>

        <hr/>
        
        <div style={parserFormStyle}>
          <span style={{fontWeight: "bold"}}>Enter your address in ENGLISH</span>
          <br/>
          <InputGroup 
            placeholder="Enter your address..."
            onChange={(event:any)=>{this.setState({parserInput: event.target.value})}}
            fill={true}
            type="text"
            value={this.state.parserInput}
          />
          <AnchorButton text="Parse" intent="primary" icon="direction-right" loading={this.state.isSpinning} fill={true} onClick={handleParserSubmit} />
        </div>

        {/* <pre>{JSON.stringify(this.state.parserResult, null, 2)}</pre> */}
        {Object.keys(this.state.parserResult).length !== 0
          ?
            <div>
              <table style={parserTable}>
                <thead>
                  <tr>
                    <th></th>
                    <th>Attribute Type</th>
                    <th>Attribute Value</th>
                  </tr>
                </thead>
                {
                  Object.keys(this.state.parserResult).map((key) => (
                    <tr>
                      <td style={{display: "inline-block"}}><input type="checkbox" name={key} value={key} onChange={handleSelectAttribute} /></td>
                      <td>{key}</td>
                      <td>{this.state.parserResult[key]}</td>
                    </tr>
                  ))
                }
              </table>
            <AnchorButton text="Create Selected Attribute Profile" intent="success" icon="new-object" fill={true} onClick={handleCreateSelected} />

            </div>
          :<></>
        }
      </div>
    )
  }
}

export interface AddressProfileSelectProps {
  currentAddressProfileCode: string
  changeAddressProfile: any
  currentAddressProfile: AddressProfile
  handleTogglePanel: any
}