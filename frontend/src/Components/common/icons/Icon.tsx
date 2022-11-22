import { IconBaseProps } from "react-icons";
import {
  AiOutlineBook,
  AiOutlineFileAdd,
  AiOutlineSetting,
  AiOutlineUser,
} from "react-icons/ai";
import { HiOutlineUsers } from "react-icons/hi";
import { TfiDashboard } from "react-icons/tfi";

import { GiBookshelf } from "react-icons/gi";
import { TbBooks, TbBookUpload, TbBookOff } from "react-icons/tb";
import { FiBookOpen } from "react-icons/fi";
import styles from "./Icon.module.css";
import { BsJournalBookmark, BsBookmarkCheck } from "react-icons/bs";
export const icons = {
  dashboard: TfiDashboard,
  bookupload: TbBookUpload,
  books: BsJournalBookmark,
  Books: GiBookshelf,
  IssueBook: BsBookmarkCheck,
  booksexpire: TbBookOff,
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
  return <I className={styles.icon} {...rest} />;
}
