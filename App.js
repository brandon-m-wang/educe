import React, {useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import LaptopIcon from '@material-ui/icons/Laptop';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import { StepIcon } from '@material-ui/core';
import { dark } from '@material-ui/core/styles/createPalette';
import { createMuiTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import axios from 'axios';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
        HackGT
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.secondary.light,
    padding: theme.spacing(6),
  },
  header: {
    backgroundColor: theme.palette.secondary.dark
  }
}));

export default function Album() {
  const classes = useStyles();
  const [regOpen, setRegOpen] = useState(false);
  const [reqOpen, setReqOpen] = useState(false);
  const [resOpen, setResOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [handle, setHandle] = useState('');
  // const [token, setToken] = useState('');
  const [errors, setErrors] = useState([]);

  const handleRegOpen = () => {
    setRegOpen(true);
  };

  const handleReqOpen = () => {
    setReqOpen(true);
  };

  const handleResOpen = () => {
    setResOpen(true);
  }

  const registrationCheck = () => {
    let userInfo = {
        email: email,
        password: password,
        confirmPassword: confirmPassword,
        handle: handle
    }
    axios.post('https://us-central1-hackgt-52008.cloudfunctions.net/api/signup', userInfo)
        .then((res) => {
            console.log(res.data);
            // setToken(res.data.token);
            handleRegClose();
            handleReqOpen();
        }).catch((err) => {
            setErrors(err.response.data)
        })
  };

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [url, setURL] = useState('');
  const [newPost, setNewPost] = useState([]);

  const createPost = () => {
      setNewPost([{
        title: title,
        body: body
      }])
      console.log(title,body, newPost);
      // const {headers} = {"Authorization" : 'Bearer ' + token}
      axios.post('https://us-central1-hackgt-52008.cloudfunctions.net/api/post', newPost)
        .then((res) => {
          console.log(res.data);
          handleReqClose();
        })
        .catch(err => console.log('Errors: ', err))
      handleReqClose();
  }

  var update = newPost.length > 0 ? newPost.map(item => (
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image = {url}
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h6" component="h2">
                      {item.title}
                    </Typography>
                    <Typography>
                      {item.body}  
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary"> 
                      View
                    </Button>
                    <Button size="small" color="primary">
                      Contact
                    </Button>
                  </CardActions>
                </Card>
  )) : null;

  console.log(update);

  const handleRegClose = () => {
    setRegOpen(false);
  };
  const handleReqClose = () => {
    setReqOpen(false);
  };
  const handleResClose = () => {
    setResOpen(false);
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative" className={classes.header}>
        <Toolbar>
          <LaptopIcon className={classes.icon} />
          <Typography variant="h6" color="inherit" noWrap>
            Educe
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent} style = {{backgroundImage:"url('https://thumbs.gfycat.com/ResponsibleGiddyIndianjackal-max-14mb.gif')"}}>
          <Container maxWidth="med">
            <Typography component="h1" variant="h2" align="center" gutterBottom>
              Redefining remote-learning opportunities, powered by people.
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Fulfill requests for technology and change lives -- or register and verify to submit requests.
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button variant="contained" color="secondary" onClick={handleRegOpen}>
                    Register
                  </Button>
                  <Dialog open={regOpen} onClose={handleRegClose} aria-labelledby="form-dialog-title">
                  <DialogTitle id="form-dialog-title">Sign Up for Educe</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      Register with a .org or .edu address to post requests and gain access to a large source of crowdsourced technology.
                    </DialogContentText>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="email"
                      label="Email Address"
                      helperText={errors.email}
                      type="email"
                      onChange = {e => setEmail(e.target.value)}
                      fullWidth
                    />
                    <TextField
                      autoFocus
                      margin="dense"
                      id="password"
                      label="Password"
                      type="password"
                      helperText={errors.password}
                      onChange = {e => setPassword(e.target.value)}
                      fullWidth
                    />
                    <TextField
                      autoFocus
                      margin="dense"
                      id="confirmPassword"
                      label="Confirm Password"
                      type="password"
                      helperText={errors.confirmPassword}
                      onChange = {e => setConfirmPassword(e.target.value)}
                      fullWidth
                    />
                    <TextField
                      autoFocus
                      margin="dense"
                      id="handle"
                      label="Username"
                      type="text"
                      helperText={errors.handle}
                      onChange = {e => setHandle(e.target.value)}
                      fullWidth
                    />
                  </DialogContent>
                  <DialogActions>
          <Button onClick={handleRegClose} color="primary">
            Cancel
          </Button>
          <Button onClick={registrationCheck} color="primary">
            Register
          </Button>
        </DialogActions>
      </Dialog>
                </Grid>
                <Grid item>
                  <Button variant="outlined" color="inherit" onClick={handleReqOpen}>
                    Request
                  </Button>
                  <Dialog open={reqOpen} onClose={handleReqClose} aria-labelledby="form-dialog-title">
                  <DialogTitle id="form-dialog-title">Request</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      Submit your request
                    </DialogContentText>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="title"
                      label="Name, Location, Request"
                      type="text"
                      onChange = {e => setTitle(e.target.value)}
                      fullWidth
                    />
                    <TextField
                      autoFocus
                      margin="dense"
                      id="body"
                      label="Description"
                      type="text"
                      onChange = {e => setBody(e.target.value)}
                      fullWidth
                    />
                    <TextField
                      autoFocus
                      margin="dense"
                      id="url"
                      label="Image URL"
                      type="text"
                      onChange = {e => setURL(e.target.value)}
                      fullWidth
                    />
                  </DialogContent>
                  <DialogActions>
          <Button onClick={handleReqClose} color="primary">
            Cancel
          </Button>
          <Button onClick={createPost} color="primary">
            Post
          </Button>
        </DialogActions>
      </Dialog>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
              <Grid container item xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image="data:image/jpeg;base64,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"
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h6" component="h2">
                      Jason Kim; Seattle, WA; RE: Chromebook
                    </Typography>
                    <Typography>
                      Hello, this is my son Jason. Jason is a very bright boy and needs to attend online school but we only have one shared computer across the house. If anyone would like...
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary"> 
                      View
                    </Button>
                    <Button size="small" color="primary" onClick = {handleResOpen}>
                      Contact
                    </Button>
                    <Dialog open={resOpen} onClose={handleResClose} aria-labelledby="form-dialog-title">
                  <DialogTitle id="form-dialog-title">Outreach</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      Thanks for your contributions!
                    </DialogContentText>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="title"
                      label="E-mail"
                      type="text"
                      onChange = {e => setTitle(e.target.value)}
                      fullWidth
                    />
                    <TextField
                      autoFocus
                      margin="dense"
                      id="body"
                      label="Message"
                      type="text"
                      onChange = {e => setBody(e.target.value)}
                      fullWidth
                    />
                    <TextField
                      autoFocus
                      margin="dense"
                      id="url"
                      label="Product Specs"
                      type="text"
                      onChange = {e => setURL(e.target.value)}
                      fullWidth
                    />
                  </DialogContent>
                  <DialogActions>
          <Button onClick={handleResClose} color="primary">
            Cancel
          </Button>
          <Button onClick={createPost} color="primary">
            Send
          </Button>
        </DialogActions>
      </Dialog>
                  </CardActions>
                </Card>
              </Grid>
              <Grid container item xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image = "https://compote.slate.com/images/444379f5-ba5b-48d8-a017-ad989213ee25.jpeg?width=780&height=520&rect=5472x3648&offset=0x0"
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h6" component="h2">
                      Darren Johnson; Chicago, IL; RE: Laptop
                    </Typography>
                    <Typography>
                      Hey community, this is my son Darren. He's having a hard time focusing in class online when he has to share a single old laptop with his older brother for school...
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary"> 
                      View
                    </Button>
                    <Button size="small" color="primary">
                      Contact
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
              <Grid container item xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image = "https://ca-times.brightspotcdn.com/dims4/default/6758f2b/2147483647/strip/true/crop/3900x2438+0+81/resize/2000x1250!/quality/90/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2Fcd%2Fd2%2Fb18666b545afa2ea5fb5d2141697%2Fla-photos-1staff-590987-la-me-distance-learning-565.jpg"
                    title=""
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h6" component="h2">
                      Xavier Garcia; Oakland, CA; RE: Tablet Device
                    </Typography>
                    <Typography>
                      Hello all, I'm a sophomore in high school and I'm appealing to this community for any sort of touch-screen tablet device for my 3-D modeling class. I've been...
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary"> 
                      View
                    </Button>
                    <Button size="small" color="primary">
                      Contact
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
              <Grid container item xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image = "https://gumlet.assettype.com/newslaundry%2F2020-06%2Faec18d7f-f6b0-4edd-bee2-a94995674237%2Fonlineeducation__1_.jpg?auto=format%2Ccompress&fit=max&format=webp&w=480&dpr=2.6"
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h6" component="h2">
                      Vangati Family; Dhaka, BD; RE: Spare Laptops
                    </Typography>
                    <Typography>
                      Hello, I am Aja, single mother in Bangladesh. This is my beautiful family of children but they all can only share one computer. I wish I could provide them...
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary"> 
                      View
                    </Button>
                    <Button size="small" color="primary">
                      Contact
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
              <Grid container item xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image = "https://i0.wp.com/blackyouthproject.com/wp-content/uploads/2017/03/Nia-Mya-Reese.jpg?fit=640%2C338"
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h6" component="h2">
                      Lucy Rashida; Nashville, TN; RE: PC
                    </Typography>
                    <Typography>
                      Dearest community, my beautiful daughter has been struggling to keep up with online classes using my smartphone. I currently work 2 jobs to make ends meet but it'll...
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary"> 
                      View
                    </Button>
                    <Button size="small" color="primary">
                      Contact
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
              <Grid container item xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image = "https://cdn.givind.org/static/images/program/fund-the-college-education-of-a-poor-student.jpg"
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h6" component="h2">
                      Jun Akhihara; Rochor, SN; RE: Monitor
                    </Typography>
                    <Typography>
                      Hello! I'm Jun and I'm going into the 7th grade at Barclay's Junior High in Singapore. I am asking for a monitor display to use for the house's old computer which...
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary"> 
                      View
                    </Button>
                    <Button size="small" color="primary">
                      Contact
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
              <Grid container item xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image = "https://static01.nyt.com/images/2020/10/07/us/00virus-studentpoverty01/00virus-studentpoverty01-articleLarge.jpg?quality=75&auto=webp&disable=upscale"
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h6" component="h2">
                      Michelle Macario; Denver, CO; RE: Ethernet Adapter
                    </Typography>
                    <Typography>
                      Hello, I'm a college student currently attending school part-time. My cheap apartment complex does not support my wifi adapter, so I need an ethernet means of connecting...
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary"> 
                      View
                    </Button>
                    <Button size="small" color="primary">
                      Contact
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
              <Grid container item xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image = "https://media.distractify.com/brand-img/8plrvy_CX/0x0/featured-taco-bell-wifi-1598897154594.jpg"
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h6" component="h2">
                      Mrs. Gunther; Tyler, TX; RE: Modem
                    </Typography>
                    <Typography>
                      I teach at a poor public middle school. This last weekend I saw two of my beloved students sitting outside a Taco Bell for a strong wi-fi connection. If anyone could spare a functional modem I...
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary"> 
                      View
                    </Button>
                    <Button size="small" color="primary">
                      Contact
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
              <Grid container item xs={12} sm={6} md={4}>{update}</Grid>
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}
