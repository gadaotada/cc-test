'use client';

import { useEffect, useState } from 'react';
import * as CookieConsent from 'vanilla-cookieconsent';
import 'vanilla-cookieconsent/dist/cookieconsent.css';

import getConfig from '@/app/CC-config';
import Script from 'next/script';
import { GoogleAnalytics } from '@next/third-parties/google';

export type ServicesKeys = 'mvvCustomJsScript' | 'ga' | 'youtube';

const appendScripts = (serviceName: ServicesKeys, index: number) => {
  switch(serviceName) {
    case 'mvvCustomJsScript':
      return <Script
      key={index}
      data-category="analytics"
      data-service={serviceName}
      src={`/scripts/${serviceName}.js`}
    />
    case "ga": 
      return <GoogleAnalytics gaId='YOUR-GA-ID' key={index}/>
    case "youtube":
      return <Script
      key={index}
      data-category="analytics"
      data-service={serviceName}
      src={`/scripts/${serviceName}.js`}
      />
  }
}

const CookieConsentComponent = () => {
  const [newSr, setNewSr] = useState<string[]>([]);

    useEffect(() => {
        CookieConsent.run(getConfig(setNewSr));
    }, []);

    const ResetCookieConsent = () => {
        CookieConsent.reset(true);
        CookieConsent.run(getConfig(setNewSr));
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
        newSr.map((service, index) => {
          return appendScripts(service as ServicesKeys, index);
        })
      }
    </div>
  );
};

export default CookieConsentComponent;