import '@styles/global.scss';
import '@styles/atualizarInformacoes.scss';
import { api } from '../../api';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';

function isAxiosError(error: unknown): error is AxiosError {
    return (error as AxiosError).isAxiosError !== undefined;
}
const AtualizarInformacoes = () => {
    const { familiaId } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [status, setStatus] = useState("");
    const [nomePrincipal, setNomePrincipal] = useState("");
    const [cpf, setCpf] = useState("");
    const [endereco, setEndereco] = useState("");
    const [cep, setCep] = useState("");
    const [renda, setRenda] = useState("");
    const [telefone, setTelefone] = useState("");
    const [telefone2, setTelefone2] = useState("");
    const [comoChegou, setComoChegou] = useState("");
    const [familiarExtras, setFamiliarExtras] = useState("");
    const [dadosImovel, setDadosImovel] = useState("");
    const [necessidadeFamilia, setNecessidadeFamilia] = useState("");

    useEffect(() => {
        const fetchFamilia = async () => {
            try {
                const response = await api.get(`/familias/${familiaId}`);
                const familia = response.data;

                setName(familia.name || "");
                setStatus(familia.status || "");
                setNomePrincipal(familia.nomePrincipal || "");
                setCpf(familia.cpf || "");
                setEndereco(familia.endereco || "");
                setCep(familia.cep || "");
                setRenda(familia.renda || "");
                setTelefone(familia.telefone || "");
                setTelefone2(familia.telefone2 || "");
                setComoChegou(familia.comoChegou || "");
                setFamiliarExtras(familia.familiarExtras || "");
                setDadosImovel(familia.dadosImovel || "");
                setNecessidadeFamilia(familia.necessidadeFamilia || "");
            } catch (err) {
                if (isAxiosError(err)) {
                    if (err.response?.status === 404) {
                        console.error("Family data not found (404): Invalid familiaId.");
                    } else {
                        console.error(`Error fetching family data: ${err.response?.status} - ${err.message}`);
                    }
                } else {
                    console.error("Unknown error occurred: ", err);
                }
            }
        };

        fetchFamilia();
    }, [familiaId]);


    const atualizarFamilia = async () => {
        if (!name || !status || !nomePrincipal || !cpf || !endereco || !cep || !renda || !telefone || !telefone2 || !comoChegou || !familiarExtras || !dadosImovel || !necessidadeFamilia) {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        const data = {
            name,
            status,
            nomePrincipal,
            cpf,
            endereco,
            cep,
            renda,
            telefone,
            telefone2,
            comoChegou,
            familiarExtras,
            dadosImovel,
            necessidadeFamilia,
        };

        try {
            await api.put(`/familias/${familiaId}`, data);
            console.log("Family updated successfully!");

            navigate('/beneficiarios');
        } catch (err) {
            console.error("Error during update: " + err);
        }
    };

    const resetForm = () => {
        setName("");
        setStatus("");
        setNomePrincipal("");
        setCpf("");
        setEndereco("");
        setCep("");
        setRenda("");
        setTelefone("");
        setTelefone2("");
        setComoChegou("");
        setFamiliarExtras("");
        setDadosImovel("");
        setNecessidadeFamilia("");
        navigate('/beneficiarios');
    };

    return (
        <div className="atualizar-informacoes">
            <h1 className="subtitle">Atualizar Informações da Família</h1>
            <p className="description">
                Preencha os campos abaixo para atualizar as informações da família.
            </p>
            <div className="form-control">
                <div className='input-group'>
                    <label>Nome da Família:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nome da Família"
                    />
                    
                    <label>Nome Principal:</label>
                    <input
                        type="text"
                        value={nomePrincipal}
                        onChange={(e) => setNomePrincipal(e.target.value)}
                        placeholder="Nome Principal"
                    />

                    <label>CPF:</label>
                    <input
                        type="text"
                        value={cpf}
                        onChange={(e) => setCpf(e.target.value)}
                        placeholder="CPF"
                    />

                    <label>Endereço:</label>
                    <input
                        type="text"
                        value={endereco}
                        onChange={(e) => setEndereco(e.target.value)}
                        placeholder="Endereço"
                    />

                    <label>CEP:</label>
                    <input
                        type="text"
                        value={cep}
                        onChange={(e) => setCep(e.target.value)}
                        placeholder="CEP"
                    />

                    <label>Renda Mensal:</label>
                    <input
                        type="text"
                        value={renda}
                        onChange={(e) => setRenda(e.target.value)}
                        placeholder="Renda Mensal"
                    />

                    <label>Telefone:</label>
                    <input
                        type="text"
                        value={telefone}
                        onChange={(e) => setTelefone(e.target.value)}
                        placeholder="Telefone"
                    />

                    <label>Telefone 2:</label>
                    <input
                        type="text"
                        value={telefone2}
                        onChange={(e) => setTelefone2(e.target.value)}
                        placeholder="Telefone 2"
                    />

                    <label>Como chegou ao instituto:</label>
                    <input
                        type="text"
                        value={comoChegou}
                        onChange={(e) => setComoChegou(e.target.value)}
                        placeholder="Como chegou ao instituto"
                    />
                </div>

                <div className='dropdown-button-group'>
                    <div className="dropdown-group">

                        <label>Status da Família:</label>
                        <select value={status} onChange={(e) => setStatus(e.target.value)} >
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

                        <label>Necessidade da Família</label>
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
                        <button className="button confirm-btn" onClick={atualizarFamilia}>CONFIRMAR</button>
                        <button className="button discard-btn" onClick={resetForm}>DESCARTAR</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AtualizarInformacoes;
