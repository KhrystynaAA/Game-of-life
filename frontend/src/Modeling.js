import React from 'react';
import Buttons from './Buttons';
import Grid from './Grid';
import LogoutButton from './LogoutButton';


class Modeling  extends React.Component {
    constructor() {
      super();
      this.speed = 100;
      this.rows = 30;
      this.cols = 50;
  
      this.state = {
        generation: 0,
        gridFull: Array(this.rows)
          .fill()
          .map(() => Array(this.cols).fill(false)),
      };
      this.navigateRef = React.createRef();
    }
  
    selectBox = (row, col) => {
      const gridCopy = this.state.gridFull.map((row) => [...row]);
      gridCopy[row][col] = !gridCopy[row][col];
  
      this.setState({
        gridFull: gridCopy,
      });
    };
  
    seed = () => {
      const gridCopy = this.state.gridFull.map((row) => [...row]);
  
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
          if (Math.floor(Math.random() * 4) === 1) {
            gridCopy[i][j] = true;
          }
        }
      }
  
      this.setState({
        gridFull: gridCopy,
      });
    };
  
    playButton = () => {
      clearInterval(this.intervalId);
      this.intervalId = setInterval(this.play, this.speed);
    };
  
    pauseButton = () => {
      clearInterval(this.intervalId);
    };
  
    slow = () => {
      this.speed = 1000;
      this.playButton();
    };
  
    fast = () => {
      this.speed = 100;
      this.playButton();
    };
  
    clear = () => {
      const grid = Array(this.rows)
        .fill()
        .map(() => Array(this.cols).fill(false));
  
      this.setState({
        gridFull: grid,
        generation: 0,
      });
  
      this.pauseButton();
    };
  
    gridSize = (size) => {
      switch (size) {
        case '1':
          this.cols = 20;
          this.rows = 10;
          break;
        case '2':
          this.cols = 50;
          this.rows = 30;
          break;
        case '3':
            this.cols = 70;
            this.rows = 50;
        break;
        case '4':
            this.cols = 120;
            this.rows = 80;
        break;
        default:
          this.cols = 50;
          this.rows = 30;
      }
  
      this.clear();
    };
  
    play = () => {
      const g = this.state.gridFull;
      const g2 = this.state.gridFull.map((row) => [...row]);
    
      let isEmpty = true;

      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
          let count = 0;
  
          if (i > 0) if (g[i - 1][j]) count++;
          if (i > 0 && j > 0) if (g[i - 1][j - 1]) count++;
          if (i > 0 && j < this.cols - 1) if (g[i - 1][j + 1]) count++;
          if (j < this.cols - 1) if (g[i][j + 1]) count++;
          if (j > 0) if (g[i][j - 1]) count++;
          if (i < this.rows - 1) if (g[i + 1][j]) count++;
          if (i < this.rows - 1 && j > 0) if (g[i + 1][j - 1]) count++;
          if (i < this.rows - 1 && j < this.cols - 1)
            if (g[i + 1][j + 1]) count++;
  
          if (g[i][j] && (count < 2 || count > 3)) g2[i][j] = false;
          if (!g[i][j] && count === 3) g2[i][j] = true;

          if (g2[i][j]) {
            isEmpty = false; // Якщо хоча б одна клітина не порожня, оновлення isEmpty на false
          }
        }
      }
  
      this.setState((prevState) => ({
        gridFull: g2,
        generation: prevState.generation + 1,
      }));
      if (isEmpty) {
        clearInterval(this.intervalId); // Якщо сітка порожня, зупинити підрахунок поколінь
      }
    };
    addToad = () => {
        const gridCopy = this.state.gridFull.map((row) => [...row]);
      
        // Генеруємо випадкові координати
        const startRow = Math.floor(Math.random() * (this.rows - 1));
        const startCol = Math.floor(Math.random() * (this.cols - 2));
      
        // Toad pattern
        const toad = [
          [false, true, true, true],
          [true, true, true, false],
        ];
      
        // Перевірка, чи не виходить Toad за межі сітки
        if (
          startRow + toad.length <= this.rows &&
          startCol + toad[0].length <= this.cols
        ) {
          for (let i = 0; i < toad.length; i++) {
            for (let j = 0; j < toad[i].length; j++) {
              if (startRow + i >= 0 && startCol + j >= 0) { // Перевірка, щоб не виходити за нижню ліву межу сітки
                gridCopy[startRow + i][startCol + j] = toad[i][j];
              }
            }
          }
      
          this.setState({
            gridFull: gridCopy,
          });
        }
      };
      
    addGlider = () => {
        const gridCopy = this.state.gridFull.map((row) => [...row]);
      
        // Генеруємо випадкові координати
        const startRow = Math.floor(Math.random() * this.rows);
        const startCol = Math.floor(Math.random() * this.cols);
      
        // Glider pattern
        const glider = [
          [false, true, false],
          [false, false, true],
          [true, true, true],
        ];
      
        // Перевірка, чи не виходить Glider за межі сітки
        if (
          startRow + glider.length <= this.rows &&
          startCol + glider[0].length <= this.cols
        ) {
          for (let i = 0; i < glider.length; i++) {
            for (let j = 0; j < glider[i].length; j++) {
              gridCopy[startRow + i][startCol + j] = glider[i][j];
            }
          }
      
          this.setState({
            gridFull: gridCopy,
          });
        }
      };
      

    addLWSS = () => {
        const gridCopy = this.state.gridFull.map((row) => [...row]);
      
        // Генеруємо випадкові координати
        const startRow = Math.floor(Math.random() * (this.rows - 4)); // Враховуємо розміри LWSS
        const startCol = Math.floor(Math.random() * (this.cols - 5)); // Враховуємо розміри LWSS
      
        // LWSS (Lightweight Spaceship) pattern
        const lwss = [
          [false, true, false, true, true],
          [true, false, false, false, true],
          [true, false, false, false, true],
          [true, true, true, true, false],
        ];
      
        for (let i = 0; i < lwss.length; i++) {
          for (let j = 0; j < lwss[i].length; j++) {
            // Перевіряємо, чи не виходить LWSS за межі поля
            if (startRow + i >= 0 && startRow + i < this.rows && startCol + j >= 0 && startCol + j < this.cols) {
              gridCopy[startRow + i][startCol + j] = lwss[i][j];
            }
          }
        }
      
        this.setState({
          gridFull: gridCopy,
        });
      };
      
      patternNumber = (num) => {
        switch (num) {
          case '1':
            this.addToad();
            break;
          case '2':
            this.addGlider();
            break;
          case '3':
            this.addLWSS();
          break;
          
        }
    };
    render() {
      return (
        <div>
          <h1>The Game of Life</h1>
          <Buttons
            playButton={this.playButton}
            pauseButton={this.pauseButton}
            slow={this.slow}
            fast={this.fast}
            clear={this.clear}
            seed={this.seed}
            gridSize={this.gridSize}
            patternNumber ={this.patternNumber}
            
          />
          
          <Grid
            gridFull={this.state.gridFull}
            rows={this.rows}
            cols={this.cols}
            selectBox={this.selectBox}
          />
          <h2>Generations: {this.state.generation}</h2>
          <LogoutButton />
        </div>
      );
    }
  }
  
  function arrayClone(arr) {
    return JSON.parse(JSON.stringify(arr));
  }
export default Modeling;
