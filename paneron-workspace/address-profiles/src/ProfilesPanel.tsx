import { AnchorButton, Callout, Collapse, Tab, TabId, Tabs, TagInput } from "@blueprintjs/core"; //AnchorButton
import * as React from "react";
import { Title } from "./Utility";
import { AddressClassProfilePanel } from "./AddressClassProfilePanel";
import { AddressProfile } from "./AddressProfile";
import { AttributeProfilePanel } from "./AttributeProfilePanel";
import { AddressComponentProfilePanel } from "./AddressComponentProfilePanel";
import { Global, css } from '@emotion/core';

export class ProfilesPanel extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      tabBarTabId: "addressClass",
      currentAddressProfile: null,

      //panel state
      isMainPanelOpen: true,
    }
  }

  handleSecondPanelOpen = () => {
    this.setState({ isMainPanelOpen: !this.state.isMainPanelOpen });
  }

  render() {
    const divStyle = {
      backgroundColor: "rgb(226, 226, 226)",
      height: "100%",
      width: "100%",
    } as React.CSSProperties;

    const textStyle = {
      fontSize: "16px",
      padding: "5px",
    } as React.CSSProperties;

    const tabDivStyle = {
      margin: "0 5px",
      height: "91%",
      overflowY: "scroll",
      overflowX: "hidden",
    } as React.CSSProperties;

    const tabStyle = {
      outline: "none",
      "&:focus": {
        outline: "none",
      },
    } as React.CSSProperties;

    const centerStyle = {
      fontSize: "1.2em",
      textAlign: "center",
      cursor: "pointer",
      lineHeight: "0.5",
      paddingBottom: "0.5em"
    } as React.CSSProperties;

    return (
      <div style={divStyle} >
        <Global
          styles={{
            '.div-style': {
              margin: "0 5px",
              height: "91% !important",
              overflowY: "scroll !important",
              overflowX: "hidden",
            }
          }}
        />
        <Title name="Address Profile" />
        <Collapse isOpen={this.state.isMainPanelOpen} className={this.state.isMainPanelOpen?'div-style':''}>
          {
            this.props.currentAddressProfileCode == "null"
              ?
              // <div style={{ marginTop: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", }}>
              //   <div>Please select an activated address profile first</div>
              // </div>
                <Callout title="Warning" intent="warning">
                  Please select an activated address profile first
                </Callout>
              :
              this.props.currentAddressProfileCode != "null" && this.props.currentAddressProfile == null
                ?
                <div style={{ marginTop: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", }}>
                  <div style={{ marginBottom: "5px" }}>Please activate the address profile first</div>
                  <AnchorButton onClick={() => { this.props.activateAddressProfile(this.props.currentAddressProfileCode) }} intent="success" icon="tick-circle" text="Activate Profile" />
                </div>
                :
                <div>
                  <Tabs
                    id="AddressProfileTabs"
                    animate={true}
                    onChange={this.handleTabChange}
                    selectedTabId={this.state.tabBarTabId}
                    large={true}
                  >
                    <Tab id="addressClass" title="Address Class Profiles" panel={<AddressClassProfilePanel currentAddressProfile={this.props.currentAddressProfile} changeStateHandler={this.props.changStateHandler} />} style={tabStyle} />
                    <Tab id="addressComponent" title="Address Component Profiles" panel={<AddressComponentProfilePanel currentAddressProfile={this.props.currentAddressProfile} changeStateHandler={this.props.changStateHandler} />} style={tabStyle} />
                    <Tab id="attribute" title="Attribute Profiles" panel={<AttributeProfilePanel currentAddressProfile={this.props.currentAddressProfile} changeStateHandler={this.props.changStateHandler} />} style={tabStyle} />

                    <Tabs.Expander />
                  </Tabs>
                </div>
          }
        </Collapse>
        <Collapse isOpen={!this.state.isMainPanelOpen}>
          <div style={centerStyle} onClick={this.handleSecondPanelOpen}>...</div>
        </Collapse>

        <Title name="Form template and Display template" />
        <Collapse isOpen={this.state.isMainPanelOpen}>
          <div style={centerStyle} onClick={this.handleSecondPanelOpen}>...</div>
        </Collapse>
        <Collapse isOpen={!this.state.isMainPanelOpen} className={!this.state.isMainPanelOpen?'div-style':''}>
          <div>many things to display !~</div>
        </Collapse>
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