import React,{useState} from "react";
import { Button, Form } from "react-bootstrap";


export default function TradEng() {

    var [word,setWord] = useState(null)
    var [wordTrad,setWordTrad] = useState(null)

    const handleSubmit = async (e) => {

        e.preventDefault()
        var myHeaders = new Headers()
        myHeaders.append("x-rapidapi-host", "kanjialive-api.p.rapidapi.com")
        myHeaders.append("x-rapidapi-key", "b4d44a9d52mshb828cbbe5b44f79p125528jsnd4e9f091ac57")

        var myInit = { method: 'GET',
               headers: myHeaders,
               mode: 'cors',
               cache: 'default' };

        var myRequest = new Request(`https://kanjialive-api.p.rapidapi.com/api/public/search/${word}`, myInit);
        fetch(myRequest,myInit)
        .then((data) => data.json())
        .then((result) => {
            for (var trad of result) {
                console.log(trad)
                setWordTrad(trad.kanji.character)
            }
        }).catch(console.error)

        if (wordTrad === null) {
            setWordTrad("Error no traduction found !")
        }
    }

    const handleChange = (e) => {
        setWord(e.target.value)
      }

    return (
        <div className="App">
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="EngWord">
              <Form.Label></Form.Label>
              <Form.Control type="text" name="url"
              onChange={handleChange} required placeholder="Enter english word" />
            </Form.Group>
            <Button className="littleButton" type="submit">
              Submit
            </Button>
          </Form>
          here's the traduction: {wordTrad}
        </div>
      );
}