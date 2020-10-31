import { render, screen } from '@testing-library/react';
import React from 'react';
import {
    TimelineCardModel, TimelineItemModel
} from '../../../models/TimelineItemModel';
import Collection from '../timeline-horizontal';

const onClick = jest.fn();
const autoScroll = jest.fn();
const id = 'test_sdccs_test';

const items: TimelineItemModel[] = [
  {
    id: '1',
    title: 'June 28, 1914 June 28, 1914 June 28, 1914June 28, 1914',
    cardSubtitle:
      'Archduke Franz Ferdinand of Austria and his wife, Sophie, are assassinated by a Bosnian Serb nationalist in Sarajevo.',
  },
  {
    id: '2',
    title: 'July 28, 1914',
    cardSubtitle:
      'World War I begins when Austria-Hungary declares war on Serbia.',
  },
  {
    id: '3',
    title: 'August 1–28, 1914',
    cardSubtitle: `Germany declares war on Russia, France, and Belgium. Britain declares war on Germany.
    Austria declares war on Russia. Montenegro declares war on Austria. France declares war on Austria.
    Britain declares war on Austria. Montenegro declares war on Germany. Japan declares war on Germany. Austria declares war on Belgium.`,
  },
  {
    id: '4',
    title: 'September 6, 1914',
    cardSubtitle: `First Battle of the Marne begins. The Germans had advanced to within 30 miles of Paris, but over the next two days, the French are reinforced by 6,000 infantrymen who are transported to the front by hundreds of taxis.
      The Germans dig in north of the Aisne River, and the trench warfare that is to typify the Western Front for the next four years begins.`,
  },
];

const Horizontal = (
  <Collection
    items={items as TimelineCardModel[]}
    itemWidth={250}
    mode="HORIZONTAL"
    handleItemClick={onClick}
    autoScroll={autoScroll}
    wrapperId={id}
  />
);

const Vertical = (
  <Collection
    items={items as TimelineCardModel[]}
    itemWidth={250}
    mode="VERTICAL"
    handleItemClick={onClick}
    autoScroll={autoScroll}
    wrapperId={id}
  />
);

const Tree = (
  <Collection
    items={items as TimelineCardModel[]}
    itemWidth={250}
    mode="VERTICAL_ALTERNATING"
    handleItemClick={onClick}
    autoScroll={autoScroll}
    wrapperId={id}
  />
);

test('Test Collection Horizontal render', () => {
  render(Horizontal);
  const element = screen.getByTestId('timeline-collection');

  expect(element).toBeInTheDocument();
  expect(element).toMatchSnapshot();
  expect(element).toHaveClass('horizontal');
});

test('Test Collection Vertical render', () => {
  render(Vertical);
  const element = screen.getByTestId('timeline-collection');

  expect(element).toBeInTheDocument();
  expect(element).toMatchSnapshot();
  expect(element).toHaveClass('vertical');
});

test('Test Collection Tree render', () => {
  render(Tree);
  const element = screen.getByTestId('timeline-collection');

  expect(element).toBeInTheDocument();
  expect(element).toMatchSnapshot();
  expect(element).toHaveClass('timeline-horz-container');
});

test('Test Collection Items length', () => {
  render(Tree);
  const element = screen.getByTestId('timeline-collection');

  expect(Array.from(element.children).length).toEqual(4);
});
