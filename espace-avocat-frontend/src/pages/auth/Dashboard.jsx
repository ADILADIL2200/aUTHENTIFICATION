// src/pages/auth/Dashboard.jsx
import { useAuth } from '../../context/useAuth';

export default function Dashboard() {
    const { user, logout } = useAuth();

    return (
        <div style={{
            minHeight: '100vh',
            width: '100vw',          // ← fix largeur
            backgroundColor: '#f3f4f6',
            fontFamily: 'Segoe UI, sans-serif',
            boxSizing: 'border-box', // ← fix overflow
        }}>
            {/* ── Navbar ── */}
            <nav style={{
                backgroundColor: '#1e3a5f',
                padding: '16px 32px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
            }}>
                <div style={{ color: 'white', fontSize: '20px', fontWeight: '700' }}>
                    ⚖️ Espace Avocat
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <span style={{ color: '#93c5fd', fontSize: '14px' }}>
                         {user?.avocat?.prenom} {user?.avocat?.nom}
                    </span>
                    <button onClick={logout} style={{
                        backgroundColor: '#fd2200',
                        color: 'white',
                        border: 'none',
                        padding: '8px 16px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: '500',
                    }}>
                     LOGOUT
                    </button>
                </div>
            </nav>

            {/* ── Contenu ── */}
            <div style={{ padding: '40px 32px' }}>

                {/* Message de bienvenue */}
                <div style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '16px',
                    padding: '32px',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                    marginBottom: '24px',
                    borderLeft: '5px solid #2563eb',
                }}>
                    <h1 style={{ margin: '0 0 8px', color: '#1e3a5f', fontSize: '24px' }}>
                         Bienvenue, {user?.avocat?.prenom} !
                    </h1>
                    <p style={{ margin: 0, color: '#6b7280', fontSize: '15px' }}>
                        Votre espace professionnel est prêt. Gérez vos clients et dossiers.
                    </p>
                </div>

                {/* Cartes stats */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '20px',
                    marginBottom: '24px',
                }}>
                    {[
                        { icon: '👥', label: 'Clients',       value: '0', color: '#2563eb' },
                        { icon: '📁', label: 'Dossiers',      value: '0', color: '#7c3aed' },
                        { icon: '📅', label: 'Rendez-vous',   value: '0', color: '#059669' },
                        { icon: '💰', label: 'Factures',      value: '0', color: '#d97706' },
                    ].map((card) => (
                        <div key={card.label} style={{
                            backgroundColor: '#ffffff',
                            borderRadius: '12px',
                            padding: '24px',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
                            textAlign: 'center',
                            borderTop: `4px solid ${card.color}`,
                        }}>
                            <div style={{ fontSize: '32px', marginBottom: '8px' }}>
                                {card.icon}
                            </div>
                            <div style={{ fontSize: '28px', fontWeight: '700', color: card.color }}>
                                {card.value}
                            </div>
                            <div style={{ color: '#6b7280', fontSize: '14px', marginTop: '4px' }}>
                                {card.label}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Infos du profil */}
                <div style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '16px',
                    padding: '28px',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                }}>
                    <h2 style={{ margin: '0 0 20px', color: '#1e3a5f', fontSize: '18px' }}>
                          Profil
                    </h2>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '16px',
                    }}>
                        {[
                            { label: 'Nom complet', value: user?.name },
                            { label: 'Email',       value: user?.email },
                            { label: 'Cabinet',     value: user?.avocat?.cabinet   || '—' },
                            { label: 'Téléphone',   value: user?.avocat?.telephone || '—' },
                            { label: 'Rôle',        value: user?.role },
                            { label: 'Statut',      value: user?.is_active ? 'Actif' : ' Inactif' },
                        ].map((item) => (
                            <div key={item.label} style={{
                                backgroundColor: '#f9fafb',
                                borderRadius: '8px',
                                padding: '14px',
                            }}>
                                <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '4px' }}>
                                    {item.label}
                                </div>
                                <div style={{ fontSize: '15px', fontWeight: '600', color: '#111827' }}>
                                    {item.value}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}