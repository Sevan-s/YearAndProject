import React,{useState, useEffect} from "react";
import { Button, Form, ListGroup } from "react-bootstrap";
import { Navigate } from "react-router-dom";

export default function TendencyWidget(props) {

  var [tendency,setTendency] = useState(null)
  var [ranking,setRanking] = useState(null)
  var [kitsuToken,setkitsuToken] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    props.token.then(data => {console.log("Data-> " + data);setkitsuToken(data); setLoading(false)});
  }, [props.token]);

  if (isLoading)
    return(<div></div>);
  if (kitsuToken === null) {
    return (<Navigate replace to="/Kitsu/login" />);
  }

  const getTendency = async (e) => {
    e.preventDefault()

    var myInit = { method: 'GET',
    headers: { 'Authorization': `Bearer ${kitsuToken}` },
    mode: 'cors',
    cache: 'default' };
    
    var myRequest = new Request(`https://kitsu.io/api/edge/trending/${tendency}`, myInit);
    fetch(myRequest,myInit)
    .then((data) => data.json())
    .then((result) => {
        console.log(result.data)
        setRanking(result.data)
    }).catch(console.error)
  }

  const handleChangeAnime = (e) => {
    setTendency(e.target.value)
  }

  const handleChangeManga = (e) => {
    setTendency(e.target.value)
  }

  function DisplayCLassment() {
    if (ranking === null)
      return(<div></div>)
    return (
      <ListGroup as="ol" className="scrollable" numbered>
        {
          ranking.map(content => {
            return (
              <ListGroup.Item as="li">
                <br/>
                <div>
                  Name: {content.attributes.titles.en_jp || content.attributes.titles.en}
                </div>
                <div>
                  User vote: {content.attributes.userCount}
                </div>
                <div>
                Average Raking: {content.attributes.averageRating}
                </div>
              </ListGroup.Item>
              );
          })
        }
      </ListGroup>
      
    )
  }

  return (
    <div>
      <Form onSubmit={getTendency}>
        <Form.Group controlId="Tendency">
          <Button className="littleButton" type="submit" name="Manga" onClick={handleChangeManga} value="manga">Manga</Button>
          <Button className="littleButton" type="submit" name="Anime" onClick={handleChangeAnime} value="anime">Anime</Button>
        </Form.Group>
      </Form>
      {DisplayCLassment()}
  </div>
  );
}