import { useEffect, useState } from 'react';
import { Convert24To12 } from '../../util/Convert24To12';
import { Game } from '../Pages/Home'
import { DisplayGameTable } from './DisplayGameTable';

interface DisplayGamesProps {
  gamesData: Game[];
}

export const DisplayGames = ({ gamesData }: DisplayGamesProps) => {
  const [currentDate, setCurrentDate] = useState<string>("");

  const [today, setToday] = useState<string>("");
  const [yesterday, setYesterday] = useState<string>("");
  const [currentGame, setCurrentGame] = useState<number>(-1);

  useEffect(() => {
    const today = new Date();
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: '2-digit'
    };
    const formattedDate = new Intl.DateTimeFormat('en-IN', options).format(today);

    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const formattedYesterday = new Intl.DateTimeFormat('en-IN', options).format(yesterday);

    const modifiedToday = formattedDate.split(' ');
    const modifiedYesterday = formattedYesterday.split(' ');

    const combinedDate = `${modifiedToday[1]} ${modifiedToday[0]}, ${modifiedToday[2]} & ${modifiedYesterday[1]} ${modifiedYesterday[0]}, ${modifiedYesterday[2]}`;
    setCurrentDate(combinedDate);

    formatWithSuffix();
  }, []);

  const formatWithSuffix = (): void => {
    const todayVal: Date = new Date();
    const yesterday: Date = new Date(todayVal);
    yesterday.setDate(todayVal.getDate() - 1);

    const todayDay: number = todayVal.getDate();
    const yesterdayDay: number = yesterday.getDate();

    const todayWeekday: string = todayVal.toLocaleString('en-IN', { weekday: 'short' });
    const yesterdayWeekday: string = yesterday.toLocaleString('en-IN', { weekday: 'short' });

    const getTodaySuffix = (day: number): string => {
      if (day >= 11 && day <= 13) return 'th';
      switch (day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
      }
    };

    const todaySuffix: string = getTodaySuffix(todayDay);
    const yesterdaySuffix: string = getTodaySuffix(yesterdayDay);

    setToday(`${todayWeekday}. ${todayDay}${todaySuffix}`);
    setYesterday(`${yesterdayWeekday}. ${yesterdayDay}${yesterdaySuffix}`);
  };

  const scrollPage = () => {
    const element = document.getElementById("meow");
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
      });
    }
  };

  const scrollToResult = () => {
    const element = document.getElementById("resultSec");
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
      });
    }
  };

  const scrollToUpperTable = () => {
    const element = document.getElementById("upperTable");
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
      });
    }
  };

  return (
    <div>
      <div className="flex-col text-white items-center justify-center md:w-5/6 mx-auto text-center md:px-5 px-2">
        <h1 className="gibeMeborder md:py-4 py-1 text-xl rounded-sm" style={{ backgroundColor: "#33CC99" }}>
          Satta King Fast Results of {currentDate}
        </h1>
        <div className="gibeMeborder md:h-10 h-14 md:px-4 px-2 flex w-full items-center" style={{ backgroundColor: "#424242" }}>
          <div className="flex md:w-3/4 w-2/3 text-lg">
            <p>Games List</p>
          </div>
          <div className="flex md:w-1/4 w-1/3 h-full text-lg items-center justify-between">
            <p className="px-2 text-center">{yesterday}</p>
            <p className="text-center md:pl-0 pl-2">{today}</p>
          </div>
        </div>

        {gamesData.map((game, key) => {
          let todayDate = (new Date()).getDate() - 1;
          let todayMonth = (new Date()).getMonth() + 1;
          let todayYear = (new Date()).getFullYear();

          let correctedMonth = todayMonth < 10 ? `0${todayMonth}` : todayMonth;

          let gameResults = game.years[todayYear][correctedMonth].split(",");

          let todayResult = gameResults[todayDate] || "XX";
          let yesterdayResult = gameResults[todayDate - 1] || "XX";

          if (game.banner === "true") {
            return (
              <div onClick={scrollPage} key={key} className="gibeMeborder md:h-10 h-14 md:px-4 md:py-8 px-2 flex w-full items-center bg-white hover:bg-gray-100 text-black">
                <div className="flex-col justify-start items-start md:w-3/4 w-2/3 text-lg">
                  <p className="w-fit">{game.name}</p>
                  <p className="w-fit text-sm">at {Convert24To12(game.time)} <span className="ml-1 text-blue-600 cursor-pointer">Record Chart</span></p>
                </div>
                <div className="flex md:w-1/4 w-1/3 h-full text-lg items-center justify-around">
                  <p className="px-2 text-center text-2xl">{yesterdayResult}</p>
                  <p className="text-center md:pl-0 pl-2 text-2xl">{todayResult}</p>
                </div>
              </div>
            );
          }
          return null;
        })}

        <div className="gibeMeborder md:h-10 h-14 md:px-4 px-2 flex w-full items-center" style={{ backgroundColor: "#424242" }}>
          <div onClick={scrollPage} className="w-full text-lg text-center cursor-pointer">
            <p>Click here for more games results.</p>
          </div>
        </div>
      </div>

      {/* To be displayed Here */}
      <DisplayGameTable gamesData={gamesData}  gameIndex={currentGame}/>

      <div id="meow" className="flex-col text-white items-center justify-center md:w-5/6 mx-auto text-center m-8 md:px-5 px-2">
        <h1 className="gibeMeborder md:py-4 py-1 px-1 tracking-tight text-xl rounded-sm" style={{ backgroundColor: "#33CC99" }}>
          Timewise Superfast Satta King Results of {currentDate}
        </h1>
        <div className="gibeMeborder md:h-10 h-14 md:px-4 px-2 flex w-full items-center" style={{ backgroundColor: "#424242" }}>
          <div className="flex md:w-3/4 w-2/3 text-lg">
            <p>Games List</p>
          </div>
          <div className="flex md:w-1/4 w-1/3 h-full text-lg items-center justify-between">
            <p className="px-2 text-center">{yesterday}</p>
            <p className="text-center md:pl-0 pl-2">{today}</p>
          </div>
        </div>

        {gamesData.map((game, key) => {
          let todayDate = (new Date()).getDate() - 1;
          let todayMonth = (new Date()).getMonth() + 1;
          let todayYear = (new Date()).getFullYear();

          let correctedMonth = todayMonth < 10 ? `0${todayMonth}` : todayMonth;

          let gameResults = game.years[todayYear][correctedMonth].split(",");

          let todayResult = gameResults[todayDate] || "XX";
          let yesterdayResult = gameResults[todayDate - 1] || "XX";

          return (
            <div key={key} className={`gibeMeborder md:h-10 h-14 md:px-4 md:py-8 px-2 flex w-full items-center ${game.banner == "true" ? 'bg-yellow-400 hover:bg-yellow-500' : 'bg-white hover:bg-gray-100'} text-black`}>
              <div className="flex-col justify-start items-start md:w-3/4 w-2/3 text-lg">
                <p className="w-fit">{game.name}</p>
                <p className="w-fit text-sm">at {Convert24To12(game.time)} <span onClick={() => (key >= 5 && key <= 8) ? (setCurrentGame(key), scrollToResult()) : (setCurrentGame(key), scrollToUpperTable())} className="ml-1 text-blue-600 cursor-pointer">Record Chart</span></p>
              </div>
              <div className="flex md:w-1/4 w-1/3 h-full text-lg items-center justify-around">
                <p className="px-2 text-center text-2xl">{yesterdayResult}</p>
                <p className="text-center md:pl-0 pl-2 text-2xl">{todayResult}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};