import React from "react";
import { hot } from "react-hot-loader/root";
import "./App.css";
import Timeline from "./components";
import { TimelineItemModel } from "./components/models/TimelineItemModel";

function App() {
  const items: TimelineItemModel[] = [
    {
      title: "June 28, 1914 June 28,",
      contentText:
        "Archduke Franz Ferdinand of Austria and his wife, Sophie, are assassinated by a Bosnian Serb nationalist in Sarajevo.",
    },
    {
      title: "July 28, 1914",
      contentText:
        "World War I begins when Austria-Hungary declares war on Serbia.",
    },
    {
      title: "August 1–28, 1914",
      contentText: `Germany declares war on Russia, France, and Belgium. Britain declares war on Germany.
        Austria declares war on Russia. Montenegro declares war on Austria. France declares war on Austria.
        Britain declares war on Austria. Montenegro declares war on Germany. Japan declares war on Germany. Austria declares war on Belgium.`,
    },
    {
      title: "September 6, 1914",
      contentText: `First Battle of the Marne begins. The Germans had advanced to within 30 miles of Paris, but over the next two days, the French are reinforced by 6,000 infantrymen who are transported to the front by hundreds of taxis.
      The Germans dig in north of the Aisne River, and the trench warfare that is to typify the Western Front for the next four years begins.`,
    },
    {
      title: "November 5, 1914",
      contentText: `Britain and France declare war on the Ottoman Empire.`,
    },
    {
      title: "April 22, 1915",
      contentText: `The Second Battle of Ypres begins. The German army initiates the modern era of chemical warfare by launching a chlorine attack on Allied trenches. Some 5,000 French and Algerian troops are killed.
      By war’s end, both sides have used massive quantities of chemical weapons, causing an estimated 1,300,000 casualties, including 91,000 fatalities.`,
    },
    {
      title: "April 25, 1915",
      contentText: `Landings begin on the Gallipoli Peninsula at Cape Helles (British 29th and Royal Naval divisions) and at ANZAC (Australian and New Zealand Army Corps) Cove. The attempt to force the Dardanelles and capture the Ottoman capital at Constantinople (now Istanbul) is a disaster almost from the outset. Altogether, the Allies suffered more than 200,000 casualties during the subsequent nine-month campaign.
      The failed offensive becomes the war’s signal event for Australian and New Zealand troops and eventually leads to the collapse of the British government.`,
    },
    {
      title: "May 7, 1915",
      contentText: `The British ocean liner Lusitania is torpedoed by a German U-boat off the southern coast of Ireland. It sinks in just 18 minutes, and nearly 1,200 people are killed, including 128 U.S. citizens.
      The ship had been carrying over 170 tons of rifle ammunition and artillery shells, and Germany felt fully justified in treating the Lusitania as a legitimate target in a declared war zone.`,
    },
    {
      title: "February 21, 1916",
      contentText: `The Battle of Verdun begins. Over the next 10 months, the French and German armies at Verdun, France, suffer over 700,000 casualties, including some 300,000 killed.
      By the battle’s conclusion, entire French villages had been wiped from the map; they were subsequently memorialized as having “died for France.” More than a century after the battle’s conclusion, over 10 million shells remained in the soil around Verdun, and bomb-clearing units continued to remove some 40 tons of unexploded munitions from the area annually.`,
    },
    {
      title: "May 31, 1916",
      contentText: `The British and German fleets meet 60 miles off the coast of Jutland, Denmark, in the war’s only major encounter between the world’s two largest sea powers. Although a naval arms race between Britain and Germany had been one of the causes of World War I, the clash of the battleships is largely indecisive.`,
    },
    {
      title: "July 1, 1916",
      contentText: `The First Battle of the Somme begins. The British offensive is intended to draw German attention from Verdun, and in that regard only could it be considered a success. The nearly 20,000 killed in action on July 1 marks the single bloodiest day in the history of the British army.
      By the time the Somme campaign ground to a halt some four and a half months later, the combined casualties of both sides topped 1,000,000.`,
    },
    {
      title: "April 6, 1917",
      contentText: `The United States declares war on Germany. In his address to Congress four days earlier, U.S. Pres. Woodrow Wilson had cited Germany’s practice of unrestricted submarine warfare and the “Zimmermann Telegram” as key reasons behind the abandonment of his long-standing policy of neutrality.`,
    },
    {
      title: "November 20, 1917",
      contentText: `A British offensive at Cambrai, France, marks the first large-scale use of tanks in combat. Attacking with complete surprise, the British tanks ripped through German defenses in depth and took some 7,500 prisoners at low cost in casualties. Bad weather intervened, however, and adequate infantry reinforcements were not available to capitalize on the breakthrough. Within two weeks the British had been driven back almost to their original positions.`,
    },
    {
      title: "March 3, 1918",
      contentText: `After months of delays, the Soviet government concludes a separate peace with the Central Powers when it accepts the Treaty of Brest-Litovsk. Russia surrenders its claim to Ukraine, to its Polish and Baltic territories, and to Finland.`,
    },
    {
      title: "November 11, 1918",
      contentText: `Germany and the Allies conclude an armistice based largely on Wilson’s Fourteen Points. With the threat of revolution gripping German industrial centers and Allied armies on the verge of flanking the entire German defensive line, the ability of Germany to continue the war seemed doubtful at best.
      Nevertheless, a group of hard-core militarists, led by Erich Ludendorff, would perpetuate the “stabbed in the back” myth, claiming that Germany had been betrayed by its politicians and that the German military had been unbeaten in the field.
      This sentiment would do much to propel the ascent of Adolf Hitler to power in 1933.`,
    },
  ];
  return (
    <div className="App">
      <Timeline
        items={items}
        titlePosition="TOP"
        itemWidth={250}
        // mode="TREE"
        // mode="HORIZONTAL"
        // mode="TREE"
        slideShow
      />
    </div>
  );
}

export default hot(App);
