import React, { useState, useEffect, Fragment } from 'react'
import PropTypes from 'prop-types';
import { Card, Button, Icon } from 'semantic-ui-react'
import API from "../utils/API"



const ObjectItem = ({object: {title, artistDisplayName, primaryImageSmall, objectDate, objectURL, objectID, GalleryNumber, user}, user: loggedInUser}) => {
    //Destructuring this.state for access to props

    const cardImageStyle = {
    height: "300px",
    backgroundImage: `url(${primaryImageSmall})`,
    backgroundSize: "cover",
    borderRadius: ".28571429rem",
    marginBottom: "10px"
    }

    //Setting ObjectItem component's initial state
    const [dbObjects, setDbObjects] = useState([])

    //Loading all objects and storing with setDbObjects
    useEffect(() => {
        loadObjects()
    }, [])

    //Load all objects and set them to dbObjects
    function loadObjects() {
        API.getObjects()
        .then(res =>
            setDbObjects(res.data)
            )
            .catch(err => console.log(err));
    };

    //Adds an object to the database using API.saveObject
    //.Then reloads objects from the database
    function addToCollection (event) {
        event.preventDefault();
        console.log(loggedInUser)
        API.saveObject({
            title: title,
            artistDisplayName,
            objectDate,
            objectURL,
            primaryImageSmall,
            objectID,
            GalleryNumber,
            user: loggedInUser.email
        })
        .then(res => loadObjects())
        .catch(err => console.log(err))

        console.log("User: " + loggedInUser.email + " Added " + title + " to collection")
    };


    return (
        <Fragment>
            <Card>
                <Card.Content style={{ padding: "0.5em" }}>
                    <Card.Header style={ cardImageStyle }/>
                    <Card.Header> {title} </Card.Header>
                    <Card.Meta>
                        <span className='date'> {objectDate} </span>
                    </Card.Meta>
                    <Card.Description>
                        {artistDisplayName}
                    </Card.Description>
                </Card.Content>
                <Button.Group attached="bottom">
                    <Button animated='vertical' onClick={addToCollection}>
                        <Button.Content hidden>Add to Collection</Button.Content>
                        <Button.Content visible>
                            <Icon name='add' />
                        </Button.Content>
                    </Button>
                    <Button animated='vertical' href={objectURL} target="blank">
                        <Button.Content hidden>Learn More</Button.Content>
                        <Button.Content visible>
                            <Icon name='info circle' />
                        </Button.Content>
                    </Button>
                </Button.Group>    
            </Card>
        </Fragment>
    )
}

ObjectItem.propTypes = {
    object: PropTypes.object.isRequired,
};

export default ObjectItem