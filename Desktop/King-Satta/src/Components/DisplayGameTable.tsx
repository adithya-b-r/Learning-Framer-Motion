import { useEffect, useState } from 'react';
import { Game } from '../Pages/Home';

interface DisplayGamesProps {
  gamesData: Game[];
  gameIndex: number;
}

export const DisplayGameTable = ({ gamesData, gameIndex }: DisplayGamesProps) => {
  const [selMonth, setSelMonth] = useState(new Date().getMonth() + 1);
  const [selYear, setSelYear] = useState(new Date().getFullYear());
  const [gameHistory, setGameHistory] = useState<string[][]>([]);
  const [selGameName, setSelGameName] = useState<string>("");
  const [toggleDisplay, setToggleDisplay] = useState<boolean>(false);

  // const gamesToDisplay = [5, 6, 7, 8];

  const months = Array.from({ length: 12 }, (_, i) =>
    new Date(2025, i).toLocaleString('en-US', { month: 'long' })
  );

  const fetchGamesData = () => {
    let correctedMonth = selMonth < 10 ? `0${selMonth}` : selMonth;

    if (gamesData.length > 0) {
      if (gameIndex > 8 || gameIndex < 5 && gameIndex != -1) {
        setSelGameName(gamesData[gameIndex]?.name || "");
        setToggleDisplay(true);
      } else {
        setSelGameName("");
        setToggleDisplay(false);
      }

      const history = gamesData.slice(0, (gamesData.length - 1)).map((game) =>
        game.years[selYear]?.[correctedMonth]?.split(",").map(item => item.trim()) || []
      );

      if (gameIndex > 3) {
        const additionalGameData = gamesData[gameIndex]?.years[selYear]?.[correctedMonth]?.split(",").map(item => item.trim()) || [];
        history.push(additionalGameData);
      }

      setGameHistory(history);
    }
  };

  const renderTH = () => {
    return (
      <tr className='bg-yellow-400'>
        <th className="text-red-500">DATE</th>
        {/* <th className='text-nowrap'>DSWR-2</th>
        <th className='text-nowrap'>GALI-2</th>
        <th className='text-nowrap'>FRBD-2</th>
        <th className='text-nowrap'>GZBD-2</th> */}
        <th>{selGameName}</th>
      </tr>
    );
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
        <tr key={i} className={`${i % 2 === 0 ? 'bg-white' : ''} hover:text-red-500 cursor-pointer`}>
          <td className="text-red-500">{String(i + 1).padStart(2, '0')}</td>
          {/* <td>{gameHistory[gamesToDisplay[0]]?.[i] || '-'}</td> */}
          {/* <td>{gameHistory[gamesToDisplay[1]]?.[i] || '-'}</td> */}
          {/* <td>{gameHistory[gamesToDisplay[2]]?.[i] || '-'}</td> */}
          {/* <td>{gameHistory[gamesToDisplay[3]]?.[i] || '-'}</td> */}
          <td>{gameHistory[gameIndex]?.[i] || '-'}</td>
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

  useEffect(() => {
    fetchGamesData();
  }, [gamesData, selMonth, selYear, gameIndex]);

  const today = new Date();
  const isFutureMonth = (selYear > today.getFullYear()) || (selYear === today.getFullYear() && selMonth > today.getMonth() + 1);
  const isDataAvailable = !isFutureMonth && gameHistory.some(dayData => dayData.length > 0);

  return (
    <div id="upperTable" className={`${toggleDisplay ? 'flex-col' : 'hidden'} mt-10 text-white items-center justify-center md:w-5/6 mx-auto text-center md:px-5 px-2`}>
      <h1 className="md:py-4 py-1 text-lg tracking-tighter rounded-sm" style={{ backgroundColor: "#33CC99" }}>
        Satta King Result Chart of {months[selMonth - 1]} {selYear} for {/*Gali-2, Desawer-2, Gaziabad-2, Faridabad-2 and*/} {selGameName}
      </h1>

      <table className="w-full text-black table-auto border-collapse border border-gray-300">
        <thead>
          {renderTH()}
        </thead>
        <tbody>
          {isDataAvailable ? (
            renderRows()
          ) : (
            <tr>
              <td colSpan={6} className="text-center py-4 text-red-500">NO RECORDS AVAILABLE</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="w-full flex-col mt-4">
        <div className="flex justify-between w-full">
          <button onClick={() => changeMonth("decrease")} className="bg-blue-600 py-2 px-12 text-lg">
            {months[(selMonth + 10) % 12].substring(0, 3)} {selMonth === 1 ? selYear - 1 : selYear}
          </button>
          <button onClick={() => changeMonth("increase")} className="bg-blue-600 py-2 px-12 text-lg">
            {months[selMonth % 12].substring(0, 3)} {selMonth === 12 ? selYear + 1 : selYear}
          </button>
        </div>
      </div>
    </div>
  );
};