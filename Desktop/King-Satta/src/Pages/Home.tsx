import { useEffect, useState } from 'react';
import { Head } from "../Components/Head";
import { DisplayGames } from "../Components/DisplayGames";
import { DisplayTable } from "../Components/DisplayTable";
import { database } from '../../config/firebase';
import { ref, get } from "firebase/database";

export interface Game {
  name: string;
  time: string;
  banner: string;
  years: {
    [year: number]: {
      [month: string]: string;
    };
  };
}

interface PhnNo {
  phoneNum2: string;
}

export const Home = () => {
  const [gamesData, setGamesData] = useState<Game[]>([]);
  const [contactData, setContactData] = useState<PhnNo[]>([]);

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const snapshot = await get(ref(database, '/contact/'));
        const data = snapshot.val();
        if (data) {
          setContactData(Object.values(data) as PhnNo[]);
        }
      } catch (error) {
        console.error("Error fetching contact data:", error);
      }
    };
    fetchContactData();
  }, []);

  useEffect(() => {
    const fetchGamesData = async () => {
      try {
        const snapshot = await get(ref(database, '/games/'));
        const data = snapshot.val();
        if (data) {
          setGamesData(Object.values(data) as Game[]);
        }
      } catch (error) {
        console.error("Error fetching games data:", error);
      }
    };
    fetchGamesData();
  }, []);

  return (
    <div className="w-full h-screen overflow-scroll select-none">
      <Head contact={contactData} />
      <DisplayGames gamesData={gamesData} />
      <DisplayTable gamesData={gamesData} />
      <button 
        onClick={() => window.location.reload()} 
        className="absolute right-4 bottom-4 animate-bounce rounded-md border-2 border-black bg-blue-500 text-lg font-bold text-white px-4 py-2"
      >
        Refresh
      </button>
    </div>
  );
};
