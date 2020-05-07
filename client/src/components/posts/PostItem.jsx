import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
//  materialUi
import DeleteIcon from '@material-ui/icons/Delete';
import ThumbDownAltOutlinedIcon from '@material-ui/icons/ThumbDownAltOutlined';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
//  Actions
import { deletePost } from '../../actions/post';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 800,
    backgroundColor: 'white',
    color: 'black',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const PostItem = ({
  deletePost,
  post: { _id, text, name, avatar, user, likes, comments, date },
  auth,
}) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const onClick = (id) => {
    deletePost(id);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const formatedDate = (
    <Fragment>
      <Moment fromNow>{date}</Moment>
    </Fragment>
  );

  return (
    <Fragment>
      <div className="container">
        <Card className={classes.root} variant="outlined">
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}>
                R
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                {!auth.loading && user === auth.user._id && (
                  <DeleteIcon onClick={() => onClick(_id)} />
                )}
              </IconButton>
            }
            title={name}
            subheader={formatedDate}
          />

          <CardContent>
            <Typography variant="body2" color="textPrimary" component="p">
              {text}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="like">
              <ThumbUpAltOutlinedIcon />
            </IconButton>
            <IconButton aria-label="dislike">
              <ThumbDownAltOutlinedIcon />
            </IconButton>
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>Comments</Typography>
            </CardContent>
          </Collapse>
        </Card>
      </div>
    </Fragment>
  );
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { deletePost })(PostItem);
