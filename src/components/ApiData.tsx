import { useAppSelector } from "../redux/hooks";

export const ApiData = () => {
  const { data, error, loading } = useAppSelector((state) => state.geoData);

  return (
    <div className="box">
      <div className="boxinfo">
        <h2>IP Address</h2>
        {loading ? (
          <p>Loading</p>
        ) : !loading && error ? (
          <p>{error}</p>
        ) : !loading && data ? (
          <p>{data.ip}</p>
        ) : (
          <p>192.212.174.101</p> // Render the default IP address when there's no error or data
        )}
      </div>
      <hr />
      <div className="boxinfo">
        <h2>Location</h2>
        {loading ? (
          ""
        ) : !loading && error ? (
          ""
        ) : !loading && data ? (
          <p>
            {data.location.region}, {data.location.country}{" "}
            {data.location.postalCode}
          </p>
        ) : (
          <p>Brooklyn, NY 10001</p>
        )}
      </div>
      <hr />
      <div className="boxinfo">
        <h2>Timezone</h2>
        {loading ? (
          ""
        ) : !loading && error ? (
          ""
        ) : !loading && data ? (
          <p>UTC {data.location.timezone}</p>
        ) : (
          <p>UTC -05:00</p>
        )}
      </div>
      <hr />
      <div className="boxinfo">
        <h2>ISP</h2>
        {loading ? (
          ""
        ) : !loading && error ? (
          ""
        ) : !loading && data ? (
          <p>{data.isp}</p>
        ) : (
          <p>SpaceX Starlink</p>
        )}
      </div>
    </div>
  );
};
