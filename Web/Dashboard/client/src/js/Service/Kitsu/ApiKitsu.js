import React,{useState} from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import { Navigate } from "react-router-dom";

export default function ApiKitsu() {

  var [psd,setPsd] = useState(null)
  var [username,setUsername] = useState(null)
  var [token,setToken] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    var password = escape(psd)
    var myInit = { method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ grant_type: 'password', username: `${username}`, password: `${password}` }),
      mode: 'cors',
      cache: 'default' };

    var myRequest = new Request(`https://kitsu.io/api/oauth/token`, myInit);
    fetch(myRequest,myInit)
    .then((data) => data.json())
    .then((result) => {
      console.log(result.access_token)
      axios.post("http://localhost:8080/kitsu/setToken/", {"token": result.access_token});
      setToken(result.access_token)
    }).catch(console.error)
  }

  const handleChangeUsername = (e) => {
    setUsername(e.target.value)
  }

  const handleChangePsd = (e) => {
    setPsd(e.target.value)
  }
  
  console.log("token:" + token)
  if (token !== null) {
    console.log("test")
    return (<Navigate replace to="/Service2" />)
  }

  return (
    <div className="App">
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Username</Form.Label><br/>
          <Form.Control type="email" name="email"
          onChange={handleChangeUsername} required placeholder="Enter your Kitsu email" /><br/>
          <Form.Label>Password:</Form.Label><br/>
          <Form.Control type="password" name="password"
          onChange={handleChangePsd} required placeholder="Enter your Kitsu Password" />
        </Form.Group>
        <Button className="littleButton" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}