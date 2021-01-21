import { remote } from 'electron';
import React, { useState, useEffect } from 'react';
import { RepositoryViewProps } from '@riboseinc/paneron-extension-kit/types';

import {AddressProfileView} from "./AddressProfileView";

const setTimeout: typeof window.setTimeout = remote.getGlobal('setTimeout');


export const RepositoryView: React.FC<RepositoryViewProps> =
function (props) {
    setTimeout(() => {
      setBusy(false);
    }, 5000);
  }, []);

  return (
    <div style={{ padding: '1rem' }}>
      {busy
        ? 'Loading…'
        : <>
            <H4>Hello!</H4>
            <Button onClick={handleGetRandomID}>Get a random ID!</Button>
            {randomID ? <p>{randomID}</p> : null}
          </>}
    </div>
  );
  */

  const [busy,setBusy] = useState(false);

  return(
    <div>
      {busy
      ? "loading"
      : <>
        <AddressProfileView />
        </>
      }
    </div>
  );

};
