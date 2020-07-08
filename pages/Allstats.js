import React, { useEffect, useState } from 'react';
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import CardColumns from "react-bootstrap/CardColumns";
import Form from "react-bootstrap/Form";

function Allstats() {
  const [latest, setLatest] = useState ([]);
  const [results, setResults] = useState ([]);
  const [searchCountries, setSearchCountries] = useState("");

  async function mapEffect({ leafletElement: map } = {}) {
    let response;

    try {
      response = await axios.get('https://corona.lmao.ninja/v2/countries');
    } catch(e) {
      console.log(`Failed to fetch countries: ${e.message}`, e);
      return;
    }

    const { data = [] } = response;
}

  useEffect(() => {
    axios
      .all([
        axios.get("https://disease.sh/v2/all"),
        axios.get("https://disease.sh/v2/countries")
      ])
      .then(responseArr => {
        setLatest(responseArr[0].data);
        setResults(responseArr[1].data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const date = new Date(parseInt(latest.updated));
  const lastUpdated = date.toString();

  const filterCountries = results.filter(item => {
    return searchCountries !== "" ? item.country.includes(searchCountries) : item;
  });

  const countries = filterCountries.map((data, i) => {
    return (
      <Card
        key={i}
        bg="dark"
        text="white"
        className="text-center"
        
        style={{margin: "10px" }}
      >
        <Card.Img variant="top" src={data.countryInfo.flag} />
        <Card.Body>
    <Card.Title> {data.country}</Card.Title>
    <Card.Text>Cases {data.cases}</Card.Text>
    <Card.Text>Deaths {data.deaths}</Card.Text>
    <Card.Text>Recovered {data.recovered}</Card.Text>
    <Card.Text>Today's cases {data.todayCases}</Card.Text>
    <Card.Text>Today's deaths {data.todayDeaths}</Card.Text>
    <Card.Text>Active {data.active}</Card.Text>
    <Card.Text>Critical {data.critical}</Card.Text>
        </Card.Body>
      </Card>
    );
  });
  
  return (
    <div style={{ marginLeft: "150px", marginRight: "150px"}} >
          <Card style={{ margin: "15px" }} bg="dark" text={"white"} className="text-center">
          <Card.Img variant="top" />
          <Card.Body>
            <Card.Title>Cases</Card.Title>
            <Card.Text>
              {latest.cases}
            </Card.Text>
            <Card.Footer>
  <small style={{frontSize: "1px"}} >Last Updated {lastUpdated}</small>
            </Card.Footer>
            
          </Card.Body>
        </Card>
        <Card style={{ margin: "15px" }} bg="dark" text={"white"} className="text-center" >
          <Card.Img variant="top" />
          <Card.Body>
            <Card.Title>Deaths</Card.Title>
            <Card.Text>
            {latest.deaths}
            </Card.Text>
            <Card.Footer>
  <small style={{frontSize: "1px"}} >Last Updated {lastUpdated}</small>
            </Card.Footer>
            
          </Card.Body>
        </Card>
        <Card style={{ margin: "15px" }} bg="dark" text={"white"} className="text-center" >
          <Card.Img variant="top" />
          <Card.Body>
            <Card.Title>Recovered</Card.Title>
            <Card.Text>
            {latest.recovered}
            </Card.Text>
            <Card.Footer>
  <small style={{frontSize: "1px"}} >Last Updated {lastUpdated}</small>
            </Card.Footer>
            
          </Card.Body>
        </Card>
            <Form>
              <Form.Group controlId="formGroupSearch">
                <Form.Label column sm="2">
                  Search
                </Form.Label>
                
                  <Form.Control type="text" placeholder="Search a country" onChange={e => setSearchCountries(e.target.value)} />
                
              </Form.Group>
            </Form>
        <CardColumns style={{columnCount: 5}}  >{countries}</CardColumns>
        {/* <Map {...mapSettings} /> */}
        
    </div>
  );
}

export default Allstats;
