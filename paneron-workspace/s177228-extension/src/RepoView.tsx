import { remote } from 'electron';
import React, { useState, useEffect } from 'react';
import { RepositoryViewProps } from '@riboseinc/paneron-extension-kit/types';

export const RepositoryView: React.FC<RepositoryViewProps> =
function (props) {

  const [busy,setBusy] = useState(false);

  class AddressProfileView extends React.Component {
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

  return(
    <div>
      {busy
      ? "loading"
      : <>
          <AddressProfileView/>
        </>
      }
    </div>
  );
};

  
