import '@styles/global.scss';
import '@styles/visualizarInfo.scss';

const Forms = () => {
    return (
        <div className="visualizar-informacoes">
            <h1 className="subtitle">Cadastre a Família</h1>
            <p className="description">Cadastre a família.</p>

            <div className="form-control">
                <div className="input-group">
                    <label>Nome:</label>
                    <input type="text" placeholder="Nome" />

                    <label>CPF:</label>
                    <input type="text" placeholder="CPF" />

                    <label>Telefone:</label>
                    <input type="text" placeholder="Telefone" />

                    <label>Motivo do cadastro:</label>
                    <input type="text" placeholder="Motivo do Cadastro" />
                </div>

                <div className="dropdown-button-group">
                    <div className="dropdown-group">
                        <label>Casa Atual</label>
                        <select>
                            <option>Aluguel</option>
                            <option>Casa própria</option>
                            <option>Não possui</option>
                        </select>

                        <label>Quantidade de integrantes na família</label>
                        <select>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>+5</option>
                        </select>
                    </div>
                </div>
            </div>


            <div className="button-group">
                <button type="submit" className="enviar-btn" >Enviar</button>
            </div>
        </div>
    );
};

export default Forms;



