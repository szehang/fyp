import { remote } from 'electron';
import React, { useState, useEffect } from 'react';
import { RepositoryViewProps } from '@riboseinc/paneron-extension-kit/types';

import iso3166code from './data/iso3166code.json';

export const RepositoryView: React.FC<RepositoryViewProps> =
function (props) {

  const [busy,setBusy] = useState(false);


  function AddressProfileOptions(props) {
    const list = {
      {name: "HONG KONG", code: "HKG"},
      {name: "Taiwan", code: "TW"},
    };
    const options = list.map((item)=>{
      <>
        <option value={item.code}>
          <span>{item.name}</span>
          <span>{item.code}</span>
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

  function AddressProfileView(props) {
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
    <div>
      {busy
        ? "Loading"
        : <>
            <AddressProfileView/>
          </>
      }
    </div>
  );

};