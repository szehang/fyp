import { remote } from 'electron';
import React, { useState, useEffect } from 'react';
import { RepositoryViewProps } from '@riboseinc/paneron-extension-kit/types';
import { Button, MenuItem } from "@blueprintjs/core";

import {Select} from "@blueprintjs/select";

import * as Countries from "./iso3166code"

const AddressProfileSelect = Select.ofType<Countries.Country>();

export interface SelectAddressProfileProps {
    height: number;
}

interface SelectAddressProfileState {
    country: Countries.Country;
}

export class SelectAddressProfile extends React.Component<{},SelectAddressProfileState>{
    constructor(props: SelectAddressProfileProps){
        super(props);

        this.state = {
            country: Countries.iso3166code[0]
        };
    }
    public render(){
        const buttonText = this.state.country.name;
        return(
            <AddressProfileSelect
                items={Countries.iso3166code}
                itemRenderer={Countries.renderAddressProfile}
                onItemSelect={this.handleValueChange}
                itemPredicate={Countries.filterCountry}
                noResults={<MenuItem disabled={true} text="No results." />}
                initialContent={<MenuItem disabled={true} text={`${Countries.iso3166code.length} items loaded.`} />}
            >
               <Button text={buttonText} rightIcon="caret-down" />
            </AddressProfileSelect>
        );
    }
    private handleValueChange = (country: Countries.Country) => this.setState({ country });
}