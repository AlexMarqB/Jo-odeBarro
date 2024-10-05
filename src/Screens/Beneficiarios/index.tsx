import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "@styles/global.scss";
import { api } from "../../api";
import { Familia, Visit } from "../../@types";

export function Beneficiarios() {
  const [activeTab, setActiveTab] = useState<'familias' | 'visitas'>('familias');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const [familias, setFamilias] = useState<Familia[]>([]);
  const [filteredFamilies, setFilteredFamilies] = useState<Familia[]>([]);
  const [visitasData, setVisitasData] = useState<Visit[]>([]);

  const handleTabClick = (tab: 'familias' | 'visitas') => {
    setActiveTab(tab);
    setSearchTerm('');
  };

  const deleteFamilia = async (id: number) => {
    const confirmDelete = window.confirm('Você tem certeza que deseja excluir este item?');
    if (!confirmDelete) return;

    try {
      await api.delete(`/dashboard/familias/${id}`);
      console.log('Item excluído com sucesso!');
      fetchData();
    } catch (err) {
      console.log("Erro ao excluir item: " + err);
    }
  };

  const deleteVisita = async (id: number) => {
    const confirmDelete = window.confirm('Você tem certeza que deseja excluir esta visita?');
    if (!confirmDelete) return;
  
    try {
      await api.delete(`/dashboard/visitas/${id}`);
      console.log('Visita excluída com sucesso!');
      fetchData();
    } catch (err) {
      console.log("Erro ao excluir visita: " + err);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value); // Atualiza o estado do termo de busca

    // Verifica se o campo de busca está vazio
    if (value.trim() === '') {
      setFilteredFamilies(familias); // Se vazio, mostra todas as famílias
    } else {
      // Filtra as famílias conforme o termo de busca
      setFilteredFamilies(familias.filter(item => item.name.toLowerCase().includes(value.toLowerCase())));
    }
  };

  const fetchData = async () => {
    if (activeTab === 'familias') {
      try {
        const response = await api.get("/familias");
        setFamilias(response.data);
        setFilteredFamilies(response.data); // Atualiza o estado com as famílias recebidas
      } catch (err) {
        console.log("Error during fetch: " + err);
      }
    }
    if (activeTab === 'visitas') {
      try {
        const response = await api.get("/visitas");
        setVisitasData(response.data);
      } catch (err) {
        console.log("Error during fetch: " + err);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const renderTableData = () => {
    if (activeTab === 'familias') {
      return filteredFamilies.map((item) => (
        <tr key={item.id}>
          <td>{item.name}</td>
          <td>
            <span>Status: {item.status}</span>
          </td>
          <td>
            <button
              className="table-btn dados-btn"
              onClick={() => navigate(`/dashboard/atualizar/${item.id}`)}
            >
              DADOS
            </button>
            <button onClick={() => deleteFamilia(item.id)} className="table-btn excluir-btn">EXCLUIR</button>
          </td>
        </tr>
      ));
    } else if (activeTab === 'visitas') {
      const filteredVisitas = visitasData.filter(item =>
        item?.nomeFamilia?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    
      return filteredVisitas.map((item) => (
        <tr key={item.id}>
          <td>{item.nomeFamilia}</td>
          <td>
            <span>Relatório: {item.relatorio}</span>
          </td>
          <td>
            <button
              className="table-btn dados-btn"
              onClick={() => navigate(`/dashboard/visitas/${item.id}`)}
            >
              DADOS
            </button>
            <button onClick={() => deleteVisita(item.id)} className="table-btn excluir-btn">EXCLUIR</button>
          </td>
        </tr>
      ));
    }

    return null;
  };
  
  return (
    <div className="beneficiarios-page">
      <div className="dashboard-header">
        <div className="left-section">
          <h1 className="subtitle">Dashboard</h1>
          <p className="description">
            Visualize e gerencie as famílias cadastradas no programa de assistência habitacional.
          </p>
        </div>
        <div className="search-section">
          <input
            type="text"
            className="search-bar"
            placeholder="Buscar Família"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <div className="buttons">
            <button className="btn registrar-btn" onClick={() => navigate('/dashboard/registro')}>Registrar Família</button>
            {activeTab === 'visitas' && (
              <button className="btn enviar-btn" onClick={() => navigate('/dashboard/registroVisita')}>Adicionar Visita</button>
            )}
            {activeTab === 'familias' && (
              <button className="btn enviar-btn" onClick={() => {}}>
                Enviar Para Assembleia
              </button>
            )}
          </div>
        </div>
      </div>
  
      <div className="tabs">
        <button className={`tab-btn ${activeTab === 'familias' ? 'active' : ''}`} onClick={() => handleTabClick('familias')}>Famílias</button>
        <button className={`tab-btn ${activeTab === 'visitas' ? 'active' : ''}`} onClick={() => handleTabClick('visitas')}>Visitas</button>
      </div>
  
      <div className="table-container">
        <table className="familias-table">
          <tbody>
            {renderTableData()}
          </tbody>
        </table>
      </div>
    </div>
  );
}
