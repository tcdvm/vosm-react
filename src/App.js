import React, { Component } from 'react';
import firebase from 'firebase';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import './App.css';
import Checkout from './Checkout';


var Rebase = require('re-base');

// Initialize Firebase
var config = {
  apiKey: "AIzaSyBnGL1bhyZRc8ggTM-vNrDFPDe84SNmqkU",
  authDomain: "vosm-9a086.firebaseapp.com",
  databaseURL: "https://vosm-9a086.firebaseio.com",
  projectId: "vosm-9a086",
  storageBucket: "vosm-9a086.appspot.com",
  messagingSenderId: "317683484107"
};
firebase.initializeApp(config);
var base = Rebase.createClass(config, 'numberTrack');

/**
 * REGISTERINFO
 */
class RegisterInfo extends Component {

  render() {
    const isRegistered = (
      <div>
        <CSSTransitionGroup
          transitionName="example"
          transitionAppear={true}
          transitionAppearTimeout={500}
          transitionEnter={false}
          transitionLeave={false}>
        <h5>If paying by credit card</h5>
        <p>You should receive a receipt from Stripe in a few minutes after the payment is processed. If you don't receive the email or if there's an error in payment - please <a href="mailto:vetophthosurgerymeeting@gmail.com">email us</a> with details. <b>You may close this window after receiving the email receipt.</b></p> 
        <h5>Cancellation Policy</h5>
        <p>Cancellations received by June 4th  will receive a full refund less a 10% administrative fee. 
          Cancellations received between June 4th-July 4th will receive a 50% refund. No cancellations will be refunded after July 4th. 
          All cancellations must be received in writing via <a href="mailto:vetophthosurgerymeeting@gmail.com">email</a> or mail.</p>
        </CSSTransitionGroup>
      </div>
    );
    const isNotRegistered = (
      <div>
        <h5><b>Registration Fees (before July 4th):</b></h5>
        <ul className="price-list">
          <li>ACVO/ECVO Diplomate/Board Eligible - $400</li>
          <li>Speaker - $300</li>
          <li>Resident/Ophthalmology Intern - $300</li>
          <li>Non-Diplomates - $500</li>
          <small>Onsite registration: +$100</small>
        </ul>
        <p><b>We are an approved AAVSB-provider for RACE Credits; final credit hours are still pending. Last year the program had 9hs of RACE credits.</b></p>
        <p>Number of available diplomate registration spots: <b>{this.props.dipRegistrantNumber}</b></p>
        <p>Number of available house officer or other registration spots: <b>{this.props.otherRegistrantNumber}</b></p>
          <hr/>
        {/* <h5><b>Wet Lab</b></h5>
        <p>Description of wetlab - blah blah blah blah blah </p>
        <p>Cost: $100</p> */}
      </div>
    );
    if (this.props.registered)
      return (isRegistered);
    else
      return (isNotRegistered);
  }


} // end RegisterInfo

/**
 * RegisterForm
 */
class RegisterForm extends React.Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleSubmit(event) {
    this.props.handleSubmit(event)
  }

  handleInputChange(event) {
    this.props.onInputChange(event);
  }

  render() {

    const dipdisabled = (this.props.dipRegistrantNumber <= 0);
    const otherdisabled = (this.props.otherRegistrantNumber <= 0);

    var amount = 0;

    switch (this.props.category) {
      case 'aecvodip':
        amount += 400;
        // amount += (this.props.wetlab=="yes" ? 100 : 0);
        break;
      case 'presenter':
      case 'houseofficer':
        amount += 300;
        // amount += (this.props.wetlab=="yes" ? 100 : 0);
         break;
      case 'other':
        amount += 500;
        // amount += (this.props.wetlab=="yes" ? 100 : 0);
        break;
      case 'noselection':
        break;
      default:
        console.log('Something went wrong here:#' + this.props.category + '#');
        break;
    }

    let paymentLink = (
      <div>
        {/* <CSSTransitionGroup
          transitionName="example"
          transitionAppear={true}
          transitionAppearTimeout={500}
          transitionEnter={false}
          transitionLeave={false}> */}
            <h3>Thank you for registering!</h3>
            <h2><b>Please click the link below to get the payment pop-up window for ${amount} if paying by credit-card.</b></h2>
            <div className="row">
              <div className="col-md-8 col-md-offset-3">
                <Checkout
                  // name={this.props.name}
                  description={'VOSM Registration'}
                  // email={this.state.email}
                  amount={amount}
                />
              </div>
            </div>
            {/* <form name="PrePage" method="post" action="https://Simplecheckout.authorize.net/payment/CatalogPayment.aspx" target="_blank">
              <input type="hidden" name="LinkId" value={linkId} />
              <div className="col-md-8 col-md-offset-1">
                <button className="btn btn-block btn-lg btn-fill btn-success">Pay here! (credit card)</button>
                ($5 processing fee if paying by credit card)
              </div>
            </form> */}
            <div className="row">
              <div className="col-md-8 col-md-offset-4">
                <h6>-OR-</h6>
              </div>
            </div>
            <div>Pay by check - ${amount}: </div>
              <address>
                <strong>MDVM Solutions</strong><br/>
                2720 S. Highland Ave #603<br/>
                Lombard, IL USA 60148<br/>
              </address>
              <p>(Postmarked by June 4th for early registration. we will send you a confirmation email once the check has arrived. If you have any question or concerns do not hesitate to email us at: vetophthosurgerymeeting@gmail.com, or Dr. Enry Garcia over the phone at 970-232-5225)</p>
        {/* </CSSTransitionGroup> */}
      </div>
    );

    if (this.props.registered)
      return paymentLink;
    if (!this.props.registered) {

      let amount = 0;

      switch (this.props.category) {
        case 'aecvodip':
          amount += 400;
          // amount += (this.props.wetlab=="yes" ? 100 : 0);
          break;
        case 'presenter':
        case 'houseofficer':
          amount += 300;
          // amount += (this.props.wetlab=="yes" ? 100 : 0);
          break;
        case 'other':
          amount += 500;
          // amount += (this.props.wetlab=="yes" ? 100 : 0);
          break;
        case 'noselection':
          break;
        default:
          console.log('Something went wrong here:#' + this.props.category + '#');
          break;
      }

      let registrationText = "Register! ($" + amount + ")";

      return (
        <form role="form" id="contact-form" method="post" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Your name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="First Name and Last Name"
              value={this.props.name}
              onChange={this.handleInputChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Your personal email address"
              value={this.props.email}
              onChange={this.handleInputChange} required />
              <p>This email will be used for all comunications throughout the year and for updates.</p>
          </div>
          <div className="form-group">
            <label htmlFor="company">Clinic/School/Company</label>
            <input
              type="text"
              name="company"
              className="form-control"
              placeholder="Who you work for"
              value={this.props.company}
              onChange={this.handleInputChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="country">Country</label>
            <input
              type="text"
              name="country"
              className="form-control"
              placeholder="Where you are from (e.g. United States)"
              value={this.props.country}
              onChange={this.handleInputChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="Category">Category of Registration</label>
            <select required
              className="form-control"
              name="category"
              value={this.props.category}
              onChange={this.handleInputChange}>
              <option value="">Select One</option>
              <option value="aecvodip" disabled={dipdisabled} >ACVO/ECVO Diplomate/Board Eligible ($400)</option>
              <option value="presenter" disabled={dipdisabled} >Speaker ($300)</option>
              <option value="houseofficer" disabled={otherdisabled} >Resident/Ophthalmology Intern ($300)</option>
              <option value="other" disabled={otherdisabled} >Non-Diplomates ($500)</option>
            </select>
          </div>
          {/* <div className="form-group">
            <label htmlFor="Wetlab">Will you be attending the wet lab (+$100)?</label><br/>
            <div className="radio-inline">
              <label className="radio-inline">
                <input type="radio" name="wetlab" id="inlineRadio1" value="yes" onChange={this.handleInputChange} required/> Yes!
              </label>
              <label className="radio-inline">
                <input type="radio" name="wetlab" id="inlineRadio2" value="no" onChange={this.handleInputChange}/> Alas, no. 
              </label>
            </div>
          </div>           */}
          <div className="form-group">
            <label htmlFor="Reception">Will you be attending the welcome reception (Aug 3th, 6-9pm)?</label>
            <div className="radio-inline">
              <label className="radio-inline">
                <input type="radio" name="reception" id="inlineRadio1" value="yes" onChange={this.handleInputChange} required/> Yes!
              </label>
              <label className="radio-inline">
                <input type="radio" name="reception" id="inlineRadio2" value="no" onChange={this.handleInputChange}/> Alas, no. 
              </label>
            </div>
          </div>          
          <div className="submit">
            <input type="submit" className="btn btn-info btn-fill" defaultValue={registrationText} />
          </div>
        </form>
      );
    }
  }
};

class RegApp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      registered: false,
      name: '',
      email: '',
      company: '',
      category: '',
      country: '',
      reception: 'no',
      dipRegistrantNumber: '',
      otherRegistrantNumber: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.firebaseRef = firebase.database().ref('attendees');
  }

  componentWillMount() {
    this.ref = base.syncState('dipRegistrantNumber', {
      context: this,
      state: 'dipRegistrantNumber'
    })

    this.ref2 = base.syncState('otherRegistrantNumber', {
      context: this,
      state: 'otherRegistrantNumber'
    })
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ registered: true })
    this.firebaseRef.push({
      name: this.state.name,
      email: this.state.email,
      company: this.state.company,
      country: this.state.country,
      category: this.state.category,
      reception: this.state.reception,
      // wetlab: this.state.wetlab
    });

    switch (this.state.category) {
      case 'aecvodip':
      case 'presenter':
        this.setState({
          dipRegistrantNumber: this.state.dipRegistrantNumber-1
        });
      break;
      case 'other':
      case 'houseofficer':
        this.setState({
          otherRegistrantNumber: this.state.otherRegistrantNumber-1
        });
        break;
      default:
        console.log('Cannot decrement count');
        break;
    }
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-6">
          <RegisterForm
            name={this.state.name}
            email={this.state.email}
            company={this.state.company}
            category={this.state.category}
            registered={this.state.registered}
            reception={this.state.reception}
            country={this.state.country}
            onInputChange={this.handleInputChange}
            handleSubmit={this.handleSubmit} 
            dipRegistrantNumber={this.state.dipRegistrantNumber}
            otherRegistrantNumber={this.state.otherRegistrantNumber}/>
        </div>
        <div className="col-md-6">
          <RegisterInfo
            category={this.state.category}
            registered={this.state.registered} 
            dipRegistrantNumber={this.state.dipRegistrantNumber}
            otherRegistrantNumber={this.state.otherRegistrantNumber}/>
        </div>
      </div>
    );
  }
}



export default RegApp;
