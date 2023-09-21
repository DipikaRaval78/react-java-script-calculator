import React, { useState } from 'react'


function Display() {
  const [prevAnswer, setPrevAnswer] = useState("");
  const [answer, setAnswer] = useState("0");
  const [operand, setOperand] = useState("");

  const handleOperand = (e) => {
    const value = e.target.value;

    // set operaands inputs
    setOperand(operand => operand + value);
  }

  const handleOperator = (e) => {
    const value = e.target.value;


    if (value === "=") {
      if (operand === "") return;
    }

    // if no value in operand stop 
    if (value === "ac") {
      setOperand("");
      setAnswer(0);

      // Check if we have a prev answer > 0
      if (answer > 0)
        setPrevAnswer(answer);
      return;
    }

    // handle plush and minus sign
    if (value === "pm") {
      if (operand === "") return;
      //get the last char
      let calculated;
      if (Number(operand.slice(-1))) {
        
        calculated = eval(operand);

        if (Math.sign(calculated) < 0) {
          calculated = Math.abs(calculated);
          setOperand(calculated.toString());
        } else {
          setOperand(`-` + calculated.toString());
        }

      } else {
        calculated = (eval(operand.slice(0, -1)));
        if (Math.sign(calculated)) {
          setOperand((`-` + calculated.toString()))
        } else {
          setOperand((calculated.toString()))
        }
      }
      return;
    }


    /* last test for users */
    if (value === "%") {
      if (operand === "") return;
    }

    let newOperand;
    // get last operand value
    if (operand.slice(-1) === value) {
      newOperand = operand.slice(0, -1);
      setOperand(newOperand + value);
    } else {
      // get the last input operator & check if is a number
      if (!Number(operand.slice(-1))) {
        // remove the last selected char
        newOperand = operand.slice(0, -1);

        // checks if the last operand contains a zero
        if (Number(operand.slice(-1)) === 0) {
          setOperand(newOperand + `0` + value); return
        } else {
          setOperand(newOperand + value);
          return;
        }

      } else if (operand.slice(-1) === "ac") {

        setOperand("");
        // Check if we have a prev answer > 0
        if (answer > 0)
          setAnswer(0)
      }
      else if (operand.includes("/")) {
        newOperand = eval(operand);
        setOperand(newOperand);
      }
    }


    // if the last inputed digit is not a number stop
    const lastDigit = operand.slice(-1);
    if (!Number(lastDigit)) return;

    // if Dot(.) exists don't add again
    if (!(operand === "." || operand.includes("."))) {
      setOperand(operand => operand + value);
    }

    // Swicth for some arithmetic operations
    switch (value) {
      case "ac":
        setOperand("");
        break;
      case "+":
        setOperand(eval(operand) + value)
        break;
      case "-":
        setOperand(`${eval(operand)}${value}`)
        break;
      case "*":
        setOperand(`${eval(operand)}${value}`)
        break;
      case "%":
        console.log('percentage + Test for all viewers')
        break;
      case "/":
        setOperand(`${eval(operand)}${value}`);
        break;
      case "=":
        setOperand("");
        setAnswer(eval(operand));
        if (answer > 0)
          setPrevAnswer(answer);
        break;
      default:
        return;
    }

  }

  // Delete last char from operand
  const handleDelete = () => {
    if (operand.length > 0) {
      setOperand(op => op.slice(0, -1));
    }
  }

  return (
    <div className=' mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-1 h-full'>
      <div className=' flex flex-col items-center justify-center w-full gap-2'>

       

        <div className='flex flex-col items-start justify-between w-full px-4 pt-2 pb-4 rounded-xl shadow-xl max-w-[300px] mx-auto bg-glass gap-2'>
          <div className='flex items-end text-primary-content prose-h1:text-xs prose-h1:font-medium gap-1'>
            <i className="fa-solid fa-clock"></i> <span>
              {/* 1,234 */}
              {/* {prevAnswer} */}
            </span> </div>
          <div className='bg-gray-100  text-right w-full rounded-md overflow-hidden mb-4' style={{paddingRight:'0.5rem'}}>
          <div className="mb-2 h-7"> {answer}</div>
          <div  className="text-2xl h-8 font-bold overflow-hidden">{operand ? operand : '0'}</div>
            
             
             
          
          </div>
          <div className='grid grid-cols-4 justify-items-center gap-y-4 w-full'>

          <button type="button" className="clear-operator btn btn-circle btn-error" value="ac" onClick={handleOperator}>ac</button>
          <button type="button" className="operator btn btn-circle btn-info" value="%" onClick={handleOperator}>%</button>
          <button type="button" className="operator btn btn-circle btn-info" value="/" onClick={handleOperator}>/</button>
          <button className="operator btn btn-circle btn-info" value="*" onClick={handleOperator}>x</button>



          <button className="number btn btn-circle btn-secondary" value="7" onClick={handleOperand}>7</button>
          <button className="number btn btn-circle btn-secondary" value="8" onClick={handleOperand}>8</button>
          <button className="number btn btn-circle btn-secondary" value="9" onClick={handleOperand}>9</button>

          <button type="button" className="operator btn btn-circle btn-info" value="-" onClick={handleOperator}>-</button>

          <button className="number btn btn-circle btn-secondary" value="4" onClick={handleOperand}>4</button>
          <button className="number btn btn-circle btn-secondary" value="5" onClick={handleOperand}>5</button>
          <button className="number btn btn-circle btn-secondary" value="6" onClick={handleOperand}>6</button>

          <button type="button" className="operator btn btn-circle btn-info" value="+" onClick={handleOperator}>+</button>

          <button className="number btn btn-circle btn-secondary" value="1" onClick={handleOperand}>1</button>
          <button className="number btn btn-circle btn-secondary" value="2" onClick={handleOperand}>2</button>
          <button className="number btn btn-circle btn-secondary" value="3" onClick={handleOperand}>3</button>

          <button className="equal-operator btn btn-circle row-span-2 h-auto btn-accent" value="=" onClick={handleOperator}>=</button>

          <button className="number btn btn-circle btn-secondary" value="." onClick={handleOperator}>.</button>
          <button className="number btn btn-circle btn-secondary col-span-2 w-11/12" value="0" onClick={handleOperand}>0</button>

{/* <button className='c-reverse' value="rv" onClick={handleDelete}>
  <i className="fa-solid fa-rotate-left"></i>
</button> */}

</div>

        </div>

       

       
         
       
      </div>
    </div >
  )
}

export default Display