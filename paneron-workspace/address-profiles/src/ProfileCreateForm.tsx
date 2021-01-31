import { AnchorButton, Card } from "@blueprintjs/core"; //FormGroup, InputGroup, Label
import * as React from "react";

export class ProfileCreateForm extends React.Component<ProfileCreateFormProps, any> {

    constructor(props: any) {
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

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
          [name]: value
        });
    }

    render() {
        const labelTdStyle = {
            textAlign: "right",
            whiteSpace: "nowrap",
        } as React.CSSProperties;

        const inputTdStyle = {
            width: "100%",
        } as React.CSSProperties;

        const inputStyle = {
            marginLeft: "5%",
            width: "95%",
        } as React.CSSProperties;

        return (
            <Card style={{ padding: "10px 5px 10px 18px" }}>

                {this.state.createProfileBtnClicked
                    ?
                    <AnchorButton onClick={this.handleCreateProfile} intent="danger" icon="cross" text="Discard Profile" />
                    :
                    <AnchorButton onClick={this.handleCreateProfile} intent="success" icon="add" text="Create Profile" />
                }

                <br />

                {this.state.createProfileBtnClicked
                    ?
                    <table>
                        {/* The following generates the fields of the form using .map */}
                        {this.props.fields.map((field) => (
                            <tr key={field.id}>
                                <td style={labelTdStyle}>
                                    <label htmlFor={field.id}>{field.name} :</label>
                                </td>
                                <td style={inputTdStyle}>
                                    <input id={field.id} name={field.id} type="text" placeholder={field.placeholder} style={inputStyle} onChange={this.handleInputChange} />
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
    fields: { id: string, name: string, fieldType: string, placeholder?: string }[]
}