import * as React from 'react';

export class ProfileItem extends React.Component<ProfileItemProps> {
    render() {

        const itemStyle = {
            marginTop: "10px",
            borderRadius: "5px",
        }as React.CSSProperties;

        const itemBodyStyle = {
            padding: "5px",
            width: "100%",
        }as React.CSSProperties;

        const itemHeadStyle = {
            padding: "5px",
            width: "100%",
        }as React.CSSProperties;

        const labelTdStyle = {
            textAlign: "right",
            whiteSpace:"nowrap",
        }as React.CSSProperties;

        const hrStyle = {
            width: "100%",
            margin: "0 0 7px 0",
        }as React.CSSProperties;

        const mainStyle = {
            background: "#FFFFFF",
        }as React.CSSProperties;

        const subStyle = {
            background: "#CDFFCD",
        }as React.CSSProperties;


        return(
            <div style={{...itemStyle, ...mainStyle}}>
                <div style={itemHeadStyle}>
                    {this.props.data.id}
                </div>
                <hr style={hrStyle} />
                <div style={itemBodyStyle}>
                    <table>
                        <tr>
                            <td>Type :</td>
                            {/* should be a drop down list */}
                            <td>{this.props.data.type}</td>
                        </tr>
                        <tr>
                            <td>Description:</td>
                            <td>{this.props.data.description}</td>
                        </tr>
                        <tr>
                            <td>Localization :</td>
                            <td>{this.props.data.localization}</td>
                        </tr>
                        <tr>
                            <td>Signature :</td>
                            <td>{this.props.data.signature}</td>
                        </tr>
                        <tr>
                            <td>Area Applicability :</td>
                            <td>{this.props.data.areaApplicability}</td>
                        </tr>
                        <tr>
                            <td>Time to Live :</td>
                            <td>{this.props.data.timeToLive}</td>
                        </tr>
                        <tr>
                            <td>Validity :</td>
                            <td>{this.props.data.validity}</td>
                        </tr>
                    </table>
                    <div style={{...itemStyle, ...subStyle}}>
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
    data:any
}