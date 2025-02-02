import { useState } from 'react';
import '@styles/global.scss';
import '@styles/registroVisita.scss';
import { api } from '../../api';
import { useNavigate } from 'react-router-dom';

const RegistroVisita = () => {
    const navigate = useNavigate();

    const [nomeBeneficiario, setNomeBeneficiario] = useState(''); 
    const [nomeVoluntarios, setNomeVoluntarios] = useState(''); 
    const [relatorio, setRelatorio] = useState('');
    const [dropdown1, setDropdown1] = useState('');
    const [imagem, setImagem] = useState(null);

    const createVisita = async () => {
        if (!nomeBeneficiario || !relatorio || !dropdown1) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        const data = {
            nomeFamilia: nomeBeneficiario,
            relatorio,
            dropdown1,
            imagem,
            nomeVoluntarios
        };

        try {
            await api.post('/visitas', data);
            navigate('/beneficiarios');
        } catch (err) {
            console.log('Erro durante o registro: ' + err);
        }
    };

    const resetForm = () => {
        setNomeBeneficiario('');
        setNomeVoluntarios('');
        setRelatorio('');
        setDropdown1('');
        setImagem(null);
    };

    return (
        <div className="registro-visita">
            <h1 className="subtitle">Registro de Visita</h1>
            <p className="description">
                Preencha os campos abaixo para registrar uma visita.
            </p>
            <div className="form-control">
                <div className="input-group">
                    <label>Nome Principal do Beneficiário:</label>
                    <input
                        type="text"
                        placeholder="Nome do Beneficiário"
                        value={nomeBeneficiario}
                        onChange={(e) => setNomeBeneficiario(e.target.value)}
                    />

                    <label>Nome dos Voluntários:</label>
                    <input
                        type="text"
                        placeholder="Nome dos Voluntários"
                        value={nomeVoluntarios}
                        onChange={(e) => setNomeVoluntarios(e.target.value)}
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

                <div className="dropdown-button-group">
                    <div className="dropdown-group">
                        <label>Data da Visita</label>
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
                        <button onClick={createVisita} className="button confirm-btn">CONFIRMAR</button>
                        <button onClick={resetForm} className="button discard-btn">DESCARTAR</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegistroVisita;
