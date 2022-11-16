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
import env from "react-dotenv";
import { TextField } from "@material-ui/core";
import { border } from "@mui/system";

function Boxtitle(props: any) {
  const { title } = props;
  return (
    <>
      <h3 className={styles.boxtitle}>{title}</h3>
      <div className={styles.hr}></div>
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
  const [input, setInput] = useState([]);
  const [settings, setSettings] = useState<any>(null);
  const [adminInfo, setAdminInfo] = useState<{
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  }>({
    firstName: "John",
    lastName: "Doe",
    email: "contact@iic.edu.np",
    phone: "0000000000",
  });
  const [buttonState, setButtonState] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<{
    avatar: string;
  }>({
    avatar: "",
  });
  const { register, handleSubmit } = useForm();

  function fetched(data: any) {
    setSettings(data)
    setAdminInfo(data);
    setData(data);
    setLoading(true);
  }

  useEffect(() => {
    axios({ method: "get", url: "http://localhost:3500/settings" })
      .then((res) => {
        console.log("i will set admin info");
        toast.success("Information fetch Completed", { autoClose: 2000 });
        fetched(res.data);
      })
      .catch((err) => {
        console.log("here is error");
        if (err.code === CODE_NETWORK_ERROR) {
          console.log(err)
          return notifyNetworkError();
        } else {
          toast.error(
            "Something Unexpected happened! Contact to the maintainer @ 9804385646",
            { autoClose: 10000 }
          );
        }
      });
  }, []);

  const handleSetting = () => {
    setButtonState((current) => !current);

    if (buttonState) {
      axios({
        method: "patch",
        url: "http://localhost:3500/settings/1",
        data: {
          ...settings,
          maxRenew: +settings.maxRenew,
          renewBefore: +settings.renewBefore,
          fineAmount: +settings.fineAmount,
        },
      })
        .then((res) => {
          toast.success("Admin and Library Setting Changed.");
          console.log(res.data.data);
          setAdminInfo(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
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
            {buttonState ? "Save" : "Edit"}
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
            name={`${adminInfo.firstName} ${adminInfo.lastName}`}
            email={adminInfo.email}
            phone={adminInfo.phone}
          />
        </div>
        <div className={styles.setting}>
          <div>
            <Boxtitle title="Profile Setting" />
            <div className={styles.usersetting}>
              <TextField
                variant="outlined"
                focused={buttonState}
                value={settings?.firstName}
                onChange={(e) =>
                  setSettings({ ...settings, firstName: e.target.value })
                }
                style={{
                  width: "430px",
                  marginRight: "120px",
                  marginTop: "12px",
                  fontWeight: 300,
                  translate: "border 200ms",
                }}
                label="First Name"
                InputLabelProps={{
                  shrink: true,
                }}
                disabled={!buttonState}
              />
              <TextField
                style={{
                  width: "430px",
                  marginRight: "120px",
                  marginTop: "12px",
                  fontWeight: 300,
                  translate: "border 200ms",
                }}
                value={settings?.lastName}
                onChange={(e) =>
                  setSettings({ ...settings, lastName: e.target.value })
                }
                variant="outlined"
                label="Last Name"
                InputLabelProps={{
                  shrink: true,
                }}
                disabled={!buttonState}
              />
              <TextField
                style={{
                  width: "430px",
                  marginRight: "120px",
                  marginTop: "20px",
                  fontWeight: 300,
                  translate: "border 200ms",
                }}
                value={settings?.phone}
                onChange={(e) =>
                  setSettings({ ...settings, phone: e.target.value })
                }
                variant="outlined"
                label="Phone Number"
                InputLabelProps={{
                  shrink: true,
                }}
                disabled={!buttonState}
              />
              <TextField
                style={{
                  width: "430px",
                  marginRight: "120px",
                  marginTop: "20px",
                  fontWeight: 300,
                  translate: "border 200ms",
                }}
                value={settings?.email}
                onChange={(e) =>
                  setSettings({ ...settings, email: e.target.value })
                }
                variant="outlined"
                type="email"
                label="Email Address"
                InputLabelProps={{
                  shrink: true,
                }}
                disabled={!buttonState}
              />
            </div>
          </div>
          {/* here */}
          <div>
            <Boxtitle title="Library Setting" />
            <div className={styles.usersetting}>
              <TextField
                style={{
                  width: "430px",
                  marginRight: "120px",
                  marginTop: "20px",
                  fontWeight: 300,
                  translate: "border 200ms",
                }}
                value={settings?.emailSuffix}
                onChange={(e) =>
                  setSettings({ ...settings, emailSuffix: e.target.value })
                }
                variant="outlined"
                type="Email"
                label="Email Suffix"
                InputLabelProps={{
                  shrink: true,
                }}
                disabled={!buttonState}
              />
              <TextField
                style={{
                  width: "430px",
                  marginRight: "120px",
                  marginTop: "20px",
                  fontWeight: 300,
                  translate: "border 200ms",
                }}
                value={settings?.maxRenew}
                onChange={(e) =>
                  setSettings({ ...settings, maxRenew: e.target.value })
                }
                variant="outlined"
                type="number"
                label="Books Renew (/times)"
                InputLabelProps={{
                  shrink: true,
                }}
                disabled={!buttonState}
              />
              <TextField
                style={{
                  width: "430px",
                  marginRight: "120px",
                  marginTop: "20px",
                  fontWeight: 300,
                  translate: "border 200ms",
                }}
                value={settings?.renewBefore}
                onChange={(e) =>
                  setSettings({ ...settings, renewBefore: e.target.value })
                }
                variant="outlined"
                type="number"
                label="Borrow Days"
                InputLabelProps={{
                  shrink: true,
                }}
                disabled={!buttonState}
              />
              <TextField
                style={{
                  width: "430px",
                  marginRight: "120px",
                  marginTop: "20px",
                  fontWeight: 300,
                  translate: "border 200ms",
                }}
                value={settings?.maxIssue}
                onChange={(e) =>
                  setSettings({ ...settings, maxIssue: e.target.value })
                }
                variant="outlined"
                type="text"
                label="Total Borrow (/student)"
                InputLabelProps={{
                  shrink: true,
                }}
                disabled={!buttonState}
              />
              <TextField
                style={{
                  width: "430px",
                  marginRight: "120px",
                  marginTop: "20px",
                  fontWeight: 300,
                  translate: "border 200ms",
                }}
                value={settings?.fineAmount}
                onChange={(e) =>
                  setSettings({ ...settings, fineAmount: e.target.value })
                }
                variant="outlined"
                type="text"
                label="Fine (/day)"
                InputLabelProps={{
                  shrink: true,
                }}
                disabled={!buttonState}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
