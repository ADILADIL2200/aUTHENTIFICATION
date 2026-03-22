import { useEffect, useState } from "react";
import axios from "axios";

export default function AvocatProfile() {
  const [avocat, setAvocat] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "http://127.0.0.1:8000/api/avocat/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setAvocat(res.data.avocat);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <p>Loading profile...</p>;
  }

  if (!avocat) {
    return <p>No profile found.</p>;
  }

  return (
    <div>
      <h2>Avocat Profile</h2>
      {avocat.photo && (
        <img src={avocat.photo} alt="Profile" width="150" style={{ borderRadius: "50%" }} />
      )}
      <ul>
        <li><strong>Nom:</strong> {avocat.nom || "-"}</li>
        <li><strong>Prénom:</strong> {avocat.prenom || "-"}</li>
        <li><strong>Téléphone:</strong> {avocat.telephone || "-"}</li>
        <li><strong>Ville:</strong> {avocat.ville || "-"}</li>
        <li><strong>Barreau:</strong> {avocat.barreau || "-"}</li>
        <li><strong>Numéro d'ordre:</strong> {avocat.numero_ordre || "-"}</li>
        <li><strong>Date d'inscription au barreau:</strong> {avocat.date_inscription_barreau || "-"}</li>
        <li><strong>Grade:</strong> {avocat.grade || "-"}</li>
        <li><strong>Spécialité:</strong> {avocat.specialite || "-"}</li>
        <li><strong>Nom du cabinet:</strong> {avocat.nom_cabinet || "-"}</li>
        <li><strong>Adresse du cabinet:</strong> {avocat.adresse_cabinet || "-"}</li>
      </ul>
    </div>
  );
}