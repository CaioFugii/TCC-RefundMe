import React from 'react';

interface OwnProps {
  visible: boolean;
  className?: string;
  text: string;
}

const Alert: React.FC<OwnProps> = ({ visible, className, text }: OwnProps) =>
  visible ? <div className={`alert ${className}`}>{text}</div> : null;
Alert.defaultProps = {
  className: 'bg-success'
};

export { Alert };
