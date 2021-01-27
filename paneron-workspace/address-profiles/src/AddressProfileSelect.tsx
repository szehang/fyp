import * as React from "react";

import * as iso3166code from "./iso3166code"

export class AddressProfileSelect extends React.Component {

    render() {
        const selectStyle = {
            width: "100%",
            borderRadius: "5px",
            border: "0",
            background: "#FFFFFF",
            padding: "10px"
          } as React.CSSProperties;

        return(
            <select style={selectStyle} onChange={ (event) => this.props.changeAddressProfile(event.target.value) } value={this.props.data.currentAddressProfile}>
                <option value={"null"}>{"Select Address Profile"}</option>
                {
                    iso3166code.Countries.map((country)=>(
                        <option key={country["alpha-3"]} value={country["alpha-3"]}>
                            {country.name}
                            {" "}
                            {country["alpha-3"]}
                        </option>
                    ))
                }
            </select>
        );
    }
}