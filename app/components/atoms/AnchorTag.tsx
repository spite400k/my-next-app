const AnchorTag = ({ node, children, ...props }: any) => {
  try {
      new URL(props.href ?? "");
      props.target = "_blank";
      props.rel = "noopener noreferrer";
  } catch (e) { }
  return <a {...props}>{children}</a>;
}

export default AnchorTag