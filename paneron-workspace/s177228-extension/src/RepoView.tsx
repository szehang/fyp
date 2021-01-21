import { remote } from 'electron';
import React, { useState, useEffect } from 'react';
import { RepositoryViewProps } from '@riboseinc/paneron-extension-kit/types';

import iso3166code from './data/iso3166code.json';

export const RepositoryView: React.FC<RepositoryViewProps> =
function (props) {

  const [busy,setBusy] = useState(false)

  return(
    <div>
      {busy
        ? "Loading"
        : <>
            <div>init</div>
          </>
      }
    </div>
  );

};