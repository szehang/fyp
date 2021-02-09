import { AnchorButton, Collapse, InputGroup } from "@blueprintjs/core";
import * as React from "react";
import { AddressComponentProfile, AddressProfile } from "./AddressProfile";

export class ComponentProfilePanel extends React.Component<ComponentProfilePanelProps> {
    constructor (props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return(
            <>
                {
                    this.props.currentAddressProfile==null
                    ?<></>
                    :<>
                        <ComponentProfileForm />
                        <ComponentProfileList
                            items = {this.props.currentAddressProfile.componentProfiles}
                        />
                    </>
                }
            </>
        )
    }
}

class ComponentProfileForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // Form Control
            isOpeningForm: false,
            isExpandAttribute: false,

            //Component Data
            name: "",
            description: "",
            example: "",
            attributeProfiles: [],
        }
    }

    handleOpenForm = () => {
        this.setState({ isOpeningForm: !this.state.isOpeningForm });
    }

    handleAddChange = () => {
        const dataToBeAddeded: AddressComponentProfile = {
            key: this.state.key,
            description: this.state.description,
            example: this.state.example,
            // #toBeDone: attributeProfiles
            attributeProfiles: [],
        }

        this.setState({ 
            isOpeningForm: !this.state.isOpeningForm,
            name: "",
            description: "",
            example: "",
            // #toBeDone: attributeProfiles
            attributeProfiles: [],
        });
    }

    handleExpand = () => {
        this.setState({ isExpandAttribute: !this.state.isExpandAttribute });
    }

    render() {

        const itemStyle = {
            marginTop: "10px",
            borderRadius: "5px",
            background: "#FFFFFF",
        } as React.CSSProperties;

        const itemHeadButtonStyle = {
            padding: "5px",
        } as React.CSSProperties;

        const rightStyle = {
            float: "right",
        } as React.CSSProperties;

        const centerTextStyle = {
            textAlign: "center",
        }

        const itemHrStyle = {
            width: "100%",
            margin: "0 0 7px 0",
        } as React.CSSProperties;

        const itemBodyStyle = {
            padding: "5px",
            width: "100%",
        } as React.CSSProperties;

        // const attributeListStyle = {
        //     backgroundColor: "green",
        //     color: "white",
        //     textAlign: "center",
        //     padding: "6px",
        //     borderBottom: "0.5px solid LightGray",
        //     borderRadius: "10px 10px 0px 0px",
        // } as React.CSSProperties;

        const expanderStyle = {
            borderRadius: "0px 0px 10px 10px",
            borderTop: "0.5px solid LightGray",
            cursor: "pointer",
        }

        const attributeListStyle = {
            backgroundColor: "green",
            color: "white",
        }

        return(
            <div style={itemStyle}>
                <div style={{...itemHeadButtonStyle, ...rightStyle}}>
                    {/* Confirm Create Button */}

                    {this.state.isOpeningForm
                        ?<AnchorButton onClick={this.handleAddChange} intent="success" icon="add" text="Confirm Create" />
                        :<></>
                    }
                </div>

                <div style={itemHeadButtonStyle}>
                    {/* Open / Discard Button */}

                    {this.state.isOpeningForm
                        ?<AnchorButton onClick={this.handleOpenForm} intent="danger" icon="delete" text="Discard Profile" />
                        :<AnchorButton onClick={this.handleOpenForm} intent="success" icon="add" text="Create New Component Profile" />
                    }
                </div>

                {/* Create Form div */}
                {this.state.isOpeningForm
                    ?
                    <>
                    <hr style={itemHrStyle} />
                    
                    <div style={itemBodyStyle}>
                        {/* The actually form */}
                        <table>
                            <tr>
                                <td>Profile Key</td>
                                <td>:</td>
                                <td>
                                    <InputGroup value={this.state.key} onChange={(event)=>{this.setState({name: event.target.value})}} />
                                </td>
                            </tr>
                            <tr>
                                <td>Description</td>
                                <td>:</td>
                                <td>
                                    <InputGroup value={this.state.description} onChange={(event)=>{this.setState({description: event.target.value})}} />
                                </td>
                            </tr>
                            <tr>
                                <td>Example</td>
                                <td>:</td>
                                <td>
                                    <InputGroup value={this.state.example} onChange={(event)=>{this.setState({example: event.target.example})}} />
                                </td>
                            </tr>
                        </table>

                        {/* Attribute List */}
                        <div style={{...itemStyle, ...attributeListStyle}}>
                            <div style={{...itemHeadButtonStyle, ...centerTextStyle}}>Attributes</div>
                            <hr style={itemHrStyle} />
                            <div style={itemBodyStyle}>
                                {
                                    this.state.attributeProfiles.map(attribute=>(
                                        <div>
                                            
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        
                    </div>
                    </>
                    :<></>
                }
            </div>
        )
    }
}

class ComponentProfileList extends React.Component<ComponentProfileListProps> {
    render() {
        return(
            <>
                {this.props.items.map((item)=>(
                    <ComponentProfileListItem
                        key={item.key}
                        item={item}
                    />
                ))}
            </>
        )
    }
}

class ComponentProfileListItem extends React.Component<ComponentProfileListItemProps> {
    constructor(props) {
        super(props);
        this.state = {
            // Form Control
            isEditingForm: false,

            // Profile Data
            name: this.props.item.key,
            description: this.props.item.description,
            example: this.props.item.example,
            attributeProfiles: this.props.item.attributeProfiles,

            dataBeforeEdit: {
                oldDescription: null,
                oldExample: null,
                oldAttributeProfiles: null,
            }
        }
    }

    handleEditProfile = () => {
        this.setState({
            dataBeforeEdit: {
                oldDescription: this.state.description,
                oldExample: this.state.example,
                oldAttributeProfiles: this.state.attributeProfiles,
            }
        })

        this.setState({ isEditingForm: !this.state.isEditingForm });
    }

    handleDiscardChange = () => {
        this.setState({
            description: this.state.dataBeforeEdit.oldDescription,
            example: this.state.dataBeforeEdit.oldExample,
            attributeProfiles: this.state.dataBeforeEdit.oldAttributeProfiles,
        });

        this.setState({ isEditingForm: !this.state.isEditingForm });
    }

    handleSaveChange = () => {

    }

    handleDeleteChange = () => {
        
    }

    render() {
        
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
                    {this.props.item.key}
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
                                    ?<InputGroup value={this.state.description} onChange={(event)=>{this.setState({description: event.target.value})}} />
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
                                    ?<InputGroup value={this.state.example} onChange={(event)=>{this.setState({example: event.target.value})}} />
                                    : <>{this.state.example}</>
                                }    
                            </td>
                        </tr>
                        {/* #toBeDone: Attributes list */}
                        <tr>
                            <td>Attributes</td>
                            <td>:</td>
                            <td>
                                <div>###To be done: Find the corresponding attributeProfilesName###</div>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        )
    }
}

export interface ComponentProfilePanelProps {
    currentAddressProfile: AddressProfile,
}

interface ComponentProfileForm {

}

interface ComponentProfileListProps {
    items: AddressComponentProfile[],
}

interface ComponentProfileListItemProps {
    item: AddressComponentProfile,
}