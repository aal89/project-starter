import { ReactElement } from 'react';

type ConditionalWrapProps = {
  children: ReactElement;
  condition: boolean;
  wrapper: (children: ReactElement) => JSX.Element;
};

export const ConditionalWrap: React.FC<ConditionalWrapProps> = ({
  condition,
  wrapper,
  children,
}) => (condition ? wrapper(children) : children);
