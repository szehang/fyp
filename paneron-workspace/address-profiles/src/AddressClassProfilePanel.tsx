import { AnchorButton, InputGroup, TagInput } from "@blueprintjs/core";
import * as React from "react";

export class AddressClassProfilePanel extends React.Component<AddressClassProfilePanelProps> {
    constructor(props){
        super(props)
        this.state={

        }
    }

    render(){
        return(
            <>
                {/* <AddressClassProfileForm /> */}
                <AddressClassProfileList 
                    items = {this.props.addressClassProfiles}
                />
            </>
        );
    }
}

class AddressClassProfileForm extends React.Component {
    
}

class AddressClassProfileList extends React.Component<AddressClassProfileListProps> {
    render(){
        return(
            <>
                {this.props.items.map((item)=>(    
                    <AddressClassProfileListItem
                        key={item.id}
                        item={item}
                    />
                ))}
            </>
        );
    }
}

class AddressClassProfileListItem extends React.Component<AddressClassProfileListItemProps> {
    constructor(props){
        super(props);
        this.state = {
            // Form state
            isEditingForm: false,
            // Profile Data
            id: this.props.item.id,
            type: this.props.item.type,
            description: this.props.item.description,
            localization: this.props.item.localization,
            signature: this.props.item.signature,
            areaApplicability: this.props.item.areaApplicability,
            timeToLive: this.props.item.timeToLive,
            validity: this.props.item.validity,
        }
    }

    handleEditProfile = () => {
        // if(this.state.isEditingForm) {
        //     this.saveDataToDb()
        // }
        this.setState({ isEditingForm: !this.state.isEditingForm });
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
          [name]: value
        });
    }

    handleTypeChange(event) {
        this.setState({
            type: event.target.value
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
<           div style={itemStyle}>
                <div style={itemHeadButtonStyle}>
                    {this.state.isEditingForm
                        ?
                        <>
                            <AnchorButton onClick={this.handleEditProfile} intent="success" icon="floppy-disk" text="Save Change" />
                            <AnchorButton onClick={this.handleEditProfile} intent="danger" icon="cross" text="Discard Change" style={{marginLeft: "5px"}}/>
                        </>
                        :
                        <AnchorButton onClick={this.handleEditProfile} intent="success" icon="edit" text="Edit Profile" />
                    }
                </div>
                <div style={itemHeadStyle}>
                    {this.props.item.id}
                </div>
                <hr style={itemHrStyle}/>
                <div style={itemBodyStyle}>
                    <table>
                        <tr>
                            <td>Type</td>
                            <td>:</td>
                            <td>
                                {
                                    this.state.isEditingForm
                                    ? <InputGroup value={this.state.type} onChange={(event)=>{this.setState({type: event.target.value})}}/>
                                    : <>{this.state.type}</>
                                }
                            </td>
                        </tr>
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
                            <td>Localization</td>
                            <td>:</td>
                            <td>
                                {
                                    this.state.isEditingForm
                                    ? <InputGroup value={this.state.localization} onChange={(event)=>{this.setState({localization: event.target.value})}}/>
                                    : <>{this.state.localization}</>
                                }    
                            </td>
                        </tr>
                        <tr>
                            <td>Signature</td>
                            <td>:</td>
                            <td>
                                {
                                    this.state.isEditingForm
                                    ? <InputGroup value={this.state.signature} onChange={(event)=>{this.setState({signature: event.target.value})}}/>
                                    : <>{this.state.signature}</>
                                }    
                            </td>
                        </tr>
                        <tr>
                            <td>Area Applicability</td>
                            <td>:</td>
                            <td>
                                {
                                    this.state.isEditingForm
                                    ? <TagInput values={this.state.areaApplicability} onChange={(values: React.ReactNode[]) => {this.setState({ areaApplicability: values })}} 
                                    />
                                    : <>
                                        {this.state.areaApplicability.map((item)=>(
                                            <span key={item}>{item} </span>
                                        ))}
                                    </>
                                }        
                            </td>
                        </tr>
                        <tr>
                            <td>Time To Live</td>
                            <td>:</td>
                            <td>
                                {
                                    this.state.isEditingForm
                                    ? <InputGroup value={this.state.timeToLive} onChange={(event)=>{this.setState({timeToLive: event.target.value})}}/>
                                    : <>{this.state.timeToLive}</>
                                }    
                            </td>
                        </tr>
                        <tr>
                            <td>Validity</td>
                            <td>:</td>
                            <td>
                                {
                                    this.state.isEditingForm
                                    ? <InputGroup value={this.state.validity} onChange={(event)=>{this.setState({validity: event.target.value})}}/>
                                    : <>{this.state.validity}</>
                                }    
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={3}>
                                {/* component list */}
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        );
    }
}



export interface AddressClassProfilePanelProps {
    addressClassProfiles: any[]
}

interface AddressClassProfileListProps {
    items: any[]
}

interface AddressClassProfileListItemProps {
    item: {
        id: string,
        type: string,
        localization: string, //Localization
        description: string,
        signature?: string, //Signature
        areaApplicability?: string[], //iso19115MD_SpatialRresentation
        timeToLive: number,
        validity: string, //Validity
        components: any[],
    }
}