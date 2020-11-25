import React, { useState, useEffect, createRef } from 'react';
import {
  Card,
  CardActionArea,
  CardActions,
  Button,
  CardContent,
  CardMedia,
  Typography,
} from '@material-ui/core';
import useStyles from './styles';
import classNames from 'classnames';
const NewsCard = ({
  article: { description, publishedAt, source, title, url, urlToImage },
  index,
  activeArticle,
}) => {
  const classes = useStyles();
  const [elRefs, setEleRefs] = useState([]);
  const scrollToRef = (ref) => window.scroll(0, ref.current.offsetTop - 50);

  useEffect(() => {
    setEleRefs((refs) =>
      Array(20)
        .fill()
        .map((_, j) => refs[j] || createRef())
    );
  }, []);

  useEffect(() => {
    if (index === activeArticle && elRefs[activeArticle]) {
      scrollToRef(elRefs[activeArticle]);
    }
  }, [index, activeArticle, elRefs]);

  return (
    <Card
      ref={elRefs[index]}
      className={classNames(
        classes.card,
        activeArticle === index ? classes.activeCard : null
      )}
    >
      <CardActionArea href={url} target="_blank">
        <CardMedia className={classes.media} image={urlToImage} />
        <div className={classes.details}>
          <Typography color="textSecondary" variant="body2" component="h2">
            {new Date(publishedAt).toDateString()}
          </Typography>
          <Typography color="textSecondary" variant="body2" component="h2">
            {source.name}
          </Typography>
        </div>
        <Typography
          className={classes.title}
          gutterBottom
          variant="body2"
          component="h2"
        >
          {title}
        </Typography>
        <CardContent>
          <Typography color="textSecondary" variant="body2" component="p">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary">
          Learn More
        </Button>
        <Typography variant="h5" color="textSecondary">
          {index + 1}
        </Typography>
      </CardActions>
    </Card>
  );
};

export default NewsCard;
