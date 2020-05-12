import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import React from 'react';
import nock from 'nock';

nock.disableNetConnect();

beforeEach(() => {
  nock.cleanAll();

  nock('http://localhost:3000')
    .defaultReplyHeaders({ 'Access-Control-Allow-Origin': '*' })
    .get('/todos')
    .reply(200, [{ id: 1, text: 'Coffee', done: false }])
    .post('/todos')
    .reply(200, (body) => ({ ...body, id: Math.ceil(Math.random() * 999) }))
    .put(`/todos/id`)
    .reply(200);
});

test('App title should be always availabe to the user', async () => {
  const root = render(<App />);
  expect(await root.findByText('TO-DO List')).toBeInTheDocument();
});

test('Add button should be always availabe to the user', async () => {
  const root = render(<App />);
  expect(await root.findByText('add')).toBeInTheDocument();
});

test('When user add an item to the list and clicks add, item should appears in the list', async () => {
  const root = render(<App />);

  const input = await root.findByPlaceholderText('add new task');
  await userEvent.type(input, 'Coffee');
  const button = await root.findByText('add');
  userEvent.click(button);

  const listItem = await root.findByText('Coffee');
  expect(listItem).toBeInTheDocument();
});

test('Clear button should remove all the items form the list', async () => {
  const root = render(<App />);
  const button = await root.findByText('Clear');
  userEvent.click(button);

  const listItem = root.queryAllByText('Coffee');

  expect(listItem).toHaveLength(0);
});

//test('Clear button should not be visible when there is no items in the list', async () => {});
