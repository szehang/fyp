import { remote } from 'electron';
import React, { useState, useEffect } from 'react';
import { RepositoryViewProps } from '@riboseinc/paneron-extension-kit/types';

import iso3166code from './data/iso3166code.json';

export const RepositoryView: React.FC<RepositoryViewProps> =
function (props) {

  const [busy,setBusy] = useState(false);


  const AddressProfileOptions = (props) =>  {
    const list = iso3166code;
    const options = list.map((option)=>{
      <>
        <option value={option.alpha-3}>
          <span>{option.name}</span>
          <span>{option.alpha-3}</span>
        </option>
      </>
    });
    return(
      <>
        <label htmlFor="addressProfile">Address Profile Country:</label>
        <select name="addressProfile" id="addressProfile">
          {options}
        </select>
      </>
    );
  }

  const AddressProfileView = () => {
    return(
      <>
        <div>Profile Setting</div>
        <div>
          <AddressProfileOptions/>
        </div>
      </>
    );
  }

  return(
    {busy
      ? 'Loading…'
      : <>
          <AddressProfileView/>
        </>}
  );

};