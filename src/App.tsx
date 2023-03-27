import React from 'react';
interface Param {
    id: number;
    name: string;
    type?: 'string';
}

interface ParamValue {
    paramId: number;
    value: string;
}

interface Model {
    paramValues: ParamValue[];
}

interface Props {
    params: Param[];
    model: Model;
}

interface State {
    model: Model;
}

function App() {
    const params: Param[] = [
        {id: 1, name: "Назначение"},
        {id: 2, name: "Длина"},
    ];

    const model: Model = {
        paramValues: [
            {paramId: 1, value: "повседневное"},
            {paramId: 2, value: "макси"},
        ],
    };
    return <ParamEditor model={model} params={params}/>;

}

class ParamEditor extends React.Component<Props, State> {
    public getModule(e: React.FormEvent<HTMLFormElement>): Model {
        e.preventDefault();
        alert(`${this.state.model.paramValues[0].paramId}: ${this.state.model.paramValues[0].value} \n ${this.state.model.paramValues[1].paramId}: ${this.state.model.paramValues[1].value}`);
        return this.state.model;
    }

    public handleChangeValue(e: React.ChangeEvent<HTMLInputElement>): void {
        this.setState((prevState: State) => {
            const model = prevState.model;
            const id = Number(e.target.name);
            model.paramValues[id - 1].value = e.target.value;
            return {model};
        });
    };

    constructor(props: Props) {
        super(props);
        this.getModule = this.getModule.bind(this);
        this.handleChangeValue = this.handleChangeValue.bind(this);

        this.state = {
            model: this.props.model,
        };
    }


    render() {
        return (
            <form style={{margin: '20px'}} onSubmit={this.getModule}>
                {this.props.params.map((p: { id: number; name: string }) => (
                    <div key={p.id} style={{
                        display: 'flex',
                        margin: '5px'
                    }}>
                        <label style={{fontSize: '24px', width: '150px', textAlign: 'center'}}>{p.name}</label>
                        <input
                            name={`${p.id}`}
                            type='text'
                            value={this.state.model.paramValues[p.id - 1].value}
                            style={{marginLeft: '10px', fontSize: '18px'}}
                            onChange={this.handleChangeValue}
                        />
                    </div>
                ))}
                <button style={{marginLeft: '310px'}}>Get Model</button>
            </form>
        );
    }
}

export default App;
