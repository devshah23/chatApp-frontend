import { Helmet } from "react-helmet-async";

const Title = ({
  title = "ChatPulse",
  description = "ChatPulse, a fully secure chatApp with instant messaging",
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
  );
};

export default Title;
