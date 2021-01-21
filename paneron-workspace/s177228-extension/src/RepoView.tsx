import { remote } from 'electron';
import React, { useState, useEffect } from 'react';
import { RepositoryViewProps } from '@riboseinc/paneron-extension-kit/types';

import {AddressProfileView} from "./AddressProfileView";

export const RepositoryView: React.FC<RepositoryViewProps> =
function (props) {

  const [busy,setBusy] = useState(false);

  return(
    <div>
      {busy
      ? "loading"
      : <>
        <div>test3</div>
        </>
      }
    </div>
  );
};

  
