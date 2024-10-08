<template>
  <div>
    <div id="map" class="map-container"></div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { readEnfermedades } from '../services/estados';
import { useRoute } from 'vue-router';

export default {
  setup() {

    const route = useRoute();
    const name = ref(route.params?.name || 'nada');
    const data = ref([]);
    const totalCasos = ref(0);
    const totalDefunciones = ref(0);
    console.log(route.params.id);
    const map = ref(null);
    const isDraggable = ref(true);
    const locations = ref([
      { lat: 19.384944, lng: -99.142272, info: 'Ciudad de México' },
      { lat: 20.66838, lng: -103.3471, info: 'Jalisco' },
      { lat: 19.79432, lng: -87.97362, info: 'Quintana Roo' },
      { lat: 26.03199, lng: -99.93436, info: 'Nuevo León' },
      { lat: 30.54284, lng: -115.2342, info: 'Baja California' },
      { lat: 19.18093, lng: -96.14476, info: 'Veracruz' },
      { lat: 20.76515, lng: -88.89454, info: 'Yucatán' },
      { lat: 29.93455, lng: -110.7557, info: 'Sonora' },
      { lat: 18.56344, lng: -97.99310, info: 'Puebla' },
      { lat: 22.43719, lng: -100.3070, info: 'San Luis Potosí' },
      { lat: 19.29784, lng: -101.7960, info: 'Michoacán' },
      { lat: 17.17256, lng: -96.73113, info: 'Oaxaca' },
      { lat: 22.00500, lng: -102.3137, info: 'Aguascalientes' },
      { lat: 25.79762, lng: -111.8709, info: 'Baja California Sur' },
      { lat: 18.81936, lng: -90.27476, info: 'Campeche' },
      { lat: 27.23468, lng: -102.1434, info: 'Coahuila' },
      { lat: 19.56814, lng: -99.57733, info: 'Estado de México' },
      { lat: 21.06691, lng: -100.9652, info: 'Guanajuato' },
      { lat: 17.58571, lng: -99.92454, info: 'Guerrero' },
      { lat: 20.87840, lng: -99.78646, info: 'Querétaro' },
      { lat: 23.32848, lng: -102.8969, info: 'Zacatecas' },
      { lat: 19.13546, lng: -103.8784, info: 'Colima' },
      { lat: 18.75328, lng: -99.08332, info: 'Morelos' },
      { lat: 24.47734, lng: -98.58876, info: 'Tamaulipas' },
      { lat: 17.9895, lng: -92.9475, info: 'Tabasco' },
      { lat: 20.5888, lng: -100.3899, info: 'Querétaro' },
      { lat: 24.80869, lng: -104.8142, info: 'Durango' },
      { lat: 28.72910, lng: -106.4920, info: 'Chihuahua' },
      { lat: 24.80095, lng: -107.4197, info: 'Sinaloa' },
      { lat: 16.47464, lng: -92.65069, info: 'Chiapas' }
    ]);

    const loadGoogleMaps = () => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAnqc39rTYrnn3ASvBoGbolzYlFS50S5gc`;
      script.async = true;
      script.defer = true;
      script.onload = initMap;
      document.head.appendChild(script);
    };

    const initMap = () => {
      map.value = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 23.6345, lng: -102.5528 }, // Coordenadas de México
        zoom: 5, // Nivel de zoom inicial
        disableDefaultUI: true, // Deshabilitar controles predeterminados
        draggable: isDraggable.value, // Habilitar o deshabilitar arrastre
        scrollwheel: true, // Habilitar zoom con scroll
        disableDoubleClickZoom: false, // Habilitar zoom con doble clic
        restriction: {
          latLngBounds: {
            north: 32.718653, // Límite norte
            south: 14.532866, // Límite sur
            east: -86.709572, // Límite este
            west: -118.364729 // Límite oeste
          },
          strictBounds: false // Permitir arrastre fuera de los límites especificados inicialmente
        }
      });

      const infoWindow = new google.maps.InfoWindow();

      // Agregar marcadores personalizados y eventos de click
      locations.value.forEach(location => {
        const marker = new google.maps.Marker({
          position: { lat: location.lat, lng: location.lng },
          map: map.value,
          icon: '' // Opcional: URL del icono personalizado
        });

        marker.addListener('click', () => {
          infoWindow.setContent(location.info);
          infoWindow.open(map.value, marker);
        });
      });

      // Restringir el arrastre cuando el usuario haga zoom in
      map.value.addListener('zoom_changed', () => {
        if (map.value.getZoom() > 5) {
          map.value.setOptions({
            restriction: {
              latLngBounds: {
                north: 32.718653, // Límite norte
                south: 14.532866, // Límite sur
                east: -86.709572, // Límite este
                west: -118.364729 // Límite oeste
              },
              strictBounds: true // Restringir el arrastre a los límites especificados
            }
          });
        } else {
          map.value.setOptions({
            restriction: {
              latLngBounds: {
                north: 32.718653, // Límite norte
                south: 14.532866, // Límite sur
                east: -86.709572, // Límite este
                west: -118.364729 // Límite oeste
              },
              strictBounds: false // Permitir arrastre fuera de los límites especificados
            }
          });
        }
      });
    };

    const getEnfermedades = async () => {
      try {
        const response = await readEnfermedades(route.params.id);
        // total general
        data.value = response.data.data
        totalCasos.value = data.value.reduce((sum, item) => sum + item.total_cases, 0)
        totalDefunciones.value = data.value.reduce((sum, item) => sum + item.deaths, 0)
        console.log({
          data: data.value,
          totalCasos: totalCasos.value,
          totalDefunciones: totalDefunciones.value
        });

        // Comparar y concatenar información
        locations.value.forEach(location => {
          const enfermedad = data.value.find(item => item.name === location.info);
          if (enfermedad) {
            location.info += ` - Casos: ${enfermedad.total_cases}, Defunciones: ${enfermedad.deaths}`;
          } else {
            location.info += ` - Casos: 0, Defunciones: 0`;
          }
        });

      console.log({
        data: data.value,
        totalCasos: totalCasos.value,
        totalDefunciones: totalDefunciones.value,
        locations: locations.value
      });
    } catch (error) {
      console.error(error);
    }
  };

  onMounted(() => {
  loadGoogleMaps();
  getEnfermedades();
});

return {
  map,
  isDraggable,
  locations,
  name,
  data,
  totalCasos,
  totalDefunciones
};
  }
};
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 500px;
}
</style>