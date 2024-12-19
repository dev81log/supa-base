"use client"

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Curso } from '@/types/curso';
import CursoCard from '@/components/Cursos/CursoCard';
import { useRouter } from 'next/navigation';
import './cursos.css';

function CursosPage() {
  const router = useRouter();
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    // Verifica usuário atual
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUserEmail(session?.user?.email ?? null);
    });

    // Escuta mudanças na autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserEmail(session?.user?.email ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      router.push('/login'); // Redireciona para a página de login
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  useEffect(() => {
    async function fetchCursos() {
      try {
        const { data, error } = await supabase
          .from('cursos')
          .select('*')
          .eq('ativo', true);

        if (error) throw error;
        setCursos(data || []);
      } catch (error) {
        console.error('Erro ao carregar cursos:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchCursos();
  }, []);

  if (loading) {
    return <div className="loading">Carregando cursos...</div>;
  }

  return (
    <div className="cursos-container">
      {userEmail && (
        <div className="user-info">
          <p>Olá, {userEmail}</p>
          <button onClick={handleLogout} className="logout-btn">
            Sair
          </button>
        </div>
      )}
      
      <h1>Nossos Cursos</h1>
      
      <div className="cursos-grid">
        {cursos.map(curso => (
          <CursoCard key={curso.id} curso={curso} />
        ))}
      </div>
    </div>
  );
}

export default CursosPage; 