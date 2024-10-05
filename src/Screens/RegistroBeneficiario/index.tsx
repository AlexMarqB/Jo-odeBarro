import { useState } from 'react';
import '@styles/global.scss';
import '@styles/registro.scss';
import { api } from '../../api';
import { useLocation, useNavigate } from 'react-router-dom';
import { z } from 'zod';

const Registro = () => {
    const navigate = useNavigate();

    const location = useLocation();

    const [nomeFamilia, setNomeFamilia] = useState('');
    const [statusFamilia, setStatusFamilia] = useState('');
    const [nomePrincipal, setNomePrincipal] = useState('');
    const [cpf, setCpf] = useState('');
    const [endereco, setEndereco] = useState('');
    const [cep, setCep] = useState('');
    const [rendaMensal, setRendaMensal] = useState('');
    const [telefone1, setTelefone1] = useState('');
    const [telefone2, setTelefone2] = useState('');
    const [comoChegou, setComoChegou] = useState('');
    const [familiarExtras, setFamiliarExtras] = useState('');
    const [dadosImovel, setDadosImovel] = useState('');
    const [necessidadeFamilia, setNecessidadeFamilia] = useState('');

    const createFamilia = async () => {
        if (!nomeFamilia || !statusFamilia || !nomePrincipal || !cpf || !endereco || !cep || !rendaMensal || !telefone1 || !familiarExtras || !dadosImovel || !necessidadeFamilia) {
            alert('Por favor, preencha todos os campos.');
        }
        

        const familiaSchema = z.object({
            nomeFamilia: z.string(),
            statusFamilia: z.string(),
            nomePrincipal: z.string(),
            cpf: z.string().length(11),
            endereco: z.string(),
            cep: z.string().length(8),
            rendaMensal: z.string(),
            telefone1: z.string(),
            telefone2: z.string().optional(),
            comoChegou: z.string().optional(),
            familiarExtras: z.string(),
            dadosImovel: z.string(),
            necessidadeFamilia: z.string(),
        });

        const validationResult = familiaSchema.safeParse({
            nomeFamilia,
            statusFamilia,
            nomePrincipal,
            cpf,
            endereco,
            cep,
            rendaMensal,
            telefone1,
            telefone2,
            comoChegou,
            familiarExtras,
            dadosImovel,
            necessidadeFamilia,
        });

        if (!validationResult.success) {
            alert(validationResult.error.errors.map(err => err.message).join('\n'));
            return;
        }

        const {data} = validationResult

        try {
            await api.post('/familias', data);
            if(location.pathname.includes("dashboard")) {
                navigate('/dashboard/beneficiarios');
            } else {
                navigate('/beneficiarios');
            }
        } catch (err) {
            console.log('Erro durante o registro: ' + err);
        }
    };

    // Resetar form
    const resetForm = () => {
        setNomeFamilia('');
        setStatusFamilia('');
        setNomePrincipal('');
        setCpf('');
        setEndereco('');
        setCep('');
        setRendaMensal('');
        setTelefone1('');
        setTelefone2('');
        setComoChegou('');
        setFamiliarExtras('');
        setDadosImovel('');
        setNecessidadeFamilia('');

        if(location.pathname.includes("dashboard")) {
            navigate('/dashboard/beneficiarios');
        } else {
            navigate('/beneficiarios');
        }
    };

    return (
        <div className="registro">
            <h1 className="subtitle">Registro</h1>
            <p className="description">
                Por favor, preencha os detalhes abaixo para registrar uma família no programa de assistência habitacional.
            </p>
            <div className="form-control">
                <div className="input-group">
                    <label>Nome da Família:</label>
                    <input
                        type="text"
                        placeholder="Nome da Família"
                        value={nomeFamilia}
                        onChange={(e) => setNomeFamilia(e.target.value)}
                    />

                    <label>Nome Principal:</label>
                    <input
                        type="text"
                        placeholder="Nome Principal"
                        value={nomePrincipal}
                        onChange={(e) => setNomePrincipal(e.target.value)}
                    />

                    <label>CPF:</label>
                    <input
                        type="text"
                        placeholder="CPF"
                        value={cpf}
                        onChange={(e) => setCpf(e.target.value)}
                    />

                    <label>Endereço:</label>
                    <input
                        type="text"
                        placeholder="Endereço"
                        value={endereco}
                        onChange={(e) => setEndereco(e.target.value)}
                    />

                    <label>CEP:</label>
                    <input
                        type="text"
                        placeholder="CEP"
                        value={cep}
                        onChange={(e) => setCep(e.target.value)}
                    />

                    <label>Renda Mensal:</label>
                    <input
                        type="text"
                        placeholder="Renda Mensal"
                        value={rendaMensal}
                        onChange={(e) => setRendaMensal(e.target.value)}
                    />

                    <label>Telefone:</label>
                    <input
                        type="text"
                        placeholder="Telefone"
                        value={telefone1}
                        onChange={(e) => setTelefone1(e.target.value)}
                    />

                    <label>Telefone 2:</label>
                    <input
                        type="text"
                        placeholder="Telefone 2"
                        value={telefone2}
                        onChange={(e) => setTelefone2(e.target.value)}
                    />

                    <label>Como chegou ao instituto:</label>
                    <input
                        type="text"
                        placeholder="Como chegou ao instituto"
                        value={comoChegou}
                        onChange={(e) => setComoChegou(e.target.value)}
                    />
                </div>

                <div className="dropdown-button-group">
                    <div className="dropdown-group">
                        <label>Status da Família:</label>
                        <select value={statusFamilia} onChange={(e) => setStatusFamilia(e.target.value)} >
                            <option value="">Selecione uma opção</option>
                            <option value="Aprovado">Aprovado</option>
                            <option value="Negado">Negado</option>
                            <option value="Em análise">Em análise</option>
                        </select>

                        <label>Familiar Extras</label>
                        <select value={familiarExtras} onChange={(e) => setFamiliarExtras(e.target.value)}>
                            <option value="">Selecione uma opção</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5+">5+</option>
                        </select>

                        <label>Dados do imóvel</label>
                        <select value={dadosImovel} onChange={(e) => setDadosImovel(e.target.value)}>
                            <option value="">Selecione uma opção</option>
                            <option value="Casa">Casa</option>
                            <option value="Apartamento">Apartamento</option>
                            <option value="Alugado">Alugado</option>
                            <option value="Outro">Outro</option>
                        </select>

                        <label>Qual a necessidade da família?</label>
                        <select value={necessidadeFamilia} onChange={(e) => setNecessidadeFamilia(e.target.value)}>
                            <option value="">Selecione uma opção</option>
                            <option value="Construção">Construção</option>
                            <option value="Só reforma">Só reforma</option>
                            <option value="Reforma e ampliação">Reforma e ampliação</option>
                            <option value="Doação de materiais de construção">Doação de materiais de construção</option>
                            <option value="Outro">Outro</option>
                        </select>
                    </div>

                    <div className="button-group">
                        <button onClick={createFamilia} className="button confirm-btn">CONFIRMAR</button>
                        <button onClick={resetForm} className="button discard-btn">DESCARTAR</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registro;
