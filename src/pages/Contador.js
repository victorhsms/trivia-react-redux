import React from 'react';

const TIME = 1000;

class Contador extends React.Component {
  constructor() {
    super();
    this.state = {
      seconds: 5,
      contador: 0,
    };
  }

  componentDidMount() {
    this.myInterval = setInterval(() => {
      this.setState((prevState) => ({ seconds: prevState.seconds - 1 }));
    }, TIME);
  }

  mais = () => {
    const { contador } = this.state;
    this.setState({ contador: contador + 1 });
  }

  menos = () => {
    const { contador } = this.state;
    this.setState({ contador: contador - 1 });
  }

  render() {
    const { seconds, contador } = this.state;
    return (
      <>
        <h1>Contador</h1>
        <h2>{seconds}</h2>
        <button
          type="button"
          onClick={ () => clearInterval(this.myInterval) }
        >
          STOP
        </button>
        <h1>Contador 2</h1>
        <h2>{contador}</h2>
        <button
          type="button"
          onClick={ this.menos }
        >
          -
        </button>
        <button
          type="button"
          onClick={ this.mais }
        >
          +
        </button>
      </>
    );
  }
}

export default Contador;
