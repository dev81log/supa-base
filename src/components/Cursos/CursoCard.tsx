import Image from 'next/image';
import { Curso } from '@/types/curso';
import './CursoCard.css';

type CursoCardProps = {
  curso: Curso;
}

export default function CursoCard({ curso }: CursoCardProps) {
  const dataFormatada = new Date(curso.data_inicio).toLocaleDateString('pt-BR');
  const precoFormatado = curso.preco.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });

  return (
    <div className="curso-card">
      <div className="curso-imagem">
        <Image 
          src={curso.imagem} 
          alt={curso.nome}
          width={300}
          height={200}
          objectFit="cover"
        />
      </div>
      
      <div className="curso-conteudo">
        <h3>{curso.nome}</h3>
        <p className="curso-descricao">{curso.descricao}</p>
        
        <div className="curso-detalhes">
          <span className="nivel">{curso.nivel}</span>
          <span className="linguagem">{curso.linguagem_principal}</span>
          <span className="duracao">{curso.duracao_horas}h</span>
        </div>

        <div className="curso-footer">
          <div className="curso-info">
            <span className="data">Início: {dataFormatada}</span>
            <span className="preco">{precoFormatado}</span>
          </div>
          <button className="btn-matricula">
            Matricular
          </button>
        </div>
      </div>
    </div>
  );
} 