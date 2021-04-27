import { AnchorButton, Collapse, InputGroup, NumericInput, TagInput } from "@blueprintjs/core";
import * as React from "react";
import { AddressClassProfile, AddressComponentProfile, AddressProfile, AttributeProfile } from "./AddressProfile";
import { AttributeProfilePanel } from "./AttributeProfilePanel";

import log from "electron-log"
import { stat } from "fs";
Object.assign(console, log);

export class AddressClassProfilePanel extends React.Component<AddressClassProfilePanelProps> {
    constructor(props:any){
        super(props)
        this.state={
    
        }
    }

    render(){
        return(
            <>
                {
                    this.props.currentAddressProfile==null
                    ?<></>
                    :<>
                        <AddressClassProfileForm 
                        changeStateHandler = {this.props.changeStateHandler}
                        componentProfiles = {this.props.currentAddressProfile.componentProfiles}
                        currentAddressProfile = {this.props.currentAddressProfile}
                        />
                        <AddressClassProfileList 
                        classProfiles = {this.props.currentAddressProfile.addressProfiles}
                        componentProfiles = {this.props.currentAddressProfile.componentProfiles}
                        changeStateHandler = {this.props.changeStateHandler}
                        />
                    </>
                }
            </>
        );
    }
}

class AddressClassProfileForm extends React.Component<AddressClassProfileFormProps, any> {
    constructor(props:any) {
        super(props);
        this.state={
            isOpeningForm: false,

            // Profile Data
            id: "",
            type: "",
            localization: "",
            description: "",
            signature: "",
            areaApplicability: [],
            timeToLive: "",
            validity: "",
            componentProfiles: [],

            formTemplates: [],
            displayTemplates: [],
        }
    }

    handleOpenForm = () => {
        this.setState({ isOpeningForm: !this.state.isOpeningForm });
    }


    handleAddChange = () => {
        // If the required field is empty
        if (!this.state.id) {
            alert("\"Profile ID\" cannot not be empty");

            return;
        } else if(!this.state.type) {
            alert("\"Type\" cannot not be empty");

            return;
        } else if(!this.state.localization) {
            alert("\"Localization\" cannot not be empty");

            return;
        } else if(!this.state.description) {
            alert("\"Description\" cannot not be empty");

            return;
        } else if(!this.state.timeToLive) {
            alert("\"Time To Live\" cannot not be empty");

            return;
        } else if(!this.state.validity) {
            alert("\"Validity\" cannot not be empty");

            return;
        }

        // If some optional field is missing
        if (!this.state.signature) {
            if (!window.confirm("Optional field \"Signature\" are missing.\nConfirm to create?")) {
                return;
            }
        } else if (!this.state.areaApplicability) {
            if (!window.confirm("Optional field \"Area Applicability\" are missing.\nConfirm to create?")) {
                return;
            }
        }

        this.props.currentAddressProfile.addressProfiles.forEach((ele) => {
            console.log(ele);
        })

        // All form checking is Done
        // Check if the Unique ID (i.e. Profile key) is being 
        let isIdUsed = false;

        this.props.currentAddressProfile.addressProfiles.forEach((addressProfiles) => {
            if ( (addressProfiles.id.toLowerCase()) === (this.state.id.toLowerCase())) {
                isIdUsed = true;
                return;
            }
        });

        if (isIdUsed) {
            alert("\"" + this.state.id + "\"" + " is being used.\nTry another one");

            return;
        }

        const dataToBeAdded: AddressClassProfile = {
            id: this.state.id,
            type: this.state.type,
            localization: this.state.localization,
            description: this.state.description,
            signature: this.state.signature,
            areaApplicability: this.state.areaApplicability,
            timeToLive: this.state.timeToLive,
            validity: this.state.validity,
            componentProfiles: this.state.componentProfiles,

            formTemplates: this.state.formTemplates,
            displayTemplates: this.state.displayTemplates,
        }

        this.props.changeStateHandler("class", "add", dataToBeAdded);

        this.setState({ 
            isOpeningForm: !this.state.isOpeningForm,
            id: "",
            type: "",
            localization: "",
            description: "",
            signature: "",
            areaApplicability: [],
            timeToLive: "",
            validity: "",
            componentProfiles: [],

            formTemplates: [],
            displayTemplates: [],
        });
    }

    handleDiscardForm = () => {
        // If one of the field is not empty
        if ( this.state.id || this.state.type || this.state.localization || this.state.description || this.state.signature || this.state.areaApplicability || this.state.timeToLive || this.state.validity ) {
            if(!window.confirm("Form data will be clear.\nConfirm to discard?")) {
                return;
            }

        }

        // Clear the form data when Discard
        this.setState({ 
            isOpeningForm: !this.state.isOpeningForm,
            id: "",
            type: "",
            localization: "",
            description: "",
            signature: "",
            areaApplicability: [],
            timeToLive: "",
            validity: "",
            componentProfiles: [],

            formTemplates: [],
            displayTemplates: [],

            addComponentKey: "select",
        });
    }

    removeIncludedComponent = (componentKey:string) => {
        const newComponentProfiles = JSON.parse(JSON.stringify(this.state.componentProfiles));//deep copy the state.addressProfiles
        newComponentProfiles.forEach((newComponent:any)=>{
            if(componentKey == newComponent.addressComponentProfileKey){
                const index = newComponentProfiles.indexOf(newComponent);
                newComponentProfiles.splice(index, 1);
            }
        });
        this.setState({componentProfiles: newComponentProfiles});
    }

    addIncludedComponent = (componentKey:string, maxCardinality:number, minCardinality:number) => {
        // log.info(componentKey);
        if(componentKey != "select") {
            const newComponentProfiles = JSON.parse(JSON.stringify(this.state.componentProfiles));//deep copy the state.addressProfiles
            const index = newComponentProfiles.length;
            newComponentProfiles.splice(index, 0, 
                {
                    addressComponentProfileKey: componentKey,
                    addressComponentSpecification: 
                        {
                            maxCardinality: maxCardinality, minCardinality: minCardinality,
                        },
                }
                );
            this.setState({componentProfiles: newComponentProfiles, addComponentKey: "select", addComponentMaxCardinality: 0, addComponentMinCardinality: 0,});
        }
    }

    render(){

        const itemStyle = {
            marginTop: "10px",
            borderRadius: "5px",
            background: "#FFFFFF",
        } as React.CSSProperties;

        const itemHeadStyle = {
            padding: "7px 5px 30px 5px",
            height: "15px",
            fontSize: "20px",
            width: "100%",
        } as React.CSSProperties;

        const itemHeadButtonStyle = {
            padding: "5px",
        } as React.CSSProperties;

        const rightStyle = {
            float: "right",
        } as React.CSSProperties;

        const itemHrStyle = {
            width: "100%",
            margin: "0 0 7px 0",
        } as React.CSSProperties;

        const itemBodyStyle = {
            padding: "5px",
            width: "100%",
        } as React.CSSProperties;

        const tdStyle = {
            fontWeight: "bold",
        } as React.CSSProperties;

        const subSubItemSytle = {
            backgroundColor: "#779977",
            marginLeft: "5px",
            marginRight: "5px", 
            // color: "#FFF",
        } as React.CSSProperties;
        
        const selectStyle = {
            width: "100%",
            marginBottom: "5px",
            padding: "5px",
            borderRadius: "5px",
        } as React.CSSProperties;
        
        const centerStyle = {
            fontSize: "1.2em",
            textAlign: "center",
            cursor: "pointer",
            paddingBottom: "1em",
            lineHeight: "0",
        } as React.CSSProperties;
        
        const addButtonStyle = {
            backgroundColor: "#509970",
            paddingBottom: "0",
            lineHeight: "normal",
            padding: "5px 0",
            borderRadius: "5px",
        } as React.CSSProperties;

        return(
            <div style={itemStyle}>
                <div style={{...itemHeadButtonStyle, ...rightStyle}}>
                    {this.state.isOpeningForm
                        ?<AnchorButton onClick={this.handleAddChange} intent="success" icon="add" text="Confirm Create" />
                        :<></>
                    }
                </div>
                <div style={itemHeadButtonStyle}>
                    {this.state.isOpeningForm
                        ?<AnchorButton onClick={this.handleDiscardForm} intent="danger" icon="delete" text="Discard Profile" />
                        :<AnchorButton onClick={this.handleOpenForm} intent="success" icon="add" text="Create New Class Profile" />
                    }
                </div>
                {
                    this.state.isOpeningForm
                    ?<>
                        <hr style={itemHrStyle}/>
                        <div style={itemBodyStyle}>
                            <table>
                                <tr>
                                    <td style={tdStyle}>Profile ID<span style={{color: "red"}}>*</span></td>
                                    <td>:</td>
                                    <td>
                                        <InputGroup value={this.state.id} onChange={(event:any)=>{this.setState({id: event.target.value})}}/>  
                                    </td>
                                </tr>
                                <tr>
                                    <td style={tdStyle}>Type<span style={{color: "red"}}>*</span></td>
                                    <td>:</td>
                                    <td>
                                        <InputGroup value={this.state.type} onChange={(event:any)=>{this.setState({type: event.target.value})}}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={tdStyle}>Localization<span style={{color: "red"}}>*</span></td>
                                    <td>:</td>
                                    <td>
                                        <InputGroup value={this.state.localization} onChange={(event:any)=>{this.setState({localization: event.target.value})}}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={tdStyle}>Description<span style={{color: "red"}}>*</span></td>
                                    <td>:</td>
                                    <td>
                                        <InputGroup value={this.state.description} onChange={(event:any)=>{this.setState({description: event.target.value})}}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={tdStyle}>Signature</td>
                                    <td>:</td>
                                    <td>
                                        <InputGroup value={this.state.signature} onChange={(event:any)=>{this.setState({signature: event.target.value})}}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={tdStyle}>Area Applicability</td>
                                    <td>:</td>
                                    <td>
                                        <TagInput addOnBlur={true} values={this.state.areaApplicability} onChange={(values: React.ReactNode[]) => {this.setState({ areaApplicability: values })}} />
                                        {/* <InputGroup value={this.state.areaApplicability} onChange={(event)=>{this.setState({areaApplicability: event.target.value})}}/> */}
                                    </td>
                                </tr>
                                <tr>
                                    <td style={tdStyle}>Time To Live<span style={{color: "red"}}>*</span></td>
                                    <td>:</td>
                                    <td>
                                        <NumericInput allowNumericCharactersOnly={true} value={this.state.timeToLive} onValueChange={(_v: number, value: string)=>{this.setState({timeToLive: _v})}}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={tdStyle}>Validity<span style={{color: "red"}}>*</span></td>
                                    <td>:</td>
                                    <td>
                                        <InputGroup value={this.state.validity} onChange={(event:any)=>{this.setState({validity: event.target.value})}}/>
                                    </td>
                                </tr>
                            </table>
                            <div style={{color: "#FFF"}}>
                                {
                                    this.state.componentProfiles.map((component:any)=>(
                                        <ClassIncludedComponentItem
                                            key = {component.addressComponentProfileKey}
                                            componentKey = {component.addressComponentProfileKey}
                                            componentProfiles = {this.props.componentProfiles}
                                            maxCardinality = {component.addressComponentSpecification.maxCardinality}
                                            minCardinality = {component.addressComponentSpecification.minCardinality}
                                            isEditingForm = {this.state.isEditingForm}
                                            removeIncludedComponent = {this.removeIncludedComponent}
                                        />
                                    ))
                                }
                                {/* todo - add the component selector */}
                                <div style={{...itemStyle, ...subSubItemSytle}}>
                                    <div style={{padding: "5px"}}>
                                        <select style={selectStyle} value={this.state.addComponentKey} onChange={(event)=>{this.setState({addComponentKey: event.target.value})}}>
                                            <option value="select">Please select component</option>
                                            {
                                                this.props.componentProfiles.map((component)=>(
                                                    // <option key={component.key} value={component.key}>{component.key}</option>
                                                    <ComponentOption key={component.key} componentKey={component.key} componentIncluded={this.state.componentProfiles} />
                                                ))
                                            }
                                        </select>
                                        <table>
                                            <tr>
                                                <td style={tdStyle}>Max</td>
                                                <td>:</td>
                                                <td>
                                                    <NumericInput allowNumericCharactersOnly={true} value={this.state.addComponentMaxCardinality} onValueChange={(_v: number, value: string)=>{this.setState({addComponentMaxCardinality: _v})}}/>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style={tdStyle}>Min</td>
                                                <td>:</td>
                                                <td>
                                                    <NumericInput allowNumericCharactersOnly={true} value={this.state.addComponentMinCardinality} onValueChange={(_v: number, value: string)=>{this.setState({addComponentMinCardinality: _v})}}/>
                                                </td>
                                            </tr>
                                        </table>
                                        <div style={{...centerStyle, ...addButtonStyle, fontWeight: "bold"}} onClick={()=>{this.addIncludedComponent(this.state.addComponentKey, this.state.addComponentMaxCardinality, this.state.addComponentMinCardinality)}}>Add Included Component</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                    :<></>
                }
            </div>
        );
    }
}

class AddressClassProfileList extends React.Component<AddressClassProfileListProps> {
    render(){
        return(
            <>
                {this.props.classProfiles.map((classProfile)=>(    
                    <AddressClassProfileListItem
                        key={classProfile.id}
                        classProfile={classProfile}
                        componentProfiles={this.props.componentProfiles}
                        changeStateHandler = {this.props.changeStateHandler}
                    />
                ))}
            </>
        );
    }
}

class AddressClassProfileListItem extends React.Component<AddressClassProfileListItemProps, any> {
    constructor(props:any){
        super(props);
        this.state = {
            // Form state
            isListOpen: false,
            isEditingForm: false,

            // Profile Data
            id: this.props.classProfile.id,
            type: this.props.classProfile.type,
            localization: this.props.classProfile.localization,
            description: this.props.classProfile.description,
            signature: this.props.classProfile.signature,
            areaApplicability: this.props.classProfile.areaApplicability,
            timeToLive: this.props.classProfile.timeToLive,
            validity: this.props.classProfile.validity,
            componentProfiles: this.props.classProfile.componentProfiles,
            
            formTemplates: this.props.classProfile.formTemplates,
            displayTemplates: this.props.classProfile.displayTemplates,

            dataBeforeEdit: {
                type: null,
                localization: null,
                description: null,
                signature: null,
                areaApplicability: null,
                timeToLive: null,
                validity: null,
                componentProfiles: null,
                
                formTemplates: null,
                displayTemplates: null,
            },

            addComponentKey: "select",
            addComponentMaxCardinality: 0,
            addComponentMinCardinality: 0,
        }
    }

    handleListOpen = () => {
        this.setState({isListOpen: !this.state.isListOpen});
    }

    handleEditProfile = () => {
        this.setState({
            dataBeforeEdit: {
                type: this.props.classProfile.type,
                localization: this.props.classProfile.localization,
                description: this.props.classProfile.description,
                signature: this.props.classProfile.signature,
                areaApplicability: this.props.classProfile.areaApplicability,
                timeToLive: this.props.classProfile.timeToLive,
                validity: this.props.classProfile.validity,
                componentProfiles: this.props.classProfile.componentProfiles,

                formTemplates: this.props.classProfile.formTemplates,
                displayTemplates: this.props.classProfile.formTemplates,
            }
        })

        this.setState({ isEditingForm: !this.state.isEditingForm, isListOpen: true});
    }

    handleDiscardChange = () => {
        // If one of the input field changed but user clicked discard
        if (
            this.state.type != this.state.dataBeforeEdit.type ||
            this.state.localization != this.state.dataBeforeEdit.localization ||
            this.state.description != this.state.dataBeforeEdit.description ||
            this.state.signature != this.state.dataBeforeEdit.signature ||
            this.state.areaApplicability != this.state.dataBeforeEdit.areaApplicability ||
            this.state.timeToLive != this.state.dataBeforeEdit.timeToLive ||
            this.state.validity != this.state.dataBeforeEdit.validity ||
            this.state.componentProfiles != this.state.dataBeforeEdit.componentProfiles
        ) {
            if (!window.confirm("Some fields are changed.\nConfirm to discard?")) {
                return;
            }
        }

        this.setState({
            type: this.state.dataBeforeEdit.type,
            localization: this.state.dataBeforeEdit.localization,
            description: this.state.dataBeforeEdit.description,
            signature: this.state.dataBeforeEdit.signature,
            areaApplicability: this.state.dataBeforeEdit.areaApplicability,
            timeToLive: this.state.dataBeforeEdit.timeToLive,
            validity: this.state.dataBeforeEdit.validity,
            componentProfiles: this.state.dataBeforeEdit.componentProfiles,
            
            formTemplates: this.state.dataBeforeEdit.formTemplates,
            displayTemplates: this.state.dataBeforeEdit.displayTemplates,
        });

        this.setState({ isEditingForm: !this.state.isEditingForm });
    }

    handleSaveChange = () => {
        // If the required field is empty
        if(!this.state.type) {
            alert("\"Type\" cannot not be empty");

            return;
        } else if(!this.state.localization) {
            alert("\"Localization\" cannot not be empty");

            return;
        } else if(!this.state.description) {
            alert("\"Description\" cannot not be empty");

            return;
        } else if(!this.state.timeToLive) {
            alert("\"Time To Live\" cannot not be empty");

            return;
        } else if(!this.state.validity) {
            alert("\"Validity\" cannot not be empty");

            return;
        }

        const dataToBeSaved: AddressClassProfile = {
            id: this.state.id,
            type: this.state.type,
            localization: this.state.localization,
            description: this.state.description,
            signature: this.state.signature,
            areaApplicability: this.state.areaApplicability,
            timeToLive: this.state.timeToLive,
            validity: this.state.validity,
            componentProfiles: this.state.componentProfiles,
            
            formTemplates: this.state.formTemplates,
            displayTemplates: this.state.displayTemplates,
        }

        this.props.changeStateHandler( "class", "edit", dataToBeSaved);

        this.setState({ isEditingForm: !this.state.isEditingForm });
    }

    handleDeleteChange = () => {
        // Alert before deleting
        if (!window.confirm("Confirm to delete this Class Profile?")) {
            return;
        }

        const dataToBeDeleted: AddressClassProfile = {
            id: this.state.id,
            type: this.state.type,
            localization: this.state.localization,
            description: this.state.description,
            signature: this.state.signature,
            areaApplicability: this.state.areaApplicability,
            timeToLive: this.state.timeToLive,
            validity: this.state.validity,
            componentProfiles: this.state.componentProfiles,
            
            formTemplates: this.state.formTemplates,
            displayTemplates: this.state.displayTemplates,
        }

        this.props.changeStateHandler( "class", "delete", dataToBeDeleted);

        this.setState({ isEditingForm: !this.state.isEditingForm });
    }

    removeIncludedComponent = (componentKey:string) => {
        const newComponentProfiles = JSON.parse(JSON.stringify(this.state.componentProfiles));//deep copy the state.addressProfiles
        newComponentProfiles.forEach((newComponent:any)=>{
            if(componentKey == newComponent.addressComponentProfileKey){
                const index = newComponentProfiles.indexOf(newComponent);
                newComponentProfiles.splice(index, 1);
            }
        });
        this.setState({componentProfiles: newComponentProfiles});
    }

    addIncludedComponent = (componentKey:string, maxCardinality:number, minCardinality:number) => {
        // log.info(componentKey);
        if(componentKey != "select") {
            const newComponentProfiles = JSON.parse(JSON.stringify(this.state.componentProfiles));//deep copy the state.addressProfiles
            const index = newComponentProfiles.length;
            newComponentProfiles.splice(index, 0, 
                {
                    addressComponentProfileKey: componentKey,
                    addressComponentSpecification: 
                        {
                            maxCardinality: maxCardinality, minCardinality: minCardinality,
                        },
                }
                );
            this.setState({componentProfiles: newComponentProfiles, addComponentKey: "select", addComponentMaxCardinality: 0, addComponentMinCardinality: 0,});
        }
    }

    render(){

        const itemStyle = {
            marginTop: "10px",
            borderRadius: "5px",
            background: "#FFFFFF",
        } as React.CSSProperties;

        const itemHeadStyle = {
            padding: "7px 5px 30px 5px",
            height: "15px",
            fontSize: "20px",
            width: "100%",
        } as React.CSSProperties;

        const itemHeadButtonStyle = {
            padding: "5px",
            float: "right",
        } as React.CSSProperties;

        const itemHrStyle = {
            width: "100%",
            margin: "0 0 7px 0",
        } as React.CSSProperties;

        const itemBodyStyle = {
            padding: "5px",
            width: "100%",
        } as React.CSSProperties;

        const subItemSytle = {
            backgroundColor: "#99BB99",
            // color: "#FFF",
        } as React.CSSProperties;

        const subItemHeadSytle ={
            padding: "0.5em 0 1.5em 0",
            fontSize: "1.1em",
            textAlign: "center"
        } as React.CSSProperties;

        const centerStyle = {
            fontSize: "1.2em",
            textAlign: "center",
            cursor: "pointer",
            paddingBottom: "1em",
            lineHeight: "0",
        } as React.CSSProperties;

        const addButtonStyle = {
            backgroundColor: "#509970",
            paddingBottom: "0",
            lineHeight: "normal",
            padding: "5px 0",
            borderRadius: "5px",
        } as React.CSSProperties;

        const rightDivStyle = {
            float: "right",
        } as React.CSSProperties;

        const subSubItemSytle = {
            backgroundColor: "#779977",
            marginLeft: "5px",
            marginRight: "5px", 
            // color: "#FFF",
        } as React.CSSProperties;

        const subSubItemHeadStyle = {
            padding: "7px 5px 5px",
            fontSize: "15px",
            height: "unset",
        } as React.CSSProperties;

        const subSubitemBodyStyle = {
            fontSize: "15px",
        } as React.CSSProperties;

        const selectStyle = {
            width: "100%",
            marginBottom: "5px",
            padding: "5px",
            borderRadius: "5px",
        } as React.CSSProperties;

        const tdStyle = {
            fontWeight: "bold",
        } as React.CSSProperties;

        const insideFormStyle = {
            color: "white",
        } as React.CSSProperties;

        return(
            <div style={itemStyle}>
                <div style={itemHeadButtonStyle}>
                    {this.state.isEditingForm
                        ?
                        <>
                            <AnchorButton onClick={this.handleSaveChange} intent="success" icon="floppy-disk" text="Save Change" />
                            <AnchorButton onClick={this.handleDiscardChange} intent="danger" icon="cross" text="Discard Change" style={{marginLeft: "5px"}}/>
                        </>
                        :
                        <>
                            <AnchorButton onClick={this.handleEditProfile} intent="success" icon="edit" text="Edit Profile" />
                            <AnchorButton onClick={this.handleDeleteChange} intent="danger" icon="delete" text="Delete Profile" style={{marginLeft: "5px"}}/>
                        </>
                    }
                </div>
                <div style={itemHeadStyle}>
                    {this.props.classProfile.id}
                </div>
                <hr style={itemHrStyle}/>
                <div style={itemBodyStyle}>
                    <table>
                        <tr>
                            <td style={tdStyle}>Type</td>
                            <td>:</td>
                            <td>
                                {
                                    this.state.isEditingForm
                                    ? <InputGroup value={this.state.type} onChange={(event:any)=>{this.setState({type: event.target.value})}}/>
                                    : <>{this.state.type}</>
                                }    
                            </td>
                        </tr>
                        <tr>
                            <td style={tdStyle}>Localization</td>
                            <td>:</td>
                            <td>
                                {
                                    this.state.isEditingForm
                                    ? <InputGroup value={this.state.localization} onChange={(event:any)=>{this.setState({localization: event.target.value})}}/>
                                    : <>{this.state.localization}</>
                                }    
                            </td>
                        </tr>
                        <tr>
                            <td style={tdStyle}>Description</td>
                            <td>:</td>
                            <td>
                                {
                                    this.state.isEditingForm
                                    ? <InputGroup value={this.state.description} onChange={(event:any)=>{this.setState({description: event.target.value})}}/>
                                    : <>{this.state.description}</>
                                }    
                            </td>
                        </tr>
                        <tr>
                            <td style={tdStyle}>Signature</td>
                            <td>:</td>
                            <td>
                                {
                                    this.state.isEditingForm
                                    ? <InputGroup value={this.state.signature} onChange={(event:any)=>{this.setState({signature: event.target.value})}}/>
                                    : <>{this.state.signature}</>
                                }    
                            </td>
                        </tr>
                        <tr>
                            <td style={tdStyle}>Area Applicability</td>
                            <td>:</td>
                            <td>
                                {
                                    this.state.isEditingForm
                                    ?<TagInput addOnBlur={true} values={this.state.areaApplicability} onChange={(values: React.ReactNode[]) => {this.setState({ areaApplicability: values })}} /> 
                                    // <InputGroup value={this.state.areaApplicability} onChange={(event)=>{this.setState({type: event.target.areaApplicability})}}/>
                                    : <>
                                        {
                                            this.state.areaApplicability.map((area:any)=>(
                                                <div style={{padding:"2px 5px", borderRadius: "5px", background: "lightgrey", display: "inline", marginRight:"5px"}} key={area}>{area}</div>
                                            ))
                                        }
                                    </>
                                    // <>{this.state.areaApplicability}</>
                                }    
                            </td>
                        </tr>
                        <tr>
                            <td style={tdStyle}>Time To Live</td>
                            <td>:</td>
                            <td>
                                {
                                    this.state.isEditingForm
                                    ? <NumericInput allowNumericCharactersOnly={true} value={this.state.timeToLive} onValueChange={(_v: number, value: string)=>{this.setState({timeToLive: _v})}}/>
                                    : <>{this.state.timeToLive}</>
                                }    
                            </td>
                        </tr>
                        <tr>
                            <td style={tdStyle}>Validity</td>
                            <td>:</td>
                            <td>
                                {
                                    this.state.isEditingForm
                                    ? <InputGroup value={this.state.validity} onChange={(event:any)=>{this.setState({validity: event.target.value})}}/>
                                    : <>{this.state.validity}</>
                                }    
                            </td>
                        </tr>
                        
                    </table>
                    <div style={{...itemStyle, ...subItemSytle, ...insideFormStyle}}>
                        <div style={{...itemHeadStyle, ...subItemHeadSytle, fontWeight: "bold"}}>Component Profile</div>
                        <hr style={itemHrStyle} />
                        <Collapse isOpen={this.state.isListOpen} style={itemBodyStyle}>
                                {
                                    this.state.componentProfiles.map((component:any)=>(
                                        <ClassIncludedComponentItem
                                            key = {component.addressComponentProfileKey}
                                            componentKey = {component.addressComponentProfileKey}
                                            componentProfiles = {this.props.componentProfiles}
                                            maxCardinality = {component.addressComponentSpecification.maxCardinality}
                                            minCardinality = {component.addressComponentSpecification.minCardinality}
                                            isEditingForm = {this.state.isEditingForm}
                                            removeIncludedComponent = {this.removeIncludedComponent}
                                        />
                                    ))
                                }
                        </Collapse>
                        {this.state.isEditingForm
                            ?<div style={{...itemStyle, ...subSubItemSytle}}>
                                <div style={{padding: "5px"}}>
                                    <select style={selectStyle} value={this.state.addComponentKey} onChange={(event)=>{this.setState({addComponentKey: event.target.value})}}>
                                        <option value="select">Please select component</option>
                                        {
                                            this.props.componentProfiles.map((component)=>(
                                                // <option key={component.key} value={component.key}>{component.key}</option>
                                                <ComponentOption key={component.key} componentKey={component.key} componentIncluded={this.state.componentProfiles} />
                                            ))
                                        }
                                    </select>
                                    <table>
                                        <tr>
                                            <td style={tdStyle}>Max</td>
                                            <td>:</td>
                                            <td>
                                                <NumericInput allowNumericCharactersOnly={true} value={this.state.addComponentMaxCardinality} onValueChange={(_v: number, value: string)=>{this.setState({addComponentMaxCardinality: _v})}}/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={tdStyle}>Min</td>
                                            <td>:</td>
                                            <td>
                                                <NumericInput allowNumericCharactersOnly={true} value={this.state.addComponentMinCardinality} onValueChange={(_v: number, value: string)=>{this.setState({addComponentMinCardinality: _v})}}/>
                                            </td>
                                        </tr>
                                    </table>
                                    <div style={{...centerStyle, ...addButtonStyle, fontWeight: "bold"}} onClick={()=>{this.addIncludedComponent(this.state.addComponentKey, this.state.addComponentMaxCardinality, this.state.addComponentMinCardinality)}}>Add Included Component</div>
                                </div>
                            </div>
                            :<></>
                        }
                        <div style={centerStyle} onClick={this.handleListOpen}>...</div>
                    </div>
                </div>
            </div>
        );
    }
}

const ComponentOption = (props:any) => {
    var isIncluded = false;

    props.componentIncluded.forEach((element:any) => {
        if(element.addressComponentProfileKey == props.componentKey){
            isIncluded = true;
        }
    });
    log.info("isIncluded: "+ isIncluded);
    
return <option disabled={isIncluded} value={props.componentKey}>{props.componentKey}{isIncluded?" (already included)":""}</option>
    
}

const ClassIncludedComponentItem = (props: ClassIncludedComponentItemProps) => {
    const itemStyle = {
        marginTop: "10px",
        borderRadius: "5px",
        background: "#FFFFFF",
    } as React.CSSProperties;

    const itemHeadStyle = {
        padding: "7px 5px 30px 5px",
        height: "15px",
        fontSize: "20px",
        width: "100%",
    } as React.CSSProperties;

    const itemHeadButtonStyle = {
        padding: "5px",
        float: "right",
    } as React.CSSProperties;

    const itemHrStyle = {
        width: "100%",
        margin: "0 0 7px 0",
        clear: "both",
    } as React.CSSProperties;

    const itemBodyStyle = {
        padding: "5px",
        width: "100%",
    } as React.CSSProperties;

    const rightDivStyle = {
        float: "right",
    } as React.CSSProperties;

    const subSubItemSytle = {
        backgroundColor: "#779977",
        marginLeft: "5px",
        marginRight: "5px", 
        // color: "#FFF",
    } as React.CSSProperties;

    const subSubItemHeadStyle = {
        padding: "10px 5px 5px",
        fontSize: "15px",
        height: "unset",
    } as React.CSSProperties;

    const subSubitemBodyStyle = {
        fontSize: "15px",
    } as React.CSSProperties;

    const tdStyle = {
        fontWeight: "bold",
    } as React.CSSProperties;

    let output = <></>

    props.componentProfiles.forEach((component)=> {        
        if(component.key == props.componentKey) {
            output = 
                <div style={{...itemStyle, ...subSubItemSytle}} key={props.componentKey}>
                    <div style={itemHeadButtonStyle}>
                        {
                            props.isEditingForm
                            ?<AnchorButton onClick={()=>{props.removeIncludedComponent(props.componentKey)}} intent="danger" icon="delete" style={{marginLeft: "5px"}}/>
                            :<></>
                        }
                    </div>
                    <div style={{...itemHeadStyle, ...subSubItemHeadStyle}}>
                        <span style={tdStyle}>{component.key}</span>
                        <div style={rightDivStyle}>
                                min: {props.minCardinality} | max: {props.maxCardinality}
                        </div>
                    </div>
                    <hr style={itemHrStyle} />
                    <div style={{...itemBodyStyle,...subSubitemBodyStyle}}>
                        <table>
                            <tr>
                                <td style={tdStyle}>Description</td><td>:</td><td>{component.description}</td>
                            </tr>
                            <tr>
                                <td style={tdStyle}>Example</td><td>:</td><td>{component.example}</td>
                            </tr>
                            <tr>
                            <td style={tdStyle}>Attributes</td><td>:</td>
                                <td>
                                    {
                                        component.attributeProfiles.map((attribute)=>(
                                            <div style={{padding: "2px 5px",borderRadius: "5px", background: "darkslategrey", display: "inline", marginRight:"5px"}} key={attribute.attributeProfileName}>{attribute.attributeProfileName}</div>
                                        ))
                                    }
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            ;
        }
    });
    return output;
}

export interface AddressClassProfilePanelProps {
    currentAddressProfile: AddressProfile,
    changeStateHandler: any,
}

interface AddressClassProfileFormProps {
    changeStateHandler: any,
    componentProfiles: AddressComponentProfile[],
    currentAddressProfile: AddressProfile,
}

interface AddressClassProfileListProps {
    classProfiles: AddressClassProfile[],
    componentProfiles: AddressComponentProfile[],
    changeStateHandler: any,
}

interface AddressClassProfileListItemProps {
    classProfile: AddressClassProfile,
    componentProfiles: AddressComponentProfile[],
    changeStateHandler: any,
}

interface ClassIncludedComponentItemProps {
    componentKey: string,
    componentProfiles: AddressComponentProfile[],
    maxCardinality: number,
    minCardinality: number,
    isEditingForm: boolean,
    removeIncludedComponent: any,
}