"use client"

import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import './ForgotPassword.css';

const ForgotPassword = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;
      
      setMessage('Email de recuperação enviado com sucesso! Verifique sua caixa de entrada.');
      setTimeout(() => {
        onClose();
      }, 3000);
    } catch (error) {
      console.error('Erro:', error);
      setMessage(error.message || 'Erro ao enviar email. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={(e) => {
      if (e.target === e.currentTarget) onClose();
    }}>
      <div className="modal-content">
        <button 
          className="close-button" 
          onClick={onClose}
          aria-label="Fechar"
        >
          ×
        </button>
        
        <h3>Recuperar Senha</h3>
        <p className="modal-description">
          Digite seu email para receber as instruções de recuperação de senha.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
              aria-label="Email"
            />
          </div>

          <button 
            type="submit" 
            className="submit-btn"
            disabled={isLoading}
          >
            {isLoading ? 'Enviando...' : 'Enviar'}
          </button>

          {message && (
            <p className={`message ${message.includes('sucesso') ? 'success' : 'error'}`}>
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword; 