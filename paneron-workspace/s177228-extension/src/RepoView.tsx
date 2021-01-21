import { remote } from 'electron';
import React, { useState, useEffect } from 'react';
import { RepositoryViewProps } from '@riboseinc/paneron-extension-kit/types';

import {
    Alignment,
    Navbar,
    NavbarGroup,
    NavbarHeading,
    Tab,
    Tabs,
} from "@blueprintjs/core";

export const RepositoryView: React.FC<RepositoryViewProps> =
function (props) {

  const [busy,setBusy] = useState(false)

  return(
    <div>
      {busy
        ? "Loading"
        : <>
            {/* <div>init</div> */}
            <ProfileDiv />
            <AddressProfileDiv />
          </>
      }
    </div>
  );

};

class ProfileDiv extends React.Component {
  render() {
    return (
      <div style={{ width: "30%", height: "100%", float: "left" }}>
        <ProfileNavBar />
      </div>
    )
  }
};

class AddressProfileDiv extends React.Component {
  render() {
    return (
      <div style={{ width: "70%", height: "100%", float: "right" }}>
        <AddressProfileNavBar />
        <Tabs id="TabsExample" selectedTabId="rx">
            <Tab title="Address Class Profiles" />
            <Tab title="Address Component Profiles" />
            <Tab title="Attribute Profiles" />
            <Tabs.Expander />
        </Tabs>
      </div>
    )
  }
};

class ProfileNavBar extends React.Component {
  render() {
    return (
      <Navbar>
          <NavbarGroup align={Alignment.LEFT}>
              <NavbarHeading>Profile Settings</NavbarHeading>
          </NavbarGroup>
      </Navbar>
    )
  }
};

class AddressProfileNavBar extends React.Component {
  render() {
    return (
      <Navbar>
          <NavbarGroup align={Alignment.LEFT}>
              <NavbarHeading>Address Profile</NavbarHeading>
          </NavbarGroup>
      </Navbar>
    )
  }
};
