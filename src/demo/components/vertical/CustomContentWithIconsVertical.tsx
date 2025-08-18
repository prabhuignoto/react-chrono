import { TimelineItemModel } from '@models/TimelineItemModel';
import React, { FunctionComponent } from 'react';
import Chrono from '../../../components';
import { ComponentContainerTree, Vertical } from '../../App.styles';

export interface CustomContentWithIconsVerticalProps {
  type: string;
  cardHeight?: number;
  items?: TimelineItemModel[];
}

export const CustomContentWithIconsVertical: FunctionComponent<CustomContentWithIconsVerticalProps> = ({ 
  type, 
  cardHeight, 
  items 
}) => (
  <Vertical>
    <ComponentContainerTree type={type}>
      <Chrono
        mode="VERTICAL"
        cardHeight={200}
        cardWidth={650}
        scrollable
        flipLayout
        timelinePointDimension={30}
        {...(items ? { items } : {})}
      >
        <div>
          <div style={{ width: '250px', height: '250px' }}>
            <img
              style={{ maxWidth: '100%', maxHeight: '100%' }}
              src="https://cdn.tutsplus.com/net/uploads/2013/08/github-collab-retina-preview.gif"
              alt="github"
            />
          </div>
        </div>
        <div>
          <h3>This is a List</h3>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
            <li>Item 4</li>
            <li>Item 5</li>
          </ul>
        </div>
        <div>
          <h3>Dunkirk</h3>
          <p>
            The Battle of Dunkirk (French: Bataille de Dunkerque) was fought in
            Dunkirk (Dunkerque), France, during the Second World War, between
            the Allies and Nazi Germany. As the Allies were losing the Battle of
            France on the Western Front, the Battle of Dunkirk was the defence
            and evacuation to Britain of British and other Allied forces in
            Europe from 26 May to 4 June 1940.
          </p>
          <p>
            After the Phoney War, the Battle of France began in earnest on 10
            May 1940. To the east, the German Army Group B invaded the
            Netherlands and advanced westward. In response, the Supreme Allied
            Commander—French General Maurice Gamelin—initiated "Plan D" and
            entered Belgium to engage the Germans in the Netherlands. The plan
            relied heavily on the Maginot Line fortifications along the
            German–French border, but German forces had already crossed through
            most of the Netherlands before the French forces arrived. Gamelin
            instead committed the forces under his command, three mechanised
            armies, the French First and Seventh Armies and the British
            Expeditionary Force (BEF), to the River Dyle.
          </p>
        </div>
        <div style={{ margin: '1rem' }}>
          <h3>Table</h3>
          <table>
            <thead>
              <tr>
                <td>Column 1</td>
                <td>Column 2</td>
                <td>Column 3</td>
                <td>Column 4</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Value 1</td>
                <td>Value 2</td>
                <td>Value 3</td>
                <td>Value 4</td>
              </tr>
              <tr>
                <td>Value 5</td>
                <td>Value 6</td>
                <td>Value 7</td>
                <td>Value 8</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="chrono-icons">
          <img src="satellite-dish.svg" alt="satellite" />
          <img src="notification-bell.svg" alt="notification" />
          <img src="camera.svg" alt="camera" />
          <img src="rss.svg" alt="rss" />
        </div>
      </Chrono>
    </ComponentContainerTree>
  </Vertical>
); 