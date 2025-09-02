import React, { FunctionComponent, useState } from 'react';
import Chrono from '../../../components';
import { componentContainerTree, componentContainerTreeDesktop, componentContainerTreeBigScreen, componentContainerTreeTablet, componentContainerTreeMobile, vertical } from '../../App.css';

export interface CustomContentVerticalProps {
  type: string;
  cardHeight?: number;
}

export const CustomContentVertical: FunctionComponent<CustomContentVerticalProps> = ({ 
  type, 
  cardHeight 
}) => {
  const [counter, setCounter] = useState(0);

  const increment = () => setCounter((prev) => prev + 1);
  const decrement = () => setCounter((prev) => prev - 1);

  return (
    <div className={vertical}>
      <div className={
        type === 'desktop' ? componentContainerTreeDesktop :
        type === 'big-screen' ? componentContainerTreeBigScreen :
        type === 'tablet' ? componentContainerTreeTablet :
        type === 'mobile' ? componentContainerTreeMobile :
        componentContainerTree
      }>
        <Chrono mode="VERTICAL" cardHeight={200} cardWidth={650} scrollable>
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
            <h3>Interactive Counter</h3>
            <div>Current count: {counter}</div>
            <button onClick={increment}>increment</button>
            <button onClick={decrement}>decrement</button>
          </div>
          <div>
            <h3>Dunkirk</h3>
            <p>
              The Battle of Dunkirk (French: Bataille de Dunkerque) was fought
              in Dunkirk (Dunkerque), France, during the Second World War,
              between the Allies and Nazi Germany. As the Allies were losing the
              Battle of France on the Western Front, the Battle of Dunkirk was
              the defence and evacuation to Britain of British and other Allied
              forces in Europe from 26 May to 4 June 1940.
            </p>
            <p>
              After the Phoney War, the Battle of France began in earnest on 10
              May 1940. To the east, the German Army Group B invaded the
              Netherlands and advanced westward. In response, the Supreme Allied
              Commander—French General Maurice Gamelin—initiated "Plan D" and
              entered Belgium to engage the Germans in the Netherlands.
            </p>
          </div>
          <div style={{ margin: '1rem' }}>
            <h3>Data Table</h3>
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
        </Chrono>
      </div>
    </div>
  );
}; 