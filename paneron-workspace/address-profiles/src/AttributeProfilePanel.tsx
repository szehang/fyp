import { AnchorButton, InputGroup, NumericInput, TagInput } from "@blueprintjs/core";
import * as React from "react";
import { AddressProfile, AttributeProfile } from "./AddressProfile";

export class AttributeProfilePanel extends React.Component<AttributeProfilePanelProps> {
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
                        <AttributeProfileForm 
                        changeStateHandler = {this.props.changeStateHandler}
                        />
                        <AttributeProfileList 
                        items = {this.props.currentAddressProfile.attributeProfiles}
                        changeStateHandler = {this.props.changeStateHandler}
                        />
                    </>
                }
            </>
        );
    }
}

class AttributeProfileForm extends React.Component<AttributeProfileFormProps> {
    constructor(props) {
        super(props);
        this.state={
            isOpeningForm: false,

            // Profile Data
            name: "",
            maxCardinality: "",
            minCardinality: "",
            valueType: "",
        }
    }

    handleOpenForm = () => {
        this.setState({ isOpeningForm: !this.state.isOpeningForm });
    }


    handleAddChange = () => {

        // If the "Profile Name" field is empty
        if (!this.state.name) {
            alert("\"Profile Name\" cannot not be empty");

            return;
        }

        // If some optional field is missing
        if ( !this.state.maxCardinality || !this.state.minCardinality || !this.state.valueType ) {
            if (!window.confirm("Some optional fields are missing.\nConfirm to create?")) {
                return;
            }
        }

        // Check if maxCardinality>=minCardinality
        if ( parseInt(this.state.maxCardinality) < parseInt(this.state.minCardinality) ) {
            alert("\"Min Cardinality\" cannot be greater than \"Max Cardinality\"");
            return;
        }

        const dataToBeAdded: AttributeProfile = {
            name: this.state.name,
            maxCardinality: this.state.maxCardinality,
            minCardinality: this.state.minCardinality,
            valueType: this.state.valueType,
        }

        this.props.changeStateHandler( "attribute", "add", dataToBeAdded);

        this.setState({ 
            isOpeningForm: !this.state.isOpeningForm,
            name: "",
            maxCardinality: "",
            minCardinality: "",
            valueType: "",
        });
    }

    handleDiscardForm = () => {
        // If one of the field is not empty
        if ( this.state.name || this.state.maxCardinality || this.state.minCardinality || this.state.valueType ) {
            if(!window.confirm("Form data will be clear.\nConfirm to discard?")) {
                return;
            }

        }

        // Clear the form data when Discard
        this.setState({ 
            isOpeningForm: !this.state.isOpeningForm,
            name: "",
            maxCardinality: "",
            minCardinality: "",
            valueType: "",
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
                        ?<AnchorButton onClick={this.handleDiscardForm} intent="danger" icon="delete" text="Discard Profile" />
                        :<AnchorButton onClick={this.handleOpenForm} intent="success" icon="add" text="Create New Attribute Profile" />
                    }
                </div>
                {
                    this.state.isOpeningForm
                    ?<>
                        <hr style={itemHrStyle}/>
                        <div style={itemBodyStyle}>
                            <table>
                                <tr>
                                    <td>Profile Name</td>
                                    <td>:</td>
                                    <td>
                                        <InputGroup value={this.state.name} onChange={(event)=>{this.setState({name: event.target.value})}}/>  
                                    </td>
                                </tr>
                                <tr>
                                    <td>Max Cardinality</td>
                                    <td>:</td>
                                    <td>
                                        <NumericInput allowNumericCharactersOnly={true} value={this.state.maxCardinality} onValueChange={(_v: number, value: string)=>{this.setState({maxCardinality: value})}}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Min Cardinality</td>
                                    <td>:</td>
                                    <td>
                                        <NumericInput allowNumericCharactersOnly={true} value={this.state.minCardinality} onValueChange={(_v: number, value: string)=>{this.setState({minCardinality: value})}}/>   
                                    </td>
                                </tr>
                                <tr>
                                    <td>Value Type</td>
                                    <td>:</td>
                                    <td>
                                        <InputGroup value={this.state.valueType} onChange={(event)=>{this.setState({valueType: event.target.value})}}/>  
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </>
                    :<></>
                }
            </div>
        );
    }
}

class AttributeProfileList extends React.Component<AttributeProfileListProps> {
    render(){
        return(
            <>
                {this.props.items.map((item)=>(    
                    <AttributeProfileListItem
                        key={item.name}
                        item={item}
                        changeStateHandler = {this.props.changeStateHandler}
                    />
                ))}
            </>
        );
    }
}

class AttributeProfileListItem extends React.Component<AttributeProfileListItemProps> {
    constructor(props){
        super(props);
        this.state = {
            // Form state
            isEditingForm: false,
            // Profile Data
            name: this.props.item.name,
            maxCardinality: this.props.item.maxCardinality,
            minCardinality: this.props.item.minCardinality,
            valueType: this.props.item.valueType,

            dataBeforeEdit: {
                oldMaxCardinality: null,
                oldMinCardinality: null,
                oldValueType: null,
            }
        }
    }

    handleEditProfile = () => {
        this.setState({
            dataBeforeEdit: {
                oldMaxCardinality: this.state.maxCardinality,
                oldMinCardinality: this.state.minCardinality,
                oldValueType: this.state.valueType,
            }
        })

        this.setState({ isEditingForm: !this.state.isEditingForm });
    }

    handleDiscardChange = () => {
        // If one of the input field changed but user clicked discard
        if (
            this.state.maxCardinality != this.state.dataBeforeEdit.oldMaxCardinality ||
            this.state.minCardinality != this.state.dataBeforeEdit.oldMinCardinality ||
            this.state.valueType != this.state.dataBeforeEdit.oldValueType
        ) {
            if (!window.confirm("Some fields are changed.\nConfirm to discard?")) {
                return;
            }
        }

        this.setState({
            maxCardinality: this.state.dataBeforeEdit.oldMaxCardinality,
            minCardinality: this.state.dataBeforeEdit.oldMinCardinality,
            valueType: this.state.dataBeforeEdit.oldValueType,
        });

        this.setState({ isEditingForm: !this.state.isEditingForm });
    }

    handleSaveChange = () => {
        // Check if maxCardinality>=minCardinality
        if ( parseInt(this.state.maxCardinality) < parseInt(this.state.minCardinality) ) {
            alert("\"Min Cardinality\" cannot be greater than \"Max Cardinality\"");
            return;
        }

        const dataToBeSaved: AttributeProfile = {
            name: this.state.name,
            maxCardinality: this.state.maxCardinality,
            minCardinality: this.state.minCardinality,
            valueType: this.state.valueType,
        }

        this.props.changeStateHandler( "attribute", "edit", dataToBeSaved);

        this.setState({ isEditingForm: !this.state.isEditingForm });
    }

    handleDeleteChange = () => {
        // Alert before deleting
        if (!window.confirm("Confirm to delete this Attribute Profile?")) {
            return;
        }

        const dataToBeDeleted: AttributeProfile = {
            name: this.state.name,
            maxCardinality: this.state.maxCardinality,
            minCardinality: this.state.minCardinality,
            valueType: this.state.valueType,
        }

        const includedComponents = this.props.changeStateHandler("attribute", "checkIncludedInComponent", dataToBeDeleted);
        if (includedComponents!=null){
            let message = "";
            includedComponents.forEach((component)=>{
                message += "\n   " + component.key.toString();
            });

            if(!window.confirm("This Attribute is included in Component Profile:" + message + "\n confirm to remove the attribute from the above Component Profile?")){
                return;
            }
        }

        this.props.changeStateHandler( "attribute", "delete", dataToBeDeleted);

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
                    {this.props.item.name}
                </div>
                <hr style={itemHrStyle}/>
                <div style={itemBodyStyle}>
                    <table>
                        <tr>
                            <td>Max Cardinality</td>
                            <td>:</td>
                            <td>
                                {
                                    this.state.isEditingForm
                                    ? <NumericInput allowNumericCharactersOnly={true} value={this.state.maxCardinality} onValueChange={(_v: number, value: string)=>{this.setState({maxCardinality: value})}}/>
                                    : <>{this.state.maxCardinality}</>
                                }    
                            </td>
                        </tr>
                        <tr>
                            <td>Min Cardinality</td>
                            <td>:</td>
                            <td>
                                {
                                    this.state.isEditingForm
                                    ? <NumericInput allowNumericCharactersOnly={true} value={this.state.minCardinality} onValueChange={(_v: number, value: string)=>{this.setState({minCardinality: value})}}/>
                                    : <>{this.state.minCardinality}</>
                                }    
                            </td>
                        </tr>
                        <tr>
                            <td>Value Type</td>
                            <td>:</td>
                            <td>
                                {
                                    this.state.isEditingForm
                                    ? <InputGroup value={this.state.valueType} onChange={(event)=>{this.setState({valueType: event.target.value})}}/>
                                    : <>{this.state.valueType}</>
                                }    
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        );
    }
}

export interface AttributeProfilePanelProps {
    currentAddressProfile: AddressProfile,
    changeStateHandler: any,
}

interface AttributeProfileFormProps {
    changeStateHandler: any,
}

interface AttributeProfileListProps {
    items: AttributeProfile[],
    changeStateHandler: any,
}

interface AttributeProfileListItemProps {
    item: AttributeProfile,
    changeStateHandler: any,
}