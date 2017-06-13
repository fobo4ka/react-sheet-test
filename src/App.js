import React, { Component } from 'react';
import Input from './Input';
import './App.css';

class App extends Component {
    state = {
        mask: '| (|||) |||-||-||'
    }

    render() {
        return (
          <div className="App-root">
            <Input mask={this.state.mask} labelText={'Поле ввода'}/>
          </div>
        );
    }
}

export default App;
