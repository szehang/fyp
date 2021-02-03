import * as React from 'react';
import { AnchorButton } from "@blueprintjs/core";

export class ProfileItem extends React.Component<ProfileItemProps, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            // Form state
            isEditingForm: false,
            // Profile Data
            id: this.props.data.id,
            type: this.props.data.type,
            description: this.props.data.description,
            localization: this.props.data.localization,
            signature: this.props.data.signature,
            areaApplicability: this.props.data.areaApplicability,
            timeToLive: this.props.data.timeToLive,
            validity: this.props.data.validity,
        }
        this.handleEditProfile = this.handleEditProfile.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    };

    // saveDataToDb() {
    //     throw new Error('Method not implemented.');
    // }

    handleEditProfile = () => {
        // if(this.state.isEditingForm) {
        //     this.saveDataToDb()
        // }
        this.setState({ isEditingForm: !this.state.isEditingForm });
    }

    handleInputChange(event: any) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
          [name]: value
        });
    }

    render() {

        const itemStyle = {
            marginTop: "10px",
            borderRadius: "5px",
        } as React.CSSProperties;

        const itemBodyStyle = {
            padding: "5px",
            width: "100%",
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

        const labelTdStyle = {
            textAlign: "right",
            whiteSpace: "nowrap",
        } as React.CSSProperties;

        const hrStyle = {
            width: "100%",
            margin: "0 0 7px 0",
        } as React.CSSProperties;

        const mainStyle = {
            background: "#FFFFFF",
        } as React.CSSProperties;

        const subStyle = {
            background: "#CDFFCD",
        } as React.CSSProperties;


        return (
            <div style={{ ...itemStyle, ...mainStyle }}>
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
                    {this.state.id}
                </div>
                
                <hr style={hrStyle} />
                <div style={itemBodyStyle}>
                    <form action="">
                        <table>
                            <tr>
                                <td style={labelTdStyle}>Type :</td>
                                {this.state.isEditingForm
                                    ?
                                    <td>  <input name={"type"} type="text" value={this.state.type} onChange={this.handleInputChange} /> </td>
                                    :
                                    <td>{this.state.type}</td>
                                }
                            </tr>
                            <tr>
                                <td style={labelTdStyle}>Description:</td>
                                {this.state.isEditingForm
                                    ?
                                    <td>  <input name={"description"} type="text" value={this.state.description} onChange={this.handleInputChange} /> </td>
                                    :
                                    <td>{this.state.description}</td>
                                }
                            </tr>
                            <tr>
                                <td style={labelTdStyle}>Localization :</td>
                                {this.state.isEditingForm
                                    ?
                                    <td>  <input name={"localization"} type="text" value={this.state.localization} onChange={this.handleInputChange} /> </td>
                                    :
                                    <td>{this.state.localization}</td>
                                }
                            </tr>
                            <tr>
                                <td style={labelTdStyle}>Signature :</td>
                                {this.state.isEditingForm
                                    ?
                                    <td>  <input name={"signature"} type="text" value={this.state.signature} onChange={this.handleInputChange} /> </td>
                                    :
                                    <td>{this.state.signature}</td>
                                }
                            </tr>
                            <tr>
                                <td style={labelTdStyle}>Area Applicability :</td>
                                {this.state.isEditingForm
                                    ?
                                    <td>  <input name={"areaApplicability"} type="text" value={this.state.areaApplicability} onChange={this.handleInputChange} /> </td>
                                    :
                                    <td>{this.state.areaApplicability}</td>
                                }
                            </tr>
                            <tr>
                                <td style={labelTdStyle}>Time to Live :</td>
                                {this.state.isEditingForm
                                    ?
                                    <td>  <input name={"timeToLive"} type="text" value={this.state.timeToLive} onChange={this.handleInputChange} /> </td>
                                    :
                                    <td>{this.state.timeToLive}</td>
                                }
                            </tr>
                            <tr>
                                <td style={labelTdStyle}>Validity :</td>
                                {this.state.isEditingForm
                                    ?
                                    <td>  <input name={"validity"} type="text" value={this.state.validity} onChange={this.handleInputChange} /> </td>
                                    :
                                    <td>{this.state.validity}</td>
                                }
                            </tr>
                        </table>
                    </form>

                    <div style={{ ...itemStyle, ...subStyle }}>
                        <div style={itemHeadStyle}>Components:</div>
                        <hr style={hrStyle} />
                        <div style={itemBodyStyle}>
                            <div>
                                <div>addressNumber</div>
                                <div>localityName</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export interface ProfileItemProps {
    data: any
}