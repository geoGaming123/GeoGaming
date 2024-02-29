<script>
import * as GeoSearch from 'leaflet-geosearch'

export function useGeoSearchControl(map) {
  const searchControl = new GeoSearch.GeoSearchControl({
    provider: new GeoSearch.OpenStreetMapProvider(),
    style: 'bar',
    showMarker: false
  })

  map.addControl(searchControl)

  return { searchControl }
}
</script>
