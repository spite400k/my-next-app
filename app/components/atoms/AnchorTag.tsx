import React from "react";

type AnchorTagProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;

const AnchorTag: React.FC<AnchorTagProps> = ({ children, href, ...props }) => {
  try {
    if (href) {
      new URL(href); // URLの妥当性をチェック
      props.target = "_blank";
      props.rel = "noopener noreferrer";
    }
  } catch {
    // 無効なURLの場合はデフォルトの動作
  }

  return (
    <a href={href} {...props}>
      {children}
    </a>
  );
};

export default AnchorTag;
