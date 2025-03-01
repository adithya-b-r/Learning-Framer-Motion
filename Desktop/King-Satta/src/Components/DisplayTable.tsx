import { useEffect, useState } from 'react';
import { Game } from '../Pages/Home';

interface DisplayGamesProps {
  gamesData: Game[];
}

export const DisplayTable = ({ gamesData }: DisplayGamesProps) => {
  const [selMonth, setSelMonth] = useState(new Date().getMonth() + 1);
  const [selYear, setSelYear] = useState(new Date().getFullYear());
  const [gameHistory, setGameHistory] = useState<string[][]>([]);

  const years = [];
  const gamesToDisplay = [5, 6, 7, 8];

  for (let i = new Date().getFullYear(); i >= 1995; i--) {
    years.push(i);
  }

  const months = Array.from({ length: 12 }, (_, i) =>
    new Date(2025, i).toLocaleString('en-US', { month: 'long' })
  );

  const fetchGamesData = () => {
    let correctedMonth = selMonth < 10 ? `0${selMonth}` : selMonth;

    if (gamesData.length > 0) {
      setGameHistory([
        gamesData[gamesToDisplay[0]]?.years[selYear]?.[correctedMonth]?.split(",").map(item => item.trim()) || [],
        gamesData[gamesToDisplay[1]]?.years[selYear]?.[correctedMonth]?.split(",").map(item => item.trim()) || [],
        gamesData[gamesToDisplay[2]]?.years[selYear]?.[correctedMonth]?.split(",").map(item => item.trim()) || [],
        gamesData[gamesToDisplay[3]]?.years[selYear]?.[correctedMonth]?.split(",").map(item => item.trim()) || []
      ]);
    }
  };

  const renderRows = () => {
    const rows = [];
    const today = new Date();
    const currentDate = today.getDate();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    for (let i = 0; i < 31; i++) {
      if (selMonth - 1 === currentMonth && currentYear === selYear && i + 1 > currentDate) {
        break;
      }
      rows.push(
        <tr key={i} className={`${i % 2 == 0 ? 'bg-white' : ''} hover:text-red-500 cursor-pointer`}>
          <td className="text-red-500">{String(i + 1).padStart(2, '0')}</td>
          <td>{gameHistory[0]?.[i] || '-'}</td> {/*DSWR */}
          <td>{gameHistory[1]?.[i] || '-'}</td> {/*GALI */}
          <td>{gameHistory[2]?.[i] || '-'}</td> {/*FRBD */}
          <td>{gameHistory[3]?.[i] || '-'}</td> {/*GZBD */}
        </tr>
      );
    }
    return rows;
  };

  const changeMonth = (op: string) => {
    if (op === "increase") {
      if (selMonth === 12) {
        setSelYear(prevYear => prevYear + 1);
        setSelMonth(1);
      } else {
        setSelMonth(prevMonth => prevMonth + 1);
      }
    } else if (op === "decrease") {
      if (selMonth === 1) {
        setSelYear(prevYear => prevYear - 1);
        setSelMonth(12);
      } else {
        setSelMonth(prevMonth => prevMonth - 1);
      }
    }
  };

  const handleUserRange = () => {
    const userYear = document.getElementById('userYearSel') as HTMLInputElement;
    const userMonth = document.getElementById('userMonthSel') as HTMLInputElement;

    setSelYear(parseInt(userYear.value));
    setSelMonth(parseInt(userMonth.value));
  }

  useEffect(() => {
    fetchGamesData();
  }, [gamesData, selMonth, selYear]);

  const today = new Date();
  const isFutureMonth = (selYear > today.getFullYear()) || (selYear === today.getFullYear() && selMonth > today.getMonth() + 1);
  const isDataAvailable = !isFutureMonth && gameHistory.some(dayData => dayData.length > 0);

  return (
    <div id="resultSec" className='flex-col mt-10 text-white items-center justify-center md:w-5/6 mx-auto text-center md:px-5 px-2'>
      <h1 className="gibeMeborder md:py-4 p-1 text-lg tracking-tight rounded-sm" style={{ backgroundColor: "#33CC99" }}>
        Monthly Satta King Result Chart of {months[selMonth - 1]} {selYear} for Gali-2, Desawer-2, Gaziabad-2, and Faridabad-2
      </h1>

      <table className="w-full text-black table-auto border-collapse border border-gray-300">
        <thead>
          <tr className='bg-yellow-400 text-nowrap'>
            <th className="text-red-500">DATE</th>
            <th>DSWR-2</th>
            <th>FRBD-2</th>
            <th>GZBD-2</th>
            <th>GALI-2</th>
          </tr>
        </thead>
        <tbody>
          {isDataAvailable ? (
            renderRows()
          ) : (
            <tr>
              <td colSpan={5} className="text-center py-4 text-red-500">NO RECORDS AVAILABLE</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="w-full flex-col mt-4">
        <div className="flex justify-between w-full">
          <button onClick={() => changeMonth("decrease")} className="gibeMeborder rounded-md bg-blue-600 py-2 px-12 text-lg tracking-tighter text-nowrap">
            {months[(selMonth + 10) % 12].substring(0, 3)} {selMonth === 1 ? selYear - 1 : selYear}
          </button>
          <button onClick={() => changeMonth("increase")} className="gibeMeborder rounded-md bg-blue-600 py-2 px-12 text-lg tracking-tighter text-nowrap">
            {months[selMonth % 12].substring(0, 3)} {selMonth === 12 ? selYear + 1 : selYear}
          </button>
        </div>
        <button onClick={() => { setSelMonth(new Date().getMonth() + 1); setSelYear(new Date().getFullYear()) }} className="gibeMeborder rounded-md bg-blue-600 py-2 px-2 mt-2 text-center text-lg w-full">
          November-2025 Ka Gali-2, Desawar-2, Ghaziabad-2 Aur Faridabad-2 Ka Latest Chart Dekhne Ke Liye Yahan Click Kariye
        </button>
      </div>

      <div className='flex-col text-black w-full mt-5 md:mb-8 mb-2 items-center justify-center mx-auto text-center'>
        <div className="gibeMeborder rounded-md bg-yellow-400 w-full py-2">
          <h3>Yahan Aap Month Aur Year Select Karke Gali-2, Desawar-2, Ghaziabad-2 Aur Faridabad-2 Ka Combined Chart Dekh Sakte Hai.</h3>
          <div className="flex md:flex-row flex-col justify-between md:items-stretch items-center md:mx-8 gap-4 md:gap-8 my-3">
            <select className="md:w-1/3 w-3/4 py-3 px-4 border-2 tracking-wider border-black rounded-md outline-none font-semibold" id="userMonthSel">
              {months.map((month, key) =>
                <option className='checked:bg-yellow-300' key={key} value={`${key + 1}`}>{month}</option>
              )}
            </select>
            <select className="md:w-1/3 w-3/4 py-3 px-4 border-2 tracking-wider border-black rounded-md outline-none font-semibold" id="userYearSel">
              {years.map((year, key) =>
                <option className='checked:bg-yellow-300' key={key} value={`${year}`}>{year}</option>
              )}
            </select>
            <button onClick={handleUserRange} className="md:w-1/3 w-3/4 md:py-2 py-2 bg-blue-600 rounded-md px-12 text-lg text-white">Go</button>
          </div>
        </div>
      </div>
    </div>
  );
};
