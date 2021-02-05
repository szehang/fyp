import * as React from "react";
import { ProfilesPanel } from "./ProfilesPanel";
import { AddressProfilePanel } from "./AddressProfilePanel";
import { AddressProfile } from "./AddressProfile";
import {get_yaml, output_yaml} from "./Utility";
import log from "electron-log"

Object.assign(console, log);

interface State {
  currentAddressProfileCode: string
  currentAddressProfile: AddressProfile
  addressProfiles: AddressProfile[]
}

class Container extends React.Component<any, State> {
  constructor(props:any) {
    super(props);
    this.state = {
      currentAddressProfileCode: "null",
      currentAddressProfile: null,
      // test input the hkg.yaml

      addressProfiles: get_yaml("output"),

      
      // addressProfiles: [
      //   {
      //     countries: ["HKG","TWN"],
      //     addressProfiles: [
      //       {
      //         id: "boxAddress",
      //         type: "regular",
      //         localization: "L01",
      //         description: "this is box address",
      //         signature: "SIGN 01",
      //         areaApplicability: ["NT", "HK"],
      //         timeToLive: 10,
      //         validity: "V01",
      //         componentProfiles: [
      //           {
      //             addressComponentProfileKey: "boxNum",
      //             attributeProfile:{
      //               maxCardinality: 1,
      //               minCardinality: 1,
      //             },
      //           },
      //         ]
      //       },
      //     ],
      //     componentProfiles: [
      //       {
      //         key: "boxNum",
      //         description: "box number",
      //         example: "Box 001",
      //         attributeProfiles: [
      //           {
      //             attributeProfilesName: "number",
      //           }
      //         ],
      //       },
      //     ],
      //     attributeProfiles: [
      //       {
      //         name: "number",
      //         maxCardinality: 1,
      //         minCardinality: 1,
      //         valueType: "number"
      //       }
      //     ],
      //   },
      // ],    
    };

    //test output all data to yaml
    // output_yaml(this.state.addressProfiles, "output");
  }

  changeAddressProfile = (addressProfileCode:string) => {
    this.state.addressProfiles.forEach(profile => {
      profile.countries.forEach(countryCode => {
        if(countryCode==addressProfileCode){
          this.setState({currentAddressProfile: profile});
        }
      });
    });
    this.setState({currentAddressProfileCode: addressProfileCode});
  }

  changeStateHandler(params) {
    console.log(params);

    {/*
    this.state.currentAddressProfile.attributeProfiles.forEach(attributeProfile => {
      if (attributeProfile.name == params.name) {
        this.setState(params);
      }
    })
    */}
  }

  render() {
    const divStyle = {
      backgroundColor: "rgb(0, 0, 0)",
      width: "100%",
      height: "100%",
      top: "10px",
      margin: "auto",
      verticalAlign: "middle",
    } as React.CSSProperties;

    return (
      <div style={divStyle}>
        <AddressProfilePanel currentAddressProfileCode={this.state.currentAddressProfileCode} changeAddressProfile={this.changeAddressProfile} currentAddressProfile={this.state.currentAddressProfile}/>
        <ProfilesPanel currentAddressProfile={this.state.currentAddressProfile} changStateHandler={this.changeStateHandler.bind(this)} />
      </div>
    );
  }
}

export default function () {
  return (
    <>
      <Container />
    </>
  );
}