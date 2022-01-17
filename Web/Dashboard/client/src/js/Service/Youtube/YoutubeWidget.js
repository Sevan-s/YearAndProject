import React from "react";
import Search from "./Search"
import youtubeApi from "./ApiYoutube"
import Videoplayer from "./VideoPlayer";
import "../../../css/YoutubeWidget.css"

class YoutubeWidget extends React.Component {

    state = {
      videosMetaInfo: [],
      selectedVideoId: null
    };

    onSearch = async keyword => {
      const response = await youtubeApi.get("/search", {
        params: {
          q: keyword
        }
      });
      this.setState({
        videosMetaInfo: response.data.items,
        selectedVideoId: response.data.items[0].id.videoId
      });
      console.log(this.state);
    };

    render() {
      return(
        <div className="VideoWidget">
          <div className="widgetBox">
            <Search onSearch={this.onSearch} />
            <Videoplayer videoId={this.state.selectedVideoId} />
          </div>
        </div>
      )
    }
}

export default YoutubeWidget