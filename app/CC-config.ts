import type { CookieConsentConfig } from 'vanilla-cookieconsent';

const getConfig = (param: undefined | ((scripts: string[]) => void) = undefined) => {
  const config: CookieConsentConfig = {
    root: 'footer',
    autoShow: true,
    // disablePageInteraction: true,
    hideFromBots: true,
    // mode: 'opt-in',
    // revision: 0,

    cookie: {
        name: 'cc_cookie',
        domain: location.hostname,
        path: '/',
        sameSite: "Lax",
        expiresAfterDays: 365,
    },

    /**
     * Callback functions
     */
    onFirstConsent: ({ cookie }) => {
        if (param) {
            const enabledServices = cookie.services.analytics;
            param(enabledServices);
        }
    },


    onChange: ({ cookie }) => {
      if (param) {
        const enabledServices = cookie.services.analytics;
        //console.log('enabledServices:', changedServices);   
        param(enabledServices);
      }

    },
    // https://cookieconsent.orestbida.com/reference/configuration-reference.html#guioptions
    guiOptions: {
      consentModal: {
        layout: 'box inline',
        position: 'bottom left',
        equalWeightButtons: true,
        flipButtons: false,
      },
      preferencesModal: {
        layout: 'box',
        equalWeightButtons: true,
        flipButtons: false,
      },
    },

    categories: {
      necessary: {
        enabled: true, // this category is enabled by default
        readOnly: true, // this category cannot be disabled
      },
      analytics: {
        autoClear: {
          cookies: [
            {
              name: /^_ga/, // regex: match all cookies starting with '_ga'
            },
            {
              name: '_gid', // string: exact cookie name
            },
          ],
        },

        // https://cookieconsent.orestbida.com/reference/configuration-reference.html#category-services
        services: {
          ga: {
            label: 'Google Analytics',
            onAccept: () => {},
            onReject: () => {},
          },
          youtube: {
            label: 'Youtube Embed',
            onAccept: () => {},
            onReject: () => {},
          },
        },
      },
      ads: {},
    },

    language: {
      default: 'bg',
      translations: {
        en: {
          consentModal: {
            title: 'We use cookies',
            description:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
            acceptAllBtn: 'Accept all',
            acceptNecessaryBtn: 'Reject all',
            showPreferencesBtn: 'Manage Individual preferences',
            // closeIconLabel: 'Reject all and close modal',
            footer: `
                        <a href="https://lacrema.bg/politika-poveritelnost/ target="_blank">Privacy Policy</a>
                    `,
          },
          preferencesModal: {
            title: 'Manage cookie preferences',
            acceptAllBtn: 'Accept all',
            acceptNecessaryBtn: 'Reject all',
            savePreferencesBtn: 'Accept current selection',
            closeIconLabel: 'Close modal',
            serviceCounterLabel: 'Service|Services',
            sections: [
              {
                title: 'Your Privacy Choices',
                description: `In this panel you can express some preferences related to the processing of your personal information. You may review and change expressed choices at any time by resurfacing this panel via the provided link. To deny your consent to the specific processing activities described below, switch the toggles to off or use the “Reject all” button and confirm you want to save your choices.`,
              },
              {
                title: 'Strictly Necessary',
                description:
                  'These cookies are essential for the proper functioning of the website and cannot be disabled.',

                //this field will generate a toggle linked to the 'necessary' category
                linkedCategory: 'necessary',
              },
              {
                title: 'Performance and Analytics',
                description:
                  'These cookies collect information about how you use our website. All of the data is anonymized and cannot be used to identify you.',
                linkedCategory: 'analytics',
                cookieTable: {
                  caption: 'Cookie table',
                  headers: {
                    name: 'Cookie',
                    domain: 'Domain',
                    desc: 'Description',
                  },
                  body: [
                    {
                      name: '_ga',
                      domain: location.hostname,
                      desc: 'Description 1',
                    },
                    {
                      name: '_gid',
                      domain: location.hostname,
                      desc: 'Description 2',
                    },
                  ],
                },
              },
              {
                title: 'Targeting and Advertising',
                description:
                  'These cookies are used to make advertising messages more relevant to you and your interests. The intention is to display ads that are relevant and engaging for the individual user and thereby more valuable for publishers and third party advertisers.',
                linkedCategory: 'ads',
              },
              {
                title: 'More information',
                description:
                  'For any queries in relation to my policy on cookies and your choices, please <a href="https://lacrema.bg/kontakti/">contact us</a>',
              },
            ],
          },
        },
        bg: {
            consentModal: {
              title: 'И сайтът ни "сервира" бисквитки!',
              description:
                'Те са необходими за по-добрата интеракция с уебсайта. Можете да приемете/откажете цялата порция, или да подберете предпочитаните от менюто за контрол.',
              acceptAllBtn: 'Приеми всички',
              acceptNecessaryBtn: 'Откажи всички',
              showPreferencesBtn: 'Управление на индивидуалните предпочитания',
              // closeIconLabel: 'Reject all and close modal',
              footer: `
                          <a href="https://lacrema.bg/politika-poveritelnost/" target="_blank">Политика за поверителност</a>
                      `,
            },
            preferencesModal: {
              title: "Управление на предпочитанията за бисквитки",
              acceptAllBtn: 'Приеми всички',
              acceptNecessaryBtn: 'Отхвърляне на всички',
              savePreferencesBtn: 'Приемане на текущия избор',
              closeIconLabel: 'Затваряне на модален',
              serviceCounterLabel: 'Услуга|Услуги',
              sections: [
                {
                    title: "Вашият избор за поверителност",
                    description: `В този панел можете да изразите някои предпочитания, свързани с обработката на вашата лична информация. Можете да прегледате и промените настройките по всяко време, като отново изведете този панел чрез предоставената връзка. За да откажете съгласието си за конкретните дейности по обработка, описани по-долу, изключете превключвателите или използвайте бутона „Отхвърляне на всички“ и потвърдете, че искате да запазите избора си.`,
                  },
                  {
                    title: "Строго необходимо",
                    description:"Тези бисквитки са от съществено значение за правилното функциониране на уебсайта и не могат да бъдат деактивирани.",
    
                    //това поле ще генерира превключвател, свързан с категорията „необходимо“.
                    linkedCategory: 'necessary',
                  },
                {
                  title: 'Ефективност и анализ',
                  description:
                    'Тези бисквитки събират информация за това как използвате нашия уебсайт. Всички данни са анонимизирани и не могат да бъдат използвани за идентифициране на Вашата самоличност.',
                  linkedCategory: 'analytics',
                  cookieTable: {
                    caption: 'Cookie table',
                    headers: {
                      name: 'Cookie',
                      domain: 'Domain',
                      desc: 'Description',
                    },
                    body: [
                      {
                        name: '_ga',
                        domain: location.hostname,
                        desc: 'Description 1',
                      },
                      {
                        name: '_gid',
                        domain: location.hostname,
                        desc: 'Description 2',
                      },
                    ],
                  },
                },
                {
                  title: 'Насочване и реклама',
                  description:
                    'Тези бисквитки се използват, за да направят рекламните съобщения по-подходящи за вас и вашите интереси. Намерението е да се показват реклами, които са подходящи и ангажиращи за отделния потребител и по този начин по-ценни за издателите и рекламодателите трети страни.',
                  linkedCategory: 'ads',
                },
                {
                  title: 'Повече информация',
                  description:
                    'За всякакви въпроси във връзка с моята политика относно бисквитките и вашия избор, моля, <a href="https://lacrema.bg/kontakti/">свържете се с нас</a>',
                },
              ],
            },
          },
      },
    },
  };

  return config;
};

export default getConfig;