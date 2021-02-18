import { Tab, TabId, Tabs, TagInput } from "@blueprintjs/core"; //AnchorButton
import * as React from "react";
import { Title } from "./Utility";
import { ProfileCreateForm } from "./ProfileCreateForm"
import { ProfileItem } from "./ProfileItem";
import { AddressClassProfilePanel } from "./AddressClassProfilePanel";
import { AddressProfile } from "./AddressProfile";
import { AttributeProfilePanel } from "./AttributeProfilePanel";
import { ComponentProfilePanel } from "./ComponentProfilePanel";
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
      overflowY: "auto",
    } as React.CSSProperties;

    const textStyle = {
      fontSize: "16px",
      padding: "5px",
    } as React.CSSProperties;

    const tabDivStyle = {
      margin: "0 5px",
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
        {this.props.currentAddressProfile == null
        ?<>please activit the address profile first</>
        :<div style={tabDivStyle}>
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
  currentAddressProfile: AddressProfile,
  changeStateHandler: any,
}