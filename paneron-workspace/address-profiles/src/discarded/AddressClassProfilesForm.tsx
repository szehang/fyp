import { FormGroup, InputGroup } from "@blueprintjs/core";
import * as React from "react";

export class AddressClassProfilesForm extends React.Component {

    render() {
        const formStyle = {
            padding: "15px",
            backgroundColor: "white",
            borderRadius: "15px",
        }as React.CSSProperties;

        return(
            <>
            <div style={formStyle}>
            <FormGroup
                inline={true}
                label={"Description"}
                style={{
                    backgroundColor: "red",
                }}
            >
                <InputGroup id="description" placeholder="Description..." />
            </FormGroup>
            
            <FormGroup
                inline={true}
                label={"Type"}
            >
                <InputGroup id="type" placeholder="Type..." />
            </FormGroup>

            <FormGroup
                inline={true}
                label={"Localization"}
            >
                <InputGroup id="localization" placeholder="Localization..." />
            </FormGroup>

            <FormGroup
                inline={true}
                label={"Time to Live"}
            >
                <InputGroup id="timeToLive" placeholder="Time to Live..." />
            </FormGroup>

            <FormGroup
                inline={true}
                label={"Validity"}
            >
                <InputGroup id="Validity" placeholder="Validity..." />
            </FormGroup>
            </div>
            </>
        );
    }
}