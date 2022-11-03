import * as React from 'react';
import { Link } from "react-router-dom";
import styles from './Navitems.module.css';
import { RiDashboardLine } from 'react-icons/ri';
import { TbBooks } from 'react-icons/tb';
import { AiOutlineUser,AiOutlineSetting } from "react-icons/ai";

const icons = {
  dashboard: RiDashboardLine,
  books: TbBooks,
  student: AiOutlineUser,
  setting: AiOutlineSetting,


}



export default function Navitems(props: { icon: keyof typeof icons, text: string, link:string }) {
  const Icon = icons[props.icon]
  return (
    <div >
      <Link to={props.link} className={styles.Navitems}>
        <Icon className={styles.icon}/>
        <span className='text'>{props.text}</span>
      </Link>

    </div>

  )
}
