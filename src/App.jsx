
import React, { useEffect, useState } from 'react';
import './App.css';
import DrawGrid from './DrawGrid';

function App() {
  const [numSeatsRequired, setNumSeatsRequired] = useState(0);
  const [bookedSeats, setBookedSeats] = useState([]);

  const handleInputChange = (event) => {
    const value = parseInt(event.target.value);
    setNumSeatsRequired(value);
  };

  const refreshTable = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/refreshSeats', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        alert('Booking failed. Please try again.');
      }
    } catch (error) {
      alert('Booking failed. Please try again.');
    }
  };

  const bookSeats = async () => {
    if (numSeatsRequired < 1 || numSeatsRequired > 7) {
      alert('Invalid number of seats. Please enter a number between 1 and 7.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5001/api/bookSeats', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ numSeatsRequired }),
      });

      if (!response.ok) {
        alert('Booking failed. Please try again.');
      } else {
        const data = await response.json();
        const bookedSeatLabels = data.seat.map((seat) => {
          // const row = String.fromCharCode(97 + seat.row);
          // const col = seat.col + 1;
          return seat;
        });
      
        const bookedSeatsMessage = `Booked seats: ${bookedSeatLabels.join(', ')}`;
      
        // Show an alert with the booked seats information
        alert(bookedSeatsMessage);
        setBookedSeats(data.updatedArr);
      }
    } catch (error) {
      console.log(error);
      alert('Booking failed. Please try again.');
    }
  };

  const [button, clickButton] = useState(0);
  const arr = [];
  for (let i = 0; i < 12; i++) {
    const row = [];

    if (i === 11) {
      for (let j = 0; j < 7; j++) {
        if (j >= 3) {
          row.push('*');
        } else {
          row.push(' ');
        }
      }
    } else {
      for (let j = 0; j < 7; j++) {
        row.push(' '); // You can initialize with any default value you want
      }
    }

    arr.push(row);
  }

  const [display, setDisplay] = useState(arr);

  useEffect(() => {

    
    async function fetchData() {
      try {
        let response = await fetch('http://localhost:5001/api/getData', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        let temp = await response.json();

        setDisplay(temp.Arr);

        if (!response.ok) {
          alert('Booking failed. Please try again.');
        }
      } catch (error) {
        alert('Booking failed. Please try again.');
      }
    }

    fetchData();

    return () => {
      // This code will run when the component unmounts
    };
  }, [display]);

  return (
    <div className="App">
      <header className="App-header">
        <div className="booking-form">
          <input type="number" value={numSeatsRequired} onChange={handleInputChange} />

          <button className="Book-Seats" onClick={() => { bookSeats(); clickButton(button + 1); }}>Book Seats</button>
          <button onClick={refreshTable}>Refresh</button>
        </div>
      </header>
      {/* {console.log(display)}; */}
      <DrawGrid seat={display} />
    </div>
  );
}

export default App;
