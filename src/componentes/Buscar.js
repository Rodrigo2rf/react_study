import React, { Component } from 'react';

class Buscar extends Component{

    constructor(props){
        super(props);

        this.inputRepositorio   = React.createRef();
        this.Enviar             = this.Enviar.bind(this);
        this.showMore           = this.showMore.bind(this);
        this.state = {
            list: [],
            rowsToShow: 5
        }

    }

    Enviar(e){
        e.preventDefault();
        fetch('https://api.github.com/search/repositories?q='+this.inputRepositorio.current.value)
            .then( response => response.json() )
            .then( data => {
                this.setState({
                    list: data.items
                })
            });
    }

    showMore(e){
        e.preventDefault();
        this.setState({
            rowsToShow: this.state.rowsToShow+=5
        })
    }

    render(){
        const { state } = this;
        return (<div>
                <form onSubmit={this.Enviar}>
                    <label>Buscar Projeto</label><br/>
                    <input type="text" name="repositorio" ref={this.inputRepositorio}></input><br/>
                    <button type="submit">Buscar</button>
                    <ul>
                        {state.list.slice(0,state.rowsToShow).map((item, i) => <li key={i}>{item.name}<br/>{item.description}</li>)}
                    </ul>
                    <a onClick={this.showMore}>show more</a>
                </form>
                
            </div>
        );
        
    }
}

export default Buscar;