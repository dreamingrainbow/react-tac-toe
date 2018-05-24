import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board : [[undefined, undefined, undefined],[undefined, undefined, undefined],[undefined, undefined, undefined]],
      score : [0,0],
      turn: Math.floor(Math.random()) ? true : false
    }
  }

  resetScore () {
    this.setState({score:[0,0]});
    this.resetGame();
  }

  resetGame () {        
    for(let i = 0; i < 3; i++ ) { //Row
      for(let j = 0; j < 3; j++) { //Col
        let tag = `img_${i}_${j}`;
        this.refs[tag].src = "//placehold.it/72X72?text=?";                
      }
    }
    this.setState( { 
      board : [
        [undefined, undefined, undefined],
        [undefined, undefined, undefined],
        [undefined, undefined, undefined]
      ], 
      score : [0,0],
      winner: undefined,
      trun : Math.floor(Math.random()) ? true : false 
    });
  }

  resetBoard () {
    for(let i = 0; i < 3; i++ ) { //Row
      for(let j = 0; j < 3; j++) { //Col
        let tag = `img_${i}_${j}`;
        this.refs[tag].src = "//placehold.it/72X72?text=?";                
      }
    }
    this.setState({ board : [[undefined, undefined, undefined],[undefined, undefined, undefined],[undefined, undefined, undefined]], trun : Math.floor(Math.random()) ? true : false, winner:undefined });
  }

  
  renderButtons() {
    return ([<button onClick={this.resetScore.bind(this)} key={0}>Reset Score</button>,
    <button onClick={this.resetBoard.bind(this)} key={1}>Reset Board</button>,
    <button onClick={this.resetGame.bind(this)} key={2}>Reset Game</button>])
  }

  renderScoreBoard() {
      return (<span>X : {this.state.score[0]}  |  O : {this.state.score[1]}</span>);     
  }

  togglePiece(x,y) {
    if(this.state.winner) return null;
    let board = this.state.board;
    if(board[x][y] === undefined){
        board[x][y] = this.state.turn;
    } else {
        return null;
    }
    switch(`${x}_${y}`) {
        case '0_1':
            this.refs.img_0_1.src = this.state.turn ?"//placehold.it/72X72?text=X" : "//placehold.it/72X72?text=O";                
            break;                
        case '0_2':
            this.refs.img_0_2.src = this.state.turn ? "//placehold.it/72X72?text=X" : "//placehold.it/72X72?text=O";
            break;
        case '1_0':
            this.refs.img_1_0.src = this.state.turn ? "//placehold.it/72X72?text=X" : "//placehold.it/72X72?text=O";
            break;
        case '1_1':
            this.refs.img_1_1.src = this.state.turn ? "//placehold.it/72X72?text=X" : "//placehold.it/72X72?text=O";;
            break;                
        case '1_2':
            this.refs.img_1_2.src = this.state.turn ? "//placehold.it/72X72?text=X" : "//placehold.it/72X72?text=O";;
            break;                
        case '2_0':
            this.refs.img_2_0.src = this.state.turn ? "//placehold.it/72X72?text=X" : "//placehold.it/72X72?text=O";;
            break;
        case '2_1':
            this.refs.img_2_1.src = this.state.turn ? "//placehold.it/72X72?text=X" : "//placehold.it/72X72?text=O";;
            break;                
        case '2_2':
            this.refs.img_2_2.src = this.state.turn ? "//placehold.it/72X72?text=X" : "//placehold.it/72X72?text=O";
            break;
        case '0_0':
        default:
            this.refs.img_0_0.src = this.state.turn ? "//placehold.it/72X72?text=X" : "//placehold.it/72X72?text=O";

    }
    let winner = false;
    let setPieces = [];
    board.forEach( (row,i) => {
        let unsetPieces = row.filter(piece => piece === undefined);
        if(!unsetPieces.length){
            setPieces.push(1);
            let xWin = row.filter(piece => { return piece === 1 || piece === true ? true : false});
            let oWin = row.filter(piece => { return piece === 0 || piece === false ? true : false});
            if(xWin.length === 3) {
                winner = "X";
            }
            if(oWin.length === 3) {
                winner = "O";
            }
        }
    });        

    
    if(Number(board[0][0]) === 1 && Number(board[1][1]) === 1 && Number(board[2][2]) === 1) {
        winner = 'X'
    } else if(Number(board[0][0]) === 0 && Number(board[1][1]) === 0 && Number(board[2][2]) === 0 ) {
        winner = 'O'
    } else if(Number(board[0][2]) === 1 && Number(board[1][1]) === 1 && Number(board[2][0]) === 1 ) {
        winner = 'X'
    } else if(Number(board[0][2]) === 0 && Number(board[1][1]) === 0 && Number(board[2][0]) === 0 ) {
        winner = 'O'
    } else if(Number(board[0][0]) === 1 && Number(board[1][0]) === 1 && Number(board[2][0]) === 1 ) {
        winner = 'X'
    } else if(Number(board[0][1]) === 1 && Number(board[1][1]) === 1 && Number(board[2][1]) === 1 ) {
        winner = 'X'
    } else if(Number(board[0][2]) === 1 && Number(board[1][2]) === 1 && Number(board[2][2]) === 1 ) {
        winner = 'X'
    } else if(Number(board[0][0]) === 0 && Number(board[1][0]) === 0 && Number(board[2][0]) === 0 ) {
        winner = 'O'
    } else if(Number(board[0][1]) === 0 && Number(board[1][1]) === 0 && Number(board[2][1]) === 0 ) {
        winner = 'O'
    } else if(Number(board[0][2]) === 0 && Number(board[1][2]) === 0 && Number(board[2][2]) === 0 ) {
        winner = 'O'
    }       
    let xScore = this.state.score[0];
    let oScore = this.state.score[1];
    if(winner){
        if(winner === 'X') {
            xScore++;
        } else {
            oScore++;
        }
    }
    const score = [xScore,oScore];
    this.setState({board, turn : !this.state.turn , winner, score}); 
  }

  renderBoard() {
    let rows = [];
    for(let i = 0; i < 3; i++ ) { //Row
      let col =  [];
      for(let j = 0; j < 3; j++) { //Col
        col.push(<span onClick={this.togglePiece.bind(this, i , j)} key={`${i}_${j}`}>
          <img src="//placehold.it/72X72?text=?" alt="TicTacToe Options" ref={`img_${i}_${j}`} />
        </span>)
      }
      rows.push(<Row className="no-gutters justify-content-center" key={i}>{col}</Row>);
    }
    return(rows);
  }


  render() {
    return (
        <section>
            <Row>
              <Col className="text-center">
                <h2  className="text-primary"> TicTacToe </h2>
                {this.state.winner ? <h3>Game Over!</h3> : null}
                {this.renderScoreBoard()}
                {this.renderBoard()}
                {this.renderButtons()}
              </Col>
            </Row>
        </section>
    );
  }
}

export default App;
