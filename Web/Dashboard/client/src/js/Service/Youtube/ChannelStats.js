import React,{useState} from "react";
import { Button, Form } from "react-bootstrap";

const youtubeChannelId = require('get-youtube-channel-id')

export default function ChannelStats() {

  var API_KEY = "AIzaSyAe5El0mTZIJrl5p4g9gccyE_P03G4iCEY"

  var [subscribers,setSubscribers] = useState(null)
  var [views,setViews] = useState(null)
  var [videos,setVideos] = useState(null)

  var [url,setUrl] = useState(null)

  const handleSubmit = async (e) => {

    e.preventDefault()

    console.log(url)
    var result = await youtubeChannelId(url)
    if (result !== false) {
      if (result.error) {
        console.log(`Have a error, try again`);
        setUrl(-1)
        return("error")
      } else {
        console.log(`Channel ID: ${result.id}`);
      }
    } else {
        console.log('Invalid youtube channel URL');
        setUrl(-1)
        return("error")
    }
    console.log(result)
    fetch(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${result.id}&key=${API_KEY}`)
    .then((data) => data.json())
    .then((result) => {
      setSubscribers(result.items[0].statistics.subscriberCount)
      setViews(result.items[0].statistics.viewCount)
      setVideos(result.items[0].statistics.videoCount)
    })
  }

  const handleChange = (e) => {
    setUrl(e.target.value)
  }

  if (url === -1) {
    return (
      <div className="App">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="channelUrl">
          <Form.Label>Channel URL:</Form.Label>
          <Form.Control type="text" name="url"
          onChange={handleChange} required placeholder="Enter Channel URL" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      Error incorrect URL !
    </div>
    )
  }

  return (
    <div className="App">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="channelUrl">
          <Form.Label>Channel URL:</Form.Label>
          <Form.Control type="text" name="url"
          onChange={handleChange} required placeholder="Enter Channel URL" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      You have {subscribers} subscribers
      <br/>
      You have {videos} Videos
      <br/>
      You have {views} Views
    </div>
  );
}