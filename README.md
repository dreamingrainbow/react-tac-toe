# react-tac-toe  Play Online Now https://yjp7w9439x.codesandbox.io/

Checkout the code on codesandbox :

https://codesandbox.io/s/github/dreamingrainbow/react-tac-toe


A simple react tic-tac-toe application.

Let's get started created a react tic tac toe applications.

![alt text][logo]

[logo]:https://github.com/dreamingrainbow/react-tac-toe/blob/master/reacttactoe.png "The react-tac-toe gameboard"


First, thing we need a precheck of all the prerequisits of building our applications. 
  We need our favorite IDE, I'll be using vscode. 
  We will need to have git installed and ready to use
  We also need to have node installed and updated and while we are at it install create-react-app.
  
  Great, now that all that is out of the way lets begin by creating our new react app.
  
    We can start by creating a directory in our workspance and opening vscode. For some of you the process may be a little different but the process is generally the same. 
    
    `create-reate-app react-tac-toe`
    
![alt text][create_react_app]

[create_react_app]:https://github.com/dreamingrainbow/react-tac-toe/blob/master/create_react_tac_toe.png "Create react-tac-toe"




Now, that we have our application base we can add the packages we will need to help us with layout. 

    `cd react-tac-toe`
    
    `npm i bootstrap jquery reactstrap `
    
 lets add our bootstrap to our main file
 
    `cd src`
    
 open the index.js file and lets do a little clean up and our bootstrap css.
    
    we can remove `import './index.css';` since we wont be using it.
 
 in the same index.js file lets add our resources to the application in a global scope. we add the following line right above the `ReactDOM.render`  statement.
    
    `import 'jquery/dist/jquery';`

    `import 'bootstrap/dist/css/bootstrap.css';`

    `import 'bootstrap/dist/css/bootstrap-grid.css';`

    `import 'bootstrap/dist/js/bootstrap';`

Great next, lets save that and open up our App.js file.

  we will start here by cleaning up the unused items.
    
    `import logo from './logo.svg';`
    `import './App.css';`

  while we are cleaning stuff up lets work on our render method, and clean up what its returning.
  
    we remove all of the following :
    ```html
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
      ```

Excellent! Now that everything is cleaned up we can build our board.

    Lets start at the top of the App.js page and add in reactstrap and a few components to make this simple.  We add Container, Row, and Col to help us with our board.
        
    `import { Container, Row, Col } from 'reactstrap';`
    
    Inside our render we can now add our basic layout and our gameboard.
    
    ```html
    <section>
        <Row>
           <Col>
             <h2  className="text-primary"> TicTacToe </h2>
             {this.state.winner ? <h3>Game Over!</h3> : null}
             {this.renderScoreBoard()}
             {this.renderBoard()}
             {this.renderButtons()}
           </Col>
         </Row>
      </section>
      ```

    Now that we have that, we can start creating our method.
    
    We can start with some of the basics like our constructor.
    
    ```JavaScript
      constructor(props) {
        super(props);
        this.state = {
          board : [[undefined, undefined, undefined],[undefined, undefined, undefined],[undefined, undefined, undefined]],
          score : [0,0],
          turn: Math.floor(Math.random()) ? true : false
        }
      }
    ```
    
    Here, we have set the state property of the App class to have a few properties of its own. These include an undefined board, the score keeper, and who's turn it is, which is chosen at random.
    
    The board is comprised of three array's that have three pieces in each row. Each of these items are set to `undefined`.

  Next we can create the resetScore method,
  
  ```JavaScript
    resetScore () {
      this.setState({score:[0,0]});
      this.resetGame();
    }
  ```
    In this method we set the state of the score back to 0, and re call the reset game just to make sure all the pieces are reset as well.
    
    So now we should create or resetGame method so that when our resetScore method is called it works as well.
    
```JavaScript
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
```

    While we are creating our resets lets create a reset board, so we can play multiple games.
    
```JavaScript
  resetBoard () {
      for(let i = 0; i < 3; i++ ) { //Row
        for(let j = 0; j < 3; j++) { //Col
          let tag = `img_${i}_${j}`;
          this.refs[tag].src = "//placehold.it/72X72?text=?";                
        }
      }
      this.setState({ 
          board : [
              [undefined, undefined, undefined],
              [undefined, undefined, undefined],
              [undefined, undefined, undefined]
          ],
          trun : Math.floor(Math.random()) ? true : false,
          winner:undefined
      });
    }
```
    Lets knock out our buttons and score board.
    
```JavaScript
  renderButtons() {
    return ([<button onClick={this.resetScore.bind(this)} key={0}>Reset Score</button>,
    <button onClick={this.resetBoard.bind(this)} key={1}>Reset Board</button>,
    <button onClick={this.resetGame.bind(this)} key={2}>Reset Game</button>])
  }
```
    Score Board
```JavaScript
  renderScoreBoard() {
      return (<span>X : {this.state.score[0]}  |  O : {this.state.score[1]}</span>);     
  }
```

  Last two function are the renderBoard and the togglePiece so lets start with the renderBoard
  
  ```JavaScript
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
        ```

          Now that everything is laid out, and most of the functionality is built we only have one last method.
          The `togglePiece` method will toggle the pieces during game play.

       ```JavaScript
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
```

That should complete the React-Tac-Toe game! Ask your friends to play with you anytime!
 
    
    
