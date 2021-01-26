import * as React from "react";

import * as iso3166code from "./iso3166code"

export class AddressProfileSelect extends React.Component {

    render() {
        const options = iso3166code.Countries.map((country:iso3166code.Country)=>{
            <option key={country["alpha-3"]} value={country["alpha-3"]}>
                <span>{country.name}</span>
                <span>{country["alpha-3"]}</span>
            </option>
        });

        return(
            <select>
                {options}
            </select>
        );
    }
}