import { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';

import PlacesList from '../components/PlacesList';
import { fetchPlaces } from '../../../util/Database';


function AllPlaces({ route }) {
  // const [loadedPlaces, setLoadedPlaces] = useState([]);

  // const isFocused = useIsFocused();

  // useEffect(() => {
  //   if (isFocused && route.params?.place) {
  //     // fetchPlaces().then((places) => setLoadedPlaces(places));
  //     setLoadedPlaces((currentPlaces) => {
  //       const isDuplicate = currentPlaces.some(
  //         (place) => place.id === route.params.place.id
  //       );
  //       if (isDuplicate) {
  //         return currentPlaces; // Aynı ID'ye sahip öğe varsa ekleme
  //       }
  //       return [...currentPlaces, route.params.place];
  //     });
  //   }
  // }, [isFocused, route]);

  const [loadedPlaces, setLoadedPlaces] = useState([]);
  const [updatePlace, setUpdatePlace] = useState(false);

  const isFocused = useIsFocused(); // check if the screen is focused

  useEffect(() => {
    async function loadPlaces() {
      const places = await fetchPlaces();
      setLoadedPlaces(places);
    }

    // check if the screen is focused
    if (isFocused) {
      loadPlaces();
    }
  }, [isFocused, updatePlace]);

  return <PlacesList places={loadedPlaces} />;
}

export default AllPlaces;