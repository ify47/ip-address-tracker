import desktopBg from "../assets/pattern-bg-desktop.png";

import { Map } from "../components/Map";
import { ApiData } from "../components/ApiData";
import { SearchBox } from "../components/SearchBox";

export const PageOne = () => {
  return (
    <>
      <img className="desktopbg" src={desktopBg} alt="Pattern Desktop Bg" />
      <header className="card">
        <h1 className="title">IP Address Tracker</h1>
      </header>
      <main>
        <section className="textbox">
          <SearchBox />
        </section>
        <section className="maps">
          <Map />
        </section>
        <section className="info">
          <ApiData />
        </section>
      </main>
    </>
  );
};
