import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LifeQuestFormTriangle from '../components/LifeQuestFormTriangle';

describe('LifeQuestFormTriangle', () => {
  beforeEach(() => {
    render(<LifeQuestFormTriangle />);
  });

  it('renders MeStat textarea with correct attributes', () => {
    const meStatTextarea = screen.getByPlaceholderText('MeStat');
    expect(meStatTextarea).toHaveAttribute('id', 'MeStat');
    expect(meStatTextarea).toHaveAttribute('rows', '1');
    expect(meStatTextarea).toHaveAttribute('maxLength', '4');
  });

  it('renders WorkStat textarea with correct attributes', () => {
    const workStatTextarea = screen.getByPlaceholderText('WorkStat');
    expect(workStatTextarea).toHaveAttribute('id', 'WorkStat');
    expect(workStatTextarea).toHaveAttribute('rows', '1');
    expect(workStatTextarea).toHaveAttribute('maxLength', '4');
  });

  it('renders LoveStat textarea with correct attributes', () => {
    const loveStatTextarea = screen.getByPlaceholderText('LoveStat');
    expect(loveStatTextarea).toHaveAttribute('id', 'LoveStat');
    expect(loveStatTextarea).toHaveAttribute('rows', '1');
    expect(loveStatTextarea).toHaveAttribute('maxLength', '4');
  });
});
