import { View } from "react-native";
import MapView, { UrlTile } from "react-native-maps";
import * as Location from "expo-location";
import { useEffect, useRef, useState } from "react";

export default function Index() {
  const [location, setLocation] =
    useState<Location.LocationObjectCoords | null>(null);
  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        console.log("Permiso denegado");
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      mapRef.current?.animateToRegion(
        {
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        },
        1000,
      );

      setLocation(currentLocation.coords);
    })();
  }, []);

  if (location) {
    console.log(location.latitude);
  }

  return (
    <View className="h-2/6">
      <MapView
        ref={mapRef}
        style={{ flex: 1 }}
        showsUserLocation
      >
        <UrlTile
          urlTemplate="https://api.maptiler.com/maps/streets-v2/256/{z}/{x}/{y}.png?key=LU8YiM3OajbLLB8UgfCo"
          maximumZ={20}
        />
      </MapView>
    </View>
  );
}
