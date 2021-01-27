import { AnchorButton, Card, FormGroup, InputGroup, Label } from "@blueprintjs/core";
import { intentClass } from "@blueprintjs/core/lib/esm/common/classes";
import * as React from "react";

export class ProfileCreateForm extends React.Component<ProfileCreateFormProps> {

    render() {  
        const labelTdStyle = {
            textAlign: "right",
            whiteSpace:"nowrap",
        }as React.CSSProperties;
        
        const inputTdStyle = {
            width: "100%",
        }as React.CSSProperties;

        const inputStyle = {
            marginLeft: "5%",
            width: "95%",
        }as React.CSSProperties;

        return(
            <Card>
                <AnchorButton intent="success" icon="add" text="Create Profile" />
                <table>
                    {this.props.fields.map((field)=>(
                        <tr key={field.name}>
                            <td style={labelTdStyle}>
                                <label htmlFor={field.name}>{field.name} :</label>
                            </td>
                            <td style={inputTdStyle}> 
                                <input id={field.name} type="text" placeholder={field.placeholder} style={inputStyle} />
                            </td>
                        </tr>
                    ))}
                </table>

                {/* {this.props.fields.map((field)=>(
                    <FormGroup
                        key={field.name}
                        inline={true}
                        label={field.name}
                    >
                        <InputGroup
                            // placeholder={field.placeholder}
                        />
                    </FormGroup>
                ))} */}
            </Card>
        );
    }
}

export interface ProfileCreateFormProps {
    fields: {name: string, valueType: string, placeholder?: string}[]
}