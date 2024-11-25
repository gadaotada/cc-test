'use client';

import { useEffect, useState } from 'react';
import * as CookieConsent from 'vanilla-cookieconsent';
import 'vanilla-cookieconsent/dist/cookieconsent.css';
import getConfig from '@/app/CC-config';

const CookieConsentComponent = () => {
    const [currScripts, setCurrScripts] = useState<string[]>([]);

    const handleScripts = (scripts: string[]) => {
        setCurrScripts(scripts);
    };

    useEffect(() => {
        CookieConsent.run(getConfig(handleScripts));
    }, []);

    const ResetCookieConsent = () => {
        CookieConsent.reset(true);
        CookieConsent.run(getConfig(handleScripts));
      };

   return (
    <div className='flex gap-10'>
      <button type="button" onClick={CookieConsent.showPreferences}>
        Бисквитки
      </button>
      <button type="button" onClick={ResetCookieConsent}>
        Дев Ресет Бискии
      </button>
      {
        currScripts.map((script) => (
            <div key={script}>
                {script}
                {/* append each script here bruh may be use other methods then a map */}
            </div>
        ))
      }
    </div>
  );
};

export default CookieConsentComponent;