import { remote } from 'electron';
import React, { useState, useEffect } from 'react';
import { RepositoryViewProps } from '@riboseinc/paneron-extension-kit/types';

import {
    Alignment,
    Button,
    Code,
    Classes,
    H3,
    H5,
    MenuItem,
    Intent,
    ItemRenderer,
    Navbar,
    NavbarGroup,
    NavbarHeading,
    Tab,
    TabId,
    Tabs,
    Switch
} from "@blueprintjs/core";

class ProfileDiv extends React.Component {
  render() {
    return (
      <div style={{ width: "30%", height: "100%", float: "left" }}>
        <ProfileNavBar />
        <H5>Address Profile Country</H5>

      </div>
    )
  }
};

class AddressProfileDiv extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabbarTabId: "addressClass"
    }
  }

  render() {
    return (
      <div style={{ width: "70%", height: "100%", float: "right" }}>
        <AddressProfileNavBar />
        <Tabs
          id="TabsExample"
          animate="true"
          onChange={this.handleTabChange}
          selectedTabId={this.state.tabbarTabId}
        >
            <Tab id="addressClass" title="Address Class Profiles" panel={<AddressClassPanel />} />
            <Tab id="addressComponent" title="Address Component Profiles" panel={<AddressComponentPanel />} />
            <Tab id="attribute" title="Attribute Profiles" panel={<AttributePanel />} />
            <Tabs.Expander />
        </Tabs>
      </div>
    )
  }

  private handleTabChange = (tabbarTabId: TabId) => this.setState({ tabbarTabId });
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

class CreateProfileButton extends React.Component {
  render() {
    return (
      <Button
        icon="refresh"
        intent= { Intent.SUCCESS }
        onClick = {}
      >
      Create Profile
      </Button>
    )
  }
}

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

const AddressClassPanel: React.FunctionComponent = () => (
    <div>
        <CreateProfileButton />
    </div>
);

const AddressComponentPanel: React.FunctionComponent = () => (
    <div>
        <H3>Example panel: Address Component Profiles</H3>
        <p className={Classes.RUNNING_TEXT}>
            HTML is great for declaring static documents, but it falters when we try to use it for declaring dynamic
            views in web-applications. AngularJS lets you extend HTML vocabulary for your application. The resulting
            environment is extraordinarily expressive, readable, and quick to develop.
        </p>
    </div>
);

const AttributePanel: React.FunctionComponent = () => (
    <div>
        <H3>Example panel: Attribute Profiles</H3>
        <p className={Classes.RUNNING_TEXT}>
            Ember.js is an open-source JavaScript application framework, based on the model-view-controller (MVC)
            pattern. It allows developers to create scalable single-page web applications by incorporating common idioms
            and best practices into the framework. What is your favorite JS framework?
        </p>
    </div>
);

const renderItem: ItemRenderer<{ name: String }> = (
  item: { name: String },
  { handleClick, modifiers }
) => {
  return (
    <MenuItem
      active={modifiers.active}
      key={item.name}
      label={item.name}
      onClick={handleClick}
      text={item.name}
    />
  );
};

export const RepositoryView: React.FC<RepositoryViewProps> =
function (props) {
  const [busy,setBusy] = useState(false)

  return(
    <div>
      {busy
        ? "Loading"
        : <>
            <ProfileDiv />
            <AddressProfileDiv />
          </>
      }
    </div>
  );
};
