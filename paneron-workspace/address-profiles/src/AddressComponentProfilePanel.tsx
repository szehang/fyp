import { AnchorButton, InputGroup, NumericInput, TagInput } from "@blueprintjs/core";
import * as React from "react";
import { AddressComponentProfile, AddressProfile, AttributeProfile } from "./AddressProfile";

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
            }
        }
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
                        {/* todo - add attribute display and selector */}
                    </table>
                </div>
            </div>
        );
    }
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