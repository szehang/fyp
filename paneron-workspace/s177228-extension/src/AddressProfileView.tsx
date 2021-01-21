import * as React from "react";

export interface AddressProfileViewProps {}

export class AddressProfileView extends React.Component {
    render() {
        return(
            <>
                <div>Profile Setting</div>
                <div>
                    <label htmlFor="addressProfile">Address Profile Country:</label>
                    <select name="addressProfile" id="addressProfile">
                        <option value="HKG">HKG</option>
                        <option value="US">US</option>
                        <option value="TW">TW</option>
                    </select>
                </div>
            </>
        );
    }
}