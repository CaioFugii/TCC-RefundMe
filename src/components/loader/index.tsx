import React from "react";

interface OwnProps {
  visible: boolean;
}

const Loader: React.FC<OwnProps> = (props: OwnProps) => {
  const { visible } = props;

  return visible ? (
    <div className="loader">
      <div className="loader-content">
        <span className="dots"></span>
        <span className="dots"></span>
        <span className="dots"></span>
        <span className="dots"></span>
        <span className="dots"></span>
        <span className="dots"></span>
        <span className="dots"></span>
        <span className="dots"></span>
        <span className="dots"></span>
        <span className="dots"></span>
        <div className="loader-txt">Carregando...</div>
      </div>
    </div>
  ) : null;
};

export { Loader };