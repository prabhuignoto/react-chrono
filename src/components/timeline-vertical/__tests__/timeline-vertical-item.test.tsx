import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import Branch from '../timeline-vertical-item';

const onClick = jest.fn();
const onActive = jest.fn();
const showMore = jest.fn();

const View = (
  <Branch
    className="test-class"
    index={2}
    cardSubtitle="Tree branch test"
    title="branch title"
    id="223344"
    active
    onClick={() => onClick('zz22ww')}
    onActive={onActive}
    onShowMore={showMore}
  />
);

test('Test tree branch render', () => {
  render(View);
  const element = screen.getByTestId('vertical-item-row');
  expect(element).toBeInTheDocument();
  expect(element).toMatchSnapshot();
});

test('Test tree branch class styles', () => {
  render(View);
  const element = screen.getByTestId('vertical-item-row');
  expect(element).toHaveClass('test-class');

  Array.from(element.children).forEach((child, index) => {
    expect(child).toHaveClass('test-class');

    if (index < 2) {
      expect(child.children[0]).toHaveClass('active');
    }
  });
});

test('Test tree branch render', () => {
  render(View);
  const element = screen.getByTestId('tree-leaf-click');

  expect(element).toBeInTheDocument();
  fireEvent.click(element);

  expect(onClick).toBeCalled();
  expect(onActive).toBeCalled();
  expect(onClick).toBeCalledWith('zz22ww');
});
