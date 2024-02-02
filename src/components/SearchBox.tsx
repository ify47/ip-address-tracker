import { useEffect, useRef, useState } from "react";
import arrowIcon from "../assets/icon-arrow.svg";
import validator from "validator";
import { useAppDispatch } from "../redux/hooks";
import { fetchAddress, fetchIp } from "../redux/api/geoApi";
import axios from "axios";

export const SearchBox = () => {
  const [value, setValue] = useState("");
  const dispatch = useAppDispatch();

  const validateInput = () => {
    if (validator.isIP(value)) {
      dispatch(fetchIp(value));
    } else if (validator.isURL(value)) {
      dispatch(fetchAddress(value));
    } else return;
  };

  const isMounted = useRef<boolean>(false);

  useEffect(() => {
    if (isMounted.current) return;
    const getUserIp = async () => {
      const res = await axios.get("https://api.ipify.org");
      setValue(res.data);
      dispatch(fetchIp(res.data));
    };
    getUserIp();
    isMounted.current = true;
  }, [dispatch]);

  return (
    <>
      <input
        type="text"
        value={value}
        onKeyDown={(e) => e.key === "Enter" && validateInput()}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search for any IP address or domain"
      />
      <button type="submit" onClick={validateInput}>
        <img src={arrowIcon} alt="Arrow Icon" />
      </button>
    </>
  );
};
