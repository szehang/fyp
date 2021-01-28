import * as React from 'react';
import { AnchorButton } from "@blueprintjs/core";

export class ProfileItem extends React.Component<ProfileItemProps, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            // Form state
            isEditingForm: false,
        }
        this.handleEditProfile = this.handleEditProfile.bind(this);
    };

    handleEditProfile = () => {
        this.setState({ isEditingForm: !this.state.isEditingForm });
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
                    {this.props.data.id}
                </div>
                
                <hr style={hrStyle} />
                <div style={itemBodyStyle}>
                    <form action="">
                        <table>
                            <tr>
                                <td style={labelTdStyle}>Type :</td>
                                {this.state.isEditingForm
                                    ?
                                    <td> <input type="text" value={this.props.data.type} onChange={() => { }} /> </td>
                                    :
                                    <td>{this.props.data.type}</td>
                                }
                            </tr>
                            <tr>
                                <td style={labelTdStyle}>Description:</td>
                                {this.state.isEditingForm
                                    ?
                                    <td> <input type="text" value={this.props.data.description} onChange={() => { }} /> </td>
                                    :
                                    <td>{this.props.data.description}</td>
                                }
                            </tr>
                            <tr>
                                <td style={labelTdStyle}>Localization :</td>
                                {this.state.isEditingForm
                                    ?
                                    <td> <input type="text" value={this.props.data.localization} onChange={() => { }} /> </td>
                                    :
                                    <td>{this.props.data.localization}</td>
                                }
                            </tr>
                            <tr>
                                <td style={labelTdStyle}>Signature :</td>
                                {this.state.isEditingForm
                                    ?
                                    <td> <input type="text" value={this.props.data.signature} onChange={() => { }} /> </td>
                                    :
                                    <td>{this.props.data.signature}</td>
                                }
                            </tr>
                            <tr>
                                <td style={labelTdStyle}>Area Applicability :</td>
                                {this.state.isEditingForm
                                    ?
                                    <td> <input type="text" value={this.props.data.areaApplicability} onChange={() => { }} /> </td>
                                    :
                                    <td>{this.props.data.areaApplicability}</td>
                                }
                            </tr>
                            <tr>
                                <td style={labelTdStyle}>Time to Live :</td>
                                {this.state.isEditingForm
                                    ?
                                    <td> <input type="text" value={this.props.data.timeToLive} onChange={() => { }} /> </td>
                                    :
                                    <td>{this.props.data.timeToLive}</td>
                                }
                            </tr>
                            <tr>
                                <td style={labelTdStyle}>Validity :</td>
                                {this.state.isEditingForm
                                    ?
                                    <td> <input type="text" value={this.props.data.validity} onChange={() => { }} /> </td>
                                    :
                                    <td>{this.props.data.validity}</td>
                                }
                            </tr>
                        </table>
                    </form>

                    <div style={{ ...itemStyle, ...subStyle }}>
                        <div style={itemHeadStyle}>Components:</div>
                        <hr style={hrStyle} />
                        <div style={itemBodyStyle}>
                            <div>
                                <div>a</div>
                                <div>a</div>
                                <div>a</div>
                                <div>a</div>
                                <div>a</div>
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