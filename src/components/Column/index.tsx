import React, { Component } from 'react';

/**
 * Column properties.
 */
export interface IColumnProps {
  /** prop1 description */
  prop1?: string;
  /** prop2 description */
  prop2: number;
  /**
   * prop3 description
   */
  prop3: () => void;
  /** prop4 description */
  prop4: 'option1' | 'option2' | 'option3';
}

/**
 * Form column.
 */
export class Column extends Component<IColumnProps, never> {
  render(): React.ReactNode {
    return <div>Column</div>;
  }
}

export default Column;
