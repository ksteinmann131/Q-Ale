import React, { Component } from 'react';
import { withAuth } from '@okta/okta-react';
import { checkAuthentication } from './helpers';

export default withAuth(class CreateQuiz extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      text: " ",
      userinfo: null,
      authenticated: null,
    };
    this.handleChange = this.handleChange.bind( this );
    this.handleSubmit = this.handleSubmit.bind( this );
    this.checkAuthentication = checkAuthentication.bind( this );
  }
  async componentDidMount() {
      this.checkAuthentication();
  }
  async componentDidUpdate() {
      this.checkAuthentication();
  }

  passToApp(mereow) {
    this.props.updateTriviaId(mereow)
  }

  handleChange( event ) {
    console.log( event.target.value );
    this.setState( {text: event.target.value} );
  }
  handleSubmit( event ) {
    event.preventDefault();
    fetch( '/api/createquiz', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tokenSub: this.state.userinfo.sub,
        name: document.getElementById( "quizname" ).value,
        date: document.getElementById( "date" ).value
      })
    })
    .then((res) =>
      res.json())
    .then((data) => {
      this.passToApp(data);
    })
    this.props.auth._history.push("/textroundinput")
  }
  render() {
    return(
      <div>
        <p>
          {this.props.trivia_id}
        </p>
      <form onSubmit = {this.handleSubmit}>
        <label> Quizname:
          <input id="quizname" type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <label> Date:
          <input id="date" type="date" />
        </label>
        <input type="submit" value="Create Quiz!" />
      </form>
      </div>
    );
  }
})
