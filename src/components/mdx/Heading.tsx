const anchorClassName =
  "hover:after:visible after:invisible lg:after:absolute lg:after:right-full after:ml-2 lg:after:mr-2 after:px-2 after:my-anchor after:rounded-md after:content-['#']";

interface Props extends React.HTMLAttributes<HTMLHeadingElement> {}

const H1: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  ...restProps
}) => {
  // 실제로 존재하지 않는 경우 ( `TypeScript`라서 처리함 )
  if (typeof children !== "string") {
    return (
      <h1 className="text-4xl mt-8 mb-5" {...restProps}>
        {children}
      </h1>
    );
  }

  return (
    <h1
      className="relative scroll-mt-10 text-4xl mt-8 mb-5"
      {...restProps}
      id={children}
    >
      <a href={`#${children}`} className={anchorClassName}>
        {children}
      </a>
    </h1>
  );
};

const H2: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  ...restProps
}) => {
  // 실제로 존재하지 않는 경우 ( `TypeScript`라서 처리함 )
  if (typeof children !== "string") {
    return (
      <h2 className="text-3xl mt-7 mb-4" {...restProps}>
        {children}
      </h2>
    );
  }

  return (
    <h2
      className="relative scroll-mt-10 text-3xl mt-7 mb-4"
      {...restProps}
      id={children}
    >
      <a href={`#${children}`} className={anchorClassName}>
        {children}
      </a>
    </h2>
  );
};

const H3: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  ...restProps
}) => {
  // 실제로 존재하지 않는 경우 ( `TypeScript`라서 처리함 )
  if (typeof children !== "string") {
    return (
      <h3 className="text-2xl mt-6 mb-3" {...restProps}>
        {children}
      </h3>
    );
  }

  return (
    <h3
      className="relative scroll-mt-10 text-2xl mt-6 mb-3"
      {...restProps}
      id={children}
    >
      <a href={`#${children}`} className={anchorClassName}>
        {children}
      </a>
    </h3>
  );
};

const H4: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  ...restProps
}) => {
  // 실제로 존재하지 않는 경우 ( `TypeScript`라서 처리함 )
  if (typeof children !== "string") {
    return (
      <h4 className="text-xl mt-5 mb-2.5" {...restProps}>
        {children}
      </h4>
    );
  }

  return (
    <h4
      className="relative scroll-mt-10 text-xl mt-5 mb-2.5"
      {...restProps}
      id={children}
    >
      <a href={`#${children}`} className={anchorClassName}>
        {children}
      </a>
    </h4>
  );
};

const H5: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  ...restProps
}) => {
  // 실제로 존재하지 않는 경우 ( `TypeScript`라서 처리함 )
  if (typeof children !== "string") {
    return (
      <h5 className="text-lg mt-4 mb-2" {...restProps}>
        {children}
      </h5>
    );
  }

  return (
    <h5
      className="relative scroll-mt-10 text-lg mt-4 mb-2"
      {...restProps}
      id={children}
    >
      <a href={`#${children}`} className={anchorClassName}>
        {children}
      </a>
    </h5>
  );
};

const H6: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  ...restProps
}) => {
  // 실제로 존재하지 않는 경우 ( `TypeScript`라서 처리함 )
  if (typeof children !== "string") {
    return (
      <h6 className="text-base mt-4 mb-2" {...restProps}>
        {children}
      </h6>
    );
  }

  return (
    <h6
      className="relative scroll-mt-10 text-base mt-4 mb-2"
      {...restProps}
      id={children}
    >
      <a href={`#${children}`} className={anchorClassName}>
        {children}
      </a>
    </h6>
  );
};

const Heading = {
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
};

export default Heading;
