import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import {
    TimelineCardModel, TimelineItemModel
} from '../../../models/TimelineItemModel';
import Tree from '../timeline-vertical';

const onClick = jest.fn();
const autoScroll = jest.fn();

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

const View = (
  <Tree
    onClick={onClick}
    autoScroll={autoScroll}
    items={items as TimelineCardModel[]}
    activeTimelineItem={2}
  />
);

test('Test Tree render', () => {
  render(View);
  const element = screen.getByTestId('tree-main');

  expect(element).toBeInTheDocument();
  expect(element).toMatchSnapshot();
});

test('Test Tree Items', () => {
  render(View);
  const element = screen.getByTestId('tree-main');

  expect(element.children.length).toEqual(4);
});

test('Test Tree Branches', () => {
  render(View);
  const element = screen.getByTestId('tree-main');

  Array.from(element.children).forEach((child, index) => {
    if (index % 2 === 0) {
      expect(child).toHaveClass('left');
    } else {
      expect(child).toHaveClass('right');
    }
  });
});

// test("Test Tree Branch active", () => {
//   render(View);
//   const element = screen.getByTitle(/August 1–28, 1914/i);
//   expect(element).toHaveClass("active");
// });

test('Test Tree Branch onClick', () => {
  render(View);
  const element = screen.getAllByTestId('tree-leaf-click')[0];
  fireEvent.click(element);
  expect(onClick).toBeCalled();
  expect(onClick).toBeCalledWith('1');
});
