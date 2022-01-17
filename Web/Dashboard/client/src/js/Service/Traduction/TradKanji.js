import React,{useState} from "react";
import { Button, Form } from "react-bootstrap";


export default function TradKanji() {

    var [kanji,setKanji] = useState(null)
    var [word,setWord] = useState(null)

    const handleSubmit = async (e) => {

      e.preventDefault()
      var myHeaders = new Headers()
      myHeaders.append("x-rapidapi-host", "kanjialive-api.p.rapidapi.com")
      myHeaders.append("x-rapidapi-key", "b4d44a9d52mshb828cbbe5b44f79p125528jsnd4e9f091ac57")

      var myInit = { method: 'GET',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default' };

      var myRequest = new Request(`https://kanjialive-api.p.rapidapi.com/api/public/kanji/${kanji}`, myInit);
      fetch(myRequest,myInit)
      .then((data) => data.json())
      .then((result) => {
        setWord(result.kanji.meaning.english)
      }).catch(console.error)

      if (word === null) {
        setWord("Error no traduction found !")
      }
    }

    const handleChange = (e) => {
      setKanji(e.target.value)
    }

    return (
      <div className="App">
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="EngWord">
            <Form.Label></Form.Label>
            <Form.Control type="text" name="url"
            onChange={handleChange} required placeholder="Enter kanji" />
          </Form.Group>
          <Button className="littleButton" type="submit">
            Submit
          </Button>
        </Form>
        here's the traduction: {word}
      </div>
    );
}