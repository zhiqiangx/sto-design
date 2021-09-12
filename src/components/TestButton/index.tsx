import React, { FunctionComponent, MouseEventHandler } from 'react';
import PropTypes from 'prop-types';

interface Props {
  onClick?: MouseEventHandler<HTMLDivElement>;
  children: React.ReactNode;
  color?: string;
}
const TestButton: FunctionComponent<Props> = ({ onClick, children }) => {
  return <div onClick={onClick}>{children}</div>;
};

TestButton.propTypes = {
  /** Button label */
  children: PropTypes.node.isRequired,
  /** The color for the button */
  color: PropTypes.string,
  /** Gets called when the user clicks on the button */
  onClick: PropTypes.func,
};

TestButton.defaultProps = {
  color: '#333',
  onClick: (event) => {
    // eslint-disable-next-line no-console
    console.log('You have clicked me!', event);
  },
};

export default TestButton;
