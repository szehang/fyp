import { AnchorButton, Collapse, InputGroup, NumericInput, TagInput } from "@blueprintjs/core";
import * as React from "react";
import { AddressComponentProfile, AddressProfile, AttributeProfile } from "./AddressProfile";
import { AttributeProfilePanel } from "./AttributeProfilePanel";

import log from "electron-log"
Object.assign(console, log);

export class AddressComponentProfilePanel extends React.Component<AddressComponentProfilePanelProps> {
    constructor(props){
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
                        <AddressComponentProfileForm 
                        changeStateHandler = {this.props.changeStateHandler}
                        attributeProfiles = {this.props.currentAddressProfile.attributeProfiles} 
                        />
                        <AddressComponentProfileList 
                        componentProfiles = {this.props.currentAddressProfile.componentProfiles}
                        attributeProfiles = {this.props.currentAddressProfile.attributeProfiles}
                        changeStateHandler = {this.props.changeStateHandler}
                        />
                    </>
                }
            </>
        );
    }
}

class AddressComponentProfileForm extends React.Component<AddressComponentProfileFormProps> {
    constructor(props) {
        super(props);
        this.state={
            isOpeningForm: false,

            // Profile Data
            key: "",
            description: "",
            example: "",
            attributeProfiles: [],
        }
    }

    handleOpenForm = () => {
        this.setState({ isOpeningForm: !this.state.isOpeningForm });
    }


    handleAddChange = () => {
        const dataToBeAdded: AddressComponentProfile = {
            key: this.state.key,
            description: this.state.description,
            example: this.state.example,
            attributeProfiles: this.state.attributeProfiles,
        }

        this.props.changeStateHandler( "component", "add", dataToBeAdded);

        this.setState({ 
            isOpeningForm: !this.state.isOpeningForm,
            key: "",
            description: "",
            example: "",
            attributeProfiles: [],
        });
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
                        ?<AnchorButton onClick={this.handleOpenForm} intent="danger" icon="delete" text="Discard Profile" />
                        :<AnchorButton onClick={this.handleOpenForm} intent="success" icon="add" text="Create New Component Profile" />
                    }
                </div>
                {
                    this.state.isOpeningForm
                    ?<>
                        <hr style={itemHrStyle}/>
                        <div style={itemBodyStyle}>
                            <table>
                                <tr>
                                    <td>Profile Key</td>
                                    <td>:</td>
                                    <td>
                                        <InputGroup value={this.state.key} onChange={(event)=>{this.setState({key: event.target.value})}}/>  
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
                                    <td>Example</td>
                                    <td>:</td>
                                    <td>
                                    <InputGroup value={this.state.example} onChange={(event)=>{this.setState({example: event.target.value})}}/>
                                    </td>
                                </tr>
                                {/* todo - add the attribute selector */}
                            </table>
                        </div>
                    </>
                    :<></>
                }
            </div>
        );
    }
}

class AddressComponentProfileList extends React.Component<AddressComponentProfileListProps> {
    render(){
        return(
            <>
                {this.props.componentProfiles.map((component)=>(    
                    <AddressComponentProfileListItem
                        key={component.key}
                        componentProfile={component}
                        attributeProfiles={this.props.attributeProfiles}
                        changeStateHandler = {this.props.changeStateHandler}
                    />
                ))}
            </>
        );
    }
}

class AddressComponentProfileListItem extends React.Component<AddressComponentProfileListItemProps> {
    constructor(props){
        super(props);
        this.state = {
            // Form state
            isListOpen: false,
            isEditingForm: false,

            // Profile Data
            key: this.props.componentProfile.key,
            description: this.props.componentProfile.description,
            example: this.props.componentProfile.example,
            attributeProfiles: this.props.componentProfile.attributeProfiles,

            dataBeforeEdit: {
                description: null,
                example: null,
                attributeProfiles: null,
            },
        }
    }

    handleListOpen = () => {
        this.setState({isListOpen: !this.state.isListOpen});
    }

    handleEditProfile = () => {
        this.setState({
            dataBeforeEdit: {
                description: this.state.description,
                example: this.state.example,
                attributeProfiles: this.state.attributeProfiles,
            }
        })

        this.setState({ isEditingForm: !this.state.isEditingForm });
    }

    handleDiscardChange = () => {
        this.setState({
            description: this.state.dataBeforeEdit.description,
            example: this.state.dataBeforeEdit.example,
            attributeProfiles: this.state.dataBeforeEdit.attributeProfiles,
        });

        this.setState({ isEditingForm: !this.state.isEditingForm });
    }

    handleSaveChange = () => {
        const dataToBeSaved: AddressComponentProfile = {
            key: this.state.key,
            description: this.state.description,
            example: this.state.example,
            attributeProfiles: this.state.attributeProfiles,
        }

        this.props.changeStateHandler( "component", "edit", dataToBeSaved);

        this.setState({ isEditingForm: !this.state.isEditingForm });
    }

    handleDeleteChange = () => {
        const dataToBeDeleted: AddressComponentProfile = {
            key: this.state.key,
            description: this.state.description,
            example: this.state.example,
            attributeProfiles: this.state.attributeProfiles,
        }

        this.props.changeStateHandler( "component", "delete", dataToBeDeleted);

        this.setState({ isEditingForm: !this.state.isEditingForm });
    }

    removeIncludedAttribute = (attributeName:string) => {
        const newAttributeProfiles = JSON.parse(JSON.stringify(this.state.attributeProfiles));//deep copy the state.addressProfiles
        newAttributeProfiles.forEach((newAttribute)=>{
            if(attributeName == newAttribute.attributeProfileName){
                const index = newAttributeProfiles.indexOf(newAttribute);
                newAttributeProfiles.splice(index, 1);
            }
        });
        this.setState({attributeProfiles: newAttributeProfiles});
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
        }

        const subItemHeadSytle ={
            padding: "0.5em 0 1.5em 0",
            fontSize: "1.1em",
            textAlign: "center"
        }

        const centerStyle = {
            fontSize: "1.2em",
            textAlign: "center",
            cursor: "pointer",
            paddingBottom: "1em",
            lineHeight: "0",
        }

        const rightDivStyle = {
            float: "right",
        }

        const subSubItemSytle = {
            backgroundColor: "#779977",
            marginLeft: "5px",
            marginRight: "5px", 
            // color: "#FFF",
        }

        const subSubItemHeadStyle = {
            padding: "7px 5px 5px",
            fontSize: "15px",
            height: "unset",
        }

        const subSubitemBodyStyle = {
            fontSize: "15px",
        }

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
                    {this.props.componentProfile.key}
                </div>
                <hr style={itemHrStyle}/>
                <div style={itemBodyStyle}>
                    <table>
                        <tr>
                            <td>Description</td>
                            <td>:</td>
                            <td>
                                {
                                    this.state.isEditingForm
                                    ? <InputGroup value={this.state.description} onChange={(event)=>{this.setState({description: event.target.value})}}/>
                                    : <>{this.state.description}</>
                                }    
                            </td>
                        </tr>
                        <tr>
                            <td>Example</td>
                            <td>:</td>
                            <td>
                                {
                                    this.state.isEditingForm
                                    ? <InputGroup value={this.state.example} onChange={(event)=>{this.setState({example: event.target.value})}}/>
                                    : <>{this.state.example}</>
                                }    
                            </td>
                        </tr>
                    </table>
                    <div style={{...itemStyle, ...subItemSytle}}>
                        <div style={{...itemHeadStyle, ...subItemHeadSytle}}>Attribute Profile</div>
                        <hr style={itemHrStyle} />
                        <Collapse isOpen={this.state.isListOpen} style={itemBodyStyle}>
                                {
                                    this.state.attributeProfiles.map((attribute)=>(
                                        <ComponentIncludedAttributeItem
                                            key = {attribute.attributeProfileName}
                                            attributeName = {attribute.attributeProfileName}
                                            attributeProfiles = {this.props.attributeProfiles}
                                            isEditingForm = {this.state.isEditingForm}
                                            removeIncludedAttribute = {this.removeIncludedAttribute}
                                        />
                                    ))
                                }
                        </Collapse>
                        <div style={centerStyle} onClick={this.handleListOpen}>...</div>
                    </div>
                </div>
            </div>
        );
    }
}

const ComponentIncludedAttributeItem = (props: ComponentIncludedAttributeItemProps) => {
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
    }

    const subItemHeadSytle ={
        padding: "0.5em 0 1.5em 0",
        fontSize: "1.1em",
        textAlign: "center"
    }

    const centerStyle = {
        fontSize: "1.2em",
        textAlign: "center",
        cursor: "pointer",
        paddingBottom: "1em",
        lineHeight: "0",
    }

    const rightDivStyle = {
        float: "right",
    }

    const subSubItemSytle = {
        backgroundColor: "#779977",
        marginLeft: "5px",
        marginRight: "5px", 
        // color: "#FFF",
    }

    const subSubItemHeadStyle = {
        padding: "7px 5px 5px",
        fontSize: "15px",
        height: "unset",
    }

    const subSubitemBodyStyle = {
        fontSize: "15px",
    }

    let output = <></>

    props.attributeProfiles.forEach((attribute)=> {        
        if(attribute.name == props.attributeName) {
            output = 
                <div style={{...itemStyle, ...subSubItemSytle}} key={props.attributeName}>
                    <div style={{...itemHeadStyle, ...subSubItemHeadStyle}}>
                        {attribute.name}
                        <div style={rightDivStyle}>
                                min: {attribute.minCardinality} | max: {attribute.maxCardinality}
                        </div>
                        <div style={rightDivStyle}>
                        {
                            props.isEditingForm
                            ?<AnchorButton onClick={()=>{props.removeIncludedAttribute(props.attributeName)}} intent="danger" icon="delete" text="Remove Inculded Attribute" style={{marginLeft: "5px"}}/>
                            :<></>
                        }
                        </div>
                    </div>
                    <hr style={itemHrStyle} />
                    <div style={{...itemBodyStyle,...subSubitemBodyStyle}}>
                        <table>
                            <tr>
                                <td>Value Type</td><td>:</td><td>{attribute.valueType}</td>
                            </tr>
                        </table>
                    </div>
                </div>
            ;
        }
    });
    return output;
}

export interface AddressComponentProfilePanelProps {
    currentAddressProfile: AddressProfile,
    changeStateHandler: any,
}

interface AddressComponentProfileFormProps {
    changeStateHandler: any,
    attributeProfiles: AttributeProfile[],
}

interface AddressComponentProfileListProps {
    componentProfiles: AddressComponentProfile[],
    attributeProfiles: AttributeProfile[],
    changeStateHandler: any,
}

interface AddressComponentProfileListItemProps {
    componentProfile: AddressComponentProfile,
    attributeProfiles: AttributeProfile[],
    changeStateHandler: any,
}

interface ComponentIncludedAttributeItemProps {
    attributeName: string,
    attributeProfiles: AttributeProfile[],
    isEditingForm: boolean,
    removeIncludedAttribute: any,
}