import { IconBaseProps } from "react-icons";
import {
  AiOutlineBook,
  AiOutlineFileAdd,
  AiOutlineSetting,
  AiOutlineUser,
} from "react-icons/ai";
import { HiOutlineUsers } from "react-icons/hi";
import { RiDashboardLine } from "react-icons/ri";
import { TbBooks } from "react-icons/tb";
import { FiBookOpen } from "react-icons/fi";

export const icons = {
  dashboard: RiDashboardLine,
  books: TbBooks,
  student: AiOutlineUser,
  setting: AiOutlineSetting,
  add: AiOutlineFileAdd,
  students: HiOutlineUsers,
  bookOpen: FiBookOpen,
};

export type CustomIconType = keyof typeof icons;

export interface IconProps extends IconBaseProps {
  icon: CustomIconType;
}
export function Icon({ icon, ...rest }: IconProps) {
  const I = icons[icon];
  return <I {...rest} />;
}
