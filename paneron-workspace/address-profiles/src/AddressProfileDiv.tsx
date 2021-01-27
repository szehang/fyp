import { AnchorButton, Tab, TabId, Tabs } from "@blueprintjs/core";
import * as React from "react";
import { Title } from "./Utility";

import {AddressClassProfilesForm} from "./AddressClassProfilesForm";
import {ProfileCreateForm} from "./ProfileCreateForm"

class AddressClassProfilesPanel extends React.Component {
  render () {
    return(
      <>
      <ProfileCreateForm 
        fields={
          [
            {name:"profile name", placeholder:"profile 1", valueType: "string"},
            {name:"desc", placeholder:"desc 1", valueType: "string"},
          ]
        }
      />
      </>
    )
  }
}
import { format } from "path";

export class AddressProfileDiv extends React.Component {
    constructor(props) {
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
        margin: "0 5px"
      }as React.CSSProperties;

      return (
        <div style={divStyle}>
          <Title name="Address Profile" />
          <div style={tabDivStyle}>
            <Tabs
              id="AddressProfileTabs"
              animate={true}
              onChange={this.handleTabChange}
              selectedTabId={this.state.tabBarTabId}
              large={true}
            >
              <Tab id="addressClass" title="Address Class Profiles" panel={<AddressClassProfilesPanel />} />
              <Tab id="addressComponent" title="Address Component Profiles" panel={<div style={textStyle}>2</div>} />
              <Tab id="attribute" title="Attribute Profiles" panel={<div style={textStyle}>3</div>} />
              <Tabs.Expander />
            </Tabs>
          </div>
            
        </div>
      );
  
    }
  
    private handleTabChange = (tabId: TabId) => {
      this.setState({ tabBarTabId: tabId });
    }
  }