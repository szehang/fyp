import { AnchorButton, Tab, TabId, Tabs, TagInput } from "@blueprintjs/core"; //AnchorButton
import * as React from "react";
import { Title } from "./Utility";
import { AddressClassProfilePanel } from "./AddressClassProfilePanel";
import { AddressProfile } from "./AddressProfile";
import { AttributeProfilePanel } from "./AttributeProfilePanel";
import { AddressComponentProfilePanel } from "./AddressComponentProfilePanel";

export class ProfilesPanel extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      tabBarTabId: "addressClass",
      currentAddressProfile: null
    }
  }

  render() {
    const divStyle = {
      backgroundColor: "rgb(226, 226, 226)",
      height: "100%",
      width: "74.5%",
      border: "1px solid black",
      float: "right",
    } as React.CSSProperties;

    const textStyle = {
      fontSize: "16px",
      padding: "5px",
    } as React.CSSProperties;

    const tabDivStyle = {
      margin: "0 5px",
      height: "100%",
      overflowY: "auto",
      overflowX: "hidden",
    } as React.CSSProperties;

    const tabStyle = {
      outline: "none",
      "&:focus": {
        outline: "none",
      },
    } as React.CSSProperties;

    return (
      <div style={divStyle}>
        <Title name="Address Profile" />
        {
          this.props.currentAddressProfileCode == "null"
          ?
            <div style={{marginTop:"50%", display: "flex", alignItems:"center", justifyContent:"center", flexDirection:"column",}}>
              <div>Please select an activated address profile first</div>
            </div>
          :
            this.props.currentAddressProfileCode != "null" && this.props.currentAddressProfile == null
            ?
            <div style={{marginTop:"50%", display: "flex", alignItems:"center", justifyContent:"center", flexDirection:"column",}}>
              <div style={{marginBottom:"5px"}}>Please activate the address profile first</div>
              <AnchorButton onClick={()=>{this.props.activateAddressProfile(this.props.currentAddressProfileCode)}} intent="success" icon="tick-circle" text="Activate Profile" />
            </div>
            :
            <div style={tabDivStyle}>
              <Tabs
                id="AddressProfileTabs"
                animate={true}
                onChange={this.handleTabChange}
                selectedTabId={this.state.tabBarTabId}
                large={true}
              >
                <Tab id="addressClass" title="Address Class Profiles" panel={<AddressClassProfilePanel currentAddressProfile={this.props.currentAddressProfile} changeStateHandler={this.props.changStateHandler}/>} style={tabStyle} />
                <Tab id="addressComponent" title="Address Component Profiles" panel={<AddressComponentProfilePanel currentAddressProfile={this.props.currentAddressProfile} changeStateHandler={this.props.changStateHandler}/>} style={tabStyle} />
                <Tab id="attribute" title="Attribute Profiles" panel={<AttributeProfilePanel currentAddressProfile={this.props.currentAddressProfile} changeStateHandler={this.props.changStateHandler} />} style={tabStyle} /> 

                <Tabs.Expander />
              </Tabs>
            </div>
        }
      </div>
    );

  }

  private handleTabChange = (tabId: TabId) => {
    this.setState({ tabBarTabId: tabId });
  }
}

export interface ProfilesPanelProps {
  currentAddressProfileCode: string,
  currentAddressProfile: AddressProfile,
  changeStateHandler: any,
  activateAddressProfile: any,
}