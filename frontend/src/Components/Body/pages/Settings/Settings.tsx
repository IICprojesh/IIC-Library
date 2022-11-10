import { useEffect, useState } from "react";
import styles from "./Settings.module.css";
import { toast } from "react-toastify";
import FormData from "form-data";
import { useForm } from "react-hook-form";
import axios from "axios";
import { AiOutlineEdit } from "react-icons/ai";
import { CODE_NETWORK_ERROR } from "../../../../constants/constants";
import { notifyNetworkError } from "../../../../utils/notify";
import { Title } from "../../../common/title/Title";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import env from "react-dotenv";

const queryClient = new QueryClient()

function Input(props: any) {
  const { title, names, placeholder, type, isDisabled } = props;

  return (
    <div className={styles.input}>
      <p className={styles.inputtitle}>{title}</p>
      <input
        type={type}
        name={names}
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
  const [input, setInput] = useState([])
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(true);
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

  function fetched(data: any) {
    setData(data);
    setLoading(true);
  }

  useEffect(() => {
    const settings = localStorage.getItem("settings");
    if (settings) {
      const parsed = JSON.parse(settings);
      return fetched(parsed);
    }       
    console.log(`${env.url}/settings`)
    axios({ method: "get", url: "https://localhost:3500/settings" })
      .then((res) => {
        localStorage.setItem("settings", JSON.stringify(res.data));
        toast.success("Information fetch Completed", { autoClose: 2000 });
        fetched(res.data);
      })
      .catch((err) => {
        console.log("here is error")
        if (err.code === CODE_NETWORK_ERROR) {
          return notifyNetworkError();
        } else {
          toast.error(
            "Something Unexpected happened! Contact to the maintainer @ 9804385646", { autoClose: 10000 }
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
      <Title
        title="Settings"
        leading={
          <button className={styles.button} onClick={handleSetting}>
            {edit ? "Save" : "Edit"}
          </button>
        }
      />
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
            phone='99999999'
          />
        </div>
        <div className={styles.setting}>
          <div>
            <Boxtitle title="Profile Setting" />
            <div className={styles.usersetting}>
              <Input
                type="text"

                name="firstname"
                placeholder="Librarian"
                title="First Name"
                isDisabled={!edit}
              />
              <Input
                val={data.lastName}
                type="text"
                name="lastname"
                placeholder="Mam"
                title="Last Name"
                isDisabled={!edit}
              />
              <Input
                type="number"
                name='phone'
                placeholder="+977 9800000000"
                title="Phone"
                isDisabled={!edit}
              />
              <Input
                type="email"
                name='email'

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
                name="emailSufix"
                placeholder={data.emailSuffix}
                title="Email Suffix"
                isDisabled={!edit}
              />
              <Input
                type="number"
                name="maxRenew"
                placeholder="2"
                title=" Maximun Times Book Renew"
                isDisabled={!edit}
              />
              <Input
                type="number"
                placeholder="7"
                title="Maximum Book Renew Day "
                isDisabled={!edit}
              />
              <Input
                type="number"
                placeholder="3"
                name="borrow"
                title="Maximum Book Borrow"
                isDisabled={!edit}
              />
              <Input
                type="number"
                name="fineAmount"
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
