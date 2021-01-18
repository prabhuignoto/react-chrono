import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import Item from '../timeline-horizontal-card';

const onClick = jest.fn();
const autoScroll = jest.fn();

const id = 'test_azsxcs1212_test';

const Horizontal = (
  <Item
    active
    cardSubtitle="This is a test content"
    id="34edc"
    mode="HORIZONTAL"
    onClick={() => onClick('CC22CC')}
    autoScroll={autoScroll}
    position="top"
    title="test title"
    wrapperId={id}
  />
);

const Vertical = (
  <Item
    active
    cardSubtitle="This is a test content"
    id="34ed9c"
    mode="VERTICAL"
    onClick={onClick}
    autoScroll={autoScroll}
    position="bottom"
    title="test title"
    wrapperId={id}
  />
);

test('Test Timeline Item render - Horizontal', () => {
  render(Horizontal);

  const element = screen.getByTestId('timeline-item');

  expect(element).toBeInTheDocument();
  expect(element).toMatchSnapshot();
});

test('Test Timeline Item render - Vertical', () => {
  render(Vertical);

  const element = screen.getByTestId('timeline-item');

  expect(element).toBeInTheDocument();
  expect(element).toMatchSnapshot();
});

test('Test Timeline Item render - Horizontal Class', () => {
  render(Horizontal);

  const element = screen.getByTestId('timeline-item');
  const titleElement = screen.getByTestId('timeline-title');

  console.log(element.className);

  expect(element).toHaveClass('horizontal');
  expect(titleElement).toHaveClass('horizontal top');
});

test('Test Timeline Item render - Vertical Class', () => {
  render(Vertical);
  const element = screen.getByTestId('timeline-item');
  const titleElement = screen.getByTestId('timeline-title');

  expect(element).toHaveClass('vertical');
  expect(titleElement).toHaveClass('vertical bottom');
});

test('Test Timeline Item - Handler', () => {
  render(Horizontal);
  const element = screen.getByTestId('timeline-circle');

  fireEvent.click(element);
  expect(onClick).toBeCalled();
  expect(onClick).toBeCalledWith('CC22CC');
});
