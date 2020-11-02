import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import Leaf from '../timeline-vertical-circle';

test('Check Timeline Leaf render', () => {
  const onClick = jest.fn();
  const onActive = jest.fn();

  render(
    <Leaf
      id={'tree-leaf'}
      className="random-class"
      onClick={onClick}
      onActive={onActive}
      active={false}
    />,
  );

  const element = screen.getByTestId('tree-leaf');
  expect(element).toBeInTheDocument();
});

test('Check Timeline Leaf snapshot', () => {
  const onClick = jest.fn();
  const onActive = jest.fn();

  render(
    <Leaf
      id={'tree-leaf'}
      className="random-class"
      onClick={onClick}
      onActive={onActive}
      active={false}
    />,
  );

  const element = screen.getByTestId('tree-leaf');
  expect(element).toMatchSnapshot();
});

test('Check Timeline Leaf Class & Styles', () => {
  const onClick = jest.fn();
  const onActive = jest.fn();

  render(
    <Leaf
      id={'tree-leaf'}
      className="random-class"
      onClick={onClick}
      onActive={onActive}
      active
    />,
  );

  const element = screen.getByTestId('tree-leaf');
  expect(element).toHaveClass('random-class');
  expect(element.children[0]).toHaveClass('random-class');
  expect(element.querySelector('.active')).toHaveClass('active');
});

test('Check Timeline Leaf onClick', async () => {
  const onClick = jest.fn();
  const onActive = jest.fn();

  render(
    <Leaf
      id={'tree-leaf'}
      className="random-class"
      onClick={() => onClick('zz12xx')}
      onActive={onActive}
      active
    />,
  );

  const element = screen.getByTestId('tree-leaf');
  fireEvent.click(element.children[0]);
  expect(onClick).toBeCalled();
  expect(onClick).toBeCalledWith('zz12xx');
  expect(onActive).toBeCalled();
});
