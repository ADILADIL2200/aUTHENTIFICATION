import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState } from 'react';
import { useAuth } from '../../context/useAuth';
import api from '../../lib/axios';

const schema = yup.object({
    prenom:          yup.string().required('Prénom obligatoire'),
    nom:             yup.string().required('Nom obligatoire'),
    telephone:       yup.string().matches(/^[0-9]{10}$/, 'Téléphone invalide')
                        .nullable().transform(v => v === '' ? null : v),
    cabinet:         yup.string().nullable().transform(v => v === '' ? null : v),
    barreau:         yup.string().nullable().transform(v => v === '' ? null : v),
    numero_ordre:    yup.string().nullable().transform(v => v === '' ? null : v),
    specialite:      yup.string().nullable().transform(v => v === '' ? null : v),
    ville:           yup.string().nullable().transform(v => v === '' ? null : v),
});

const Field = ({ label, error, children }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <label style={{ color: '#374151', fontSize: '14px', fontWeight: '500' }}>
            {label}
        </label>
        {children}
        {error && <span style={{ color: '#ef4444', fontSize: '12px' }}>⚠ {error}</span>}
    </div>
);

export default function ProfilAvocatForm() {
    const { login }                     = useAuth();
    const [serverError, setServerError] = useState('');
    const [loading, setLoading]         = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const inputStyle = (hasError) => ({
        width: '100%', padding: '10px 14px',
        border: `1.5px solid ${hasError ? '#ef4444' : '#d1d5db'}`,
        borderRadius: '8px', fontSize: '14px', outline: 'none',
        backgroundColor: hasError ? '#fef2f2' : '#ffffff',
        color: '#111827', boxSizing: 'border-box',
    });

    const onSubmit = async (data) => {
        setLoading(true);
        setServerError('');
        try {
            const res = await api.post('/profil-avocat', data);
            // Mettre à jour le user stocké avec les infos avocat
            const user = JSON.parse(localStorage.getItem('user'));
            login(localStorage.getItem('token'), { ...user, avocat: res.data.avocat });
        } catch (err) {
            if (err.response?.status === 403) {
                setServerError('Veuillez vérifier votre email avant de continuer.');
            } else {
                const laravelErrors = err.response?.data?.errors;
                if (laravelErrors) {
                    setServerError(Object.values(laravelErrors)[0][0]);
                } else {
                    setServerError(err.response?.data?.message || 'Erreur serveur.');
                }
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            minHeight: '100vh', width: '100vw',
            backgroundColor: '#f3f4f6',
            display: 'flex', alignItems: 'center',
            justifyContent: 'center', padding: '40px 16px',
            fontFamily: 'Segoe UI, sans-serif', boxSizing: 'border-box',
        }}>
            <div style={{
                backgroundColor: '#ffffff', borderRadius: '16px',
                boxShadow: '0 4px 24px rgba(0,0,0,0.1)',
                width: '100%', maxWidth: '520px', overflow: 'hidden',
            }}>
                {/* Header */}
                <div style={{
                    background: 'linear-gradient(135deg, #1e3a5f, #2563eb)',
                    padding: '32px', textAlign: 'center', color: 'white',
                }}>
                    <div style={{
                        width: '70px', height: '70px', borderRadius: '50%',
                        backgroundColor: 'rgba(255,255,255,0.2)',
                        display: 'flex', alignItems: 'center',
                        justifyContent: 'center', margin: '0 auto 16px',
                        fontSize: '32px',
                    }}>🏛️</div>
                    <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '700' }}>
                        Compléter votre profil
                    </h1>
                    <p style={{ margin: '6px 0 0', opacity: 0.85, fontSize: '14px' }}>
                        Informations professionnelles
                    </p>
                </div>

                {/* Form */}
                <div style={{ padding: '32px' }}>

                    {serverError && (
                        <div style={{
                            backgroundColor: '#fef2f2', border: '1px solid #fca5a5',
                            color: '#dc2626', padding: '12px', borderRadius: '8px',
                            marginBottom: '20px', fontSize: '14px', textAlign: 'center',
                        }}>
                            {serverError}
                        </div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} noValidate>

                        {/* Infos personnelles */}
                        <div style={{ fontSize: '13px', fontWeight: '600',
                            color: '#6b7280', textTransform: 'uppercase',
                            letterSpacing: '0.05em', marginBottom: '16px',
                            borderBottom: '1px solid #e5e7eb', paddingBottom: '8px' }}>
                            👤 Informations Personnelles
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column',
                            gap: '16px', marginBottom: '24px' }}>

                            <div style={{ display: 'grid',
                                gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                <Field label="Prénom *" error={errors.prenom?.message}>
                                    <input {...register('prenom')} placeholder="Ahmed"
                                        style={inputStyle(errors.prenom)} />
                                </Field>
                                <Field label="Nom *" error={errors.nom?.message}>
                                    <input {...register('nom')} placeholder="Benali"
                                        style={inputStyle(errors.nom)} />
                                </Field>
                            </div>

                            <Field label="Téléphone" error={errors.telephone?.message}>
                                <input {...register('telephone')}
                                    placeholder="0612345678"
                                    style={inputStyle(errors.telephone)} />
                            </Field>

                            <Field label="Ville" error={errors.ville?.message}>
                                <input {...register('ville')}
                                    placeholder="Casablanca"
                                    style={inputStyle(errors.ville)} />
                            </Field>
                        </div>

                        {/* Infos professionnelles */}
                        <div style={{ fontSize: '13px', fontWeight: '600',
                            color: '#6b7280', textTransform: 'uppercase',
                            letterSpacing: '0.05em', marginBottom: '16px',
                            borderBottom: '1px solid #e5e7eb', paddingBottom: '8px' }}>
                            🏛️ Informations Professionnelles
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column',
                            gap: '16px', marginBottom: '28px' }}>

                            <Field label="Nom du cabinet" error={errors.cabinet?.message}>
                                <input {...register('cabinet')}
                                    placeholder="Cabinet Benali & Associés"
                                    style={inputStyle(errors.cabinet)} />
                            </Field>

                            <Field label="Barreau" error={errors.barreau?.message}>
                                <input {...register('barreau')}
                                    placeholder="Barreau de Casablanca"
                                    style={inputStyle(errors.barreau)} />
                            </Field>

                            <Field label="Numéro d'ordre" error={errors.numero_ordre?.message}>
                                <input {...register('numero_ordre')}
                                    placeholder="CA-2024-1234"
                                    style={inputStyle(errors.numero_ordre)} />
                            </Field>

                            <Field label="Spécialité" error={errors.specialite?.message}>
                                <input {...register('specialite')}
                                    placeholder="Droit des affaires"
                                    style={inputStyle(errors.specialite)} />
                            </Field>
                        </div>

                        <button type="submit" disabled={loading} style={{
                            width: '100%', padding: '14px',
                            background: loading ? '#93c5fd'
                                : 'linear-gradient(135deg, #1e3a5f, #2563eb)',
                            color: 'white', border: 'none', borderRadius: '10px',
                            fontSize: '16px', fontWeight: '600',
                            cursor: loading ? 'not-allowed' : 'pointer',
                        }}>
                            {loading ? '⏳ Enregistrement...' : '✅ Terminer mon inscription'}
                        </button>

                    </form>
                </div>
            </div>
        </div>
    );
}