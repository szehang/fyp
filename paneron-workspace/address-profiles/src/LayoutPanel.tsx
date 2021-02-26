import { AnchorButton, Code, Collapse, Divider, InputGroup, Tab, TabId, Tabs } from "@blueprintjs/core";

import { stat } from "fs";
import React from "react";
import { AddressClassProfile, AddressProfile, FormTemplate } from "./AddressProfile";


import log from "electron-log"
Object.assign(console, log);

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
                            <Tab id={"formTemplate"} title={"Form Template"} panel={<FormTemplatePanel currentClassProfile={this.state.currentClassProfile} />}></Tab>
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
            currentClassProfile: this.props.currentClassProfile,

            isFormOpen: false,

            //form input
            id: "",
            name: "",
            description: "",
            localization: {locale: "", script: "", writingSystem: "", textDirection: "leftToRightTopToBottom"},
        }
    }

    handleFormOpen() {
        this.setState({isFormOpen: !this.state.isFormOpen});
    }

    handelTextDirectionChange(verticalValue:string|null, horizontalValue:string|null, callBack: any) {
        let oldVerticalValue = "";
        let oldHorizontalValue = "";

        let textDirection = this.state.localization.textDirection;

        textDirection.includes("TopToBottom")
        ? oldVerticalValue = "TopToBottom"
        : oldVerticalValue = "BottomToTop"

        textDirection.includes("leftToRight")
        ? oldHorizontalValue = "leftToRight"
        : oldHorizontalValue = "rightToLeft"

        if(verticalValue){
            oldVerticalValue = verticalValue;
        }else if(horizontalValue){
            oldHorizontalValue = horizontalValue;
        }

        this.setState({localization: {...this.state.localization, textDirection: oldHorizontalValue + oldVerticalValue}}, ()=>{log.info(this.state.localization.textDirection)});
    }

    createTemplate() {
        //todo
    }

    render(){
        return(
            <div style={{borderRadius: "5px", backgroundColor: "#15B371",}}>
                <Collapse isOpen={!this.state.isFormOpen}>
                    {
                        this.state.currentClassProfile.formTemplates.length == 0
                        ? <>there is no existing form template</>
                        : <></>
                    }
                    {
                        this.state.currentClassProfile.formTemplates.map((form)=>(
                            <div key={form.id} style={{padding:"5px", display:"flex", justifyContent:"space-between"}}>
                                <div>{form.id}: {form.name}</div>
                                <div style={{textOverflow:"ellipsis"}}>{form.description}</div>
                                <div>
                                    <AnchorButton text={"edit"}/>
                                    <AnchorButton text={"delete"}/>
                                </div>
                            </div>
                        ))
                    }
                    

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
                                <td style={{padding:"0"}}>
                                    <table>
                                        <tr>
                                            <td>Locale</td>
                                            <td>:</td>
                                            <td style={{padding:"0"}}>
                                                <InputGroup value={this.state.localization.locale}
                                                    onChange={(event)=>{
                                                        this.setState({localization: {...this.state.localization, locale: event.target.value,}})}
                                                    }
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Script</td>
                                            <td>:</td>
                                            <td style={{padding:"0"}}>
                                                <InputGroup value={this.state.localization.script}
                                                        onChange={(event)=>{
                                                            this.setState({localization: {...this.state.localization, script: event.target.value,}})}
                                                        }
                                                    />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Writing System</td>
                                            <td>:</td>
                                            <td style={{padding:"0"}}>
                                                <InputGroup value={this.state.localization.writingSystem}
                                                        onChange={(event)=>{
                                                            this.setState({localization: {...this.state.localization, writingSystem: event.target.value,}})}
                                                        }
                                                    />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Text Direction</td>
                                            <td>:</td>
                                            <td style={{padding:"0"}}>
                                                <select
                                                    style={{width:"130px"}}
                                                    value={this.state.localization.textDirection.includes("TopToBottom")?"TopToBottom":"BottomToTop"}
                                                    onChange={(event)=>{this.handelTextDirectionChange(event.target.value, null, this.forceUpdate.bind(this))}}
                                                >
                                                    <option value="TopToBottom">Top to Bottom</option>
                                                    <option value="BottomToTop">Bottom to Top</option>
                                                </select>
                                                <select
                                                    style={{width:"130px", marginLeft:"5px"}}
                                                    value={this.state.localization.textDirection.includes("leftToRight")?"leftToRight":"rightToLeft"} 
                                                    onChange={(event)=>{this.handelTextDirectionChange(null,event.target.value, this.forceUpdate.bind(this))}} 
                                                >
                                                    <option value="leftToRight">Left to Right</option>
                                                    <option value="rightToLeft">Right to Left</option>
                                                </select>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div style={{borderRadius: "0 0 5px 5px", padding:"5px", textAlign:"center", backgroundColor:"#999", cursor:"pointer"}} onClick={this.createTemplate}>Create Template</div>
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
    currentClassProfile: AddressClassProfile,
}

interface DisplayTemplateProps {
    
}