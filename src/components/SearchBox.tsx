import { useState } from "react";
import arrowIcon from "../assets/icon-arrow.svg";
import validator from "validator";
import { useAppDispatch } from "../redux/hooks";
import { fetchAddress, fetchIp } from "../redux/api/geoApi";

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
