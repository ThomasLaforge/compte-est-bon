import React, { Component } from 'react';
import './styles/App.scss';
import Game from './components/Game';

interface AppProps {
}
interface AppState {
}

class App extends Component<AppProps, AppState> {

  constructor(props: any){
    super(props)

    this.state = {}
  }

  render() {
    return (
      <div className="App">
        <Game />
      </div>
    );
  }
}

export default App;
