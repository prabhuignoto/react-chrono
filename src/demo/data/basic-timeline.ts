import { TimelineItemModel } from '@models/TimelineItemModel';

export const basicTimeline: TimelineItemModel[] = [
  {
    title: 'May 1945',
    cardTitle: 'Dunkirk',
    url: 'http://www.history.com',
    media: {
      name: 'dunkirk beach',
      source: {
        url: 'https://i2-prod.mirror.co.uk/incoming/article10847802.ece/ALTERNATES/s810/PAY-Dunkirk-in-colour.jpg',
      },
      type: 'IMAGE',
    },
    cardSubtitle:
      'Men of the British Expeditionary Force (BEF) wade out to a destroyer during the evacuation from Dunkirk.',
    cardDetailedText: [
      `On 10 May 1940, <a href="http://www.google.com">Hitler</a> began his <strong>long-awaited</strong> offensive in the west by invading neutral Holland and Belgium and attacking northern France.
      <br>`,
      `<ul>
        <li>Holland capitulated after only five days of fighting, and the Belgians surrendered on 28 May.</li>
        <li>With the success of the German 'Blitzkrieg', the British Expeditionary Force and French troops were in danger of being cut off and destroyed.</li>
        <li>
        Germany's armoured spearheads reached the Channel coast on 20 May, and the British began to evacuate their troops from Dunkirk.
        </li>
        <li>
        The evacuation was codenamed 'Operation Dynamo' and was directed by Admiral Bertram Ramsay from his headquarters deep in the cliffs at Dover.
        </li>
      </ul>
      `,
    ],
  },
  {
    title: '25 July 1941',
    cardTitle: 'The Battle of Britain',
    url: 'http://www.google.com',
    media: {
      name: 'Battle of britain',
      source: {
        url: 'https://cdn.britannica.com/84/142184-050-9814C416/aircraft-spotter-skies-London-1940.jpg',
      },
      type: 'IMAGE',
    },
    date: '1941-07-25',
    cardSubtitle: `RAF Spitfire pilots scramble for their planes`,
    cardDetailedText: [
      `After France's surrender in June 1940, Churchill told the British people, "Hitler knows that he will have to break us in this island or lose the war". To mount a successful invasion, the Germans had to gain air superiority.`,
      `The first phase of the battle began on 10 July with Luftwaffe attacks on shipping in the Channel.
      The following month, RAF Fighter Command airfields and aircraft factories came under attack.`,
      `Under the dynamic direction of Lord Beaverbrook, production of Spitfire and Hurricane fighters increased, and despite its losses in pilots and planes, the RAF was never as seriously weakened as the Germans supposed.`,
    ],
  },
  {
    title: 'June 1941',
    cardTitle: 'Operation Barbarossa',
    media: {
      name: 'Operation Barbarossa',
      source: {
        url: 'https://cdn.britannica.com/01/150101-050-810CE9A9/soldiers-German-part-Soviet-Union-Operation-Barbarossa-1941.jpg',
      },
      type: 'IMAGE',
    },
    date: '1941-06-01',
    cardSubtitle: `A column of Red Army prisoners taken during the first days of the German invasion`,
    cardDetailedText: `Since the 1920s, Hitler had seen Russia, with its immense natural resources, as the principal target for conquest and expansion. It would provide, he believed, the necessary 'Lebensraum', or living space, for the German people. And by conquering Russia, Hitler would also destroy the "Jewish pestilential creed of Bolshevism". His non-aggression pact with Stalin in August 1939 he regarded as a mere temporary expedient.
      Barely a month after the fall of France, and while the Battle of Britain was being fought, Hitler started planning for the Blitzkrieg campaign against Russia, which began on 22 June 1941. Despite repeated warnings, Stalin was taken by surprise, and for the first few months the Germans achieved spectacular victories, capturing huge swathes of land and hundreds of thousands of prisoners. But they failed to take Moscow or Leningrad before winter set in.
      On 5/6 December, the Red Army launched a counter-offensive which removed the immediate threat to the Soviet capital. It also brought the German high command to the brink of a catastrophic military crisis. Hitler stepped in and took personal command. His intervention was decisive and he later boasted, "That we overcame this winter and are today in a position again to proceed victoriously… is solely attributable to the bravery of the soldiers at the front and my firm will to hold out…"`,
  },
  {
    title: '7 December 1941',
    cardTitle: 'Pearl Harbor',
    cardSubtitle: `The destroyer USS Shaw explodes in dry dock after being hit by Japanese aircraft`,
    media: {
      source: {
        url: 'https://pearlharborwarbirds.com/wp-content/uploads/2016/09/Awesome-Color-Photos-of-the-Attack-on-Pearl-Harbor-1.jpg',
      },
      type: 'IMAGE',
      name: 'Pearl Harbor',
    },
    date: '1941-12-07',
    cardDetailedText: `After Japan's occupation of French Indo-China in July 1941, US President Franklin D Roosevelt, followed by Britain and the Netherlands, ordered the freezing of Japanese assets.
      Many Japanese now believed that there was no alternative between economic ruin and going to war with the United States and the European colonial powers. In October 1941, a hardline government under General Hideki Tojo came to power, and preparations were made to deliver a devastating blow against the Americans.`,
  },
  {
    title: '15 February 1942',
    cardTitle: 'The fall of Singapore',
    media: {
      type: 'IMAGE',
      source: {
        url: 'https://insidestory.org.au/wp-content/uploads/surrender.jpg',
      },
      name: 'Fall of singapore',
    },
    date: '1942-02-15',
    cardSubtitle: `Lieutenant General Arthur Percival and staff on their way to the Singapore Ford factory to negotiate the island's surrender with General Yamashita`,
    cardDetailedText: `The Japanese began their invasion of Malaya on 8 December 1941, and very soon the British and empire defenders were in full retreat.
      Told previously that the Japanese were no match for European troops, morale among the defending forces slumped as General Tomoyuki Yamashita's forces moved swiftly southwards towards Singapore.
      The sinking of the British capital ships HMS Prince of Wales and Repulse by Japanese aircraft also contributed to the decline in morale, and panic began to set in among the civil population and the fighting troops. British commander Lieutenant General Arthur Percival had hoped to make a stand at Johore, but was forced to withdraw to Singapore Island. The Japanese landed there on 8/9 February, and before long the defence collapsed. To avoid further bloodshed, and with his water supply gone, Percival surrendered on 15 February.
      Churchill described the surrender as, "the worst disaster… in British military history". Over 130,000 British and empire troops surrendered to a much smaller Japanese force, which only suffered 9,824 battle casualties during the 70-day campaign. Singapore was not only a humiliating military defeat, but also a tremendous blow to the prestige of the 'white man' throughout Asia.`,
  },
  {
    title: '4 June 1942',
    cardTitle: 'Midway',
    media: {
      type: 'IMAGE',
      source: {
        url: 'https://hagadone.media.clients.ellingtoncms.com/img/photos/2021/09/14/0919_History_Corner2_t1170.jpg?5cc718665ab672dba93d511ab4c682bb370e5f86',
      },
    },
    date: '1942-06-04',
    cardSubtitle: `The American aircraft carrier USS Yorktown under Japanese attack during the battle of Midway`,
    cardDetailedText: `For six months after Pearl Harbor, just as Admiral Yamamoto predicted, Japanese forces carried all before them, capturing Hong Kong, Malaya, the Philippines and the Dutch East Indies. In May 1942, in an attempt to consolidate their grip on their new conquests, the Japanese sought to eliminate the United States as a strategic Pacific power.
      This would be done by luring into a trap the US navy carriers that had escaped Pearl Harbor, while at the same time the Japanese would occupy the Midway atoll in preparation for further attacks. The loss of the carriers would, the Japanese hoped, force the Americans to the negotiating table. In the event, it was the Americans who inflicted a crushing defeat on the Japanese. Their codebreakers were able to determine the location and date of the Japanese attack. This enabled US admiral Chester Nimitz to organise a trap of his own.
      During the ensuing battle the Japanese suffered the loss of four carriers, one heavy cruiser and 248 aircraft, while American losses totalled one carrier, one destroyer and 98 planes. By their victory at Midway, the turning point of the Pacific war, the Americans were able to seize the strategic initiative from the Japanese, who had suffered irreplaceable losses. Admiral Nimitz described the battle's success as "Essentially a victory of intelligence", while President Roosevelt called it "Our most important victory in 1942… there we stopped the Japanese offensive."`,
  },
  {
    title: '25 October 1942',
    cardTitle: 'Alamein',
    cardSubtitle: `German prisoners of war wait for transport after their capture at Alamein`,
    media: {
      type: 'IMAGE',
      source: {
        url: 'https://i.dailymail.co.uk/i/newpix/2018/03/08/11/49FEAE2A00000578-5477117-image-a-79_1520509429888.jpg',
      },
    },
    date: '1942-10-25',
    cardDetailedText: `The North African campaign began in September1940, and for the next two years the fighting was marked by a succession of Allied and Axis advances and retreats. In the summer of 1942, the Axis forces under 'Desert Fox' field marshal, Erwin Rommel, looked poised to take Cairo and advance on the Suez Canal.
      The British Middle East commander General Claude Auchinleck took personal command of the defending Eighth Army and halted the retreat at the strong defensive line at El Alamein. But Churchill, dissatisfied with Auchinleck, replaced him in August with General Harold Alexander, while Lieutenant -General Bernard Montgomery took over command of the Eighth Army.
      Montgomery immediately began to build up an enormous superiority in men and equipment, finally launching his offensive at Alamein on 23 October 1942. By the beginning of November, the Axis forces were in full retreat, although final victory in North Africa was not achieved until May 1943.
      Although Montgomery has been criticised for being too cautious in exploiting his success at Alamein, it made him a household name and he became Britain's most popular general of the war. Churchill hailed Alamein as a "Glorious and decisive victory… the bright gleam has caught the helmets of our soldiers, and warmed and cheered all our hearts".`,
  },
  {
    title: 'February 1943',
    cardTitle: 'Stalingrad',
    cardSubtitle: `Red Army soldiers hoist the Soviet flag over a recaptured Stalingrad factory following the German surrender`,
    media: {
      type: 'IMAGE',
      source: {
        url: 'https://static.enlisted.net/upload/image/2022/03/art_stalingrad_1920x1080_d734ceae06e3aab39a296ad9eeacce8c.jpg',
      },
    },
    date: '1943-02-01',
    cardDetailedText: `Throughout September and October, under General Vassili Chuikov, the city's defenders contested every yard of ground of the devastated city.
      The Red Army's stubborn defence allowed General Georgi Zhukov time to prepare a counterattack that was launched on 19 November 1942, and which soon trapped the Sixth Army commanded by General Friederich Paulus.
      Hitler, wrongly assured by Göring that the Luftwaffe could supply Stalingrad by air, ordered Paulus to hold out. He also ordered Field Marshal Erich Manstein to break through and relieve the beleaguered Sixth Army. Manstein was unsuccessful, and on 31 January 1943 Paulus capitulated. Of the 91,000 German troops who went into captivity, less than 6,000 returned home after the war. Stalingrad was one of Germany's greatest defeats, and it effectively marked the end of Hitler's dreams of an empire in the east.
      `,
  },
  {
    title: '6 June 1944',
    cardTitle: 'D-Day, Operation Overlord',
    cardSubtitle: `British commandos of the First Special Service Brigade land on Sword Beach`,
    media: {
      type: 'IMAGE',
      source: {
        url: 'https://www.britishpoles.uk/wp-content/uploads/2019/06/D-Day-landings-1.jpg',
      },
    },
    date: '1944-06-06',
    cardDetailedText: `Operation Overlord, the invasion and liberation of north-west Europe, began on D-Day, 6 June 1944.
      That day, under the overall command of US General Dwight Eisenhower, British, Canadian and American troops, supported by the Allied navies and air forces, came ashore on the coast of Normandy. By the end of the day, 158,000 men, including airborne troops, had landed. Initially, except on the American Omaha beach, German resistance was unexpectedly light. But it soon stiffened and the Allied breakout from the beachhead area was painfully slow.
      The fierceness of the fighting can be gauged by the fact that in Normandy British infantry battalions were suffering the same percentage casualty rates as they had on the Western Front in 1914–1918. Eventually the breakout was achieved, and on 25 August, Paris was liberated. Brussels followed on 3 September. Hopes that the war might be won in 1944 were dashed by the Allied failure at Arnhem and the unexpected German offensive in the Ardennes in December.
      It was not until 4 May 1945 that the German forces in north-west Europe surrendered to Montgomery at his HQ on Lüneburg Heath.`,
  },
  {
    title: 'February 1945',
    cardTitle: 'The Big Three',
    cardSubtitle: `Churchill, Roosevelt and Stalin at the Yalta Conference`,
    media: {
      type: 'IMAGE',
      source: {
        url: 'https://www.history.com/.image/ar_16:9%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cg_faces:center%2Cq_auto:good%2Cw_768/MTU3ODc5MDg1ODcwMzE2OTUx/world-war-ii-yalta-conference.jpg',
      },
    },
    date: '1945-02-01',
    cardDetailedText: `By February 1945, the writing was on the wall for the Nazi regime. In the east, the Red Army had occupied most of eastern Europe, including much of Poland, Hungary and East Prussia, and was just 65 kilometres from Berlin. In the west, the Allies had recovered from the surprise of the Ardennes offensive and were preparing to cross the Rhine into the heart of Germany.
      It was in this context that Churchill, Roosevelt and Stalin met at Yalta in the Crimea between 4 and 11 February 1945. Much has been made of the supposed naïvety of Roosevelt in believing that he could charm Stalin into making concessions, and of Churchill's supposed betrayal of Poland. The reality is more complex.
      At Yalta, Stalin made a number of promises: to allow free elections in Poland, to join the war against Japan, and to participate in the United Nations. But it was clear that, with the Red Army in control of eastern Europe, there was little the Western Allies could do to enforce these promises.`,
  },
]; 