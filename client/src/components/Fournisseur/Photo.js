import React from 'react';
import { Card } from 'react-bootstrap';


const Photo = ({ id }) => {
    return (

        <Card className="photo">
            <Card.Img
                // variant="top"
                size="small"
                src={`http://localhost:5000/produit/${id}`}
                alt="Photo"
            />
        </Card>
    );
};

export default Photo;