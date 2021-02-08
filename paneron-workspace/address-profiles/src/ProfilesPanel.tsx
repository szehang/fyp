import { Tab, TabId, Tabs, TagInput } from "@blueprintjs/core"; //AnchorButton
import * as React from "react";
import { Title } from "./Utility";
import { ProfileCreateForm } from "./ProfileCreateForm"
import { ProfileItem } from "./ProfileItem";
import { AddressClassProfilePanel } from "./AddressClassProfilePanel";
import { AddressProfile } from "./AddressProfile";
import { AttributeProfilePanel } from "./AttributeProfilePanel";

// class AddressClassProfilesPanel extends React.Component {

// constructor(props){
//   super(props);
//   this.state={
//     values:[],
//   }
// }
// private handleChange = (a: React.ReactNode[]) => {
//   this.setState({ values: a });
// };

//   render() {
//     return (
//       <>
//         <ProfileCreateForm
//           fields={
//             [
//               { id: "id", name: "Profile Name", placeholder: "e.g. Stresst Address", fieldType: "string" },
//               { id: "type", name: "Type", placeholder: "e.g. Regular", fieldType: "string" },
//               { id: "description", name: "Description", placeholder: "e.g. Normal street address", fieldType: "string" },
//               { id: "localization", name: "Localization", placeholder: "e.g. Localization Profile 1", fieldType: "string" },
//               { id: "areaApplicability", name: "Area Applicability", placeholder: "e.g. Localization Profile 1", fieldType: "tag" },
//               { id: "timeToLive", name: "Time To Live", placeholder: "e.g. 10", fieldType: "number" },
//               { id: "validity", name: "Validity", placeholder: "e.g. Validity Profile 1", fieldType: "string" },
//             ]
//           }
//         />

//         {/* just for testing START */}
//         {/* <ProfileItem
//           data={
//             {
//               id: "Class Profile 1",
//               type: "Regular",
//               description: "desc here ~~~",
//               localization: "HKG",
//               signature: "sign 1",
//               areaApplicability: "area 1",
//               timeToLive: "10",
//               validity: "v1",
//             }
//           }
//         />
//         <TagInput
//           values={this.state.values}
//           onChange={this.handleChange}
//         /> */}
//         <AddressClassProfilePanel 
//           addressClassProfiles={
//             [
//               {
//                 id: "Class Profile 1",
//                 type: "Regular",
//                 description: "desc here ~~~",
//                 localization: "HKG",
//                 signature: "sign 1",
//                 areaApplicability: ["HK", "NT"],
//                 timeToLive: 10,
//                 validity: "v1",
//                 components: [],
//               },
//             ]
//           }
//         />
//         {/* just for testing END */}
//       </>
//     )
//   }
// }

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
        <div style={tabDivStyle}>
          <Tabs
            id="AddressProfileTabs"
            animate={true}
            onChange={this.handleTabChange}
            selectedTabId={this.state.tabBarTabId}
            large={true}
          >
            {/* <Tab id="addressClass" title="Address Class Profiles" panel={<AddressClassProfilesPanel />} style={tabStyle} />
            <Tab id="addressComponent" title="Address Component Profiles" panel={<div style={textStyle}>2</div>} style={tabStyle} />
            <Tab id="attribute" title="Attribute Profiles" panel={<div style={textStyle}>3</div>} style={tabStyle} /> */}
            
            {/* {
              this.props.currentAddressProfile==null
              ?<Tab id="attribute" title="Attribute Profiles" panel={<div style={textStyle}>3</div>} style={tabStyle} />
              :<Tab id="attribute" title="Attribute Profiles" panel={<AttributeProfilePanel currentAddressProfile={this.props.currentAddressProfile} changeStateHandler={this.props.changStateHandler} />} style={tabStyle} />
            } */}

            <Tab id="attribute" title="Attribute Profiles" panel={<AttributeProfilePanel currentAddressProfile={this.props.currentAddressProfile} changeStateHandler={this.props.changStateHandler} />} style={tabStyle} /> 

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

export interface ProfilesPanelProps {
  currentAddressProfile: AddressProfile,
  changeStateHandler: any,
}