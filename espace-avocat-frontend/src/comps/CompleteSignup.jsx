import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

function CompleteSignup() {
  const location = useLocation();
  const navigate = useNavigate();

  const user = location.state?.user;
  const useer_id = user?.id;

  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [telephone, setTelephone] = useState("");
  const [numeroOrdre, setNumeroOrdre] = useState("");
  const [barreau, setBarreau] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/api/avocat/store", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("authToken"),
        },
        body: JSON.stringify({
          useer_id,
          nom,
          prenom,
          telephone,
          barreau,
          numero_ordre: numeroOrdre,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        navigate("/avocat/dashboard");
      } else {
        setMessage(data.message || "Something went wrong.");
      }
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong.");
    }
  };

  return (
    <div>
      <h2>Complete Avocat Profile</h2>

      {message && <p>{message}</p>}

      <form onSubmit={handleSubmit}>
        <input type="hidden" value={useer_id} />

        <input placeholder="Nom" value={nom} onChange={(e) => setNom(e.target.value)} required />
        <input placeholder="Prenom" value={prenom} onChange={(e) => setPrenom(e.target.value)} required />
        <input placeholder="Telephone" value={telephone} onChange={(e) => setTelephone(e.target.value)} required />
        <input placeholder="Numero Ordre" value={numeroOrdre} onChange={(e) => setNumeroOrdre(e.target.value)} required />
        <input placeholder="Barreau" value={barreau} onChange={(e) => setBarreau(e.target.value)} required />

        <button type="submit">Complete Profile</button>
      </form>
    </div>
  );
}

export default CompleteSignup;