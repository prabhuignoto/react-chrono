import { TimelineItem } from './types';

const timelineData: TimelineItem[] = [
  {
    title: 'May 1940',
    cardTitle: 'Dunkirk',
    cardSubtitle:
      'Men of the British Expeditionary Force (BEF) wade out to a destroyer during the evacuation from Dunkirk.',
    cardDetailedText:
      "On 10 May 1940, Hitler began his long-awaited offensive in the west by invading neutral Holland and Belgium and attacking northern France. Holland capitulated after only five days of fighting, and the Belgians surrendered on 28 May. With the success of the German 'Blitzkrieg', the British Expeditionary Force and French troops were in danger of being cut off and destroyed.",
    media: {
      type: 'IMAGE',
      source: {
        url: 'https://images.unsplash.com/photo-1580626578157-c596f5385ce7',
      },
      name: 'Dunkirk',
    },
  },
  {
    title: 'June 1941',
    cardTitle: 'Operation Barbarossa',
    cardSubtitle:
      'A column of Red Army prisoners taken during the first days of the German invasion',
    cardDetailedText:
      "On 22 June 1941, Hitler unleashed the largest invasion force in the history of warfare against Stalin's Soviet Union. About three million German and other Axis troops attacked along a 2,900-km front. The planning for Operation Barbarossa was meticulous but intelligence was poor. In particular, the Wehrmacht (German army) had underestimated the strength of the Red Army. The Germans planned to knock out the Soviets in a quick campaign before the winter of 1941.",
    media: {
      type: 'IMAGE',
      source: {
        url: 'https://images.unsplash.com/photo-1580626593367-95097657c3f9',
      },
      name: 'Operation Barbarossa',
    },
  },
  {
    title: 'June 1944',
    cardTitle: 'D-Day',
    cardSubtitle:
      'US troops wade ashore from a Coast Guard landing craft at Omaha Beach',
    cardDetailedText:
      'On 6 June 1944 the Western Allies launched the largest amphibious invasion in history against Normandy, France. Five assault divisions were deployed on the first day – two US, two British and one Canadian. The landing zones were codenamed Utah, Omaha, Gold, Juno and Sword. Omaha Beach, where the US 1st and 29th Infantry Divisions landed, was where the greatest difficulties were faced. Around 10,000 Allied troops were killed, wounded or missing in action on D-Day.',
    media: {
      type: 'IMAGE',
      source: {
        url: 'https://images.unsplash.com/photo-1582032508019-f7247d36dc50',
      },
      name: 'D-Day',
    },
  },
  {
    title: 'August 1944',
    cardTitle: 'The Allied liberation of Paris',
    cardSubtitle:
      "Parisians line the Champs Elysées as Free French tanks and half tracks of General Leclerc's 2nd Armoured Division roll down the avenue from the Arc de Triomphe",
    cardDetailedText:
      'Paris had been ruled by the Germans since the signing of the French armistice in June 1940. In early 1944, as the tide of war turned against Nazi Germany, the Allies made plans to liberate the city. However, the Supreme Allied Commander General Eisenhower favoured a broad front approach to the campaign, and saw Paris – which was not a primary military objective – as something of a diversion. The Allies reached the outskirts of the capital on 19 August.',
    media: {
      type: 'IMAGE',
      source: {
        url: 'https://images.unsplash.com/photo-1582032571456-1ce88d081e29',
      },
      name: 'Paris Liberation',
    },
  },
  {
    title: 'August 1945',
    cardTitle: 'Atomic bombing of Japan',
    cardSubtitle: 'Atomic cloud over Nagasaki, 9 August 1945',
    cardDetailedText: [
      'The United States detonated two atomic bombs over the Japanese cities of Hiroshima and Nagasaki on 6 and 9 August 1945, respectively. The two bombings killed between 129,000 and 226,000 people, most of whom were civilians.',
      'The bombing of Hiroshima was the first time an atomic weapon had been used in warfare. The bomb was known as "Little Boy" and was detonated over Hiroshima at 8:15 am on 6 August 1945.',
      'On 9 August 1945, the United States dropped a second atomic bomb on Nagasaki. This bomb was known as "Fat Man" and was more powerful than the one dropped on Hiroshima.',
    ],
    media: {
      type: 'IMAGE',
      source: {
        url: 'https://images.unsplash.com/photo-1552738580-9a1c52671921',
      },
      name: 'Atomic Cloud',
    },
  },
  {
    title: 'May 1945',
    cardTitle: 'German surrender',
    cardSubtitle:
      'Field Marshal Wilhelm Keitel signs the surrender document at Soviet headquarters in Berlin',
    cardDetailedText:
      "On 30 April 1945, with Berlin surrounded by the Red Army, Adolf Hitler committed suicide in his bunker beneath the city. His successor Admiral Dönitz authorised surrender negotiations, and an agreement was reached whereby hostilities would formally end on 8 May 1945. The unconditional surrender of Germany was signed by Dönitz's representative General Alfred Jodl at Reims on 7 May. A further document was signed by Field Marshal Wilhelm Keitel and other German military leaders in Berlin a day later.",
    media: {
      type: 'IMAGE',
      source: {
        url: 'https://images.unsplash.com/photo-1486038903343-21de75b42579',
      },
      name: 'German Surrender',
    },
  },
  {
    title: 'September 1945',
    cardTitle: 'Japanese surrender',
    cardSubtitle:
      'The Japanese delegation on board USS Missouri during the surrender ceremony, 2 September 1945',
    cardDetailedText:
      'Following the atomic bombing of Hiroshima and Nagasaki, and the Soviet declaration of war on Japan on 8 August 1945, Emperor Hirohito intervened to end the fighting. The formal surrender of Japan was signed by Japanese Foreign Minister Mamoru Shigemitsu on 2 September on board the battleship USS Missouri in Tokyo Bay.',
    media: {
      type: 'IMAGE',
      source: {
        url: 'https://images.unsplash.com/photo-1588783948915-a260180396a5',
      },
      name: 'Japanese Surrender',
    },
  },
];

export default timelineData;
