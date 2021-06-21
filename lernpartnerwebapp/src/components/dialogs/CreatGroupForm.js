import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import SaveIcon from "@material-ui/icons/Save";
import AppApi from "../../api/AppApi";
import { TextField, Button, Grid } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import LearnGroupBO from "../../api/LearnGroupBO";

class CreateLearnGroup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      person_id: "",
      learnGroup: null, //für addLearnGroup
      loadingInProgress: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }
  
  async componentDidMount() {
    
    let uid = getCookie("uid")
    let app = new AppApi()
    let session_id = await app.getPersonByGoogleId(uid)
    session_id = session_id[0].id
    this.state.person_id = session_id
}
  

  /** Create LearnGroupProfile*/
  addLearnGroup(name, person_id) {

    var learnGroup = new LearnGroupBO
    learnGroup.setName(name)
    learnGroup.setPersonId(person_id)



    var api = AppApi.getApi();
    // console.log(api)
    api
      .addLearnGroup(learnGroup)
      .then((learnGroup) => {
        this.setState({
          learnGroup: learnGroup,
        });
      });
    console.log(this.state.learnGroup);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    // console.log({ [e.target.name]: e.target.value })
  }

  handleSubmit = (event) => {
    event.preventDefault(); //r: verhindert ein neuladen der seite bei unberechtigten aufruf der funktion
    this.addLearnGroup(
      this.state.name,
      this.state.person_id,
    );
  };

  render() {
    const { classes } = this.props;
    console.log(this.state);

    return (
      <div className={classes.roott}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <div>
                <h1>Lege deine Lerngruppe an:</h1>
              </div>
              <div>
                <form className={classes.root} onSubmit={this.handleSubmit}>
                  <div>
                    <TextField
                      id="outlined-basic"
                      label="Wie soll die Lerngruppe heißen?"
                      variant="outlined"
                      name="name"
                      //required
                      onChange={this.handleChange}
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="text"
                    color="default"
                    size="small"
                    className={classes.button}
                    startIcon={<SaveIcon />}
                  >
                    Bestätigen
                  </Button>
                </form>
              </div>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
  
}
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}
const styles = (theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "30ch",
    },
    roott: {
      flexGrow: 1,
    },
    button: {
      margin: theme.spacing(1),
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
  },
});

export default withStyles(styles)(CreateLearnGroup);