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
            {id: "profileName", name: "Profile Name", placeholder:"e.g. Stresst Address", valueType: "string"},
            {id:"desc", name: "Description", placeholder: "e.g. Normal street address", valueType: "string"},
            {id:"type", name: "Type", placeholder: "e.g. Regular", valueType: "string"},
            {id:"localization", name: "Localization", placeholder: "e.g. Localization Profile 1", valueType: "string"},
            {id:"timeToLive", name: "Time To Live", placeholder: "e.g. 10", valueType: "string"},
            {id:"validity", name: "Validity", placeholder: "e.g. Validity Profile 1", valueType: "string"},
          ]
        }
      />
      <ProfileCard />
      </>
    )
  }
}
import { format } from "path";
import { ProfileCard } from "./ProfileCard";

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