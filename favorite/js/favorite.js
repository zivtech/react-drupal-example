import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import 'whatwg-fetch'; // https://www.npmjs.com/package/whatwg-fetch

class Favorite extends Component {
  
  constructor() {
    super();
    this.toggleFavorite = this.toggleFavorite.bind(this);
    this.saveFavorite = this.saveFavorite.bind(this);
    this.getData = this.getData.bind(this);

    this.state = {
      favorited: '',
      user_uuid: '',
      user_uid: '0',
      node_type: '',
      node_uuid: ''
    }
    this.getData();
  }
  
  getData() {
    var path = drupalSettings.path.currentPath;
    var nid = path.split('/')[1]; // This assumes the path is like node/123

    fetch('/favorite/data/' + nid, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/vnd.api+json'
      }
    }).then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          this.setState({
            favorited: data.favorited,
            user_uid: data.user_uid,
            user_uuid: data.user_uuid,
            node_type: data.node_type,
            node_uuid: data.node_uuid
          });
        });
      }
      else {
        console.log('error getting data');
      }
    });
  }
  
  toggleFavorite() {
    var favorited = !this.state.favorited;
    this.saveFavorite(favorited);
  }
  
  saveFavorite(favorited) {
    var endpoint = '/jsonapi/user/user/' + this.state.user_uuid + '/relationships/field_favorites';
    var method = 'POST';
    if (!favorited) {
      method = 'DELETE';
    }
    fetch(endpoint, {
      method: method,
      credentials: 'include',
      headers: {
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json'
      },
      body: JSON.stringify({
        "data": [
          {"type": 'node--' + this.state.node_type, "id": this.state.node_uuid}
        ]
      })
    }).then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          this.setState({
            favorited: favorited
          });
        });
      }
      else {
        console.log('error favoriting node');
      }
    });
  }
  
  render() {
    if (this.state.user_uid == "0") {
      return null;
    }
    var linkClass = 'unfavorited';
    var text = 'Favorite';
    if (this.state.favorited) {
      linkClass = 'favorited';
      text = 'Unfavorite';
    }
    return (
      <a href="#" className={linkClass} onClick={this.toggleFavorite}>{text}</a>
    );
  }
}

ReactDOM.render(<Favorite />, document.getElementById('favorite'));

