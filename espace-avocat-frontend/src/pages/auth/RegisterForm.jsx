import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState } from 'react';
import api from '../../lib/axios';

const schema = yup.object({
    name:     yup.string().required('Nom complet obligatoire'),
    email:    yup.string().email('Email invalide').required('Email obligatoire'),
    password: yup.string().min(8, 'Minimum 8 caractères').required('Obligatoire'),
    password_confirmation: yup.string()
        .oneOf([yup.ref('password')], 'Ne correspond pas')
        .required('Obligatoire'),
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

export default function RegisterForm() {
    const [serverError, setServerError] = useState('');
    const [success, setSuccess]         = useState(false);
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
            const res = await api.post('/register', data);
            // Stocker le token pour l'étape suivante
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            // Afficher le message de succès
            setSuccess(true);
        } catch (err) {
            const laravelErrors = err.response?.data?.errors;
            if (laravelErrors) {
                setServerError(Object.values(laravelErrors)[0][0]);
            } else {
                setServerError(err.response?.data?.message || 'Erreur serveur.');
            }
        } finally {
            setLoading(false);
        }
    };

    // ── Page succès ───────────────────────────────────────
    if (success) {
        return (
            <div style={{
                minHeight: '100vh', width: '100vw',
                backgroundColor: '#f3f4f6',
                display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontFamily: 'Segoe UI, sans-serif',
            }}>
                <div style={{
                    backgroundColor: '#fff', borderRadius: '16px',
                    boxShadow: '0 4px 24px rgba(0,0,0,0.1)',
                    padding: '48px 40px', maxWidth: '480px',
                    width: '100%', textAlign: 'center',
                }}>
                    <div style={{ fontSize: '64px', marginBottom: '24px' }}>📧</div>
                    <h2 style={{ color: '#1e3a5f', fontSize: '24px',
                        fontWeight: '700', margin: '0 0 12px' }}>
                        Vérifiez votre email !
                    </h2>
                    <p style={{ color: '#6b7280', fontSize: '15px', margin: '0 0 24px' }}>
                        Un lien de vérification a été envoyé à votre adresse email.
                        Cliquez sur le lien pour activer votre compte.
                    </p>
                    <div style={{
                        backgroundColor: '#dbeafe', borderRadius: '10px',
                        padding: '16px', color: '#1e40af', fontSize: '14px',
                    }}>
                        💡 Après vérification, vous serez redirigé pour
                        compléter votre profil avocat.
                    </div>
                </div>
            </div>
        );
    }

    // ── Formulaire ────────────────────────────────────────
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
                width: '100%', maxWidth: '480px', overflow: 'hidden',
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
                    }}>⚖️</div>
                    <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '700' }}>
                       Authentification
                    </h1>
                    <p style={{ margin: '6px 0 0', opacity: 0.85, fontSize: '14px' }}>
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
                        <div style={{ display: 'flex', flexDirection: 'column',
                            gap: '16px', marginBottom: '24px' }}>

                            <Field label="Nom complet *" error={errors.name?.message}>
                                <input {...register('name')}
                                    placeholder=""
                                    style={inputStyle(errors.name)} />
                            </Field>

                            <Field label="Email *" error={errors.email?.message}>
                                <input {...register('email')} type="email"
                                    placeholder=""
                                    style={inputStyle(errors.email)} />
                            </Field>

                            <Field label="Mot de passe *" error={errors.password?.message}>
                                <input {...register('password')} type="password"
                                    placeholder=""
                                    style={inputStyle(errors.password)} />
                            </Field>

                            <Field label="Confirmer le mot de passe *"
                                   error={errors.password_confirmation?.message}>
                                <input {...register('password_confirmation')}
                                    type="password"
                                    placeholder=""
                                    style={inputStyle(errors.password_confirmation)} />
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
                            {loading ? ' Inscription...' : "S'inscrire"}
                        </button>

                        <p style={{ textAlign: 'center', marginTop: '16px',
                            fontSize: '14px', color: '#6b7280' }}>
                            Déjà un compte ?{' '}
                            <a href="/login" style={{ color: '#2563eb', fontWeight: '600' }}>
                                Se connecter
                            </a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}