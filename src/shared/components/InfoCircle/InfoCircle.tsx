import { Tooltip } from 'antd';
import { StyledInfoCircle } from './InfoCircle.styled';
import { type InfoCircleProps } from './InfoCircle.types';
import { InfoCircleView } from './InfoCircle.constants';

const InfoCircle = ({ variant, title }: InfoCircleProps) => {
  const info = InfoCircleView[variant];
  return (
    <Tooltip title={title ?? info.title}>
      <StyledInfoCircle bgcolor={info.color}>{info.icon}</StyledInfoCircle>
    </Tooltip>
  );
};

export default InfoCircle;
