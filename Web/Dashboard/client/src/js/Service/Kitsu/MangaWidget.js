import React,{useState, useEffect} from "react";
import { Button, Form } from "react-bootstrap";
import { Navigate } from "react-router-dom";

export default function MangaWidget(props) {

  var [mangaName,setMangaName] = useState(null)
  var [manga,setManga] = useState(null)
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

  const handleChangeMangaName = (e) => {
    setMangaName(e.target.value)
  }

  const getManga = async (e) => {
    e.preventDefault()
  
    var myInit = { method: 'GET',
      headers: { 'Authorization': `Bearer ${kitsuToken}` },
      mode: 'cors',
      cache: 'default' };
    
    var myRequest = new Request(`https://kitsu.io/api/edge/manga?filter[text]=${mangaName}&page[limit]=1`, myInit);
    fetch(myRequest,myInit)
    .then((data) => data.json())
    .then((result) => {
        console.log(result.data)
        setManga(result.data)
    }).catch(console.error)
  }

  function DisplayManga() {
    if (manga === null) {
      return(<div></div>)
    }
    if (manga.length === 0) {
      return(<div className="margin">Error manga not found !</div>)
    }
  
    return(
      manga.map(content => {
        if (!content.attributes.coverImage) {
          return (
            <div>
              <div className="margin">
                Name: {content.attributes.titles.en_jp || content.attributes.titles.en}
              </div>
              <br/>
              <div className="margin">
                Description:<br/> {content.attributes.description || ""}
              </div>
              <br/>
              <div className="margin">
                Start at: {content.attributes.startDate || ""}
              </div>
              <br/>
              <div className="margin">
                Average Rating: {content.attributes.averageRating || ""}
              </div>
            </div>
          )
        }
        return (
          <div>
            <div className="margin">
              <img height="300px" width="350px" src={content.attributes.coverImage.original || ""} alt=""></img>
            </div>
            <br/>
            <div className="margin">
              Name: {content.attributes.titles.en_jp || content.attributes.titles.en}
            </div>
            <br/>
            <div className="margin">
              Description:<br/> {content.attributes.description || ""}
            </div>
            <br/>
            <div className="margin">
              Start at: {content.attributes.startDate || ""}
            </div>
            <br/>
            <div className="margin">
              Average Rating: {content.attributes.averageRating || ""}
            </div>
          </div>
        )
      })
    )
  }

  return (
    <div>
      <Form className="largeMarginRight" onSubmit={getManga}>
        <Form.Group controlId="ManagName">
          <Form.Label ></Form.Label>
          <Form.Control type="text" name="mangaName"
          onChange={handleChangeMangaName} required placeholder="Enter a manga name" />
        </Form.Group>
        <Button className="littleButton" type="submit">
          Submit
        </Button>
      </Form>
      <br/>
      <div className="scrollable">
        {DisplayManga()}
      </div>
    </div>
    
  );
}