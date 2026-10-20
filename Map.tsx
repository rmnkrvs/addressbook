import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';

import { RootStackScreenProps } from './types';

export default function MapScreen({ route }: RootStackScreenProps<'Map'>) {

    const { address, latitude, longitude } = route.params;

    const safeAddress = JSON.stringify(address).replace(/</g, '\\u003c');

    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
  <style>
    html, body, #map { height: 100%; margin: 0; }
  </style>
</head>
<body>
  <div id="map"></div>
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
  <script>
    const lat = ${latitude};
    const lng = ${longitude};

    const map = L.map('map').setView([lat, lng], 15);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    L.marker([lat, lng]).addTo(map).bindPopup(${safeAddress}).openPopup();
  </script>
</body>
</html>`;

    return (

            <SafeAreaView style={{ flex: 1 }} edges={['bottom']}>
                <WebView
                    style={{ flex: 1 }}
                    originWhitelist={['*']}
                    source={{ html, baseUrl: 'https://localhost' }}
                />
            </SafeAreaView>
    );
}