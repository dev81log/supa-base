"use client"

import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import './Login.css';
import ForgotPassword from './ForgotPassword';

const Login = () => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        // Login
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        // Login bem sucedido - redireciona para a página de cursos
        router.push('/cursos');
        
      } else {
        // Cadastro
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              name: name,
            },
          },
        });

        if (error) throw error;

        // Cadastro bem sucedido
        alert('Verifique seu email para confirmar o cadastro!');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>{isLogin ? 'Entrar' : 'Cadastrar'}</h2>
        
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group">
              <input
                type="text"
                placeholder="Nome completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}
          
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button 
            type="submit" 
            className="submit-btn"
            disabled={loading}
          >
            {loading 
              ? (isLogin ? 'Entrando...' : 'Cadastrando...') 
              : (isLogin ? 'Entrar' : 'Cadastrar')
            }
          </button>
        </form>

        <div className="login-footer">
          <p onClick={() => setIsLogin(!isLogin)}>
            {isLogin 
              ? 'Não tem uma conta? Cadastre-se' 
              : 'Já tem uma conta? Entre'}
          </p>
          {isLogin && (
            <p 
              className="forgot-password"
              onClick={() => setShowForgotPassword(true)}
            >
              Esqueceu sua senha?
            </p>
          )}
        </div>
      </div>

      {showForgotPassword && (
        <ForgotPassword 
          onClose={() => setShowForgotPassword(false)}
        />
      )}
    </div>
  );
};

export default Login; 