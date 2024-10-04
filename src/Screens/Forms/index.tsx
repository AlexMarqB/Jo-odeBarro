import '@styles/global.scss';
import '@styles/visualizarInfo.scss';

const Forms = () => {
    return (
        <div className="visualizar-informacoes">
            <h1 className="subtitle">Cadastre a Família</h1>
            <p className="description">Cadastre a família.</p>

            <div className="form-control">
                <div className="input-group">
                    <label>Nome da Família:</label>
                    <input type="text" placeholder="Nome da Família" />

                    <label>Campo 2:</label>
                    <input type="text" placeholder="Campo 2" />

                    <label>Campo 3:</label>
                    <input type="text" placeholder="Campo 3" />
                </div>

                <div className="dropdown-button-group">
                    <div className="dropdown-group">
                        <label>Dropdown 1</label>
                        <select>
                            <option>Option 1</option>
                            <option>Option 2</option>
                            <option>Option 3</option>
                        </select>

                        <label>Dropdown 2</label>
                        <select>
                            <option>Option 1</option>
                            <option>Option 2</option>
                            <option>Option 3</option>
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



