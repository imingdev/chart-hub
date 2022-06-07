const RenderJudge = ({ value, active, inactive }) => (value ? active : inactive);

RenderJudge.defaultProps = {
  active: null,
  inactive: null,
};

export default RenderJudge;
