import { AnchorButton, Card, FormGroup, InputGroup, Label } from "@blueprintjs/core";
import { intentClass } from "@blueprintjs/core/lib/esm/common/classes";
import * as React from "react";

export class ProfileCreateForm extends React.Component<ProfileCreateFormProps> {

    constructor(props) {
        super(props);
        this.state = {
            // Form state
            createProfileBtnClicked: false,
        };
        this.handleCreateProfile = this.handleCreateProfile.bind(this);
    }

    handleCreateProfile = () => {
        this.setState({ createProfileBtnClicked: !this.state.createProfileBtnClicked })
    }

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

                {this.state.createProfileBtnClicked
                ?
                    <AnchorButton onClick={this.handleCreateProfile} intent="danger" icon="cross" text="Discard Profile" />
                :
                    <AnchorButton onClick={this.handleCreateProfile} intent="success" icon="add" text="Create Profile" />
                }

                <br/>

                {this.state.createProfileBtnClicked
                ?
                    <table>
                        {/* The following generates the fields of the form using .map */}
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

                : 
                    <div></div>

                }

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
    fields: {id: string, name: string, valueType: string, placeholder?: string}[]
}