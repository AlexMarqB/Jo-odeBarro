import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '@styles/global.scss';
import '@styles/atualizarInformacoesVisitas.scss';
import { api } from '../../api';

const AtualizarInformacoesVisitas = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [nomeFamilia, setNomeFamilia] = useState('');
    const [relatorio, setRelatorio] = useState('');
    const [dropdown1, setDropdown1] = useState('');
    const [imagem, setImagem] = useState(null);

    useEffect(() => {
        const fetchVisita = async () => {
            try {
                const response = await api.get(`/visitas/${id}`);
                const visita = response.data;
                
                setNomeFamilia(visita.nomeFamilia);
                setRelatorio(visita.relatorio);
                setDropdown1(visita.dropdown1);
            } catch (err) {
                console.log('Erro ao buscar visita: ' + err);
            }
        };

        fetchVisita();
    }, [id]);

    const handleUpdate = async () => {
        const data = {
            nomeFamilia,
            relatorio,
            dropdown1,
            imagem,
        };

        try {
            await api.put(`/visitas/${id}`, data);
            navigate('/beneficiarios'); 
        } catch (err) {
            console.log('Erro ao atualizar visita: ' + err);
        }
    };

    const handleDiscard = () => {
        navigate('/beneficiarios');
    };

    return (
        <div className="atualizar-informacoes-visitas">
            <h1 className="subtitle">Atualizar Informações da Visita</h1>
            <p className="description">
                Preencha os campos abaixo para atualizar as informações da visita.
            </p>
            <div className="form-control">
                <div className='input-group'>
                    <label>Nome da Família:</label>
                    <input
                        type="text"
                        placeholder="Nome da Família"
                        value={nomeFamilia}
                        onChange={(e) => setNomeFamilia(e.target.value)}
                    />

                    <label>Relatório:</label>
                    <textarea
                        placeholder="Digite seu relatório aqui..."
                        rows={5}
                        style={{ width: '100%' }}
                        value={relatorio}
                        onChange={(e) => setRelatorio(e.target.value)}
                    />
                </div>

                <div className='dropdown-button-group'>
                    <div className="dropdown-group">
                        <label>Dropdown 1</label>
                        <select value={dropdown1} onChange={(e) => setDropdown1(e.target.value)}>
                            <option value="">Selecione uma opção</option>
                            <option value="Option 1">Option 1</option>
                            <option value="Option 2">Option 2</option>
                            <option value="Option 3">Option 3</option>
                        </select>
                    </div>

                    <div className="upload-group">
                        <label className="upload-label">Arraste para inserir imagens</label>
                        <div className="upload-area">
                            <input
                                type="file"
                                accept="image/*"
                                className="file-input"
                            />
                            <span className="file-button">Escolher Arquivo</span>
                        </div>
                    </div>

                    <div className="button-group">
                        <button onClick={handleUpdate} className="button confirm-btn">CONFIRMAR</button>
                        <button onClick={handleDiscard} className="button discard-btn">DESCARTAR</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AtualizarInformacoesVisitas;
