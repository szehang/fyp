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
                <AttributeProfileForm 
                    changeStateHandler = {this.props.changeStateHandler}
                />
                {
                    this.props.currentAddressProfile==null
                    ?<></>
                    :<AttributeProfileList 
                    items = {this.props.currentAddressProfile.attributeProfiles}
                    changeStateHandler = {this.props.changeStateHandler}
                />
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
        this.setState({
            maxCardinality: this.state.dataBeforeEdit.oldMaxCardinality,
            minCardinality: this.state.dataBeforeEdit.oldMinCardinality,
            valueType: this.state.dataBeforeEdit.oldValueType,
        });

        this.setState({ isEditingForm: !this.state.isEditingForm });
    }

    handleSaveChange = () => {
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
        const dataToBeDeleted: AttributeProfile = {
            name: this.state.name,
            maxCardinality: this.state.maxCardinality,
            minCardinality: this.state.minCardinality,
            valueType: this.state.valueType,
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