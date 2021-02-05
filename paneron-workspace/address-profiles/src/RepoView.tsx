import * as React from "react";
import { ProfilesPanel } from "./ProfilesPanel";
import { AddressProfilePanel } from "./AddressProfilePanel";
import { AddressProfile } from "./AddressProfile";
import {get_yaml, output_yaml} from "./Utility";
import log from "electron-log"
import { profile } from "console";

Object.assign(console, log);

interface State {
  currentAddressProfileCode: string
  currentAddressProfile: AddressProfile | null
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
      //     id: "0",
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
    this.state.addressProfiles.forEach(profile=> {
      profile.countries.forEach(countryCode => {
        this.setState({currentAddressProfile: null});
        if(countryCode==addressProfileCode){
          this.setState({currentAddressProfile: profile});
        }
      });
    });
    this.setState({currentAddressProfileCode: addressProfileCode});
  }

  changeStateHandler = (targetType: string, mode:string, object: any) => {
    console.log(mode);

    switch(targetType){
      case "class":{

      }
      break;
      case "component":{
  
      }
      break;
      case "attribute":{
        this.changeStateAttribute(mode, object);
      }
      break;
    }

    // output_yaml(this.state.addressProfiles, "output");
    // this.setState({addressProfiles: get_yaml("output")});
  }

  changeStateAttribute = (mode:string, object: any) => {
    const newAddressProfiles = JSON.parse(JSON.stringify(this.state.addressProfiles));//deep copy the state.addressProfiles
        
    newAddressProfiles.forEach(profile => {
      if(profile.id == this.state.currentAddressProfile.id){
        const attributes = attributes
        switch(mode){
          case "add": {
            // attributes.splice(attributes.length, 0, object);
          }
          break;
          case "edit": {
            attributes.forEach(attribute => {
                  if(attribute.name==object.name) {
                    attribute.name = object.name;
                    attribute.maxCardinality = object.maxCardinality;
                    attribute.minCardinality = object.minCardinality;
                    attribute.valueType = object.valueType;
                  }
                });
          }
          break;
          case "delete": {
            attributes.forEach(attribute => {
              if(attribute.name==object.name) {
                const index = attributes.indexOf(attribute);
                attributes.splice(index, 1)
                //don't know why the data is deleted from the root state but still in the local state
              }
            });
          }
          break;
        }

        this.setState({addressProfiles: newAddressProfiles});
        output_yaml(newAddressProfiles, "output");
      }
    });   
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