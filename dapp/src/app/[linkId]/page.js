export default function Home() {
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
            confirme o pagamento da taxa de <strong>0 wei</strong>.
          </p>

          <div className="form-floating mb-3">
            <button
              type="button"
              className="btn btn-primary w-10 h-10 align-self-center justify-self-center"
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
          <div className="alert alert-success p-3 col-12 mt-3">Messages</div>
        </div>
        <div className="col-4">&nbsp;</div>
      </div>
    </>
  );
}
