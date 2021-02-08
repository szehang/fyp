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
    this.setState({currentAddressProfile: null});
    this.state.addressProfiles.forEach(profile=> {
      profile.countries.forEach(countryCode => {
        if(countryCode==addressProfileCode){
          this.setState({currentAddressProfile: profile});
        }
      });
    });
    this.setState({currentAddressProfileCode: addressProfileCode});
  }

  //handle all state change call from all panel
  //targetType: "class" | "component" | "attribute" (for 3 kinds of profile)
  //mode: "add: | "edit" | "delete"
  //object: the profile object to be manipulate(e.g. the modified profile)
  //  object should be created before pass into this function
  //  <AddressClassProfile | AddressComponentProfile | AttributeProfile>
  changeStateHandler = (targetType: string, mode:string, object: any) => {
    console.log(mode);

    switch(targetType){
      case "class":{
        //TODO
      }
      break;
      case "component":{
        //TODO
      }
      break;
      case "attribute":{
        this.changeStateAttribute(mode, object);
      }
      break;
    }
  }

  changeStateAttribute = (mode:string, object: any) => {
    const newAddressProfiles = JSON.parse(JSON.stringify(this.state.addressProfiles));//deep copy the state.addressProfiles
        
    newAddressProfiles.forEach(profile => { //locate the current addressProfile in the new array
      if(profile.id == this.state.currentAddressProfile.id){
        const attributes = profile.attributeProfiles;

        switch(mode){
          case "add": {
            attributes.splice(attributes.length, 0, object); //push new profile to the attributes array
          }
          break;
          case "edit": {
            attributes.forEach(attribute => { //locate the target attributeProfile //attribute = target attrubiteProfile
                  if(attribute.name==object.name) {
                    //orginial logic (confirm works)
                    // attribute.name = object.name;
                    // attribute.maxCardinality = object.maxCardinality;
                    // attribute.minCardinality = object.minCardinality;
                    // attribute.valueType = object.valueType;

                    //new logic (testing but seem works now)
                    const index = attributes.indexOf(attribute);
                    attributes.splice(index, 1, object) //remove replace the old attrubite with the new data
                  }
                });
          }
          break;
          case "delete": {
            attributes.forEach(attribute => { //locate the target attributeProfile //attribute = target attrubiteProfile
              if(attribute.name==object.name) {
                const index = attributes.indexOf(attribute);
                attributes.splice(index, 1) //remove target element
              }
            });
          }
          break;
        }

        this.setState({addressProfiles: newAddressProfiles, currentAddressProfile: profile}); //refresh state by replace by the new one
        output_yaml(newAddressProfiles, "output"); //save state data to yml file
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