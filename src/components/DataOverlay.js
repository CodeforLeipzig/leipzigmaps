import MapPolygon from './MapPolygon'

const DataOverlay = ({
  cache,
  dataOverlayEntries,
  selectedDataKey,
  selectedX,
  selectedY,
  showTotal,
  scale,
}) => {
  if(
    !cache[selectedDataKey] ||
    !cache[selectedDataKey][selectedX] ||
    !cache[selectedDataKey][selectedX][selectedY]
  ) return null;

  const isPercent = selectedY && (selectedY.indexOf("Anteil") >=0 || selectedY.indexOf("anteil") >=0 || selectedY.indexOf("Quote") >= 0 || selectedY.indexOf("quote") >= 0)
  const aggFun = (values) => showTotal ? ((isPercent && values.length > 0) ? (Math.round(values.reduce((sum, elem) => sum + elem.value, 0) / values.length)) : values.reduce((sum, elem) => sum + elem.value, 0)) : 0
  const databasis = cache[selectedDataKey][selectedX][selectedY];
  const selectedYValues = Object.keys(cache[selectedDataKey]).map(key =>
    cache[selectedDataKey][key][selectedY] ?
      (
        showTotal ?
          aggFun(cache[selectedDataKey][key][selectedY])
          : cache[selectedDataKey][key][selectedY].map(d => d.value)
      ) : 0
  ).flat(1)
  const databasisMax = Math.max(...selectedYValues)
  const databasisMin = dataOverlayEntries[selectedDataKey].min || 0;
  const databasisColorScale = scale.domain([databasisMin, databasisMax]);
  const totalValue = aggFun(databasis)

  return (
    <>
      {cache.districts.features.filter((district) => showTotal ? district.properties.title === "Gesamt" : district.properties.title !== "Gesamt").map(f => {
          let item = showTotal ? null : databasis.find(d => !d.district || d.district === f.properties.title)
          const district = (showTotal || !item) ? "Gesamt" : item.district
          const value = showTotal ? totalValue : item.value
          return (
            <MapPolygon
              key={f.properties.key}
              geoframe={f}
              tooltip={
                <div style={{ fontSize: '1rem' }}>
                  <div style={{ fontSize: '1.4rem' }}>{value}{isPercent ? "%" : ""} {dataOverlayEntries[selectedDataKey].unit}</div>
                  {district}<br />
                  <div style={{ fontSize: '0.8rem' }}>{dataOverlayEntries[selectedDataKey].title}</div>
                  {
                    dataOverlayEntries[selectedDataKey].title !== selectedY.replace(' insgesamt', '') &&
                    <div style={{ fontSize: '0.8rem' }}>{selectedY}</div>
                  }
                </div>
              }
              pathOptions={{
                fillColor: databasisColorScale(value).hex()
              }}
            />
          )
      })}
    </>
  )
}

export default DataOverlay;