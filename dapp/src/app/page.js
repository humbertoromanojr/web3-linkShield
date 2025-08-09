"use client";

import { useState } from "react";
import hash from "object-hash";
import web3 from "web3";

export default function Home() {
  const [url, setUrl] = useState("");
  const [fee, setFee] = useState("0");
  const [message, setMessage] = useState("");

  const backgroundImageStyle = {
    backgroundImage: "url(/link-shield.png)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "80vh",
    color: "white",
    margin: 0,
    padding: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  };

  function handleUrlChange(event) {
    setUrl(event.target.value);
  }

  function handleFeeChange(event) {
    setFee(event.target.value);
  }

  function handleSubmit() {
    const linkId = hash(url).slice(0, 5);
    setMessage(`${url} ${fee}`);
  }

  return (
    <>
      <div
        style={backgroundImageStyle}
        className="display-flex container background-color='#0f1221' align-items-center justify-content-center"
      >
        <div className="col-4">&nbsp;</div>
        <div className="col-8 mt-5">
          <h1>LinkShield</h1>
          <p>Proteja seus links. Lucre com eles</p>
          <hr />
          <p>
            Cole a sua URL abaixo, defina a taxa por cliques e conect sua
            Carteira para proteger seu link com a tecnologia Blockchain
          </p>
          <div className="form-floating mb-3">
            <input
              type="text"
              id="url"
              className="form-control opacity-50"
              value={url || ""}
              onChange={handleUrlChange}
            />
            <label htmlFor="url">Link: </label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="number"
              id="fee"
              className="form-control opacity-50"
              value={fee || "0"}
              onChange={handleFeeChange}
            />
            <label htmlFor="fee">Taxa por clique (wei): </label>
          </div>
          <div className="form-floating mb-3">
            <button
              type="button"
              className="btn btn-primary w-10 h-10 align-self-center justify-self-center"
              onClick={handleSubmit}
            >
              <img
                src="/logo-metamask.png"
                alt="logo metamask"
                width={32}
                className="me-2"
              />
              Conectar e criar link
            </button>
          </div>
        </div>
        {message ? (
          <div className="alert alert-success p-3 col-8 mt-3 opacity-50">
            {message}
          </div>
        ) : (
          <>&nbsp;</>
        )}
        <div className="col-4">&nbsp;</div>
      </div>
    </>
  );
}
