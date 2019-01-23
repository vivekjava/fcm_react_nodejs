import React, { Component } from 'react';
import './App.css';
import firbaseApp from "./config/config";

const messaging = firbaseApp.messaging();
class App extends Component {
  constructor() {
    super();
    this.state = {};
  }
  handleBgCb = () => {
    console.log("Getting Token Initiated.");
  }
  componentDidMount() {
    console.log(messaging);
      messaging.onMessage(this.handleBgCb);

      messaging.requestPermission().then(() => {
      console.log("Notification permission granted.");
      messaging.getToken().then(currentToken => {
          if (currentToken) {
              console.log("Token generated is ", currentToken);
              this.setState({
                success: "success",
                token: currentToken
              });

              let options = {
                method: "GET", // *GET, POST, PUT, DELETE, etc.
                mode: "cors", // no-cors, cors, *same-origin
                cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                credentials: "same-origin", // include, *same-origin, omit
                headers : {
                    'Content-Type': 'application/json'
                },
                redirect: "follow", // manual, *follow, error
                referrer: "no-referrer"
              }
            fetch('http://localhost:1002/records',options).then(response => {
                return response.json();
            }).then(result => {
                console.log("Executing onmount");
                console.log(result);
                if(result.result){
                  this.setState({'response':result.result,'status':'success','message':'Going good, Please Relax..'});
                }else{
                  this.setState({'status':'error','message':'Cannot fetch the records.'});
                }
               
            }).catch(err=>{
                this.setState({'status':'error','message':'Cannot fetch the records.'});
                console.log("Error Occured");
                console.log(err);
            }); 

          } else {
            console.log(
              "Client Token creation Failed"
            );
            this.setState({
              status:"error",
              message:"Client Token creation Failed"
            });
          }
        }).catch(err => {
          console.log("An error occurred while retrieving token. ", err);
          this.setState( {
            status: "error",
            message: "An error occurred while retrieving token."
          });
        });
      }).catch(err => {
          this.setState({'status':'error','message':'Cannot fetch the records.'});
          console.log("Unable to get permission to notify.", err);
      });
}
refresh = () => {
  console.log("Refresh");
    let options = {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, cors, *same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers : {
          'Content-Type': 'application/json'
      },
      redirect: "follow", // manual, *follow, error
      referrer: "no-referrer"
    }
    fetch('http://localhost:1002/records',options).then(response => {
        return response.json();
    }).then(result => {
        console.log("Doing Refresh");
        console.log(result);
        if(result.result){
          this.setState({'response':result.result,'status':'success'});
        }else{
          this.setState({'status':'error','message':'Cannot fetch the records.'});
        }
      
    }).catch(err=>{
      this.setState({'status':'error','message':'Cannot fetch the records.'});
      console.log("Error Occured");
      console.log(err);
    }); 
}


clear = () => {
  console.log("Clear");
  let options = {
    method: "DELETE", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, cors, *same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers : {
        'Content-Type': 'application/json'
    },
    redirect: "follow", // manual, *follow, error
    referrer: "no-referrer",
    body:JSON.stringify({}) 
  }
  fetch('http://localhost:1002/clear',options).then(response => {
      return response.json();
  }).then(result => {
      if(result.result){
        this.setState({'response':[],'status':'success'});
      }else{
        this.setState({'status':'error','message':'Cannot able to Remove'});
      }        
  }).catch(err=>{    
      this.setState({'status':'error','message':'Cannot able to Remove'});
      console.log("Error Occured");
      console.log(err);
  }); 
}

getItems = (items) => {
  let inject  = [];
 if( items && items.length>0){
    items.forEach(function(value, key) {  
      let date = new Date(value.createtime);       
      inject.push(<div className="list-item" key={key}>                
                    <span className="bold" title="Just a random Number">Random Id :  {value.id} </span><br/>
                    Date : {date.getUTCDate()+' - '+(date.getUTCMonth()+1)+' - '+date.getUTCFullYear()+'    '+date.getUTCHours()+':'+date.getUTCMinutes()+':'+date.getUTCSeconds()}
                  </div>);
    })
 }else{
         
      inject.push(<div className="list-item" key='1'>                
                    <span className="bold"> List is Empty </span>
                  </div>);
   
 }
  
  return inject;
}

render() {
  console.log(this.state);
    return (
      <div>
        <div className="App">
          <center>
            <p className="App-intro">
              Copy the Client Token And paste it in the config.yaml -> clienttoken
            </p>
            <textarea className="token-pane" value={this.state.token}></textarea>
            <div className="action-pane">
              <input type="button" className="btn" value="Clear" onClick={this.clear} /> <input type="button" className="btn"  value="Refresh"  onClick={this.refresh}  />
            </div>
            <div className="listview">           
                {(this.state.response && this.state.response.length>0)?this.getItems(this.state.response):this.getItems(false)}            
            </div>
            <div className={this.state.status}>
                {this.state.message}
            </div>
          </center>
        </div>
      </div>
    );
  }
}

export default App;
