import { IconBaseProps } from "react-icons";
import { AiOutlineSetting, AiOutlineUser } from "react-icons/ai";
import { RiDashboardLine } from "react-icons/ri";
import { TbBooks } from "react-icons/tb";

export const icons = {
  dashboard: RiDashboardLine,
  books: TbBooks,
  student: AiOutlineUser,
  setting: AiOutlineSetting,
};

export type CustomIconType = keyof typeof icons;

export interface IconProps extends IconBaseProps {
  icon: CustomIconType;
}
export function Icon({ icon, ...rest }: IconProps) {
  const I = icons[icon];
  return <I {...rest} />;
}
