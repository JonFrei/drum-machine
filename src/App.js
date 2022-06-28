import { useEffect, useState } from 'react';
import Bank1 from './Bank1.json';
import Bank2 from './Bank2.json';

function App() {

  const [display, setDisplay] = useState('');
  const [BankSelection, setBankSelection] = useState(Bank1);

  useEffect(()=>{
    const keys =['Q','W','E','A','S','D','Z','X','C'];
    document.addEventListener('keydown', (event)=>{
      //console.log("keydown: ", event.key);
      const keyPress = event.key.toUpperCase();
      //console.log(keys.includes(keyPress))
      if(keys.includes(keyPress)){
        //console.log("keyPress: ", keyPress);
        getSound(keyPress);
      }else{
        return;
      }
    });
  });

  const getBankSelection = (event) =>{
    const data = event.target.value;
    console.log("data: ", data);
    let Bank = [];
  
    switch (data) {
      case '1':
        Bank = Bank1;
        console.log("Bank 1 Selected");
        break;
      case '2':
        Bank = Bank2;
        console.log("Bank 2 Selected");
        break;
      default:
        Bank = Bank1;
        console.log("Defaulted");
        break;
    }

    setBankSelection(Bank);
    console.log("Bank: ", Bank);
  }



  const getSound = (selector) =>{
    const audio = document.getElementById(selector);
    audio.currentTime = 0;
    audio.play();

    for (let index = 0; index < BankSelection.length; index++) {
      const element = BankSelection[index];
      //console.log("element: ", element);
      if(element.keySymbol === selector){
        setDisplay(element.name);
      }
      
    }
  }

// {drumpad.name} add this later
  return(
  <div id='container'>
    <div id="drum-machine">

      <div id="btn-container"> 
        {BankSelection.map((drumpad) =>
        <div key={drumpad.url} className='drum-pad' id={drumpad.name} onClick={() => getSound(drumpad.keySymbol)}>
        
          <span>{drumpad.keySymbol}</span>
          <audio src={drumpad.url} className='clip' id={drumpad.keySymbol} />
        </div>    
        )}
      </div>     

      <div id="disp-container" >
        <div id="display" >
          {display}
        </div>

        <div id='bank-container'>
          <div>
            <input type="radio" name="bank-btn" value="1" id='Bank1' defaultChecked onClick={getBankSelection}/>
            <label for="Bank1">Bank 1</label>
          </div>
          <div>
            <input type="radio" name="bank-btn" value="2" id='Bank2' onClick={getBankSelection}/>
            <label for="Bank2">Bank 2</label> 
          </div>
        </div>
      </div>
    </div>
    <button id="GitHub-btn" class="btn btn-primary">
      <a href="https://github.com/JonFrei">View Project on GitHub</a>
    </button>
  </div>
  
  )
}

export default App;
