import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle, faPauseCircle } from '@fortawesome/free-solid-svg-icons';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import Collapse from 'react-bootstrap/Collapse'
import useInterval from '../hooks/useInterval'

const DataOverlayOptions = ({
  dataEntries,
  cache,
  selectedLevel1,
  selectedLevel2,
  selectedLevel3,
  selectedLevel4,
  selectedLevel5,
  selectedLevel6,
  selectedDataKey,
  selectedX,
  selectedY,
  showTotal,
  setSelectedX,
  setSelectedY,
  setShowTotal,
  selectDataOverlayCategory,
  setSelectedLevel1,
  setSelectedLevel2,
  setSelectedLevel3,
  setSelectedLevel4,
  setSelectedLevel5,
  setSelectedLevel6,
  loadings,
}) => {

  const selectedData = cache[selectedDataKey];
  const categories = cache['categories'];
  const selectedLevel1Data = categories;
  const selectedLevel2Data = selectedLevel1 && categories[selectedLevel1];
  const selectedLevel3Data = selectedLevel2 && selectedLevel2Data && categories[selectedLevel1][selectedLevel2];
  const selectedLevel4Data = selectedLevel3 && selectedLevel3Data && categories[selectedLevel1][selectedLevel2][selectedLevel3];
  const selectedLevel5Data = selectedLevel4 && selectedLevel4Data && categories[selectedLevel1][selectedLevel2][selectedLevel3][selectedLevel4];
  const selectedLevel6Data = selectedLevel5 && selectedLevel5Data && categories[selectedLevel1][selectedLevel2][selectedLevel3][selectedLevel4][selectedLevel5];
  const xKeys = selectedData ? Object.keys(selectedData) : []
  const yKeys = selectedData ? Object.keys(selectedData[xKeys[0]]) : []

  const [playingYears, setPlayingYears] = useState(false);

  const goToNextYear = () => {
    if(!selectedData) return;

    const index = xKeys.indexOf(selectedX);
    const indexNext = index + 1 > Object.keys(selectedData).length - 1 ? 0 : index + 1;
    setSelectedX(xKeys[indexNext])
  }

  useInterval(() => goToNextYear(), playingYears ? 500 : null);

  return (
    <>
      <Form.Check
        key={"Total"}
        type="checkbox"
        id={"Total"}
        label={"Zeige Daten für Gesamtgebiet"}
        checked={showTotal}
        onChange={e => setShowTotal((curr) => !curr)}
        style={{ marginLeft: 20 }}
      />
      <div style={{ paddingBottom: 20, paddingLeft: 20, paddingRight: 20, paddingTop: 5, }}>
        <p><strong>Details für Ortsteile</strong> zeigen mit farblichen Flächen bspw. an, wie viele Arbeitslose im Jahr 2016 in jeweiligem Ortsteil gelebt haben. 
        Wähle eine <strong>Kategorie</strong>, <strong>Unterkategorie</strong> und <strong>Jahr</strong>.</p>
        <Accordion defaultActiveKey="0">
          {selectedLevel1Data && !selectedLevel1Data.data && <Accordion.Item eventKey="0">
            <Accordion.Header>Stufe 1&nbsp;<span style={{ opacity: 0.5 }}>{selectedLevel1} ({selectedLevel1Data ? Object.keys(selectedLevel1Data).length : 0})</span></Accordion.Header>
            <Accordion.Body>
              {!!categories && selectedLevel1Data && Object.keys(selectedLevel1Data).sort().map(l1 => 
                <Form.Check
                  key={l1}
                  type="radio"
                  id={l1}
                  label={l1}
                  checked={selectedLevel1 === l1}
                  onChange={e => setSelectedLevel1(l1)}
                />
              )}
            </Accordion.Body>
          </Accordion.Item>}
          {selectedLevel2Data && !selectedLevel2Data.data && <Accordion.Item eventKey="1">
            <Accordion.Header>Stufe 2&nbsp;<span style={{ opacity: 0.5 }}>{selectedLevel2} ({selectedLevel2Data ? Object.keys(selectedLevel2Data).length : 0})</span></Accordion.Header>
            <Accordion.Body>
              {!!categories && selectedLevel2Data && Object.keys(selectedLevel2Data).sort().map(l2 => 
                <Form.Check
                  key={l2}
                  type="radio"
                  id={l2}
                  label={l2}
                  checked={selectedLevel2 === l2}
                  onChange={e => setSelectedLevel2(l2)}
                />
              )}
            </Accordion.Body>
          </Accordion.Item>}
          {selectedLevel3Data && !selectedLevel3Data.data && <Accordion.Item eventKey="2">
            <Accordion.Header>Stufe 3&nbsp;<span style={{ opacity: 0.5 }}>{selectedLevel3} ({selectedLevel3Data ? Object.keys(selectedLevel3Data).length : 0})</span></Accordion.Header>
            <Accordion.Body>
              {!!categories && selectedLevel3Data && Object.keys(selectedLevel3Data).sort().map(l3 => 
                <Form.Check
                  key={l3}
                  type="radio"
                  id={l3}
                  label={l3}
                  checked={selectedLevel3 === l3}
                  onChange={e => setSelectedLevel3(l3)}
                />
              )}
            </Accordion.Body>
          </Accordion.Item>}
          {selectedLevel4Data && !selectedLevel4Data.data && <Accordion.Item eventKey="3">
            <Accordion.Header>Stufe 4&nbsp;<span style={{ opacity: 0.5 }}>{selectedLevel4} ({selectedLevel4Data ? Object.keys(selectedLevel4Data).length : 0})</span></Accordion.Header>
            <Accordion.Body>
              {!!categories && selectedLevel4Data && Object.keys(selectedLevel4Data).sort().map(l4 => 
                <Form.Check
                  key={l4}
                  type="radio"
                  id={l4}
                  label={l4}
                  checked={selectedLevel4 === l4}
                  onChange={e => setSelectedLevel4(l4)}
                />
              )}
            </Accordion.Body>
          </Accordion.Item>}
          {selectedLevel5Data && !selectedLevel5Data.data && <Accordion.Item eventKey="4">
            <Accordion.Header>Stufe 5&nbsp;<span style={{ opacity: 0.5 }}>{selectedLevel5} ({selectedLevel5Data ? Object.keys(selectedLevel5Data).length : 0})</span></Accordion.Header>
            <Accordion.Body>
              {!!categories && selectedLevel5Data && Object.keys(selectedLevel5Data).sort().map(l5 => 
                <Form.Check
                  key={l5}
                  type="radio"
                  id={l5}
                  label={l5}
                  checked={selectedLevel5 === l5}
                  onChange={e => setSelectedLevel5(l5)}
                />
              )}
            </Accordion.Body>
          </Accordion.Item>}
          {selectedLevel6Data && !selectedLevel6Data.data && <Accordion.Item eventKey="5">
            <Accordion.Header>Stufe 6&nbsp;<span style={{ opacity: 0.5 }}>{selectedLevel6} ({selectedLevel6Data ? Object.keys(selectedLevel6Data).length : 0})</span></Accordion.Header>
            <Accordion.Body>
              {!!categories && selectedLevel6Data && Object.keys(selectedLevel6Data).sort().map(l6 => 
                <Form.Check
                  key={l6}
                  type="radio"
                  id={l6}
                  label={l6}
                  checked={selectedLevel6 === l6}
                  onChange={e => setSelectedLevel6(l6)}
                />
              )}
            </Accordion.Body>
          </Accordion.Item>}
          <Accordion.Item eventKey="7">
            <Accordion.Header>Jahr:&nbsp;<span style={{ opacity: 0.5 }}>{selectedX} ({xKeys.length})</span></Accordion.Header>
            <Accordion.Body>
            <Button style={{ marginBottom: 10, float: 'right' }} size="sm" onClick={() => setPlayingYears(playingYears => !playingYears)}>
              {playingYears ? <><FontAwesomeIcon icon={faPauseCircle} /> Pause</> : <><FontAwesomeIcon icon={faPlayCircle} /> Abspielen</>}
            </Button>
            {loadings[selectedDataKey] && <Spinner animation="border" size="sm" />}
            {!!selectedData && Object.keys(selectedData).reverse().map(x =>
              <Form.Check
                key={x}
                type="radio"
                id={x}
                label={x}
                checked={selectedX === x}
                onChange={e => setSelectedX(x)}
              />
            )}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </>
  )
}

export default DataOverlayOptions;