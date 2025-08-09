"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getLink } from "@/services/Web3Service";

export default function Home() {
  const [link, setLink] = useState({ fee: "0" });
  const [message, setMessage] = useState("");

  const params = useParams();
  console.log(params);

  useEffect(() => {
    setMessage("Searching for link data, please wait...");

    getLink(params.linkId)
      .then((link) => {
        setMessage("");
        if (link.url) window.location.href = link.url;
        else setLink(link);
      })
      .catch((err) => setMessage(err.message));
  }, []);

  function handleAccessClick() {
    setMessage("Paying and accessing link, please wait...");

    getLink(params.linkId, link.fee)
      .then(() => {
        setMessage("Payment made, redirecting...");
        return getLink(params.linkId);
      })
      .then((link) => (window.location.href = link.url))
      .catch((err) => setMessage(err.message));
  }

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

  return (
    <>
      <div
        style={backgroundImageStyle}
        className="display-flex container background-color='#0f1221' align-items-center justify-content-center"
      >
        <div className="col-4">&nbsp;</div>
        <div className="col-8 mt-5">
          <h1>LinkShield</h1>
          <h2>Link Protegido</h2>
          <p>Este link está protegido pela LinkShield.</p>
          <hr />
          <p>
            Para acessar o conteúdo original, conecte sua carteira abaixo e
            confirme o pagamento da taxa de <strong>{link.fee} wei</strong>.
          </p>

          <div className="form-floating mb-3">
            <button
              type="button"
              className="btn btn-primary w-10 h-10 align-self-center justify-self-center"
              onClick={handleAccessClick}
            >
              <img
                src="/logo-metamask.png"
                alt="logo metamask"
                width={32}
                className="me-2"
              />
              Pagar e acessar link
            </button>
          </div>
          {message ? (
            <div
              className="alert alert-success p-3 col-8 mt-3 opacity-50"
              role="alert"
            >
              {message}
            </div>
          ) : (
            <>&nbsp;</>
          )}
        </div>
        <div className="col-4">&nbsp;</div>
      </div>
    </>
  );
}
