import React, { ReactNode, useMemo } from 'react';
import TestButton from '../TestButton';

/**
 * Grid properties.
 */
export interface IGridProps {
  /** prop1 description */
  prop1?: string;
  /** prop2 description */
  prop2: number;
  /**
   * prop3 description
   */
  prop3: () => void;
  /** Working grid description */
  prop4: 'option1' | 'option2' | 'option3';
}

/**
 * Form Grid.
 */
const Grid = (props: IGridProps): ReactNode => {
  const { prop1 } = useMemo(() => props, [props]);
  return <div>{prop1}</div>;
};

Grid.TestButton = TestButton;

export default Grid;
