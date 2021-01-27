import { Card } from '@blueprintjs/core';
import * as React from 'react';

export class ProfileCard extends React.Component {
    render() {

        const cardStyle = {
            marginTop: "10px",
            borderRadius: "5px",
        }as React.CSSProperties;

        const cardBodyStyle = {
            padding: "5px",
            width: "100%",
        }as React.CSSProperties;

        const cardHeadStyle = {
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
            <div style={{...cardStyle, ...mainStyle}}>
                <div style={cardHeadStyle}>
                    <div>Profile Name</div>
                </div>
                <hr style={hrStyle} />
                <div style={cardBodyStyle}>
                    <table>
                        <tr>
                            <td>name :</td>
                            <td>value</td>
                        </tr>
                    </table>
                    <div style={{...cardStyle, ...subStyle}}>
                        <div style={cardHeadStyle}>Components:</div>
                        <hr style={hrStyle} />
                        <div style={cardBodyStyle}>
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

export interface ProfileCardProps {
    fields:{name:string, type:string}[]
}