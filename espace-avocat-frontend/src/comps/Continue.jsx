import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Continue() {

  const navigate = useNavigate();

  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [telephone, setTelephone] = useState("");
  const [numeroOrdre, setNumeroOrdre] = useState("");
  const [barreau, setBarreau] = useState("");
  const [dateInscription, setDateInscription] = useState("");
  const [grade, setGrade] = useState("");
  const [specialite, setSpecialite] = useState("");
  const [nomCabinet, setNomCabinet] = useState("");
  const [adresseCabinet, setAdresseCabinet] = useState("");
  const [ville, setVille] = useState("");
  const [photo, setPhoto] = useState(null);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState(null);
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setErrors({});
    setServerError(null);
    setSuccess("");

    const formData = new FormData();
    formData.append("nom", nom);
    formData.append("prenom", prenom);
    formData.append("telephone", telephone);
    formData.append("numero_ordre", numeroOrdre);
    formData.append("barreau", barreau);
    formData.append("date_inscription_barreau", dateInscription);
    formData.append("grade", grade);
    formData.append("specialite", specialite);
    formData.append("nom_cabinet", nomCabinet);
    formData.append("adresse_cabinet", adresseCabinet);
    formData.append("ville", ville);
    if (photo) formData.append("photo", photo);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/profile/avocat", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("authToken"),
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Avocat profile completed successfully! Redirecting...");
        setTimeout(() => navigate("/avocat/dashboard"), 2000);
      } else {
        setMessage(data.message || "Something went wrong");
        setErrors(data.errors || {});
        setServerError({
          error: data.error || null,
          line:  data.line  || null,
          file:  data.file  || null,
        });
      }

    } catch (error) {
      console.error(error);
      setMessage("Server error. Please try again.");
    }
  };

  return (
    <div>

      <h2>Complete Avocat Profile</h2>

      {/* ── Success ── */}
      {success && <p style={{ color: "green" }}><b>{success}</b></p>}

      {/* ── Server message ── */}
      {message && <p style={{ color: "red" }}><b>Message:</b> {message}</p>}

      {/* ── Full server error details ── */}
      {serverError?.error && (
        <div style={{ background: "#fff0f0", border: "1px solid red", padding: 10, marginBottom: 10 }}>
          <p><b>Error:</b> {serverError.error}</p>
          {serverError.line && <p><b>Line:</b> {serverError.line}</p>}
          {serverError.file && <p><b>File:</b> {serverError.file}</p>}
        </div>
      )}

      {/* ── Validation errors ── */}
      {Object.keys(errors).length > 0 && (
        <ul style={{ color: "red" }}>
          {Object.entries(errors).map(([field, messages]) =>
            messages.map((msg, i) => (
              <li key={`${field}-${i}`}><b>{field}:</b> {msg}</li>
            ))
          )}
        </ul>
      )}

      <form onSubmit={handleSubmit}>

        <input
          placeholder="Nom"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          required
        />

        <input
          placeholder="Prenom"
          value={prenom}
          onChange={(e) => setPrenom(e.target.value)}
          required
        />

        <input
          placeholder="Telephone"
          value={telephone}
          onChange={(e) => setTelephone(e.target.value)}
        />

        <input
          placeholder="Numero Ordre"
          value={numeroOrdre}
          onChange={(e) => setNumeroOrdre(e.target.value)}
          required
        />

        <select
          value={barreau}
          onChange={(e) => setBarreau(e.target.value)}
          required
        >
          <option value="">Choose Barreau</option>
          <option value="Casablanca">Casablanca</option>
          <option value="Rabat">Rabat</option>
          <option value="Marrakech">Marrakech</option>
          <option value="Fes">Fes</option>
          <option value="Agadir">Agadir</option>
          <option value="Tanger">Tanger</option>
          <option value="Meknes">Meknes</option>
          <option value="Oujda">Oujda</option>
          <option value="Kenitra">Kenitra</option>
          <option value="Autre">Autre</option>
        </select>

        <input
          type="date"
          value={dateInscription}
          onChange={(e) => setDateInscription(e.target.value)}
        />

        <select
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
        >
          <option value="">Grade</option>
          <option value="stagiaire">Stagiaire</option>
          <option value="titulaire">Titulaire</option>
        </select>

        <input
          placeholder="Specialite"
          value={specialite}
          onChange={(e) => setSpecialite(e.target.value)}
        />

        <input
          placeholder="Nom Cabinet"
          value={nomCabinet}
          onChange={(e) => setNomCabinet(e.target.value)}
        />

        <input
          placeholder="Adresse Cabinet"
          value={adresseCabinet}
          onChange={(e) => setAdresseCabinet(e.target.value)}
        />

        <input
          placeholder="Ville"
          value={ville}
          onChange={(e) => setVille(e.target.value)}
        />

        <input
          type="file"
          onChange={(e) => setPhoto(e.target.files[0])}
        />

        <button type="submit">Complete Profile</button>

      </form>

    </div>
  );
}