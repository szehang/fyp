import * as React from "react";
import { ProfilesPanel } from "./ProfilesPanel";
import { AddressProfilePanel } from "./AddressProfilePanel";
import { AddressProfile } from "./AddressProfile";
import {get_yaml, output_yaml} from "./Utility";
import log from "electron-log"
import { profile } from "console";
import { Icon } from "@blueprintjs/core";

Object.assign(console, log);

interface State {
  currentAddressProfileCode: string
  currentAddressProfile: AddressProfile | null
  addressProfiles: AddressProfile[]
  isLeftPanelOpen: boolean
}

class Container extends React.Component<any, State> {
  constructor(props:any) {
    super(props);
    this.state = {
      currentAddressProfileCode: "null",
      currentAddressProfile: null,

      addressProfiles: get_yaml("output"),

      isLeftPanelOpen: true,
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

  activateAddressProfile = (addressProfileCode:string) => {
    const newAddressProfiles = JSON.parse(JSON.stringify(this.state.addressProfiles));//deep copy the state.addressProfiles
    const id = newAddressProfiles.length;
    const newAddressProfile = {
      id: id,
      countries: [addressProfileCode,],
      addressProfiles: [],
      componentProfiles: [],
      attributeProfiles: [],
    }
    newAddressProfiles.splice(newAddressProfiles.length, 0, newAddressProfile);

    this.setState({addressProfiles: newAddressProfiles}, ()=>{
      this.state.addressProfiles.forEach(profile => {
        if(profile.id == id){
          this.setState({currentAddressProfile: profile});
        }
      });
    }); //refresh state by replace by the new one
    output_yaml(newAddressProfiles, "output"); //save state data to yml file
  }

  //handle all state change call from all panel
  //targetType: "class" | "component" | "attribute" (for 3 kinds of profile)
  //mode: "add: | "edit" | "delete"
  //object: the profile object to be manipulate(e.g. the modified profile)
  //  object should be created before pass into this function
  //  <AddressClassProfile | AddressComponentProfile | AttributeProfile>
  changeStateHandler = (targetType: string, mode:string, object: any) => {

    switch(targetType){
      case "class":{
        return this.changeStateClass(mode, object);
      }
      break;
      case "component":{
        return this.changeStateComponent(mode, object);
      }
      break;
      case "components":{
        return this.changeStateComponent(mode, object);
      }
      break;
      case "attribute":{
        return this.changeStateAttribute(mode, object);
      }
      break;
    }
  }

  changeStateClass = (mode:string, object: any) => {
    const newAddressProfiles = JSON.parse(JSON.stringify(this.state.addressProfiles));//deep copy the state.addressProfiles
        
    newAddressProfiles.forEach(profile => { //locate the current addressProfile in the new array
      if(profile.id == this.state.currentAddressProfile.id){
        const classProfiles = profile.addressProfiles;

        switch(mode){
          case "add": {
            classProfiles.splice(classProfiles.length, 0, object); //push new profile to the class array
          }
          break;
          case "edit": {
            classProfiles.forEach(classProfile => { //locate the target classProfile //
                  if(classProfile.id==object.id) {
                    const index = classProfiles.indexOf(classProfile);
                    classProfiles.splice(index, 1, object) //remove replace the old component with the new data
                  }
                });
          }
          break;
          case "delete": {
            classProfiles.forEach(classProfile => { //locate the target classProfile //
              if(classProfile.id==object.id) {
                const index = classProfiles.indexOf(classProfile);
                classProfiles.splice(index, 1) //remove target element
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

  changeStateComponent = (mode:string, object: any) => {
    const newAddressProfiles = JSON.parse(JSON.stringify(this.state.addressProfiles));//deep copy the state.addressProfiles
    let result;    

    newAddressProfiles.forEach(profile => { //locate the current addressProfile in the new array
      if(profile.id == this.state.currentAddressProfile.id){
        const components = profile.componentProfiles;

        switch(mode){
          case "add": {
            components.splice(components.length, 0, object); //push new profile to the components array
            
            this.setState({addressProfiles: newAddressProfiles, currentAddressProfile: profile}); //refresh state by replace by the new one
            output_yaml(newAddressProfiles, "output"); //save state data to yml file
          }
          break;
          case "addSet": {
            object.forEach(component => {
              components.splice(components.length, 0, component); //push new profile to the components array
            });
            this.setState({addressProfiles: newAddressProfiles, currentAddressProfile: profile}); //refresh state by replace by the new one
            output_yaml(newAddressProfiles, "output"); //save state data to yml file
          } break;
          case "edit": {
            components.forEach(component => { //locate the target componentProfile //component = target componentProfile
                  if(component.key==object.key) {
                    const index = components.indexOf(component);
                    components.splice(index, 1, object) //remove replace the old component with the new data
                  }
                });

            this.setState({addressProfiles: newAddressProfiles, currentAddressProfile: profile}); //refresh state by replace by the new one
            output_yaml(newAddressProfiles, "output"); //save state data to yml file
          }
          break;
          case "delete": {
            components.forEach(component => { //locate the target componentProfile //component = target componentProfile
              if(component.key==object.key) {
                const index = components.indexOf(component);
                components.splice(index, 1) //remove target element
              }
            });


            //remove the component from the included class profile            
            profile.addressProfiles.forEach((addressProfile)=>{
              addressProfile.componentProfiles.forEach((componentProfile)=>{
                if(componentProfile.addressComponentProfileKey == object.key) {
                  log.info(addressProfile);
                  const index = addressProfile.componentProfiles.indexOf(componentProfile);
                  addressProfile.componentProfiles.splice(index, 1);
                }
              });
            });

            this.setState({addressProfiles: newAddressProfiles, currentAddressProfile: profile}); //refresh state by replace by the new one
            output_yaml(newAddressProfiles, "output"); //save state data to yml file
          }
          break;
          case "checkIncludedInClass": {
            let includedClasses = [];
            this.state.currentAddressProfile.addressProfiles.forEach((classProfile)=>{
              classProfile.componentProfiles.forEach((componentProfile)=>{
                if(componentProfile.addressComponentProfileKey == object.key){
                  includedClasses.splice(includedClasses.length, 0, classProfile);
                  log.info("classes: "+classProfile.id);
                }
              });
            });
            if(includedClasses.length==0){
              includedClasses = null;
            }
            result = includedClasses;
          }
          break;
        }
      }
    });   
    return result;
  }

  changeStateAttribute = (mode:string, object: any) => {
    const newAddressProfiles = JSON.parse(JSON.stringify(this.state.addressProfiles));//deep copy the state.addressProfiles
    let result;    

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

            //remove the attribute from the included component profile            
            profile.componentProfiles.forEach((componentProfile)=>{
              componentProfile.attributeProfiles.forEach((attributeProfile)=>{
                if(attributeProfile.attributeProfileName == object.name) {
                  const index = componentProfile.attributeProfiles.indexOf(attributeProfile);
                  componentProfile.attributeProfiles.splice(index, 1);
                }
              });
            });
          }
          break;
          case "checkIncludedInComponent": {
            let includedComponents = [];
            this.state.currentAddressProfile.componentProfiles.forEach((componentProfile)=>{
              componentProfile.attributeProfiles.forEach((attributeProfile)=>{
                if(attributeProfile.attributeProfileName == object.name){
                  includedComponents.splice(includedComponents.length, 0, componentProfile);
                }
              });
            });
            if(includedComponents.length==0){
              includedComponents = null;
            }
            result = includedComponents;
          }
          break;
        }

        this.setState({addressProfiles: newAddressProfiles, currentAddressProfile: profile}); //refresh state by replace by the new one
        output_yaml(newAddressProfiles, "output"); //save state data to yml file
      }
    });  
    return result; 
  }

  handleTogglePanel = () => {
    this.setState({ isLeftPanelOpen: !this.state.isLeftPanelOpen });
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

    const panelToggleStyle = {
      height: "100%",
      float: "left",
      lineHeight: "50",
      backgroundColor: "lightgray",
      color: "white",
    } as React.CSSProperties;

    return (
      <div style={divStyle}>
        {this.state.isLeftPanelOpen
          ?<AddressProfilePanel currentAddressProfileCode={this.state.currentAddressProfileCode} changeAddressProfile={this.changeAddressProfile} currentAddressProfile={this.state.currentAddressProfile} handleTogglePanel={this.handleTogglePanel} />
          :<></>
        }
        {/* <Collapse isOpen={this.state.isLeftPanelOpen}>
          <AddressProfilePanel currentAddressProfileCode={this.state.currentAddressProfileCode} changeAddressProfile={this.changeAddressProfile} currentAddressProfile={this.state.currentAddressProfile}/>
        </Collapse> */}
        <div style={panelToggleStyle} onClick={this.handleTogglePanel}>
          {this.state.isLeftPanelOpen
          ?<Icon icon="double-chevron-left" />
          :<Icon icon="double-chevron-right" />
          }
        </div>
        <ProfilesPanel currentAddressProfileCode={this.state.currentAddressProfileCode} currentAddressProfile={this.state.currentAddressProfile} changStateHandler={this.changeStateHandler.bind(this)} activateAddressProfile={this.activateAddressProfile.bind(this)} />
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