import { useEffect, useState } from 'react'
import Title from '../../mini-component/Title'
import styles from "./Settings.module.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function Input(props: any) {
  const { title, placeholder, type, isDisabled } = props;


  return (
    <div className={styles.input}>
      <p className={styles.inputtitle}>{title}</p>
      <input type={type} value={placeholder} className={`${styles.inputfield} ${!isDisabled && styles.active}`} disabled={isDisabled} />
    </div>
  )
}

function Boxtitle(props: any) {
  const { title, hr } = props;
  return (
    <>
      <h3 className={styles.boxtitle}>
        {title}
      </h3>
      {!hr && <div className={styles.hr}></div>
      }

    </>
  )

}

function Profiledata() {
  return (
    <div className={styles.profiledata}>
      <p className={styles.pname}> Sujan Parajuli</p >
      <p className={styles.p}>Itahari International College</p>
      <p className={styles.p}>Library@iic.edu.np</p>
      <p className={styles.p}>+977 980000000</p>
    </div>
  )
}

export default function Settings() {
  const [edit, setEdit] = useState(false)
  const [data, setData] = useState<{
    adminProfile: string,
    emailSuffix: string,
    maxRenew: number,
    renewDay: number,

  }>({
    adminProfile: "",
    emailSuffix: "",
    maxRenew: 0,
    renewDay: 0,
  })
  useEffect(() => {
    axios.get("https://a110-202-63-244-120.in.ngrok.io/settings"
    ).then(
      (res) => {
        setData(res.data)
      }
    )
  }, [])


  const buttonHandler = () => {
    console.log(edit)
    setEdit(current => !current);
    toast.success("Go to hell");
  }
  return (
    <>
      <div className={styles.header}>
        <Title text='Settings' />
        {/* <a href='#' onClick={()=>buttonHandler}> */}
        <a href='#' onClick={buttonHandler}>
          <button className={styles.button}>{edit ? "Save" : "Edit"}</button>

        </a>

      </div>
      <div className={styles.container}>
        <div className={styles.profile}>
          <Boxtitle title="Admin Profile" />
          <img src={data.adminProfile} className={styles.imgupload} alt="Profile Image" />
          <Profiledata />


        </div>
        <div className={styles.setting}>
          <div >
            <Boxtitle title="Profile Setting" />
            <div className={styles.usersetting}>
              <Input type="text" placeholder="Librarian" title="First Name" isDisabled={!edit} />
              <Input type="text" placeholder="Mam" title="Last Name" isDisabled={!edit} />
              <Input type="number" placeholder="+977 9800000000" title="Phone" isDisabled={!edit} />
              <Input type="email" placeholder="Library@iic.edu.np" title="Email" isDisabled={!edit} />

            </div>
          </div>
          {/* here */}
          <div >
            <Boxtitle title="Library Setting" />
            <div className={styles.usersetting}>
              <Input type="email" placeholder={data.emailSuffix} title="Email Suffix" isDisabled={!edit} />
              <Input type="number" placeholder="2" title="Maximum Book Renew" isDisabled={!edit} />
              <Input type="number" placeholder="7" title="Maximum Book Renew Day ( /perday)" isDisabled={!edit} />
              <Input type="number" placeholder="3" title="Maximum Book Borrow" isDisabled={!edit} />
              <Input type="number" placeholder="5" title="Fine On Delay (RS.)" isDisabled={!edit} />
            </div>
          </div>

        </div>
      </div>
    </>
  )
}
