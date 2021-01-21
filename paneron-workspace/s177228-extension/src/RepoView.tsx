import { remote } from 'electron';
import React, { useState, useEffect } from 'react';
import { RepositoryViewProps } from '@riboseinc/paneron-extension-kit/types';


const setTimeout: typeof window.setTimeout = remote.getGlobal('setTimeout');


export const RepositoryView: React.FC<RepositoryViewProps> =
function (props) {

   /*
  // It is not possible to import and use React’s useEffect, useState etc. as one would usually do.
  // We have to use them passed via props:
  const [busy, setBusy] = useState(true);
  const [randomID, setRandomID] = useState<string | undefined>(undefined);

  async function handleGetRandomID() {
    setBusy(true);
    try {
      // Props also pass some useful functions, such as for reading and changing repository data,
      // or this one for getting a random string that could be used for a unique auto-generated object ID:
      const id = await props.makeRandomID();
      setRandomID(id);
    } finally {
      setBusy(false);
    }
  }

  useEffect(() => {
    // Extension component can’t directly use global window object’s native functions either.
    // On such method is setTimeout. A usable version of setTimeout is passed via props instead:
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

  const [busy,setBusy] = useState(true);

  useEffect(()=>{
    setTimeout(() => {
       setBusy(false);
    }, 5000);
  },[]);

  return(
    <div>
      {busy
      ? "loading"
      : <>
        <div>hi</div>
        </>
      }
    </div>
  );

};
