import { AnchorButton, Code, Collapse, Divider, InputGroup, Tab, TabId, Tabs } from "@blueprintjs/core";
import { stat } from "fs";
import React from "react";
import { AddressProfile, FormTemplate } from "./AddressProfile";

export class LayoutPanel extends React.Component<LayoutPanelProps, any> {
    constructor(props){
        super(props);
        this.state={
            currentClassProfile: null,

            selectedTabId: "formTemplate",
        }
    }

    render(){
        return (
            <div style={{margin:"5px"}}>
                <div style={{borderRadius: "5px", backgroundColor: "#FFF", padding:"5px",}}>
                    <div>
                        <span style={{fontSize:"16px",}}>Address Class Profile:&nbsp;</span>
                        <select style={{display:"inline",}} value={this.state.currentClassProfile? this.state.currentClassProfile.id: this.state.currentClassProfile} onChange={(event)=>{this.changeCurrentClassProfile(event.target.value)}}>
                            <option value={null} disabled selected>Select Class Profile</option>
                            {
                                this.props.currentAddressProfile.addressProfiles.map((addressProfile)=>(
                                    <option key={addressProfile.id} value={addressProfile.id}>{addressProfile.id}</option>
                                ))
                            }
                        </select>
                        <div style={{display:"inline"}}><Code>{this.state.currentClassProfile != null? this.state.currentClassProfile.id: "null"}</Code></div>
                    </div>
                    <Collapse isOpen={this.state.currentClassProfile!=null}>
                        <Tabs selectedTabId={this.state.selectedTabId} id={"LayoutPanelTabs"} renderActiveTabPanelOnly={true} onChange={(tabId: TabId)=>{this.setState({selectedTabId: tabId})}}>
                            <Tab id={"formTemplate"} title={"Form Template"} panel={<FormTemplatePanel />}></Tab>
                            <Tab id={"displayTemplate"} title={"Display Template"} panel={<DisplayTemplatePanel />}></Tab>
                        </Tabs>
                    </Collapse>
                </div>
            </div>
        )
    }

    changeCurrentClassProfile(profileId: string | null) {
        if(profileId != null){
            this.props.currentAddressProfile.addressProfiles.forEach((addressProfile)=>{
                if(addressProfile.id == profileId){
                    this.setState({currentClassProfile: addressProfile});
                }
            });
        }
    }
}

class FormTemplatePanel extends React.Component<FormTemplateProps, any>{
    constructor(props){
        super(props);
        this.state={
            isFormOpen: false,

            //form input
            id: "",
            name: "",
            description: "",
            localization: {locale: "", script: "", writingSystem: "", textDriection: ""},
        }
    }

    handleFormOpen() {
        this.setState({isFormOpen: !this.state.isFormOpen});
    }

    render(){
        return(
            <div style={{borderRadius: "5px", backgroundColor: "#15B371",}}>
                <Collapse isOpen={!this.state.isFormOpen}>
                    <div style={{padding:"5px", display:"flex", justifyContent:"space-between"}}>
                        <div>Template 1</div>
                        <div>
                            <AnchorButton text={"edit"}/>
                            <AnchorButton text={"delete"}/>
                        </div>
                    </div>
                </Collapse>
                {this.state.isFormOpen
                    ?<div style={{borderRadius: "5px", padding:"5px", textAlign:"center" ,backgroundColor:"#FF7373", cursor:"pointer"}} onClick={()=>{this.handleFormOpen()}}>Discard New Template</div>
                    :<div style={{borderRadius: "0 0 5px 5px", padding:"5px", textAlign:"center" ,backgroundColor:"#3DCC91", cursor:"pointer"}} onClick={()=>{this.handleFormOpen()}}>New Template</div>
                }
                <Collapse isOpen={this.state.isFormOpen}>
                    <div style={{padding:"5px"}}>
                        <table>
                            <tr>
                                <td>ID</td>
                                <td>:</td>
                                <td>
                                    <InputGroup value={this.state.id} onChange={(event)=>{this.setState({id: event.target.value})}}/>
                                </td>
                            </tr>
                            <tr>
                                <td>Name</td>
                                <td>:</td>
                                <td>
                                    <InputGroup value={this.state.name} onChange={(event)=>{this.setState({name: event.target.value})}}/>
                                </td>
                            </tr>
                            <tr>
                                <td>Description</td>
                                <td>:</td>
                                <td>
                                    <InputGroup value={this.state.description} onChange={(event)=>{this.setState({description: event.target.value})}}/>
                                </td>
                            </tr>
                            <tr>
                                <td>Localization</td>
                                <td>:</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>Locale</td>
                                <td>:</td>
                                <td>
                                    <InputGroup value={this.state.localization.locale}
                                        onChange={(event)=>{
                                            this.setState({
                                                localization: {
                                                    ...this.state.localization,
                                                    locale: event.target.value,
                                                }
                                            })
                                        }}/>
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>Script</td>
                                <td>:</td>
                                <td>
                                    <InputGroup value={this.state.localization.script}
                                        onChange={(event)=>{
                                            this.setState({
                                                localization: {
                                                    ...this.state.localization,
                                                    script: event.target.value,
                                                }
                                            })
                                        }}/>
                                </td>
                            </tr>
                        </table>
                    </div>
                </Collapse>     
            </div>
        )
    }
}

class DisplayTemplatePanel extends React.Component<DisplayTemplateProps, any>{
    constructor(props){
        super(props);
        this.state={
            
        }
    }
    ender(){
        return(
            <></>
        )
    }
}

export interface LayoutPanelProps{
    currentAddressProfile: AddressProfile,
    changeStateHandler: any,
}

interface FormTemplateProps {

}

interface DisplayTemplateProps {
    
}