import { useEffect, useState } from "react";
import Title from "../../mini-component/Title";
import styles from "./Settings.module.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormData from "form-data";
import { useForm } from "react-hook-form";
import axios from "axios";
import { AiOutlineEdit } from "react-icons/ai";
import { CODE_NETWORK_ERROR } from "../../../../constants/constants";
import { notifyNetworkError } from "../../../../utils/notify";

function Input(props: any) {
  const { title, placeholder, type, isDisabled } = props;
  return (
    <div className={styles.input}>
      <p className={styles.inputtitle}>{title}</p>
      <input
        type={type}
        defaultValue={placeholder}
        className={`${styles.inputfield} ${!isDisabled && styles.active}`}
        disabled={isDisabled}
      />
    </div>
  );
}

function Boxtitle(props: any) {
  const { title, hr } = props;
  return (
    <>
      <h3 className={styles.boxtitle}>{title}</h3>
      {!hr && <div className={styles.hr}></div>}
    </>
  );
}

function Profiledata(props: any) {
  const { name, email, phone } = props;
  return (
    <div className={styles.profiledata}>
      <p className={styles.pname}> {name}</p>
      <p className={styles.p}>Itahari International College</p>
      <p className={styles.p}>{email}</p>
      <p className={styles.p}>+977 {phone}</p>
    </div>
  );
}

export default function Settings() {
  const [edit, setEdit] = useState(false);
  const [data, setData] = useState<{
    avatar: string;
    firstName: string;
    lastName: string;
    emailSuffix: string;
    maxRenew: number;
    renewDay: number;
  }>({
    avatar: "",
    emailSuffix: "",
    maxRenew: 0,
    renewDay: 0,
    firstName: "",
    lastName: "",
  });
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    const settings = localStorage.getItem("settings");
    if (settings) {
      const parsed = JSON.parse(settings);
      return setData(parsed);
    }
    axios({ method: "get", url: "//localhost:3500/settings" })
      .then((res) => {
        localStorage.setItem("settings", JSON.stringify(res.data));
        toast.success("Information fetch Completed", { autoClose: 2000 });
        setData(res.data);
      })
      .catch((err) => {
        if (err.code === "ERR_NETWORK") {
          return notifyNetworkError();
        } else {
          toast.error(
            "Something Unexpected happend! Contact to the maintainer."
          );
        }
      });
  }, []);

  const handleSetting = () => {
    setEdit((current) => !current);
  };
  const handleProfileSubmit = async (datas: any) => {
    const formData = new FormData();
    formData.append("file", datas.file[0]);
    axios({
      method: "patch",
      url: "http://localhost:3500/settings/profile",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => {
        localStorage.setItem("settings", JSON.stringify(res.data));
        setData(res.data);
        toast.success("Profile Avatar changed!");
      })
      .catch((err) => {
        console.log(err);
        if (err.code === CODE_NETWORK_ERROR) {
          notifyNetworkError();
        }
      });
  };
  return (
    <>
      <div className={styles.header}>
        <Title text="Settings" />
        <button className={styles.button} onClick={handleSetting}>
          {edit ? "Save" : "Edit"}
        </button>
      </div>
      <div className={styles.container}>
        <div className={styles.profile}>
          <Boxtitle title="Admin Profile" />
          <img src={data.avatar} className={styles.imgupload} alt="Profile" />
          <form
            onChange={handleSubmit(handleProfileSubmit)}
            className={styles.inputform}
          >
            <label className={styles.label}>
              <AiOutlineEdit className={styles.lableicon} />
              <input
                type="file"
                accept="image/*"
                {...register("file")}
                className={styles.uploadavatar}
              />
            </label>
          </form>
          <Profiledata
            name={`${data.firstName} ${data.lastName}`}
            email="Nepal ko email"
            number="chha 0 chhaina 0 "
          />
        </div>
        <div className={styles.setting}>
          <div>
            <Boxtitle title="Profile Setting" />
            <div className={styles.usersetting}>
              <Input
                type="text"
                placeholder="Librarian"
                title="First Name"
                isDisabled={!edit}
              />
              <Input
                type="text"
                placeholder="Mam"
                title="Last Name"
                isDisabled={!edit}
              />
              <Input
                type="number"
                placeholder="+977 9800000000"
                title="Phone"
                isDisabled={!edit}
              />
              <Input
                type="email"
                placeholder="Library@iic.edu.np"
                title="Email"
                isDisabled={!edit}
              />
            </div>
          </div>
          {/* here */}
          <div>
            <Boxtitle title="Library Setting" />
            <div className={styles.usersetting}>
              <Input
                type="email"
                placeholder={data.emailSuffix}
                title="Email Suffix"
                isDisabled={!edit}
              />
              <Input
                type="number"
                placeholder="2"
                title="Maximum Book Renew"
                isDisabled={!edit}
              />
              <Input
                type="number"
                placeholder="7"
                title="Maximum Book Renew Day ( /perday)"
                isDisabled={!edit}
              />
              <Input
                type="number"
                placeholder="3"
                title="Maximum Book Borrow"
                isDisabled={!edit}
              />
              <Input
                type="number"
                placeholder="5"
                title="Fine On Delay (RS./day)"
                isDisabled={!edit}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
