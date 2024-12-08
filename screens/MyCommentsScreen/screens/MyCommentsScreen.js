import { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';

import PlacesList from '../components/PlacesList';

function AllPlaces({ route }) {
  const [loadedPlaces, setLoadedPlaces] = useState([]);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused && route.params?.place) {
      setLoadedPlaces((currentPlaces) => {
        const isDuplicate = currentPlaces.some(
          (place) => place.id === route.params.place.id
        );
        if (isDuplicate) {
          return currentPlaces; // Aynı ID'ye sahip öğe varsa ekleme
        }
        return [...currentPlaces, route.params.place];
      });
    }
  }, [isFocused, route]);

  return <PlacesList places={loadedPlaces} />;
}

export default AllPlaces;