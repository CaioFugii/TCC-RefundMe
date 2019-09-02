import React, { ReactNode } from 'react';
import { Button } from 'semantic-ui-react';

interface OwnProps {
  title: string;
  children?: ReactNode;
  icon?: boolean;
  titleButton?: string;
  className?: string;
  loading?: boolean;
  close(): void;
  renderFooter?(): JSX.Element;
}

const Modal: React.FC<OwnProps> = ({ className, children, close, icon, title, titleButton, renderFooter, loading }: OwnProps) => {
  return (
    <div className={`modal ${className}`}>
      <div className="modal-wrapper">
        <div className="modal-body text-center">
          {icon && <i className="fas fa-check-double icon-success" />}
          <h3 className="modal-title">{title}</h3>
          {children}
        </div>
        {
          renderFooter ?
            renderFooter() :
            <div className="modal-footer text-center">
              <Button onClick={close} className={`btn ${loading ? 'btn-loading' : ''}`}>
                {titleButton}
              </Button>
            </div>
        }
      </div>
    </div>
  );
}

Modal.defaultProps = {
  icon: false,
  titleButton: 'Ok!',
};

export { Modal };
