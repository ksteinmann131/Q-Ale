import React, { Component } from 'react';
import { withAuth } from '@okta/okta-react';
import { checkAuthentication } from './helpers';
import { Container, Header, Accordion } from 'semantic-ui-react';

export default withAuth(class QuizReview extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      userinfo: null,
      authenticated: null,
      name: " ",
      date: " ",
      quizInfo: {},
    };
    this.checkAuthentication = checkAuthentication.bind( this );
    this.displayRound = this.displayRound.bind(this);
  }
  // handleClick(e, titleProps) => {
  //   const {index} = titleProps
  //
  // }

  populateQuiz = async() => {
    const response = await fetch('/api/quizreview/5aaab363f37825434e391a21');
    const body = await response.json();
    return body;
  }

  async componentDidMount() {
    let self = this;
      this.checkAuthentication()
      .then(this.populateQuiz()
      .then((res) => {
        var quizData = res;
         self.setState({
           quizInfo: quizData,
         });
      })
    )
  }

  async componentDidUpdate() {
      this.checkAuthentication();
  }

  displayRound(round) {
      let quizInfo = this.state.quizInfo
      let questionsAndAnswers = []
      console.log(this.state.quizInfo);
      for (let i = 1; i <= 10; i++){
        questionsAndAnswers.push((<div>
          //within the divs are where we will make changes to all the question and answer display/style/etc.
          {quizInfo.rounds[round].questions[0]["question"+i]}
          {quizInfo.rounds[round].questions[0]["answer"+i]}
          </div>))
      }

        return(
          <div>
          //within these divs is where we make changes to display/style/etc. for everything else
          {quizInfo.rounds[round].category}
          {questionsAndAnswers}
          </div>)
      }


  render() {
    // let roundsToRender = <p>Loading Rounds</p>;
    // let questionsToRender = <p>Loading Questions</p>;
    // if (this.state.quizInfo.name) {
    //   roundsToRender = <div> {this.state.quizInfo.rounds.map((rounds) => <p>{rounds.category}</p> )} </div>
    //   questionsToRender = <div> {this.state.quizInfo.rounds.map((rounds) => <p>{rounds.questions.map((questions)=> <p>{questions.question1}</p>)}</p> )} </div>
    // };
    if (this.state.quizInfo.name) {
    return(
      <div>
      {this.state.quizInfo.name}
      <br/>
      {this.state.quizInfo.date}
      <br/>
      {this.displayRound(1)}
      </div>
    )
  } else {
    return (<div>Loading</div>)
  }
  }
})
