type LayoutProps = {
  header: JSX.Element;
  children: JSX.Element;
};

const Layout = ({ header, children }: LayoutProps): JSX.Element => {
  return (
    <>
      {header}
      {children}
    </>
  );
};

export default Layout;
